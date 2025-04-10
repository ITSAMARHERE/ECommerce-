import Address from '@/components/shopping-view/address';
import img from '../../assets/account.jpg';
import { useDispatch, useSelector } from 'react-redux';
import UserCartItemsContent from '@/components/shopping-view/cart-items-content';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { createNewOrder } from '@/store/shop/order-slice';

function ShoppingCheckout() {
    const { cartItems } = useSelector(state => state.shopCart);
    const { user } = useSelector(state => state.auth);
    const {approvalURL} = useSelector(state=>state.shopOrder)
    const [currentSelectedAddress, setCurrentSelectedAddress ] = useState(null);
    const [isPaymentStart, setIsPaymentStart] = useState(false);
    const dispatch = useDispatch();

    console.log(currentSelectedAddress, "currentSelectedAddress");

    
    const totalCartAmount =
        cartItems && cartItems.items && cartItems.items.length > 0
            ? cartItems.items.reduce(
                (sum, currentitem) =>
                    sum +
                    ((currentitem?.salePrice > 0 ? currentitem.salePrice : currentitem.price) *
                        currentitem.quantity),
                0
            )
            : 0;



    function handleInitiatePaypalPayment() {

        const orderData = {
            userId: user?.id,
            cartItems: cartItems.items.map(singleCartItem => ({
                productId: singleCartItem?.productId,
                title: singleCartItem?.title,
                image: singleCartItem?.image,
                price: singleCartItem?.salePrice > 0 ? singleCartItem?.salePrice : singleCartItem?.price,
                quantity: singleCartItem?.quantity,
            })),
            addressInfo : {
                addressId: currentSelectedAddress?._id,
                address: currentSelectedAddress?.address,
                city: currentSelectedAddress?.city,
                pincode: currentSelectedAddress?.pincode,
                phone: currentSelectedAddress?.phone,
                notes: currentSelectedAddress?.notes,
            },
            orderStatus : 'pending',
            paymentMethod : 'paypal',
            paymentStatus : 'pending',
            totalAmount : totalCartAmount,
            orderDate : new Date(),
            orderUpdateDate : new Date(),
            paymentId :  '',
            payerId : '',
        };

       dispatch(createNewOrder(orderData)).then((data)=>{
            console.log(data, "Amar");
            if(data?.payload?.success){
                setIsPaymentStart(true)
            }else{
                setIsPaymentStart(false)
            }
            
        });       
    }

    if(approvalURL){
        window.location.href = approvalURL;
    }


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
                    <Address setCurrentSelectedAddress={setCurrentSelectedAddress} />
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
                        <Button
                            onClick={handleInitiatePaypalPayment}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white text-base py-2">
                            Checkout with PayPal
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ShoppingCheckout;
