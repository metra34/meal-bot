import { TRPCError } from "@trpc/server";
import { INITIAL_USER_PROMPT } from "~/lib/constants/meal-generator-prompts";
import { MEAL_GENERATOR_FORM_SCHEMA } from "~/lib/constants/meals";

import { z } from "zod";
import { env } from "~/env";
import logger from "~/lib/logger";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { getDeepseekMealsResponse } from "~/server/services/deepseek.service";
import type { MealPlanWithMeals } from "~/types";
import type { MealPlansResponse } from "../types";

// Middleware to check if user has exceeded their prompt limit
const checkUserPromptLimit = protectedProcedure.use(async ({ ctx, next }) => {
  // unlimited prompts for users
  if (env.USER_PROMPT_LIMIT === -1) {
    logger.info("User prompt limit is set to unlimited (-1), skipping check.");
    return next();
  }

  const email = ctx.session?.user?.email;
  if (email && env.USER_ALLOWED_EMAILS.includes(email)) {
    logger.info(`User is allowed to generate unlimited prompts.`);
    return next();
  }

  const promptCount = await ctx.db.userPrompt.count({
    where: {
      userId: ctx.session.user.id,
    },
  });

  if (promptCount >= env.USER_PROMPT_LIMIT) {
    throw new TRPCError({
      code: "FORBIDDEN",
      message: "You have reached the maximum number of allowed prompts",
    });
  }

  return next();
});

export const mealsRouter = createTRPCRouter({
  generateMeals: checkUserPromptLimit
    .input(MEAL_GENERATOR_FORM_SCHEMA)
    .mutation(async ({ ctx, input }) => {
      let userPrompt = INITIAL_USER_PROMPT.replace(
        "$NUM_RESULTS",
        input.numResults.toString(),
      )
        .replace("$MEAL_TYPES", input.mealTypes.join(", "))
        .replace("$CALORIES", input.calories.toString());

      if (input.ingredients.length > 0) {
        userPrompt = userPrompt.replace(
          "$INGREDIENTS",
          `Some of the meals should use one or more of these ingredients: ${input.ingredients.join(", ")}.`,
        );
      } else {
        userPrompt = userPrompt.replace("$INGREDIENTS", "");
      }

      // Generate meals using external service
      const response = await getDeepseekMealsResponse(userPrompt);

      if (!response) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to generate meal plans",
        });
      }

      logger.debug(
        `Generated meal plan response for ${ctx.session.user.id}:\n${JSON.stringify(response)}`,
      );

      const mealPlansObj = JSON.parse(response) as MealPlansResponse;
      const userId = ctx.session.user.id;

      return await ctx.db.userPrompt.create({
        data: {
          prompt: userPrompt,
          type: "initial",
          userId: userId,
          mealPlans: {
            create: mealPlansObj.meal_plans.map((plan) => ({
              name: plan.name,
              totalCalories: plan.meals.reduce(
                (sum, meal) => sum + meal.calories,
                0,
              ),
              userId: userId,
              meals: {
                create: plan.meals.map((meal) => ({
                  name: meal.name,
                  type: meal.type,
                  description: meal.description,
                  calories: meal.calories,
                })),
              },
            })),
          },
        },
      });
    }),
  regenerateMealPlans: checkUserPromptLimit
    .input(z.string())
    .mutation(async ({ ctx, input: promptId }) => {
      const prompt = await ctx.db.userPrompt.findFirst({
        where: {
          id: promptId,
        },
      });

      if (!prompt) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Prompt not found",
        });
      }

      if (prompt.type === "regenerate") {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You have already regenerated this prompt",
        });
      }

      // Regenerate meal plans using external service
      const response = await getDeepseekMealsResponse(prompt.prompt, true);

      if (!response) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to generate meal plans",
        });
      }

      logger.debug(
        `Generated meal plan response for ${ctx.session.user.id}:\n${JSON.stringify(response)}`,
      );

      const mealPlansObj = JSON.parse(response) as MealPlansResponse;
      const userId = ctx.session.user.id;

      return await ctx.db.userPrompt.create({
        data: {
          prompt: prompt.prompt,
          type: "regenerate",
          userId: userId,
          mealPlans: {
            create: mealPlansObj.meal_plans.map((plan) => ({
              name: plan.name,
              totalCalories: plan.meals.reduce(
                (sum, meal) => sum + meal.calories,
                0,
              ),
              userId: userId,
              meals: {
                create: plan.meals.map((meal) => ({
                  name: meal.name,
                  type: meal.type,
                  description: meal.description,
                  calories: meal.calories,
                })),
              },
            })),
          },
        },
      });
    }),
  getMealPlansByPromptId: protectedProcedure
    .input(z.string())
    .query(async ({ ctx, input: promptId }): Promise<MealPlanWithMeals[]> => {
      return ctx.db.mealPlan.findMany({
        where: {
          userPromptId: promptId,
          userId: ctx.session.user.id,
        },
        include: {
          meals: true,
        },
      });
    }),
  getMealPlanById: protectedProcedure
    .input(z.string())
    .query(
      async ({ ctx, input: mealPlanId }): Promise<MealPlanWithMeals | null> => {
        console.log("HERE!", mealPlanId);
        return ctx.db.mealPlan.findFirst({
          where: {
            id: mealPlanId,
            userId: ctx.session.user.id,
          },
          include: {
            meals: {
              include: {
                recipes: {
                  include: {
                    ingredients: true,
                  },
                },
              },
            },
          },
        });
      },
    ),
});
