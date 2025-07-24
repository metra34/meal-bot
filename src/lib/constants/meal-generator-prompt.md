Create $NUM_RESULTS different daily meal plans comprised of $MEAL_TYPES with a total daily calorie count as close to $CALORIES as possible. Return the results as a JSON array of meal plan objects, each with the following properties:
[{
name: The name of the meal plan
meals: An array of meal objects, each with the following properties: {
type: The type of meal (breakfast, lunch, dinner, snack)
name: The name of the meal,
calories: The total calorie count for the meal per person
}
}]
