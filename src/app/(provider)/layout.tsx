import QueryProvider from '@/providers/QueryProvider';

import { PropsWithChildren } from 'react';

const ProviderLayout = ({ children }: PropsWithChildren) => {
  return <QueryProvider>{children}</QueryProvider>;
};

export default ProviderLayout;
