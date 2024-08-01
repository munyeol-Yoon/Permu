import { CartDrawer, CartList, CartSelector } from './_components';

const CartPage = () => {
  return (
    <div className="max-w-[600px] flex flex-col h-full">
      <CartSelector />
      <CartList />
      <CartDrawer />
    </div>
  );
};

export default CartPage;
