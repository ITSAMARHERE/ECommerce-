import { useSelector } from "react-redux";
import { Badge } from "../ui/badge";
import { DialogContent, DialogTitle } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";

function ShoppingOrderDetailsView({ orderDetails }) {
    const { user } = useSelector((state) => state.auth);

    return (
        <DialogContent
            className="sm:max-w-[650px] max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-xl border border-gray-200 px-5 py-4 scroll-smooth"
            aria-describedby="order-dialog-description"
        >

            {/* Hidden description for screen readers */}
            <p id="order-dialog-description" className="sr-only">
                Detailed view of the selected order including summary, items, and shipping information.
            </p>

            <DialogTitle className="text-xl font-bold text-gray-800 mb-3">
                Order Details
            </DialogTitle>

            <div className="grid gap-8">
                {/* Order Summary */}
                <section>
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">Order Summary</h3>
                    <div className="grid gap-4">
                        {[
                            { label: "Order ID", value: orderDetails?._id || "N/A" },
                            {
                                label: "Order Date",
                                value: orderDetails?.orderDate
                                    ? orderDetails.orderDate.split("T")[0]
                                    : "N/A",
                            },
                            { label: "Order Price", value: `$${orderDetails?.totalAmount || "0.00"}` },
                            {
                                label: "Payment Method",
                                value: orderDetails?.paymentMethod || "N/A",
                            },
                            {
                                label: "Payment Status",
                                value: orderDetails?.paymentStatus || "N/A",
                            },
                        ].map((item, idx) => (
                            <div
                                key={idx}
                                className="flex items-center justify-between text-sm text-gray-600"
                            >
                                <span>{item.label}:</span>
                                <Label className="text-gray-900 font-medium">{item.value}</Label>
                            </div>
                        ))}

                        {/* Order Status */}
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Order Status:</span>
                            <Badge
                                className={`py-1 px-3 text-xs font-medium rounded-full capitalize ${orderDetails?.orderStatus === "confirmed"
                                        ? "bg-green-500"
                                        : orderDetails?.orderStatus === "rejected"
                                            ? "bg-red-500"
                                            : "bg-gray-700"
                                    } text-white`}
                            >
                                {orderDetails?.orderStatus || "Unknown"}
                            </Badge>
                        </div>
                    </div>
                </section>

                <Separator />

                {/* Order Details */}
                <section>
                    <h3 className="text-lg font-semibold text-gray-700 mb-3">Order Items</h3>
                    {orderDetails?.cartItems?.length > 0 ? (
                        <ul className="space-y-2">
                            {orderDetails.cartItems.map((item, index) => (
                                <li
                                    key={item._id || index}
                                    className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm"
                                >
                                    <span className="text-gray-700">📦 {item.title}</span>
                                    <div className="flex items-center gap-4 sm:gap-8 mt-2 sm:mt-0">
                                        <span className="text-gray-600">Qty: {item.quantity}</span>
                                        <span className="text-gray-800 font-medium">
                                            ${item.price}
                                        </span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-sm text-gray-500">No items in this order.</p>
                    )}
                </section>

                <Separator />

                {/* Shipping Info */}
                <section>
                    <h3 className="text-lg font-semibold text-gray-700 mb-3">Shipping Info</h3>
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-sm text-gray-700 space-y-1">
                        <div><strong>Name:</strong> {user?.userName || "Customer"}</div>
                        <div><strong>Address:</strong> {orderDetails?.addressInfo?.address || "N/A"}</div>
                        <div><strong>City:</strong> {orderDetails?.addressInfo?.city || "N/A"}</div>
                        <div><strong>Pincode:</strong> {orderDetails?.addressInfo?.pincode || "N/A"}</div>
                        <div><strong>Phone:</strong> {orderDetails?.addressInfo?.phone || "N/A"}</div>
                        <div><strong>Notes:</strong> {orderDetails?.addressInfo?.notes || "No special notes."}</div>
                    </div>
                </section>
            </div>
        </DialogContent>
    );
}

export default ShoppingOrderDetailsView;
