'use client'; // Error components must be Client Components

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

const Error = ({ error }: { error: Error }) => {
  const router = useRouter();

  return (
    <div className="h-screen w-full bg-white">
      <div className="h-full flex flex-col items-center justify-center gap-y-6">
        <h2 className="font-bold text-xl">Something went wrong! </h2>
        <p>{error && error?.message}</p>
        <Button onClick={() => router.back()}> 뒤로 돌아가기</Button>
      </div>
    </div>
  );
};

export default Error;
