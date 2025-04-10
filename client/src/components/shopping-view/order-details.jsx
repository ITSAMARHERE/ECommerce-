import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";

function ShoppingOrderDetailsView() {
    return (
        <DialogContent className="sm:max-w-[600px] bg-white rounded-xl shadow-lg border border-gray-200">
            <div className="grid gap-6">
                {/* Order Summary */}
                <div className="grid gap-3">
                    <h3 className="text-lg font-semibold text-gray-800">Order Summary</h3>
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <span className="text-gray-600">Order ID:</span>
                            <Label className="text-gray-900">123456</Label>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-gray-600">Order Date:</span>
                            <Label className="text-gray-900">27/06/2025</Label>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-gray-600">Order Price:</span>
                            <Label className="text-gray-900">$500</Label>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-gray-600">Order Status:</span>
                            <Label className="text-blue-600 font-semibold">In Process</Label>
                        </div>
                    </div>
                </div>

                <Separator />

                {/* Order Details */}
                <div className="grid gap-3">
                    <h3 className="text-lg font-semibold text-gray-800">Order Details</h3>
                    <ul className="grid gap-2">
                        <li className="flex items-center justify-between px-3 py-2 bg-gray-50 rounded-md border border-gray-200">
                            <span className="text-gray-700">Product One</span>
                            <span className="text-gray-900 font-medium">$100</span>
                        </li>
                        {/* Add more products similarly if needed */}
                    </ul>
                </div>

                <Separator />

                {/* Shipping Info */}
                <div className="grid gap-3">
                    <h3 className="text-lg font-semibold text-gray-800">Shipping Info</h3>
                    <div className="bg-gray-50 p-4 rounded-md border border-gray-200 text-sm text-gray-700 space-y-1">
                        <div>John Doe</div>
                        <div>123 Main Street</div>
                        <div>New York City</div>
                        <div>10001</div>
                        <div>+1 9876543210</div>
                        <div className="text-gray-500 italic">Leave at the front desk</div>
                    </div>
                </div>
            </div>
        </DialogContent>
    );
}

export default ShoppingOrderDetailsView;
