import { AuthProvider } from '@/contexts/auth.context/auth.context';
import QueryProvider from '@/providers/QueryProvider';

import { PropsWithChildren } from 'react';

const ProviderLayout = ({ children }: PropsWithChildren) => {
  return (
    <QueryProvider>
      <AuthProvider>{children}</AuthProvider>
    </QueryProvider>
  );
};

export default ProviderLayout;
