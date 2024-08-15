import { DeliveryInfo } from '@/types/deliveries';
import { Order } from '@/types/order';
import { useMutation } from '@tanstack/react-query';
import useAuthQuery from '../query/useAuthQuery';

const useOrderMutation = () => {
  const { data: loggedUser } = useAuthQuery();

  return useMutation({
    mutationFn: async ({
      orderId,
      deliveryInfo,
      totalPrice,
      couponId,
      updatedMileageAmount,
      productIdList,
      payment
    }: {
      orderId: string;
      deliveryInfo: DeliveryInfo;
      totalPrice: number;
      couponId: string;
      updatedMileageAmount: number;
      productIdList: number[];
      payment: 'TOSS' | 'KAKAOPAY';
    }) => {
      const deliverId = crypto.randomUUID();

      const userId = loggedUser?.id!;

      const order: Order = {
        orderId,
        userId,
        total: totalPrice,
        couponId,
        payment
      };
      const deliveries: DeliveryInfo = { ...deliveryInfo, deliverId };

      const response = await fetch('/api/order', {
        method: 'POST',
        body: JSON.stringify({ order, deliveries, productIdList, updatedMileageAmount })
      });

      if (!response.ok) {
        throw new Error('주문에 실패하였습니다.');
      }

      return response;
    }
  });
};

export default useOrderMutation;
