import { VariantProps, cva } from 'class-variance-authority';
import Link from 'next/link';
import { AnchorHTMLAttributes, forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

const anchorVariants = cva(
  'hover:underline',
  {
    variants: {},
    defaultVariants: {}
  }
);

interface AnchorProps extends AnchorHTMLAttributes<HTMLAnchorElement>, VariantProps<typeof anchorVariants> {
  href: string;
}

const A = forwardRef<HTMLAnchorElement, AnchorProps>(({ className, href, children, ...props }, ref) => {
  return (
    <Link
      ref={ref}
      href={String(href)}
      className={twMerge(anchorVariants({}), className)}
      {...props}
    >
      {children}
    </Link>
  )
});

A.displayName = "Anchor";

export { A, anchorVariants };
