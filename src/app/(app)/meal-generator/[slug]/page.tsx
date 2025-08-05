import MealPlansContent from "./meal-plans-content-page";

export default async function MealsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return <MealPlansContent slug={slug} />;
}
