import Navbar from '@/components/Navbar';

const OrderError = () => {
  return (
    <>
      <Navbar title="주문 실패" href="/" isHome />

      <div className="max-w-[600px] h-full flex flex-col items-center justify-center">
        <div className="h-full flex flex-col justify-center items-center gap-9">
          <p className="text-[20px] font-bold">주문에 실패하였습니다.</p>
        </div>
      </div>
    </>
  );
};

export default OrderError;
