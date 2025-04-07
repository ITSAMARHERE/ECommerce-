import { Minus, Plus, Trash } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { deleteCartItem, updateCartQuantity } from "@/store/shop/cart-slice";
import { toast } from "sonner";

function UserCartItemsContent({ cartItem }) {
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const handleUpdateQuantity = (getCartItem, typeOfAction) => {
        dispatch(
            updateCartQuantity({
                userId: user?.id,
                productId: getCartItem?.productId,
                quantity:
                    typeOfAction === "plus"
                        ? getCartItem?.quantity + 1
                        : getCartItem?.quantity - 1,
            })
        ).then((data) => {
            if (data?.payload?.success) {
                toast.success("Cart item is updated successfully");
            }
        });
    };

    const handleCartItemDelete = (getCartItem) => {
        dispatch(
            deleteCartItem({
                userId: user?.id,
                productId: getCartItem?.productId,
            })
        ).then((data) => {
            if (data?.payload?.success) {
                toast.success("Cart item is deleted successfully");
            }
        });
    };

    return (
        <div className="flex items-center justify-between gap-4 p-4 border border-gray-300 rounded-lg shadow-sm bg-white hover:shadow-md transition-all duration-200">
            {/* Product Image */}
            <img
                src={cartItem?.image}
                alt={cartItem?.title}
                className="w-20 h-20 rounded-lg object-cover border"
            />

            {/* Title & Quantity Controls */}
            <div className="flex flex-col flex-1 min-w-0">
                <h3 className="font-bold text-lg truncate">{cartItem?.title}</h3>
                <div className="flex items-center gap-3 mt-2">
                    <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 rounded-full hover:bg-gray-100"
                        disabled={cartItem?.quantity === 1}
                        onClick={() => handleUpdateQuantity(cartItem, "minus")}
                    >
                        <Minus className="w-4 h-4" />
                        <span className="sr-only">Decrease</span>
                    </Button>
                    <span className="text-base font-medium">{cartItem?.quantity}</span>
                    <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 rounded-full hover:bg-gray-100"
                        onClick={() => handleUpdateQuantity(cartItem, "plus")}
                    >
                        <Plus className="w-4 h-4" />
                        <span className="sr-only">Increase</span>
                    </Button>
                </div>
            </div>

            {/* Price & Delete */}
            <div className="flex flex-col items-end min-w-[90px]">
                <p className="text-right font-semibold text-base text-black">
                    $
                    {(
                        (cartItem?.salePrice > 0 ? cartItem?.salePrice : cartItem?.price) *
                        cartItem?.quantity
                    ).toFixed(2)}
                </p>
                <Trash
                    onClick={() => handleCartItemDelete(cartItem)}
                    className="mt-2 w-5 h-5 cursor-pointer text-red-500 hover:text-red-600 transition-colors"
                    title="Remove from cart"
                />
            </div>
        </div>
    );
}

export default UserCartItemsContent;
