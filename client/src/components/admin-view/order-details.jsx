import { useState } from "react";
import CommonForm from "../common/form";
import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";

const initialFormData = {
  status: "",
};

function AdminOrderDetailsView() {
  const [formData, setFormData] = useState(initialFormData);

  function handleUpdateStatus(event) {
    event.preventDefault();
    // Add your update logic here
  }

  return (
    <DialogContent className="sm:max-w-[650px] bg-white rounded-2xl shadow-lg p-6">
      <div className="grid gap-6">
        {/* Order Summary */}
        <div className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-800">Order Summary</h2>
          <div className="grid gap-2 text-sm text-gray-700">
            <div className="flex justify-between">
              <span className="font-medium">Order ID</span>
              <Label className="text-gray-900">#123456</Label>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Order Date</span>
              <Label className="text-gray-900">27/06/2025</Label>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Total Price</span>
              <Label className="text-green-600 font-semibold">$500</Label>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Order Status</span>
              <Label className="text-blue-500 font-semibold">In Process</Label>
            </div>
          </div>
        </div>

        <Separator />

        {/* Products */}
        <div className="space-y-3">
          <h3 className="text-lg font-medium text-gray-800">Ordered Items</h3>
          <ul className="divide-y divide-gray-200">
            <li className="flex justify-between py-2">
              <span>Product One</span>
              <span className="font-medium text-gray-900">$100</span>
            </li>
            {/* Add more products here if needed */}
          </ul>
        </div>

        {/* Shipping Info */}
        <div className="space-y-3">
          <h3 className="text-lg font-medium text-gray-800">Shipping Information</h3>
          <div className="text-sm text-gray-500 space-y-1">
            <p>John Doe</p>
            <p>123, Main Street</p>
            <p>New York City</p>
            <p>10001</p>
            <p>+1 234 567 890</p>
            <p>Leave at the door</p>
          </div>
        </div>

        <Separator />

        {/* Status Update Form */}
        <div className="pt-2">
          <h3 className="text-lg font-medium text-gray-800 mb-2">Update Order Status</h3>
          <CommonForm
            formControls={[
              {
                label: "Order Status",
                name: "status",
                componentType: "select",
                options: [
                  { id: "pending", label: "Pending" },
                  { id: "inProcess", label: "In Process" },
                  { id: "inShipping", label: "In Shipping" },
                  { id: "delivered", label: "Delivered" },
                  { id: "rejected", label: "Rejected" },
                ],
              },
            ]}
            formData={formData}
            setFormData={setFormData}
            buttonText={"Update Order Status"}
            onSubmit={handleUpdateStatus}
          />
        </div>
      </div>
    </DialogContent>
  );
}

export default AdminOrderDetailsView;
