"use client";

import Link from "next/link";

import { Cpu } from "lucide-react";
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
    <header className="bg-background fixed top-0 right-0 left-0 z-50 flex w-screen items-center justify-between px-4 py-2">
      <div className="w-16">
        <Link href="/">
          <div className="bg-primary flex h-10 w-10 items-center justify-center rounded-full">
            <Cpu className="h-6 w-6 text-white" />
          </div>
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
