import { DeliveryInfo } from '@/types/deliveries';
import { Order } from '@/types/order';
import { useMutation } from '@tanstack/react-query';
import useOrderInfoQuery from '../query/useOrderInfoQuery';

const useOrderMutation = () => {
  const { data: orderInfo } = useOrderInfoQuery();

  return useMutation({
    mutationFn: async ({
      deliveryInfo,
      totalPrice,
      coupon,
      updatedMileageAmount
    }: {
      deliveryInfo: DeliveryInfo;
      totalPrice: number;
      coupon: any;
      updatedMileageAmount: number;
    }) => {
      const orderId = crypto.randomUUID();
      const deliverId = crypto.randomUUID();

      const userId = orderInfo.user.id;
      const productIdList = orderInfo.productList.map((v: { productId: number }) => v.productId);

      const order: Order = {
        orderId,
        deliverId,
        userId,
        total: totalPrice,
        couponId: coupon?.couponId
      };
      const deliveries: DeliveryInfo = { ...deliveryInfo, deliverId };

      await fetch('/api/order', {
        method: 'POST',
        body: JSON.stringify({ order, deliveries, productIdList, updatedMileageAmount })
      });
    }
  });
};

export default useOrderMutation;
