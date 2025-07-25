import { z } from "zod";
import { INITIAL_USER_PROMPT } from "~/lib/constants/meal-generator-prompts";
import { MEAL_GENERATOR_FORM_SCHEMA } from "~/lib/constants/meals";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { getDeepseekResponse } from "~/server/services/deepseek.service";

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
      const result = await getDeepseekResponse(userPrompt);

      console.log("result?????");
      console.log(result);

      // Create multiple meal plans in a single transaction
      // const savedMealPlans = await ctx.db.$transaction(
      //   mealPlans.map(plan =>
      //     ctx.db.mealPlan.create({
      //       data: {
      //         name: plan.name,
      //         description: plan.description,
      //         meals: plan.meals,
      //         userId: ctx.session.user.id,
      //         preferences: input,
      //         // Add any other relevant fields
      //         createdAt: new Date(),
      //         updatedAt: new Date(),
      //       },
      //     })
      //   )
      // );

      // return savedMealPlans;
      return result;
    }),

  // getLatest: protectedProcedure.query(async ({ ctx }) => {
  //   const post = await ctx.db.post.findFirst({
  //     orderBy: { createdAt: "desc" },
  //     where: { createdBy: { id: ctx.session.user.id } },
  //   });

  //   return post ?? null;
  // }),
});
