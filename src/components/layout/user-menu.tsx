"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { useSession } from "next-auth/react";
import { Button } from "../ui/button";

export function UserMenu() {
  const { data: session } = useSession();
  console.log("SESSION", session);

  return session?.user ? (
    <Avatar>
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
  ) : (
    <Button className="cursor-pointer" variant="ghost">Log In</Button>
  );
}
