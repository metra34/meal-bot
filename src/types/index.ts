import { type z } from "zod";
import { type MEAL_GENERATOR_FORM_SCHEMA } from "~/lib/constants/meals";

export type MealGeneratorFormData = z.infer<typeof MEAL_GENERATOR_FORM_SCHEMA>;
