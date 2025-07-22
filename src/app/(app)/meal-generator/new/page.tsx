"use client";

import { ArrowLeft, Plus, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
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
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

export default function MealFormPage() {
  const router = useRouter();
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [currentIngredient, setCurrentIngredient] = useState("");
  const [calories, setCalories] = useState("2000");
  const [mealTypes, setMealTypes] = useState<string[]>([
    "breakfast",
    "lunch",
    "dinner",
  ]);
  const [numResults, setNumResults] = useState("10");
  const [numServings, setNumServings] = useState("2");

  const addIngredient = () => {
    if (
      currentIngredient.trim() &&
      !ingredients.includes(currentIngredient.trim())
    ) {
      setIngredients([...ingredients, currentIngredient.trim()]);
      setCurrentIngredient("");
    }
  };

  const removeIngredient = (ingredient: string) => {
    setIngredients(ingredients.filter((i) => i !== ingredient));
  };

  const toggleMealType = (mealType: string) => {
    setMealTypes((prev) =>
      prev.includes(mealType)
        ? prev.filter((m) => m !== mealType)
        : [...prev, mealType],
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Generate mock meal data and navigate to meals page
    const mockMeals = Array.from({ length: parseInt(numResults) }, (_, i) => ({
      id: i + 1,
      name: `Meal Plan ${i + 1}`,
      meals: mealTypes
        .slice(0, Math.floor(Math.random() * 3) + 1)
        .map((type) => ({
          type,
          name: `${type.charAt(0).toUpperCase() + type.slice(1)} Dish ${i + 1}`,
        })),
    }));

    // Store in sessionStorage and navigate
    // TODO replace with actual api call, wait for response of meal plan id and navigate to it
    sessionStorage.setItem("mealPlans", JSON.stringify(mockMeals));
    router.push("/meal-generator/test12345");
  };

  return (
    <div className="container mx-auto px-4 py-4">
      <Link
        href="/"
        className="mb-8 inline-flex items-center text-[#39E98E] transition-colors hover:text-[#39E98E]/80"
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
        <CardContent className="space-y-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Ingredients Section */}
            <div className="space-y-4">
              <Label className="text-lg font-semibold">Ingredients</Label>
              <div className="flex gap-2">
                <Input
                  placeholder="Enter an ingredient..."
                  value={currentIngredient}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setCurrentIngredient(e.target.value)
                  }
                  onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
                    e.key === "Enter" && (e.preventDefault(), addIngredient())
                  }
                  className="flex-1"
                />
                <Button type="button" onClick={addIngredient} size="icon">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex min-h-[50px] flex-wrap gap-2 rounded-lg border bg-[#383B45]/5 p-3">
                {ingredients.length === 0 ? (
                  <span className="text-[#383B45]/50">
                    No ingredients added yet...
                  </span>
                ) : (
                  ingredients.map((ingredient) => (
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
            </div>

            {/* Calories Section */}
            <div className="space-y-2">
              <Label htmlFor="calories" className="text-lg font-semibold">
                Target Calories
              </Label>
              <Input
                id="calories"
                type="number"
                min="500"
                max="5000"
                value={calories}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setCalories(e.target.value)
                }
                className="text-lg"
              />
            </div>

            {/* Meal Types Section */}
            <div className="space-y-4">
              <Label className="text-lg font-semibold">Meal Types</Label>
              <div className="grid grid-cols-2 gap-4">
                {["breakfast", "lunch", "dinner", "snack"].map((mealType) => (
                  <div key={mealType} className="flex items-center space-x-3">
                    <Checkbox
                      id={mealType}
                      checked={mealTypes.includes(mealType)}
                      onCheckedChange={() => toggleMealType(mealType)}
                    />
                    <Label
                      htmlFor={mealType}
                      className="cursor-pointer text-sm leading-none font-medium capitalize peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {mealType}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Number of Results */}
            <div className="space-y-2">
              <Label htmlFor="numServings" className="text-lg font-semibold">
                Number of Servings
              </Label>
              <Input
                id="numServings"
                type="number"
                min="1"
                max="10"
                value={numServings}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setNumServings(e.target.value)
                }
                className="text-lg"
              />
            </div>

            {/* Number of Results */}
            <div className="space-y-2">
              <Label htmlFor="numResults" className="text-lg font-semibold">
                Number of Results
              </Label>
              <Input
                id="numResults"
                type="number"
                min="2"
                max="15"
                value={numResults}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setNumResults(e.target.value)
                }
                className="text-lg"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-[#39E98E] py-3 text-lg hover:bg-[#39E98E]/90"
              disabled={ingredients.length === 0 || mealTypes.length === 0}
            >
              Generate Meal Plans
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
