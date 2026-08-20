import { ButtonHTMLAttributes, forwardRef } from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost';
  fullWidth?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', fullWidth, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-sm px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0D3B1A] disabled:pointer-events-none disabled:opacity-50",
          {
            "bg-[#0D3B1A] text-white hover:opacity-90": variant === 'primary',
            "border border-[#0D3B1A] bg-transparent hover:bg-[#0D3B1A] hover:text-white text-[#0D3B1A]": variant === 'outline',
            "hover:bg-[#0D3B1A] hover:text-white text-gray-700": variant === 'ghost',
            "w-full": fullWidth,
          },
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';
