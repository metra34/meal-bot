"use client";

import type { Meal } from "@prisma/client";
import { Users } from "lucide-react";
import { getMealTypeColor } from "~/lib/utils";
import type { MealPlanWithMeals } from "~/types";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { FavoriteToggle } from "../buttons/favorite-toggle";

export default function MealPlanCard({
  index = 0,
  mealPlan,
}: {
  index?: number;
  mealPlan: MealPlanWithMeals;
}) {
  return (
    <Card
      key={mealPlan.id}
      className={`transform shadow-lg transition-all duration-500 hover:shadow-xl`}
      style={{
        transitionDelay: `${index * 100}ms`,
      }}
    >
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{mealPlan.name}</CardTitle>
          <div className="flex items-center text-sm text-[#383B45]/60">
            <FavoriteToggle pressed={false} onPressedChange={() => null} />
          </div>
        </div>
        <CardDescription className="flex items-center text-sm">
          <Users className="mr-1 h-4 w-4" />1 serving
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <h4 className="font-semibold text-[#383B45]">Included Meals:</h4>
          <div className="space-y-2">
            {mealPlan.meals.map((meal: Meal, mealIndex: number) => (
              <div
                key={mealIndex}
                className={`rounded-lg border p-3 transition-all duration-300`}
                style={{
                  transitionDelay: `${index * 100 + mealIndex * 50}ms`,
                }}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium text-[#383B45]">
                    {meal.name}
                  </span>
                  <span className="flex flex-col items-center gap-2">
                    <Badge className={getMealTypeColor(meal.type)}>
                      {meal.type}
                    </Badge>
                    <Badge className={getMealTypeColor(meal.type)}>
                      {meal.calories} cal
                    </Badge>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 border-t pt-4">
          <Button
            className="bg-primary hover:bg-primary/90 w-full"
            onClick={() => alert(`View Details: ${mealPlan.name}`)}
          >
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
