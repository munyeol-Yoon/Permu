import { PropsWithChildren } from 'react';

function AuthLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-col h-full py-10">
      <div className=" w-full flex flex-col grow">{children}</div>
    </div>
  );
}

export default AuthLayout;
