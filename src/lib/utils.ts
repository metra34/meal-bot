import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getMealTypeColor = (type: string) => {
  const colors = {
    breakfast: "bg-orange-100 text-orange-800",
    lunch: "bg-green-100 text-green-800",
    dinner: "bg-blue-100 text-blue-800",
    snack: "bg-purple-100 text-purple-800",
  };
  return colors[type as keyof typeof colors] || "bg-gray-100 text-gray-800";
};
