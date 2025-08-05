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
      },
    ],
  },
];

export const INITIAL_SYSTEM_PROMPT = `You are a meal planning assistant.
You will be given a meal plan prompt and you will generate the number of requested meal plans based on the prompt,
they will provide a total daily calorie count, the sum of all the calories from the meals in a meal plan should be as close to the target calorie goal as possible.
Your response should be in JSON format using the following schema:
${JSON.stringify(mealsSchema)}
Do not include any newline (\\n) characters in your response JSON.
`;

/* 
  "variables": {
    "$INGREDIENTS": {
      "type": "array",
      "replace": "Some of the meals should use one or more of these ingredients: $ARRAY"
    },
    "$CALORIES": {
      "type": "number"
    },
    "$MEAL_TYPES": {
      "type": "array"
    },
    "$NUM_RESULTS": {
      "type": "number"
    }
  }
*/
export const INITIAL_USER_PROMPT =
  "Create $NUM_RESULTS different daily meal plans comprised of $MEAL_TYPES \
with a total target calorie count of $CALORIES per meal plan. $INGREDIENTS \
The answer should be in the expected JSON format.";
