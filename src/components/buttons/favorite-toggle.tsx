"use client";

import { Heart } from "lucide-react";
import { useState } from "react";
import { Toggle } from "~/components/ui/toggle";

export function FavoriteToggle({
  size = "md",
  pressed,
  onPressedChange = () => null,
}: {
  size?: "sm" | "md";
  pressed: boolean;
  onPressedChange: (pressed: boolean) => void;
}) {
  const [isAnimating, setIsAnimating] = useState(false);

  const handlePress = () => {
    setIsAnimating(true);
    onPressedChange(!pressed);
    setTimeout(() => setIsAnimating(false), 250);
  };

  return (
    <Toggle
      className={`size-${size === "sm" ? "6" : "8"}`}
      aria-label="Toggle"
      pressed={pressed}
      onPressedChange={handlePress}
    >
      <Heart
        strokeWidth={3}
        className={`size-${size === "sm" ? "5" : "7"} ${pressed ? "fill-red-500 text-red-500" : "text-gray-400"} ${isAnimating ? "animate-ping duration-250" : ""}`}
      />
    </Toggle>
  );
}
