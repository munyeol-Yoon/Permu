import Link from 'next/link';
import { ComponentProps } from 'react';

type ButtonProps = ({ href?: undefined } & ComponentProps<'button'>) | ({ href: string } & ComponentProps<typeof Link>);

const Button = ({ children, ...props }: ButtonProps) => {
  if (props.href) {
    return <Link {...props}>{children}</Link>;
  } else if (typeof props.href === 'undefined') {
    return <button {...props}>{children}</button>;
  }
};

export default Button;
