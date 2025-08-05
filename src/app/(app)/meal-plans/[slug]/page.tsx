import MealPlansContent from "./meal-plans-content-page";

export default async function MealPlansPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return <MealPlansContent slug={slug} />;
}
