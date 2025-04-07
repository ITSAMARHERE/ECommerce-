import { Button } from "../ui/button";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";

function UserCartWrapper() {
    return (
        <SheetContent className="sm:max-w-md bg-white">
            <SheetHeader>
                <SheetTitle>Your Cart</SheetTitle>
                <div className="mt-4 space-y-3">
                    <div className="flex justify-between">
                        <span className="font-bold text-lg">Total</span>
                        <span className="font-bold text-lg">$1000</span>
                    </div>
                    <Button className="w-full">Checkout</Button>
                </div>
            </SheetHeader>

            <div className="mt-8 space-y-4">
                {/* Cart items will be listed here */}
            </div>
        </SheetContent>
    );
}

export default UserCartWrapper;
