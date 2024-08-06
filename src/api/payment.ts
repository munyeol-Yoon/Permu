import * as PortOne from '@portone/browser-sdk/v2';

export const tossPayment = async (orderName: string, totalAmount: number) => {
  const response = await PortOne.requestPayment({
    storeId: 'store-bef3203c-069c-46fb-99e4-20dc5962aace',
    channelKey: 'channel-key-1789b32b-c2b8-4ad8-b973-df1a74c6ba2f',
    paymentId: crypto.randomUUID(),
    orderName,
    totalAmount,
    currency: 'CURRENCY_KRW',
    payMethod: 'EASY_PAY'
  });

  return response;
};

export const kakaoPayment = async (orderName: string, totalAmount: number) => {
  const response = await PortOne.requestPayment({
    storeId: 'store-bef3203c-069c-46fb-99e4-20dc5962aace',
    channelKey: 'channel-key-458d64a1-7e46-4003-9df0-89ccbb95b195',
    paymentId: crypto.randomUUID(),
    orderName,
    totalAmount,
    currency: 'CURRENCY_KRW',
    payMethod: 'EASY_PAY'
  });

  return response;
};
