import { A } from "@/app/components/ui/anchor";
import { cva, VariantProps } from "class-variance-authority";
import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

const navVariants = cva(
  'w-full flex justify-between text-white md:text-4xl sm:text-3xl text-2xl px-4',
  {
    variants: {},
    defaultVariants: {}
  }
);

interface NavProps extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof navVariants> {
  page: 'home' | 'gallery' | 'contact';
}

const navLinkVariants = cva(
  'drop-shadow-lg',
  {
    variants: {
      state: {
        active: 'text-theme-gold underline',
        inactive: 'hover:text-theme-gold hover:underline',
      }
    },
    defaultVariants: {
      state: 'active'
    }
  }
);

const Nav: React.FC<NavProps> = ({ page, className, ...props }) => (
  <nav className={twMerge(navVariants({}), className)} {...props}>
    <A href="/" className={navLinkVariants({ state: page === 'home' ? 'active' : 'inactive' })}>Home</A>
    <A href="/gallery" className={navLinkVariants({ state: page === 'gallery' ? 'active' : 'inactive' })}>Gallery</A>
    <A href="/contact" className={navLinkVariants({ state: page === 'contact' ? 'active' : 'inactive' })}>Contact</A>
  </nav >
);

export default Nav;
