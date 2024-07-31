import { useCartsQuery } from '@/hooks/query';
import CartItem from './CartItem';

const CartList = () => {
  const { data: cartList } = useCartsQuery();

  return (
    <ul className="flex flex-col gap-5">
      {cartList?.map((cartItem) => <CartItem key={cartItem.productId} cartItem={cartItem} />)}
    </ul>
  );
};

export default CartList;
