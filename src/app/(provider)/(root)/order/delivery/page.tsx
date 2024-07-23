import { OrderButton, OrdererForm, ReceiverForm } from '@/components/OrderPage';

const DeliveryPage = () => {
  return (
    <div className="max-w-[600px] mx-auto flex flex-col gap-4">
      <OrdererForm />
      <ReceiverForm />
      <OrderButton />
    </div>
  );
};

export default DeliveryPage;
