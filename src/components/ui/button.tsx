import { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "success" | "destructive";
}

export function Button({ variant = "success", className, ...props }: ButtonProps) {
  const baseClasses = "px-4 py-2 rounded-md font-semibold focus:outline-none";
  const variantClasses =
    variant === "success"
      ? "bg-blue-500 text-white hover:bg-blue-600"
      : "bg-red-500 text-white hover:bg-red-600";

  return <button className={cn(baseClasses, variantClasses, className)} {...props} />;
}
