import { cn } from '@/utils/cn';
import { cva, VariantProps } from 'class-variance-authority';
import { PropsWithChildren } from 'react';

const skeletonVariants = cva('animate-pulse rounded-md bg-muted', {
  variants: {
    size: {
      rect: 'h-[100px] w-[140px]',
      square: 'h-[180px] w-[180px]',
      lng: 'h-3 w-44',
      md: 'h-3 w-32'
    }
  },
  defaultVariants: {
    size: 'square'
  }
});

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof skeletonVariants> {}

const Skeleton = ({ className, size, ...props }: PropsWithChildren<SkeletonProps>) => {
  return <div className={cn(skeletonVariants({ size }), className)} {...props} />;
};

export { Skeleton };
