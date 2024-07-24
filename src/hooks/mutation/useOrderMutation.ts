import { DeliveryInfo } from '@/types/deliveries';
import { Order, OrderStatus } from '@/types/order';
import { useMutation } from '@tanstack/react-query';

const useOrderMutation = () => {
  const result = useMutation({
    mutationFn: async ({
      orderInfo,
      deliveryInfo,
      productId
    }: {
      orderInfo: Order;
      deliveryInfo: DeliveryInfo;
      productId: number[];
    }) => {
      const orderId = crypto.randomUUID();
      const deliverId = crypto.randomUUID();

      const order: Order = {
        ...orderInfo,
        orderId,
        deliverId,
        couponId: orderInfo?.couponId,
        orderStatus: OrderStatus.PENDING,
        payment: 'TOSS'
      };
      const deliveries: DeliveryInfo = { ...deliveryInfo, deliverId };

      await fetch('/api/order', { method: 'POST', body: JSON.stringify(order) });

      productId.forEach(
        async (v) =>
          await fetch('/api/orderDetail', { method: 'POST', body: JSON.stringify({ orderId, productId: v }) })
      );

      await fetch('/api/deliveries', { method: 'POST', body: JSON.stringify(deliveries) });
    }
  });

  return result;
};

export default useOrderMutation;
