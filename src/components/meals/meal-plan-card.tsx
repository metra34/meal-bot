"use client";

import type { Meal } from "@prisma/client";
import { ReceiptText, Users } from "lucide-react";
import { getMealTypeColor } from "~/lib/utils";
import type { MealPlanWithMeals } from "~/types";
import { FavoriteToggle } from "../buttons/favorite-toggle";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { api } from "~/trpc/react";

export default function MealPlanCard({
  index = 0,
  mealPlan,
}: {
  index?: number;
  mealPlan: MealPlanWithMeals;
}) {
  const utils = api.useUtils();

  const { data: favoriteMealIds = [] } =
    api.favorites.getFavoriteMealIds.useQuery();

  const toggleFavoriteMealMutation =
    api.favorites.toggleMealFavorite.useMutation({
      onMutate: async (mealId) => {
        // Cancel outgoing refetches to avoid overwriting optimistic update
        await utils.favorites.getFavoriteMealIds.cancel();

        // Save previous state
        const previousFavorites = utils.favorites.getFavoriteMealIds.getData();

        // Optimistically update favorites
        utils.favorites.getFavoriteMealIds.setData(undefined, (old = []) => {
          if (old.includes(mealId)) {
            return old.filter((id) => id !== mealId);
          } else {
            return [...old, mealId];
          }
        });

        // Return previous state for rollback
        return { previousFavorites };
      },
      onError: (err, mealId, context) => {
        // Rollback on error
        utils.favorites.getFavoriteMealIds.setData(
          undefined,
          context?.previousFavorites,
        );
      },
      onSettled: () => {
        // Refetch to ensure sync with server
        void utils.favorites.getFavoriteMealIds.invalidate();
      },
    });

  const toggleFavoriteMeal = (mealId: string) => {
    toggleFavoriteMealMutation.mutate(mealId);
  };

  return (
    <Card
      key={mealPlan.id}
      className={`transform gap-4 shadow-lg transition-all duration-500 hover:shadow-xl`}
      style={{
        transitionDelay: `${index * 100}ms`,
      }}
    >
      <CardHeader className="px-4">
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
      <CardContent className="px-4">
        <div className="space-y-3">
          <h4 className="font-semibold text-[#383B45]">Included Meals:</h4>
          <div className="space-y-2">
            {mealPlan.meals.map((meal: Meal, mealIndex: number) => (
              <div
                key={mealIndex}
                className={`px-0 py-3 transition-all duration-300`}
                style={{
                  transitionDelay: `${index * 100 + mealIndex * 50}ms`,
                }}
              >
                <div className="flex items-center justify-between">
                  <FavoriteToggle
                    size="sm"
                    pressed={favoriteMealIds.includes(meal.id)}
                    onPressedChange={() => toggleFavoriteMeal(meal.id)}
                  />
                  <div className="flex-1 font-medium text-[#383B45]">
                    {meal.name}
                  </div>
                  <div className="flex flex-col items-center gap-1.5">
                    <Badge className={getMealTypeColor(meal.type)}>
                      {meal.type}
                    </Badge>
                    <Badge className={getMealTypeColor(meal.type)}>
                      {meal.calories} cal
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 pt-2">
          <Button
            className="bg-primary hover:bg-primary/90 w-full"
            onClick={() => alert(`View Details: ${mealPlan.name}`)}
          >
            <ReceiptText />
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
