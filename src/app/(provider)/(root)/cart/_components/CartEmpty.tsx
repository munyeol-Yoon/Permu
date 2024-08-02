import { Button } from '@/components/ui/button';

const CartEmpty = () => {
  return (
    <div className="h-full flex flex-col gap-9 items-center justify-center">
      <svg xmlns="http://www.w3.org/2000/svg" width="79" height="91" viewBox="0 0 79 91" fill="none">
        <path
          d="M23.2894 26.6123V17.3265C23.2894 8.30965 30.5469 1 39.4998 1C48.4526 1 55.7104 8.30965 55.7104 17.3265V26.6123M6 20.6123H72L78 90H1L6 20.6123Z"
          stroke="#B3B3B3"
        />
      </svg>
      <div className="text-center text-xl text-[#B3B3B3]">
        <p>장바구니에 상품이 없습니다.</p>
        <p>상품을 추가해보세요.</p>
      </div>
      <Button>좋아요한 상품 보러 가기</Button>
    </div>
  );
};

export default CartEmpty;