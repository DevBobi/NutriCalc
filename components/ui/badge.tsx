import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium transition-all",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary/10 text-primary hover:bg-primary/20",
        secondary:
          "border-transparent bg-secondary/10 text-secondary hover:bg-secondary/20",
        success:
          "border-transparent bg-success/10 text-success hover:bg-success/20",
        error:
          "border-transparent bg-error/10 text-error hover:bg-error/20",
        warning:
          "border-transparent bg-warning/10 text-warning hover:bg-warning/20",
        outline: "text-text-secondary border-border",
        protein: "border-transparent bg-nutrient-protein/10 text-nutrient-protein hover:bg-nutrient-protein/20",
        carbs: "border-transparent bg-nutrient-carbs/10 text-nutrient-carbs hover:bg-nutrient-carbs/20",
        fat: "border-transparent bg-nutrient-fat/10 text-nutrient-fat hover:bg-nutrient-fat/20",
        fiber: "border-transparent bg-nutrient-fiber/10 text-nutrient-fiber hover:bg-nutrient-fiber/20",
        sugar: "border-transparent bg-nutrient-sugar/10 text-nutrient-sugar hover:bg-nutrient-sugar/20",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }

