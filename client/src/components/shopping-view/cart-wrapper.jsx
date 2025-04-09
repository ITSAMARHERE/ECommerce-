import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import UserCartItemsContent from "./cart-items-content";

function UserCartWrapper({cartItems}) {

    const naviagte = useNavigate();

    const totalCartAmount = cartItems && cartItems.length > 0 ?
    cartItems.reduce((sum,currentItem)=> sum + (
        currentItem?.salePrice > 0 ? currentItem?.salePrice : currentItem?.price
    ) * currentItem?.quantity, 0) : 0



    return (
        <SheetContent className="sm:max-w-md bg-white border-white">
            <SheetHeader>
                <SheetTitle>Your Cart</SheetTitle>
                <div className="mt-4 space-y-3">
                    {
                        cartItems && cartItems.length > 0 ?
                        cartItems.map(item=><UserCartItemsContent cartItem={item}/>) : null
                    }
                    <div className="flex justify-between">
                        <span className="font-bold text-lg">Total</span>
                        <span className="font-bold text-lg">${totalCartAmount}</span>
                    </div>
                    <Button 
                    onClick={()=> naviagte('/shop/checkout')}
                    className="w-full">Checkout</Button>
                </div>
            </SheetHeader>

            <div className="mt-8 space-y-4">
                {/* Cart items will be listed here */}
            </div>
        </SheetContent>
    );
}

export default UserCartWrapper;
