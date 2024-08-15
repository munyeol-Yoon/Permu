'use client';

import { PropsWithChildren } from 'react';

const ResultLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <div>{children}</div>
    </>
  );
};

export default ResultLayout;
