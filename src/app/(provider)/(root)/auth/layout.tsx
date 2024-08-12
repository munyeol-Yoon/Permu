import { PropsWithChildren } from 'react';

function AuthLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-col grow">{children}</div>
    </div>
  );
}

export default AuthLayout;
