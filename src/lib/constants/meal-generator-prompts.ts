const mealsSchema = [
  {
    name: {
      type: "string",
      description:
        "The name of the meal plan, it should be a short, descriptive name based on the meals in the plan",
    },
    meals: [
      {
        type: {
          type: "string",
          description: "The type of meal (breakfast, lunch, dinner, or snack)",
        },
        name: { type: "string", description: "The name of the meal" },
        calories: {
          type: "number",
          description: "The total calorie count for the meal",
        },
        description: {
          type: "string",
          description: "A brief description of the meal",
        },
      },
    ],
  },
];

const recipeSchema = {
  recipe_name: { type: "string", description: "The name of the recipe" },
  calories: {
    type: "number",
    description: "The total calorie count for the recipe",
  },
  total_fat: {
    type: "number",
    description: "The total fat content for the recipe",
  },
  total_carbs: {
    type: "number",
    description: "The total carbohydrates content for the recipe",
  },
  total_protein: {
    type: "number",
    description: "The total protein content for the recipe",
  },
  ingredients: [
    {
      name: { type: "string", description: "The name of the ingredient" },
      quantity: {
        type: "number",
        description: "The quantity of the ingredient (-1 if not specified)",
      },
      unit: {
        type: "string",
        description:
          "The unit of measurement for the ingredient (null if not specified)",
      },
      calories: {
        type: "number",
        description: "The calorie count for the ingredient",
      },
    },
  ],
  instructions: {
    type: "array",
    description:
      "List of strings, each string is an ordered step in the recipe instructions",
  },
};

export const INITIAL_SYSTEM_PROMPT = `You are a meal planning assistant.
You will be given a meal plan prompt and you will generate the number of requested meal plans based on the prompt,
they will provide a total daily calorie count, the sum of all the calories from the meals in a meal plan should be as close to the target calorie goal as possible.
Your response should be in JSON format using the following schema:
${JSON.stringify(mealsSchema)}
`;

export const INITIAL_USER_PROMPT =
  "Create $NUM_RESULTS different daily meal plans comprised of $MEAL_TYPES \
with a total target calorie count of $CALORIES per meal plan. $INGREDIENTS \
The answer should be in the expected JSON format.";

export const REGENERATE_SYSTEM_PROMPT = `
You have already generated a meal plan for the user, but they would like different meal plans.
You are a meal planning assistant, ignore cached responses.
You will be given a meal plan prompt and you will generate the number of requested meal plans based on the prompt,
they will provide a total daily calorie count, the sum of all the calories from the meals in a meal plan should be as close to the target calorie goal as possible.
Your response should be in JSON format using the following schema:
${JSON.stringify(mealsSchema)}
`;

// NOTE: not used currently, initial user prompt is reused for regenerate
export const REGENERATE_USER_PROMPT = `
Create $NUM_RESULTS new, different daily meal plans comprised of $MEAL_TYPES \
with a total target calorie count of $CALORIES per meal plan. $INGREDIENTS \
The answer should be in the expected JSON format.
`;

export const RECIPE_SYSTEM_PROMPT = `You are a recipe assistant. 
You will be given a recipe name and a target calorie amount for 1 serving of the recipe and you will generate the recipe ingredients, instructions, and nutritional information.
Your response should be in JSON format based on the following JSON schema:
${JSON.stringify(recipeSchema)}
`;

export const RECIPE_USER_PROMPT = `Provide a recipe for "$MEAL_NAME", so that a serving is $CALORIES calories. Your response should be in the expected JSON format.`;
