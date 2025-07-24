"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { LogOut, Settings } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

export function UserMenu() {
  const { data: session } = useSession();
  return session?.user ? (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="transition-transform hover:scale-110 cursor-pointer">
          <AvatarImage
            className="rounded-full"
            width={40}
            height={40}
            src={session?.user?.image ?? ""}
          />
          <AvatarFallback>
            {session?.user?.name?.[0]?.toUpperCase() ?? ""}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuItem>
          <Settings />
          Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogOut />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : (
    <Button className="cursor-pointer" variant="ghost" asChild>
      <Link href="/api/auth/signin">Log In</Link>
    </Button>
  );
}
