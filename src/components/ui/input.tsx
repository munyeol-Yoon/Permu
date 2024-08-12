import { cn } from '@/utils/cn';
import { cva, VariantProps } from 'class-variance-authority';
import * as React from 'react';

const inputVariants = cva(
  'flex py-5 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200',
  {
    variants: {
      variant: {
        default: 'rounded border px-2.5 focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2',
        underline: 'border-b px-10 text-center mb-1 focus-visible:border-b-accent focus-visible:border-b-2'
      }
    },
    defaultVariants: {
      variant: 'default'
    }
  }
);

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement>, VariantProps<typeof inputVariants> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, variant, type, ...props }, ref) => {
  return <input type={type} className={cn(inputVariants({ variant }), className)} ref={ref} {...props} />;
});
Input.displayName = 'Input';

export { Input };
