import CartDrawer from './_components/CartDrawer';
import CartList from './_components/CartList';
import CartSelector from './_components/CartSelector';

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
