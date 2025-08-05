import MealPlanDetailsContentPage from "./meal-plan-details-content-page";

export default async function MealPlanDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return <MealPlanDetailsContentPage slug={slug} />;
}
