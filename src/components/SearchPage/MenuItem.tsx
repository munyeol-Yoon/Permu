import { PropsWithChildren } from 'react';

function MenuItem({ children }: PropsWithChildren) {
  return <h3 className="pr-[10px]">{children}</h3>;
}

export default MenuItem;
