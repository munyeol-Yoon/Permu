import { InputHTMLAttributes, forwardRef, useId } from 'react';
import { Input } from '../ui/input';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  type?: string;
  label?: string | null;
  className?: string | null;
  placeholder?: string;
};

// 일반적으로 쓰는 Input 안에 border 다 있는거 className 안넣으면 기본 shadcn스타일인 input이 나옴니다
export const DefaultInput = forwardRef<HTMLInputElement, InputProps>(
  ({ type = 'text', label, className = 'input-default', placeholder, ...props }, ref) => {
    const id = useId();
    return (
      <>
        {label && <label htmlFor={id}>{label}</label>}
        <Input type={type} id={id} className={className} placeholder={placeholder} ref={ref} {...props} />
      </>
    );
  }
);

DefaultInput.displayName = 'DefaultInput';
