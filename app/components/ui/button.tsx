import { VariantProps, cva } from 'class-variance-authority';
import { ButtonHTMLAttributes, forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

const buttonVariants = cva(
  'border border-theme-dark-gray px-3 py-1 rounded-md hover:bg-theme-light-gray',
  {
    variants: {},
    defaultVariants: {}
  }
)

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> { }

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ className, ...props }, ref) => (
  <button className={twMerge(buttonVariants(), className)} ref={ref} {...props} />
));

Button.displayName = 'Button';

export { Button, buttonVariants };

