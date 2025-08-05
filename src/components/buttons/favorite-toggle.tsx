"use client";

import { Heart } from "lucide-react";
import { Toggle } from "~/components/ui/toggle";

export function FavoriteToggle({
  pressed,
  onPressedChange = () => null,
}: {
  pressed: boolean;
  onPressedChange: (pressed: boolean) => void;
}) {
  return (
    <Toggle
      className="size-6 md:size-8"
      aria-label="Toggle"
      pressed={pressed}
      onPressedChange={() => onPressedChange(!pressed)}
    >
      <Heart
        strokeWidth={3}
        className={`size-5 md:size-7 ${pressed ? "fill-red-500 text-red-500" : "text-gray-400"}`}
      />
    </Toggle>
  );
}
