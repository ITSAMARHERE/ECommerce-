import { useState } from "react";
import CommonForm from "../common/form";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { addressFormControls } from "@/config";

const initialAddressFormData = {
  address: "",
  city: "",
  phone: "",
  pincode: "",
  notes: "",
};

function Address() {
  const [formData, setFormData] = useState(initialAddressFormData);

  function handleManageAddress(event) {
    event.preventDefault();
    // Submit logic here
  }

  function isFormValid() {
    return Object.values(formData).every((val) => val.trim() !== "");
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <Card className="rounded-2xl border border-gray-200 shadow-sm bg-white">
        <CardHeader className="pb-4 border-b border-gray-100">
          <CardTitle className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
            <span className="text-xl">📍</span> Manage Addresses
          </CardTitle>
          <p className="text-sm text-gray-500 mt-1">
            Add your shipping or billing address to get your orders delivered seamlessly.
          </p>
        </CardHeader>

        <CardContent className="space-y-6 pt-6">
          {/* Address List */}
          <div className="bg-gray-50 border border-dashed border-gray-300 rounded-lg px-5 py-4 text-gray-600 text-sm flex items-center justify-center h-24">
            You haven’t added any addresses yet.
          </div>

          {/* Divider */}
          <div className="border-t border-gray-100"></div>

          {/* Address Form */}
          <div className="rounded-xl border border-gray-100 bg-white shadow-sm p-6">
            <h3 className="text-lg font-medium text-gray-700 mb-4">➕ Add New Address</h3>
            <CommonForm
              formControls={addressFormControls}
              formData={formData}
              setFormData={setFormData}
              buttonText={"Save Address"}
              onSubmit={handleManageAddress}
              isBtnDisabled={!isFormValid()}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Address;
