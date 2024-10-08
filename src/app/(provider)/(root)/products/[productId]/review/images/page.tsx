import { createClient } from '@/supabase/server';
import { Params } from '@/types/products';
import Image from 'next/image';
const ReviewImagesPage = async ({ params }: Params) => {
  const { productId } = params;
  const supabase = createClient();
  const { data } = await supabase
    .from('Reviews')
    .select('imagesURL')
    .eq('productId', productId)
    .not('imagesURL', 'is', null);

  const reviewsImages = data?.flatMap((review) => review.imagesURL) ?? [];
  if (reviewsImages.length <= 0) return <div className="flex-center">이미지가 없습니다</div>;
  return (
    <div className="grid-col-3">
      {reviewsImages?.map((reviewImage, index) => (
        <div key={index} className="aspect-square relative">
          <Image src={reviewImage} alt="리뷰 이미지" fill className="w-[200px] h-[200px] object-cover absolute" />
        </div>
      ))}
    </div>
  );
};

export default ReviewImagesPage;
