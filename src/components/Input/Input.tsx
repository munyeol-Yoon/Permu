import { ComponentProps, useId } from 'react';

type InputProps = { label?: string } & ComponentProps<'input'>;
const Input = ({ label, id, ...props }: InputProps) => {
  const inputUid = useId();
  const inputId = id || inputUid;
  return (
    <div>
      {label && (
        <label htmlFor={inputId}>
          <span>{label}</span>
        </label>
      )}

      <input id={inputId} {...props} />
    </div>
  );
};

export default Input;
