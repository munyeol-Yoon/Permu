import { PropsWithChildren } from 'react';

function MenuItem({ children }: PropsWithChildren) {
  return <h3 className="pr-[40px]">{children}</h3>;
}

export default MenuItem;
