import { TRPCError } from "@trpc/server";
import { INITIAL_USER_PROMPT } from "~/lib/constants/meal-generator-prompts";
import { MEAL_GENERATOR_FORM_SCHEMA } from "~/lib/constants/meals";

import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { getDeepseekResponse } from "~/server/services/deepseek.service";
import type { MealPlanWithMeals } from "~/types";
import type { MealPlansResponse } from "../types";

export const mealsRouter = createTRPCRouter({
  generateMeals: protectedProcedure
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
      const response = await getDeepseekResponse(userPrompt);

      if (!response) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to generate meal plans",
        });
      }
      console.log("result?????");
      console.log(response);

      const mealPlansObj = JSON.parse(response) as MealPlansResponse;
      const userId = ctx.session.user.id;

      console.log(response);

      return await ctx.db.userPrompt.create({
        data: {
          prompt: userPrompt,
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
                  description: meal.name,
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

  // getLatest: protectedProcedure.query(async ({ ctx }) => {

  // getLatest: protectedProcedure.query(async ({ ctx }) => {
  //   const post = await ctx.db.post.findFirst({
  //     orderBy: { createdAt: "desc" },
  //     where: { createdBy: { id: ctx.session.user.id } },
  //   });

  //   return post ?? null;
  // }),
});
