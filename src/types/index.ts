import type { Ingredient, Meal, MealPlan, Recipe } from "@prisma/client";
import { type z } from "zod";
import { type MEAL_GENERATOR_FORM_SCHEMA } from "~/lib/constants/meals";

export type MealGeneratorFormData = z.infer<typeof MEAL_GENERATOR_FORM_SCHEMA>;

export type RecipeWithIngredients = Recipe & {
  ingredients: Ingredient[];
};

export type MealWithRecipe = Meal & {
  recipes?: RecipeWithIngredients[];
};

export type MealPlanWithMeals = MealPlan & {
  meals: MealWithRecipe[];
};
