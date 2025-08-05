"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Plus, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import GeneratingMealsLoading from "~/components/loading/generating-meals-loading";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Checkbox } from "~/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import {
  MEAL_GENERATOR_FORM_SCHEMA,
  type MealGeneratorFormData,
} from "~/lib/constants/meals";
import { api } from "~/trpc/react";

export default function NewMealFormPage() {
  const router = useRouter();
  const [currentIngredient, setCurrentIngredient] = useState("");

  const generateMeal = api.meals.generateMeals.useMutation({
    onSuccess: (data) => {
      console.log("data???", data);
      // const result = data?.choices?.[0]?.message?.content ?? "";
      console.log("result???", JSON.parse(data ?? ""));
    },
    onError: (error) => {
      console.log("error???", error);
    },
  });

  const form = useForm<MealGeneratorFormData>({
    resolver: zodResolver(MEAL_GENERATOR_FORM_SCHEMA),
    defaultValues: {
      ingredients: [],
      calories: 2000,
      mealTypes: ["breakfast", "lunch", "dinner"],
      numResults: 5,
    },
  });

  const addIngredient = () => {
    if (
      currentIngredient.trim() &&
      !form.getValues("ingredients").includes(currentIngredient.trim())
    ) {
      form.setValue("ingredients", [
        ...form.getValues("ingredients"),
        currentIngredient.trim(),
      ]);
      setCurrentIngredient("");
    }
  };

  const removeIngredient = (ingredient: string) => {
    form.setValue(
      "ingredients",
      form.getValues("ingredients").filter((i) => i !== ingredient),
    );
  };

  const onSubmit = (data: MealGeneratorFormData) => {
    // Generate mock meal data and navigate to meals page
    // const mockMeals = Array.from({ length: data.numResults }, (_, i) => ({
    //   id: i + 1,
    //   name: `Meal Plan ${i + 1}`,
    //   meals: data.mealTypes
    //     .slice(0, Math.floor(Math.random() * 3) + 1)
    //     .map((type) => ({
    //       type,
    //       name: `${type.charAt(0).toUpperCase() + type.slice(1)} Dish ${i + 1}`,
    //     })),
    // }));
    // TODO replace with actual api call, wait for response of meal plan id and navigate to it
    // sessionStorage.setItem("mealPlans", JSON.stringify(mockMeals));
    // router.push("/meal-generator/test12345");
    generateMeal.mutate(data);
  };

  if (generateMeal.isPending) {
    return <GeneratingMealsLoading />;
  }

  return (
    <div className="container mx-auto px-4 py-4">
      <Link
        href="/"
        className="text-primary hover:text-primary/80 mb-8 inline-flex items-center transition-colors"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Home
      </Link>

      <Card className="shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl">Create Your Meal Plan</CardTitle>
          <CardDescription className="text-lg">
            Tell us about your ingredients and preferences
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Ingredients Section */}
              <FormField
                control={form.control}
                name="ingredients"
                render={() => (
                  <FormItem>
                    <FormLabel className="text-lg font-semibold">
                      Ingredients
                    </FormLabel>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Enter an ingredient..."
                        value={currentIngredient}
                        onChange={(e) => setCurrentIngredient(e.target.value)}
                        onKeyDown={(e) =>
                          e.key === "Enter" &&
                          (e.preventDefault(), addIngredient())
                        }
                        className="flex-1"
                      />
                      <Button type="button" onClick={addIngredient} size="icon">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex min-h-[50px] flex-wrap gap-2 rounded-lg border bg-[#383B45]/5 p-3">
                      {form.getValues("ingredients").length === 0 ? (
                        <span className="text-[#383B45]/50">
                          No ingredients added yet...
                        </span>
                      ) : (
                        form.getValues("ingredients").map((ingredient) => (
                          <Badge
                            key={ingredient}
                            variant="secondary"
                            className="px-3 py-1"
                          >
                            {ingredient}
                            <button
                              type="button"
                              onClick={() => removeIngredient(ingredient)}
                              className="ml-2 hover:text-red-600"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </Badge>
                        ))
                      )}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Calories Section */}
              <FormField
                control={form.control}
                name="calories"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-semibold">
                      Target Calories
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="500"
                        max="5000"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        className="text-lg"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Meal Types Section */}
              <FormField
                control={form.control}
                name="mealTypes"
                render={() => (
                  <FormItem>
                    <FormLabel className="text-lg font-semibold">
                      Meal Types
                    </FormLabel>
                    <div className="grid grid-cols-2 gap-4">
                      {["breakfast", "lunch", "dinner", "snack"].map(
                        (mealType) => (
                          <FormField
                            key={mealType}
                            control={form.control}
                            name="mealTypes"
                            render={({ field }) => (
                              <FormItem
                                key={mealType}
                                className="flex items-center space-x-3"
                              >
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(mealType)}
                                    onCheckedChange={(checked) => {
                                      const updatedValue = checked
                                        ? [...field.value, mealType]
                                        : field.value?.filter(
                                            (value) => value !== mealType,
                                          );
                                      field.onChange(updatedValue);
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="cursor-pointer text-sm font-medium capitalize">
                                  {mealType}
                                </FormLabel>
                              </FormItem>
                            )}
                          />
                        ),
                      )}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Number of Results */}
              <FormField
                control={form.control}
                name="numResults"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-semibold">
                      Number of Results
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="2"
                        max="15"
                        {...field}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          field.onChange(Number(e.target.value))
                        }
                        className="text-lg"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="bg-primary hover:bg-primary/90 w-full py-3 text-lg"
              >
                Generate Meal Plans
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
