import z from "zod";

export const MEAL_GENERATOR_FORM_SCHEMA = z.object({
  ingredients: z.array(z.string()),
  calories: z.number().min(500).max(5000),
  mealTypes: z.array(z.string()).min(1, "Select at least one meal type"),
  numResults: z.number().min(1).max(15),
});
