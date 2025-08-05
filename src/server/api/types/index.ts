import { z } from "zod";

export const mealTypeEnum = z.enum(["breakfast", "lunch", "dinner", "snack"]);

export const mealResponseSchema = z.object({
  type: mealTypeEnum,
  name: z.string(),
  calories: z.number(),
});

export const mealPlanResponseSchema = z.object({
  name: z.string(),
  meals: z.array(mealResponseSchema),
});

export const mealPlansResponseSchema = z.object({
  meal_plans: z.array(mealPlanResponseSchema),
});

// Types inferred from schemas
export type MealType = z.infer<typeof mealTypeEnum>;
export type MealResponse = z.infer<typeof mealResponseSchema>;
export type MealPlanResponse = z.infer<typeof mealPlanResponseSchema>;
export type MealPlansResponse = z.infer<typeof mealPlansResponseSchema>;
