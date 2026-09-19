import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#171717]/20 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.97]",
          {
            "bg-[#171717] text-white hover:bg-[#171717]/90": variant === "default",
            "border border-zinc-200 bg-white text-[#171717] hover:bg-zinc-50": variant === "outline",
            "text-[#171717] hover:bg-zinc-100": variant === "ghost",
          },
          {
            "h-10 px-4 py-2": size === "default",
            "h-8 px-3 text-xs": size === "sm",
            "h-12 px-6 text-base": size === "lg",
          },
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button };
export default Button;
