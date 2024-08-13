import { createClient } from '@/supabase/server';
import { Params } from '@/types/products';
import Image from 'next/image';
const ReviewImagesPage = async ({ params }: Params) => {
  const { productId } = params;
  const supabase = createClient();
  const { data, error } = await supabase.from('Reviews').select('imagesURL').eq('productId', productId);
  const reviewsImages = data?.filter((review) => review.imagesURL).map((review) => review.imagesURL);
  if (error) throw error;
  if ((reviewsImages ?? []).length <= 0)
    return <div className="flex justify-center items-center">이미지가 없습니다</div>;
  return (
    <div className="grid grid-cols-3 gap-1">
      {reviewsImages?.map((reviewImage, index) => (
        <div key={index} className="aspect-square relative">
          <Image
            src={reviewImage.imagesURL}
            alt="리뷰 이미지"
            fill
            className="w-[200px] h-[200px] object-cover absolute"
          />
        </div>
      ))}
    </div>
  );
};

export default ReviewImagesPage;
