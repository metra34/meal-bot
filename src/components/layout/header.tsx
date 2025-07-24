"use client";

import Link from "next/link";

import Image from "next/image";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "~/components/ui/navigation-menu";
import { UserMenu } from "./user-menu";

export function Header() {
  return (
    <header className="fixed top-0 right-0 left-0 z-50 flex w-screen items-center justify-between bg-background py-2 px-4">
      <div className="w-16">
        <Link href="/">
          <Image
            src="/logos/meal-logo-sm.png"
            alt="logo"
            width={40}
            height={40}
          />
        </Link>
      </div>
      <div>
        <NavigationMenu viewport={false}>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <Link href="/">Home</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <Link href="/meal-generator/new">Meal Generator</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>My Stuff</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[300px] gap-4">
                  <li>
                    <NavigationMenuLink asChild>
                      <Link href="/me/favorites">
                        <div className="font-medium">Favorites</div>
                        <div className="text-muted-foreground">
                          Your favorite meals, plans, and recipes.
                        </div>
                      </Link>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild>
                      <Link href="/me/history">
                        <div className="font-medium">History</div>
                        <div className="text-muted-foreground">
                          Review your generated meal history.
                        </div>
                      </Link>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild>
                      <Link href="/me/preferences">
                        <div className="font-medium">Preferences</div>
                        <div className="text-muted-foreground">
                          Customize your meal plan and recipe preferences.
                        </div>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      {/* RIGHT SIDE*/}
      <div className="inline-flex w-16 items-center justify-end">
        <UserMenu />
      </div>
    </header>
  );
}
