import CommonForm from "@/components/common/form";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { addProductFormElements } from "@/config";
import { Fragment, useState } from "react";

const initialFormData = {
  image: null,
  title: "",
  description: "",
  category: "",
  brand: "",
  price: "",
  salePrice: "",
  totalStock: "",
};

function AdminProducts() {
  const [openCreateProductsDialog, setOpenCreateProductsDialog] = useState(false);
  const [formData, setFormData] = useState(initialFormData);

  function onSubmit() {
    // Handle form submission
  }

  return (
    <Fragment>
      {/* Add New Product Button */}
      <div className="mb-5 w-full flex justify-end">
        <Button
          onClick={() => setOpenCreateProductsDialog(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow-md cursor-pointer"
        >
          + Add New Product
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4"></div>

      {/* Sidebar for Adding Products */}
      <Sheet open={openCreateProductsDialog} onOpenChange={setOpenCreateProductsDialog}>
        <SheetContent 
          side="right" 
          className="bg-white shadow-xl border-l border-gray-200 w-[400px] p-6 rounded-lg"
        >
          {/* Header */}
          <SheetHeader className="border-b pb-4">
            <SheetTitle className="text-2xl font-bold text-gray-800">Add New Product</SheetTitle>
          </SheetHeader>

          {/* Form Section */}
          <div className="py-6 space-y-4">
            <CommonForm
              onSubmit={onSubmit}
              formData={formData}
              setFormData={setFormData}
              buttonText="Add Product"
              formControls={addProductFormElements}
            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
}

export default AdminProducts;
