import { OrderButton, OrderForm, ReceiverForm } from '@/components/OrderPage';
import OrderProvider from './_context/OrderContext';

const DeliveryPage = () => {
  return (
    <div className="max-w-[600px] mx-auto flex flex-col gap-4">
      <OrderProvider>
        <OrderForm />
        <ReceiverForm />
        <OrderButton />
      </OrderProvider>
    </div>
  );
};

export default DeliveryPage;
