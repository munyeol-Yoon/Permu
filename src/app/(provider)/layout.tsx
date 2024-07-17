import { AuthProvider } from '@/contexts/auth.context/auth.context';
import QueryProvider from '@/query/QueryProvider';
import { PropsWithChildren } from 'react';

const ProviderLayout = ({ children }: PropsWithChildren) => {
  return (
    <QueryProvider>
      <AuthProvider>{children}</AuthProvider>
    </QueryProvider>
  );
};

export default ProviderLayout;
