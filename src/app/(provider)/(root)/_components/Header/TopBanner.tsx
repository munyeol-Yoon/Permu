import CloseSVG from '@@/public/header/close.svg';

const TopBanner = () => {
  return (
    <div className="w-full h-[38px] flex justify-center items-center bg-black relative">
      <p>
        <span className="font-light text-[14px] text-white">카카오톡 친구 추가시</span>
        <b className="font-bold text-[14px] text-white mx-[5px]">10% 할인 쿠폰</b>
        <span className="font-light text-[14px] text-white">즉시발급</span>
      </p>

      <button>
        <CloseSVG className="w-[16px] h-[16px] absolute top-[10px] right-5" />
      </button>
    </div>
  );
};

export default TopBanner;
