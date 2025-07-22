"use client";

import { ArrowLeft, Clock, RefreshCw, Users } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

interface Meal {
  type: string;
  name: string;
}

interface MealPlan {
  id: number;
  name: string;
  meals: Meal[];
}

export default function MealsPage() {
  const [mealPlans, setMealPlans] = useState<MealPlan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [animateCards, setAnimateCards] = useState(false);

  useEffect(() => {
    // Simulate loading and get data from sessionStorage
    const timer = setTimeout(() => {
      const storedMeals: string | null = sessionStorage.getItem("mealPlans");
      if (storedMeals) {
        const parsedMeals = JSON.parse(storedMeals) as MealPlan[];
        setMealPlans(parsedMeals);
      }
      setIsLoading(false);

      // Trigger animation after loading
      setTimeout(() => setAnimateCards(true), 100);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const regenerateMeals = () => {
    setIsLoading(true);
    setAnimateCards(false);

    setTimeout(() => {
      // Generate new mock data
      const newMeals = mealPlans.map((plan, i) => ({
        ...plan,
        name: `Updated Meal Plan ${i + 1}`,
        meals: ["breakfast", "lunch", "dinner", "snack"]
          .slice(0, Math.floor(Math.random() * 3) + 1)
          .map((type) => ({
            type,
            name: `New ${type.charAt(0).toUpperCase() + type.slice(1)} Dish ${i + 1}`,
          })),
      }));

      setMealPlans(newMeals);
      sessionStorage.setItem("mealPlans", JSON.stringify(newMeals));
      setIsLoading(false);

      setTimeout(() => setAnimateCards(true), 100);
    }, 1000);
  };

  const getMealTypeColor = (type: string) => {
    const colors = {
      breakfast: "bg-orange-100 text-orange-800",
      lunch: "bg-green-100 text-green-800",
      dinner: "bg-blue-100 text-blue-800",
      snack: "bg-purple-100 text-purple-800",
    };
    return colors[type as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  // TODO: make sure to navigate to new slug on successful regenerate
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <RefreshCw className="mx-auto mb-4 h-12 w-12 animate-spin text-[#39E98E]" />
          <h2 className="mb-2 text-2xl font-semibold text-primary-foreground">
            Generating Your Meal Plans
          </h2>
          <p className="text-primary-foreground/70">This will just take a moment...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-center justify-between">
          <Link
            href="/form"
            className="inline-flex items-center text-[#39E98E] transition-colors hover:text-[#39E98E]/80"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Form
          </Link>

          <Button
            onClick={regenerateMeals}
            variant="outline"
            className="flex items-center gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Regenerate
          </Button>
        </div>

        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-primary-foreground">
            Your Meal Plans
          </h1>
          <p className="text-xl text-primary-foreground/70">
            Found {mealPlans.length} personalized meal plans for you
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {mealPlans.map((plan, index) => (
            <Card
              key={plan.id}
              className={`transform shadow-lg transition-all duration-500 hover:shadow-xl ${
                animateCards
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0"
              }`}
              style={{
                transitionDelay: `${index * 100}ms`,
              }}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{plan.name}</CardTitle>
                  <div className="flex items-center text-sm text-[#383B45]/60">
                    <Users className="mr-1 h-4 w-4" />1 serving
                  </div>
                </div>
                <CardDescription className="flex items-center text-sm">
                  <Clock className="mr-1 h-4 w-4" />
                  Ready in 30-45 mins
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <h4 className="font-semibold text-[#383B45]">
                    Included Meals:
                  </h4>
                  <div className="space-y-2">
                    {plan.meals.map((meal, mealIndex) => (
                      <div
                        key={mealIndex}
                        className={`rounded-lg border p-3 transition-all duration-300 ${
                          animateCards
                            ? "translate-x-0 opacity-100"
                            : "translate-x-4 opacity-0"
                        }`}
                        style={{
                          transitionDelay: `${index * 100 + mealIndex * 50}ms`,
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-[#383B45]">
                            {meal.name}
                          </span>
                          <Badge className={getMealTypeColor(meal.type)}>
                            {meal.type}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 border-t pt-4">
                  <Button
                    className="w-full bg-[#39E98E] hover:bg-[#39E98E]/90"
                    onClick={() => alert(`Starting meal plan: ${plan.name}`)}
                  >
                    Start This Plan
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {mealPlans.length === 0 && (
          <div className="py-12 text-center">
            <h3 className="mb-2 text-xl font-semibold text-[#383B45]">
              No meal plans found
            </h3>
            <p className="mb-4 text-[#383B45]/70">
              Try going back to the form and adjusting your preferences.
            </p>
            <Link href="/form">
              <Button>Create New Meal Plan</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
