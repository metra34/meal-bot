"use client";

import type { UserPrompt } from "@prisma/client";
import { skipToken } from "@tanstack/react-query";
import { ArrowLeft, RefreshCw } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import GeneratingMealsLoading from "~/components/loading/generating-meals-loading";
import MealPlanCard from "~/components/meals/meal-plan-card";
import { Button } from "~/components/ui/button";
import { api } from "~/trpc/react";

export default function MealPlansContent({ slug }: { slug: string }) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data: session, status } = useSession();
  const isLoggedIn = status === "authenticated";

  const router = useRouter();

  const { data: mealPlans = [], isPending: isPendingMealPlans } =
    api.meals.getMealPlansByPromptId.useQuery(isLoggedIn ? slug : skipToken);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const regenerateMealPlansMutation = api.meals.regenerateMealPlans.useMutation(
    {
      onSuccess: (data: UserPrompt) => {
        console.log("data", data);
        router.push(`/meal-generator/${data.id}`);
      },
      onError: (error) => {
        console.error("error", error);
        toast.error(error.message);
      },
      onSettled: () => {
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      },
    },
  );

  const regenerateMealPlans = () => {
    setIsLoading(true);
    regenerateMealPlansMutation.mutate(slug);
  };

  if (isLoading) {
    return <GeneratingMealsLoading />;
  }

  return (
    <div className="px-4 py-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-center justify-between">
          <Link
            href="/meal-generator/new"
            className="text-primary hover:text-primary/80 inline-flex items-center transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Form
          </Link>

          <Button
            onClick={regenerateMealPlans}
            variant="outline"
            className="flex items-center gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Regenerate
          </Button>
        </div>

        <div className="mb-12 text-center">
          <h1 className="text-primary-foreground mb-4 text-4xl font-bold">
            Your Meal Plans
          </h1>
          <p className="text-primary-foreground/70 text-xl">
            Found {mealPlans.length} personalized meal plans for you
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {mealPlans.map((plan, index) => (
            <MealPlanCard key={plan.id} mealPlan={plan} index={index} />
          ))}
        </div>

        {!isPendingMealPlans && mealPlans.length === 0 && (
          <div className="py-12 text-center">
            <h3 className="text-primary-foreground mb-2 text-xl font-semibold">
              No meal plans found
            </h3>
            <p className="text-primary-foreground/70 mb-4">
              Try going back to the form and adjusting your preferences.
            </p>
            <Link href="/meal-generator/new">
              <Button>Create New Meal Plan</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
