import { cva, VariantProps } from "class-variance-authority";
import { forwardRef, HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

export const containerVariants = cva(
  'flex flex-col items-start bg-white sm:rounded-lg shadow-lg p-4 gap-y-2',
  {
    variants: {},
    defaultVariants: {}
  }
);

interface ContainerProps extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof containerVariants> { }

const Container = forwardRef<HTMLDivElement, ContainerProps>(({ className, ...props }, ref) => (
  <div className={twMerge(containerVariants(), className)} ref={ref} {...props} />
));

Container.displayName = 'Container';

export default Container;
