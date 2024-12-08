import { cva, VariantProps } from "class-variance-authority";
import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

const sectionVariants = cva(
  'grow max-w-screen-lg sm:px-8 flex flex-col items-center',
  {
    variants: {},
    defaultVariants: {}
  }
);

interface SectionProps extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof sectionVariants> {
  outerClassname?: string;
}

const Section: React.FC<SectionProps> = ({ className, outerClassname, children }) => (
  <section className={twMerge('flex justify-center', outerClassname)}>
    <div className={twMerge(sectionVariants(), className)}>
      {children}
    </div>
  </section >
);

export default Section;
