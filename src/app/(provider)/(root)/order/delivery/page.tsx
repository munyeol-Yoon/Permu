import { getOrderInfoByUserId } from '@/api/orderInfo';
import { OrderButton, OrdererForm, ReceiverForm } from '@/components/OrderPage';
import ProductList from '@/components/OrderPage/ProductList';

const DeliveryPage = async () => {
  // TODO: 하드코딩되어있는 userId 수정
  const { productList, user } = await getOrderInfoByUserId('d075a7dd-98bb-4e69-9209-e03c6057a901');

  return (
    <div className="max-w-[600px] mx-auto flex flex-col gap-4">
      <ProductList productList={productList} />
      <OrdererForm user={user} />
      <ReceiverForm />
      <OrderButton />
    </div>
  );
};

export default DeliveryPage;
