import { InputHTMLAttributes, forwardRef, useId } from 'react';
import { Input } from '../ui/input';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  type?: string;
  label?: string | null;
  className?: string | null;
  placeholder?: string;
  variant?: 'default' | 'underline';
};

const DefaultInput = forwardRef<HTMLInputElement, InputProps>(
  ({ type = 'text', label, variant = 'default', className, placeholder, ...props }, ref) => {
    const id = useId();
    return (
      <>
        {label && <label htmlFor={id}>{label}</label>}
        <Input
          type={type}
          id={id}
          variant={variant}
          className={className}
          placeholder={placeholder}
          ref={ref}
          {...props}
        />
      </>
    );
  }
);

DefaultInput.displayName = 'DefaultInput';

export default DefaultInput;
