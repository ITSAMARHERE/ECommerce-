import ProductImageUpload from "@/components/admin-view/image-upload";
import CommonForm from "@/components/common/form";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { addProductFormElements } from "@/config";
import { addNewProduct, fetchAllProducts } from "@/store/admin/products-slice";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

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
    const [imageFile, setImageFile] = useState(null);
    const [uploadedImageUrl, setUploadedImageUrl] = useState('');
    const [imageLoadingState, setImageLoadingState] = useState(false);
    const {productList} = useSelector(state=>state.adminProducts)
    const dispatch = useDispatch();

    function onSubmit(event) {
        // Handle form submission
        event.preventDefault();
        dispatch(addNewProduct({
            ...formData,
            image : uploadedImageUrl
        })).then((data)=> {
            console.log(data);
        })
    }

    useEffect(()=>[
        dispatch(fetchAllProducts())
    ],[dispatch])

    console.log(productList,uploadedImageUrl, "productList");

    return (
        <Fragment>
            {/* Add New Product Button */}
            <div className="mb-5 w-full flex justify-end">
                <Button
                    onClick={() => setOpenCreateProductsDialog(true)}
                    className="bg-gray-900 hover:bg-gray-800 text-white px-5 py-2 rounded-lg shadow-md cursor-pointer"
                >
                    + Add New Product
                </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4"></div>

            {/* Sidebar for Adding Products */}
            <Sheet open={openCreateProductsDialog} onOpenChange={setOpenCreateProductsDialog}>
                <SheetContent
                    side="right"
                    className="bg-white shadow-xl border-l border-gray-200 w-[400px] p-6 rounded-lg h-full overflow-y-auto"
                >
                    {/* Header */}
                    <SheetHeader className="border-b pb-4 sticky top-1 bg-white z-10">
                        <SheetTitle className="text-2xl font-bold text-gray-800">Add New Product</SheetTitle>
                    </SheetHeader>

                    {/* Image Upload */}
                    <ProductImageUpload
                        imageFile={imageFile}
                        setImageFile={setImageFile}
                        uploadedImageUrl={uploadedImageUrl}
                        setUploadedImageUrl={setUploadedImageUrl}
                        setImageLoadingState={setImageLoadingState}
                        imageLoadingState={imageLoadingState}
                    />

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
