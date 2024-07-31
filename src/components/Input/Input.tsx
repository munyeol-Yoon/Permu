import { InputHTMLAttributes, forwardRef, useId } from 'react';
import { Input } from '../ui/input';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  type?: string;
  label?: string | null;
  className?: string | null;
  placeholder?: string;
};

// 일반적으로 쓰는 Input 안에 border 다 있는거
export const DefaultInput = forwardRef<HTMLInputElement, InputProps>(
  ({ type = 'text', label, className, placeholder, ...props }, ref) => {
    const id = useId();
    return (
      <>
        {label && <label htmlFor={id}>{label}</label>}
        <Input
          type={type}
          id={id}
          className={'bg-background border border-input' + className}
          placeholder={placeholder}
          ref={ref}
          {...props}
        />
      </>
    );
  }
);

// Search할 때 쓰는 Input 배경색은 그레이임
export const SearchInput = forwardRef<HTMLInputElement, InputProps>(
  ({ type = 'text', label, className, placeholder, ...props }, ref) => {
    const id = useId();
    return (
      <>
        {label && <label htmlFor={id}>{label}</label>}
        <Input
          type={type}
          id={id}
          className={'bg-gray-500 border-none' + className}
          placeholder={placeholder}
          ref={ref}
          {...props}
        />
      </>
    );
  }
);

// BorderInput 밑에만 border있는거
export const BorderInput = forwardRef<HTMLInputElement, InputProps>(
  ({ type = 'text', label, className, placeholder, ...props }, ref) => {
    const id = useId();
    return (
      <div className="w-full flex gap-[30px] items-center">
        {label && (
          <label className="w-1/4" htmlFor={id}>
            {label}
          </label>
        )}
        <Input
          type={type}
          id={id}
          className={'border-b-[1.5px] px-[40px] py-[20px] grow' + className}
          placeholder={placeholder}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);

DefaultInput.displayName = 'DefaultInput';
SearchInput.displayName = 'SearchInput';
BorderInput.displayName = 'BorderInput';
