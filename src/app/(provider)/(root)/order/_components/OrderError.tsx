import Navbar from '@/components/Navbar';
import Link from 'next/link';

const OrderError = () => {
  return (
    <>
      <Navbar title="주문실패" isHome />

      <div className="max-w-[600px] h-full flex flex-col items-center justify-center">
        <div className="h-full flex flex-col justify-center items-center gap-9">
          <p className="text-[20px] font-bold">주문에 실패하였습니다.</p>
          <Link href="/cart">장바구니로 돌아가기</Link>
        </div>
      </div>
    </>
  );
};

export default OrderError;
