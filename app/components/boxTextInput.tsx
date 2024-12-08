import { cva } from 'class-variance-authority';
import { InputHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

export const boxTextInputVariants = cva(
  'bg-theme-light-gray/50 rounded w-52 px-2',
  {
    variants: {},
    defaultVariants: {}
  }
);

const BoxTextInput: React.FC<InputHTMLAttributes<HTMLInputElement>> = ({ className, ...props }) => (
  <input
    className={twMerge(boxTextInputVariants(), className)}
    {...props}
  />
);

export default BoxTextInput;
