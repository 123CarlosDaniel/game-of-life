import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive:
          // "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
          "bg-red-500 text-red-200 shadow-sm hover:bg-red-600",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-indigo-500 text-indigo-foreground shadow-sm hover:bg-indigo-600",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        warning: "bg-yellow-500 text-yellow-800 shadow-sm hover:bg-yellow-600",
        warningOutline: "border border-yellow-500 text-yellow-500 hover:bg-yellow-100",
        success: "bg-green-500 text-green-100 shadow-sm hover:bg-green-600",
        successOutline: "border border-green-500 text-green-500 hover:bg-green-100",
        info: "bg-blue-500 text-white shadow-sm hover:bg-blue-600", // Azul
        infoOutline: "border border-blue-500 text-blue-500 hover:bg-blue-100",
        dark: "bg-gray-800 text-white shadow-sm hover:bg-gray-900", // Oscuro
        light: "bg-gray-100 text-gray-800 shadow-sm hover:bg-gray-200", // Claro
        teal: "bg-teal-500 text-white shadow-sm hover:bg-teal-600", // Teal
        purple: "bg-purple-500 text-white shadow-sm hover:bg-purple-600", // Púrpura
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
