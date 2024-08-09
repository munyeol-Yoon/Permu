import { getOrderInfos } from '@/api/orderInfo';
import { getProducts, getProductsByBrandForThisWeek, getProductsByCategoryForThisWeek } from '@/api/product';
import { getWishes } from '@/api/wish';
import { useAuth } from '@/contexts/auth.context/auth.context';
import { useQuery } from '@tanstack/react-query';

const useProductsQuery = (option: string) => {
  const { loggedUser } = useAuth();

  return useQuery({
    queryKey: ['Products', option, loggedUser?.id],
    queryFn: async () => {
      if (option === 'recent') return await getProducts({ userId: loggedUser?.id });
      else if (option === 'product') return await getProductsByCategoryForThisWeek({ userId: loggedUser?.id });
      else if (option === 'brand') return await getProductsByBrandForThisWeek({ userId: loggedUser?.id });
      else {
        const data = option === 'wish' ? await getWishes() : await getOrderInfos();

        const countMap = data.reduce((acc: number[], cur: { productId: number }) => {
          acc[cur.productId] = (acc[cur.productId] || 0) + 1;
          return acc;
        }, {});

        const result = Object.entries(countMap)
          .map(([productId, count]) => ({
            productId: +productId,
            count: count as number
          }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 10);
        const result2 = result.map((result) => result.productId);

        const data2 = await getProducts({ productIds: result2, userId: loggedUser?.id });
        return data2;
      }
    }
  });
};

export default useProductsQuery;
