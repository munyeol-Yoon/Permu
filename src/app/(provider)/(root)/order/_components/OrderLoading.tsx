import Navbar from '@/components/Navbar';
import LoadingSpinner from '@@/public/loading-spinner.svg';

const OrderLoading = () => {
  return (
    <>
      <Navbar title="주문대기" href="/" isHome />

      <div className="max-w-[600px] h-full flex flex-col items-center justify-center">
        <div className="h-full flex flex-col justify-center items-center gap-9">
          <LoadingSpinner />
          <p className="text-[20px] font-bold">주문을 처리하고있습니다.</p>
        </div>
      </div>
    </>
  );
};

export default OrderLoading;
