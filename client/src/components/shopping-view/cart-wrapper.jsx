import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import UserCartItemsContent from "./cart-items-content";

function UserCartWrapper({ cartItems, setOpenCartSheet }) {
    const navigate = useNavigate();

    // Calculate total cart amount
    const totalCartAmount = cartItems && cartItems.length > 0 ? 
        cartItems.reduce((sum, currentItem) => sum + (
            currentItem?.salePrice > 0 ? currentItem?.salePrice : currentItem?.price
        ) * currentItem?.quantity, 0) : 0;

    return (
        <SheetContent 
            className="sm:max-w-md bg-white border-white" 
            aria-labelledby="cart-title" 
            aria-describedby="cart-description"
        >
            <SheetHeader>
                <SheetTitle id="cart-title">Your Cart</SheetTitle>
                <div id="cart-description" className="mt-4 space-y-3">
                    {/* Check if cartItems are present and not empty */}
                    {cartItems && cartItems.length > 0 ? (
                        <>
                            {cartItems.map((item, index) => (
                                <UserCartItemsContent key={index} cartItem={item} />
                            ))}
                            <div className="flex justify-between mt-4">
                                <span className="font-bold text-lg">Total</span>
                                <span className="font-bold text-lg">${totalCartAmount.toFixed(2)}</span>
                            </div>
                            <Button
                                onClick={() => {
                                    navigate('/shop/checkout');
                                    setOpenCartSheet(false);
                                }}
                                className="w-full cursor-pointer hover:bg-gray-800"
                            >
                                Checkout
                            </Button>
                        </>
                    ) : (
                        <p>Your cart is currently empty. Add some items to proceed.</p>
                    )}
                </div>
            </SheetHeader>
            <div className="mt-8 space-y-4">
                {/* Additional cart-related components can go here */}
            </div>
        </SheetContent>
    );
}

export default UserCartWrapper;
