import { updateCouponStatus } from '@/api/coupon';
import { insertDeliveryInfo } from '@/api/deliveries';
import { insertOrder, insertOrderDetail } from '@/api/order';
import { updateUserMileage } from '@/api/user';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (request: NextRequest) => {
  const { order: orderInfo, deliveries: deliveryInfo, productIdList, updatedMileageAmount } = await request.json();

  const orderId = orderInfo.orderId;
  const couponId = orderInfo.couponId;

  await insertOrder(orderInfo);
  await insertDeliveryInfo(deliveryInfo);

  await Promise.all(productIdList.map((productId: number) => insertOrderDetail({ orderId, productId })));

  if (couponId) {
    await updateCouponStatus(couponId, 'used');
  }

  if (updatedMileageAmount) {
    await updateUserMileage(orderInfo.userId, updatedMileageAmount);
  }

  return NextResponse.json('주문이 완료되었습니다!');
};
