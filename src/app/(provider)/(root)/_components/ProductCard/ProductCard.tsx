import Image from "next/image";

function ProductCard() {
  return (
    <div className="w-[180px] flex flex-col">
      <Image
        src="https://web-resource.tamburins.com/catalog/product/1662463782/7ce111a8-c961-4048-8ae0-6c349b44a17c/Thumbnail_Perfume1_50ml_UnknownOud.jpg"
        width={180}
        height={200}
        alt="제품 이미지"
        className="rounded"
      />
      <div className="flex flex-col">
        <span className="text-[10px] mt-2">브랜드명</span>
        <p className="text-[15px] font-semibold my-3">제품명</p>
        <div className="flex justify-between">
          <p className="text-[#FF0000]">10%</p>
          <span className="font-semibold">89,382원</span>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
