import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  size?: "default" | "wide" | "narrow";
}

export function Container({
  children,
  className,
  size = "default",
}: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto px-6",
        {
          "max-w-7xl": size === "default",
          "max-w-screen-2xl": size === "wide",
          "max-w-4xl": size === "narrow",
        },
        className
      )}
    >
      {children}
    </div>
  );
}
