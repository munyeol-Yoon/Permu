import { OrderButton, OrderForm, ReceiverForm } from '@/components/OrderPage';

const DeliveryPage = () => {
  return (
    <div className="max-w-[600px] mx-auto flex flex-col gap-4">
      <OrderForm />
      <ReceiverForm />
      <OrderButton />
    </div>
  );
};

export default DeliveryPage;
