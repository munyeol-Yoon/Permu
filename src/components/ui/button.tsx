import { cn } from '@/utils/cn';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-sm text-base font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:brightness-95 active:brightness-90',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground text-white hover:bg-black',
        accent: 'bg-accent text-primary-foreground text-white',
        outline: 'border border-primary bg-background hover:bg-accent hover:text-white',
        link: 'bg-white border ',
        disabled: 'bg-muted opacity-50 font-semibold pointer-events-none',
        defaultline: 'border border-gray-300 hover:text-accent-foreground hover:border-black',
        borderline: 'border border-primary bg-background',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        kakao: 'bg-kakao'
      },
      size: {
        default: 'h-10 p-5 my-2.5',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10'
      }
    },
    compoundVariants: [{ variant: 'outline', size: 'default', className: 'p-[18px]' }],
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
);
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';

    return (
      <Comp className={cn(buttonVariants({ variant, size }), className)} ref={ref} {...props}>
        <span className="z-10">{props.children}</span>
      </Comp>
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
