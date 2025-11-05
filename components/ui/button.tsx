import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-white shadow-soft hover:bg-primary-600 hover:shadow-soft-md active:scale-95",
        secondary:
          "bg-white dark:bg-dark-surface text-primary dark:text-primary border-2 border-primary dark:border-primary hover:bg-primary-50 dark:hover:bg-primary/20 active:scale-95",
        cta: "bg-gradient-secondary text-white shadow-soft-md hover:shadow-soft-lg hover:-translate-y-0.5 active:translate-y-0",
        outline:
          "border border-border dark:border-dark-border bg-transparent text-text-primary dark:text-dark-text hover:bg-primary-50 dark:hover:bg-primary/20 hover:text-primary dark:hover:text-primary",
        ghost: "text-text-primary dark:text-dark-text hover:bg-primary-50 dark:hover:bg-primary/20 hover:text-primary dark:hover:text-primary",
        link: "text-primary dark:text-primary underline-offset-4 hover:underline",
        success: "bg-success text-white shadow-soft hover:bg-success/90",
        warning: "bg-warning text-white shadow-soft hover:bg-warning/90",
        error: "bg-error text-white shadow-soft hover:bg-error/90",
      },
      size: {
        default: "h-11 px-6 py-3",
        sm: "h-9 px-4 py-2 text-xs",
        lg: "h-12 px-8 py-4 text-base",
        xl: "h-14 px-10 py-5 text-lg",
        icon: "h-10 w-10",
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

