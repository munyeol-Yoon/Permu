import { PropsWithChildren } from 'react';

function AuthLayout({ children }: PropsWithChildren) {
  return <div className="flex flex-col items-center h-full bg-blue-10 py-10 bg-blue-200">{children}</div>;
}

export default AuthLayout;
