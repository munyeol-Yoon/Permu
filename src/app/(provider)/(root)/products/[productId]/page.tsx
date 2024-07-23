import { getProductById } from '@/api/product';
import Cart from '@/components/products/Cart';
import Information from '@/components/products/Information/Information';
import Share from '@/components/products/Share/Share';
import Wish from '@/components/products/Wish';
import Image from 'next/image';
interface Params {
  params: { productId: string };
}
const ProductDetailPage = async ({ params }: Params) => {
  const product = await getProductById({ params });

  return (
    <div>
      <div>
        <Image src={product!.thumbNailURL} width={100} height={100} alt={product!.title} />
        <Image src={product!.ImagesURL} width={100} height={100} alt={product!.title} />
      </div>
      <h3 className="font-bold text-2xl">{product?.title}</h3>
      <div className="flex flex-row justify-between border-b-2">
        <div>
          <span className="text-[30px] font-medium">{product?.discountedPrice.toLocaleString()}원</span>
          <span className="text-xl text-gray-500 line-through">{product?.price.toLocaleString()}원</span>
        </div>
        <span className="text-[#F00] font-medium">{product?.discount}% SALE</span>
      </div>
      <div>
        <p>
          달콤한 호박과 일랑일랑, 그리고 불가리안 로즈가 조화를 이루는 이 향수는 정교하고 매혹적인 조합일 것입니다.
          호박의 부드러운 달콤함이 일랑일랑의 상큼한 꽃 향과 어우러지면서, 불가리안 로즈의 우아하고 깊은 꽃 향이
          더해집니다. 이 향수는 유럽 피안 여름의 햇살 아래에서 상상할 수 있는 바와 같이, 부드럽고 섬세한 향기를 지닐
          것입니다. 여름의 따뜻한 햇볕 속에서 호박의 달콤함이 더욱 풍부하게 느껴지며, 일랑일랑과 불가리안 로즈가 그
          특별한 순간을 감싸주는 느낌을 줄 것입니다
        </p>
      </div>
      <div className="flex flex-row gap-[10px] px-5">
        <Cart />
      </div>
      <div className="flex flex-row gap-[10px] px-5">
        <Share />
        <Wish />
      </div>
      <Information />
    </div>
  );
};

export default ProductDetailPage;
