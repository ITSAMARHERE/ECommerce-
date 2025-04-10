import Address from '@/components/shopping-view/address';
import img from '../../assets/account.jpg';
import { useSelector } from 'react-redux';
import UserCartItemsContent from '@/components/shopping-view/cart-items-content';
import { Button } from '@/components/ui/button';

function ShoppingCheckout() {
    const { cartItems } = useSelector(state => state.shopCart);

    const totalCartAmount =
        cartItems?.items?.length > 0
            ? cartItems.items.reduce(
                  (sum, item) =>
                      sum +
                      ((item?.salePrice > 0 ? item.salePrice : item.price) *
                          item.quantity),
                  0
              )
            : 0;

    return (
        <div className="flex flex-col bg-gray-50 min-h-screen">
            <div className="relative h-[300px] w-full overflow-hidden">
                <img
                    src={img}
                    className="h-full w-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <h1 className="text-white text-4xl md:text-5xl font-bold drop-shadow-lg animate-fade-in">
                        Checkout
                    </h1>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6 p-6">
                <div className="bg-white p-5 rounded-xl shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
                    <Address />
                </div>

                <div className="bg-white p-5 rounded-xl shadow-md flex flex-col gap-4">
                    <h2 className="text-xl font-semibold mb-4">Your Cart</h2>

                    {cartItems?.items?.length > 0 ? (
                        cartItems.items.map((item, index) => (
                            <UserCartItemsContent key={index} cartItem={item} />
                        ))
                    ) : (
                        <p className="text-gray-500">Your cart is empty.</p>
                    )}

                    <div className="flex justify-between pt-4 border-t text-lg font-semibold">
                        <span>Total:</span>
                        <span>${totalCartAmount.toFixed(2)}</span>
                    </div>

                    <div className="mt-4 w-full">
                        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-base py-2">
                            Checkout with PayPal
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ShoppingCheckout;
