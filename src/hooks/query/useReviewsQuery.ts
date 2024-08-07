import { useQuery } from '@tanstack/react-query';

const useReviewsQuery = (productId: string) => {
  return useQuery({
    queryKey: ['Reviews', productId],
    queryFn: async () => {
      return [
        {
          reviewId: 0,
          Products: { notes: ['달콤한 호박', '일랑일랑', '불가리안 로즈'] },
          User: { name: '박원빈' },
          content: '리뷰내용',
          createdBy: '2024.07.28',
          ImagesURL: [
            'https://gewbjtpztsdnvbqpunpd.supabase.co/storage/v1/object/public/product-images/product-detail-images/chaneln5-detail.webp',
            'https://gewbjtpztsdnvbqpunpd.supabase.co/storage/v1/object/public/product-images/product-images/chaneln52.webp'
          ],
          score: 4,
          productId: 56
        },
        {
          reviewId: 1,
          Products: { notes: ['달콤한 호박', '일랑일랑', '불가리안 로즈'] },
          User: { name: '강감찬' },
          content: '리뷰내용',
          createdBy: '2024.07.28',
          ImagesURL: [
            'https://gewbjtpztsdnvbqpunpd.supabase.co/storage/v1/object/public/product-images/product-thumbnail/chanel-gdnia-thumb.avif',
            'https://gewbjtpztsdnvbqpunpd.supabase.co/storage/v1/object/public/product-images/product-images/chanel-gdnia-images.webp'
          ],
          score: 3,
          productId: 56
        }
      ];
    }
  });
};

export default useReviewsQuery;
