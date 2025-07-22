import Link from "next/link";
import Image from "next/image";
import { Button } from "~/components/ui/button";

export default async function Home() {
  return (
    <div className="flex flex-col items-center justify-center gap-16 px-4 py-16">
      <Image
        src="/logos/mealbot-logo.png"
        alt="MealBot Logo"
        width={400}
        height={400}
        priority
      />

      <div className="flex gap-4">
        <Button asChild size="lg">
          <Link href="/get-started">Get Started</Link>
        </Button>

        <Button asChild variant="outline" size="lg">
          <Link href="/api/auth/signin">Sign In</Link>
        </Button>
      </div>
    </div>
  );
}
