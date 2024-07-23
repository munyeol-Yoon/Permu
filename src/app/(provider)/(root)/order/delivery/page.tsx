import { OrderButton, OrdererForm, ReceiverForm } from '@/components/OrderPage';
import OrderList from '@/components/OrderPage/OrderList';

const DeliveryPage = () => {
  return (
    <div className="max-w-[600px] mx-auto flex flex-col gap-4">
      <OrderList />
      <OrdererForm />
      <ReceiverForm />
      <OrderButton />
    </div>
  );
};

export default DeliveryPage;
