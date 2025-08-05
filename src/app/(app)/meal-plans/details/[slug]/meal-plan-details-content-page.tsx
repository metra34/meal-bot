"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Badge } from "~/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { getMealTypeColor } from "~/lib/utils";
import { api } from "~/trpc/react";

export default function MealPlanDetailsContentPage({ slug }: { slug: string }) {
  console.log("slug", slug);

  const { data: mealPlan, isPending: isPendingMealPlan } =
    api.meals.getMealPlanById.useQuery(slug);

  if (!mealPlan) {
    return <div>Meal plan not found</div>;
  }

  return (
    <div className="px-4 py-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-start justify-between">
          <Link
            href={`/meal-plans/${mealPlan?.userPromptId}`}
            className="text-primary hover:text-primary/80 inline-flex items-center transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Plans
          </Link>
        </div>

        <div className="mb-12 text-center">
          <h1 className="text-primary-foreground mb-4 text-4xl font-bold">
            {mealPlan.name}
          </h1>
          <p className="text-primary-foreground/70 text-xl">
            Created on {new Date(mealPlan.createdAt).toLocaleDateString('en-CA')}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-6">
            {/* Summary Stats */}
            {/* <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              <div className="bg-muted flex items-center gap-2 rounded-lg p-4">
                <UtensilsCrossed className="h-5 w-5" />
                <div>
                  <div className="text-muted-foreground text-sm">
                    Total Meals
                  </div>
                  <div className="font-semibold">{mealPlan?.meals?.length}</div>
                </div>
              </div>
              <div className="bg-muted flex items-center gap-2 rounded-lg p-4">
                <Scale className="h-5 w-5" />
                <div>
                  <div className="text-muted-foreground text-sm">
                    Total Calories
                  </div>
                  <div className="font-semibold">
                    {mealPlan?.meals?.reduce(
                      (acc, meal) => acc + meal.calories,
                      0,
                    )}
                  </div>
                </div>
              </div>
            </div> */}

            {/* Detailed Meal List */}
            <div className="space-y-4">
              {mealPlan?.meals?.map((meal) => (
                <div key={meal.id} className="rounded-lg border p-3">
                  <div className="mb-2 flex items-start justify-between">
                    <h3 className="font-semibold">{meal.name}</h3>
                    <Badge className={getMealTypeColor(meal.type)}>{meal.type}</Badge>
                  </div>
                  <p className="text-primary-foreground/70 mb-2 text-sm">
                    {meal.description}
                  </p>
                  <div className="flex gap-2 text-sm">
                    <div>{meal.calories} calories</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <Tabs defaultValue="ingredients" className="space-y-4">
              <TabsList>
                <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
                <TabsTrigger value="instructions">Instructions</TabsTrigger>
                <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
              </TabsList>

              <TabsContent value="ingredients"></TabsContent>

              <TabsContent value="instructions">
                <div className="space-y-6">
                  {mealPlan?.meals?.map((meal) => (
                    <div key={meal.id} className="space-y-4">
                      <h3 className="text-lg font-semibold">{meal.name}</h3>
                      <div className="space-y-2">
                        <h4 className="font-medium">Ingredients:</h4>
                        <ul className="list-disc pl-5">
                          {/* {meal.ingredients?.map((ingredient, i) => (
                      <li key={i}>{ingredient}</li>
                    ))} */}
                        </ul>
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-medium">Steps:</h4>
                        <ol className="list-decimal pl-5">
                          {/* {meal.instructions?.map((step, i) => (
                      <li key={i} className="mb-2">
                        {step}
                      </li>
                    ))} */}
                        </ol>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="nutrition">
                {/* Add detailed nutrition information */}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
