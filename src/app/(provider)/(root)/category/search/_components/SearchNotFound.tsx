import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

const SearchNotFound = () => {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className="flex justify-center items-center h-full flex-col">
      <span>검색 결과가 없습니다.</span>
      <Button onClick={handleGoBack}>뒤로가기</Button>
    </div>
  );
};

export default SearchNotFound;
