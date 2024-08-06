import { updateCouponStatus } from '@/api/coupon';
import { insertDeliveryInfo } from '@/api/deliveries';
import { insertOrder, insertOrderDetail, updateOrderDeliverId, updateOrderStatus } from '@/api/order';
import { updateUserMileage } from '@/api/user';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (request: NextRequest) => {
  const { order: orderInfo, deliveries: deliveryInfo, productIdList, updatedMileageAmount } = await request.json();

  const orderId = orderInfo.orderId;
  const couponId = orderInfo.couponId;

  await insertOrder(orderInfo);

  try {
    const paymentResponse = await fetch(`https://api.portone.io/payments/${orderId}`, {
      headers: { Authorization: `PortOne ${process.env.NEXT_PORTONE_API_SECRET}` }
    });
    if (!paymentResponse.ok) throw new Error(`paymentResponse: ${await paymentResponse.json()}`);
    const payment = await paymentResponse.json();

    // 2. 고객사 내부 주문 데이터의 가격과 실제 지불된 금액을 비교합니다.
    // const order = await OrderService.findById(orderId);
    if (198000 === payment.amount.total) {
      switch (payment.status) {
        case 'PAID': {
          await updateOrderStatus(orderId, 'COMPLETED');
          await updateOrderDeliverId(orderId, deliveryInfo.deliverId);
          await insertDeliveryInfo(deliveryInfo);
          await Promise.all(productIdList.map((productId: number) => insertOrderDetail({ orderId, productId })));

          if (couponId) {
            await updateCouponStatus(couponId, 'used');
          }

          if (updatedMileageAmount) {
            await updateUserMileage(orderInfo.userId, updatedMileageAmount);
          }

          return NextResponse.json('주문 성공!');
        }
      }
    } else {
      await updateOrderStatus(orderId, 'FAILED');
      return NextResponse.json({ error: '가격이 일치하지 않습니다.' }, { status: 405 });
    }
  } catch (e) {
    await updateOrderStatus(orderId, 'FAILED');
    return NextResponse.json({ error: e }, { status: 405 });
  }
};
