import Image from 'next/image';

const CategoryProductCard = () => {
  return (
    <div className="w-[160px] h-[100px] rounded-[8px] relative">
      <Image
        src="https://cdn.imweb.me/upload/S201701015868e87bb6cc8/3d7229a22f0e7.jpg"
        width={160}
        height={100}
        alt="향수 이미지1"
        className="w-full h-[100px]"
      />
      <div className="w-full h-5 bg-[#F7F7F7] flex justify-center items-center rounded-b-[8px] absolute bottom-0 left-0">
        <span className="text-xs">조말론</span>
      </div>
    </div>
  );
}

export default CategoryProductCard;
