"use client";

import { Users } from "lucide-react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export default function MealPlanCardSkeleton({
  index = 0,
}: {
  index?: number;
}) {
  return (
    <Card
      className={`transform gap-4 shadow-lg transition-all duration-500 hover:shadow-xl`}
      style={{
        transitionDelay: `${index * 100}ms`,
      }}
    >
      <CardHeader className="px-4">
        <div className="flex items-center justify-between">
          <Skeleton className="h-6 w-[150px]" /> {/* Title */}
          <Skeleton className="h-6 w-6 rounded-full" /> {/* Favorite button */}
        </div>
        <div className="flex items-center text-sm">
          <Users className="text-muted-foreground mr-1 h-4 w-4" />
          <Skeleton className="h-4 w-20" /> {/* Servings text */}
        </div>
      </CardHeader>
      <CardContent className="px-4">
        <div className="space-y-3">
          <Skeleton className="h-5 w-32" /> {/* "Included Meals" text */}
          <div className="space-y-2">
            {/* Generate 3 meal skeletons */}
            {[1, 2, 3].map((_, mealIndex) => (
              <div
                key={mealIndex}
                className={`px-0 py-3 transition-all duration-300`}
                style={{
                  transitionDelay: `${index * 100 + mealIndex * 50}ms`,
                }}
              >
                <div className="flex items-center justify-between">
                  <Skeleton className="h-5 w-5 rounded-full" />{" "}
                  {/* Favorite toggle */}
                  <Skeleton className="mx-3 h-5 flex-1" /> {/* Meal name */}
                  <div className="flex flex-col items-center gap-1.5">
                    <Skeleton className="h-5 w-16" /> {/* Meal type badge */}
                    <Skeleton className="h-5 w-16" /> {/* Calories badge */}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 pt-2">
          <Skeleton className="h-10 w-full" /> {/* View Details button */}
        </div>
      </CardContent>
    </Card>
  );
}
