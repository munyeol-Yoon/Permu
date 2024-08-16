import { getOrderInfos } from '@/api/orderInfo';
import { getProducts, getProductsByBrandForThisWeek, getProductsByCategoryForThisWeek } from '@/api/product';
import { getWishes } from '@/api/wish';
import { Product, TWish } from '@/types/products';
import { useQuery } from '@tanstack/react-query';
import useAuthQuery from './useAuthQuery';

const QUERY_OPTIONS = {
  RECENT: 'recent',
  PRODUCT: 'product',
  BRAND: 'brand',
  WISH: 'wish',
  ORDER: 'order'
};
const dataFiltering = async (data: TWish[] | any[], userId: string): Promise<Product[]> => {
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
  const data2 = await getProducts({ productIds: result2, userId });
  return data2;
};

const useProductsQuery = (option: string) => {
  const { data: loggedUser } = useAuthQuery();
  return useQuery<Product[]>({
    queryKey: ['Products', option, loggedUser?.id],
    queryFn: async () => {
      switch (option) {
        case QUERY_OPTIONS.RECENT:
          return await getProducts({ userId: loggedUser?.id });
        case QUERY_OPTIONS.PRODUCT:
          return await getProductsByCategoryForThisWeek({ userId: loggedUser?.id });
        case QUERY_OPTIONS.BRAND:
          return await getProductsByBrandForThisWeek({ userId: loggedUser?.id });
        case QUERY_OPTIONS.WISH:
          const wishes = await getWishes();
          return dataFiltering(wishes, loggedUser?.id ?? '');
        default:
          const orders = await getOrderInfos();
          return dataFiltering(orders, loggedUser?.id ?? '');
      }
    }
  });
};

export default useProductsQuery;
