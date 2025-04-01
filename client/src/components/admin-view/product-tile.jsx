import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";

function AdminProductTile({
    product,
    setFormData,
    setOpenCreateProductsDialog,
    setCurrentEditedId,
    handleDelete }) {

    return (
        <Card className="w-[300px] h-[560px] mx-auto rounded-lg bg-white border border-gray-300 shadow-lg flex flex-col mb-6"> {/* Increased card height */}
            {/* Overlapping Square Image with Increased Height */}
            <div className="relative w-full h-[300px] -mt-12"> {/* Increased image height */}
                <img
                    src={product?.image}
                    alt={product?.title}
                    className="w-full h-full object-cover rounded-lg"
                />
            </div>

            {/* Product Details */}
            <CardContent className="p-4 flex-grow text-center">
                <h2 className="text-lg font-semibold text-gray-900">{product?.title}</h2>
                <p className="text-sm text-gray-600 mt-2 line-clamp-2">{product?.description}</p>
                <div className="flex justify-center gap-3 items-center mt-2">
                    {product?.salePrice > 0 ? (
                        <>
                            <span className="text-md text-gray-500 line-through">${product?.price}</span>
                            <span className="text-md font-bold text-red-600">${product?.salePrice}</span>
                        </>
                    ) : (
                        <span className="text-md font-semibold text-gray-900">${product?.price}</span>
                    )}
                </div>
            </CardContent>

            {/* Buttons - Reduced Bottom Margin */}
            <CardFooter className="flex justify-between px-4 pb-4 mt-auto"> {/* Reduced bottom padding */}
                <Button
                    onClick={() => {
                        setOpenCreateProductsDialog(true);
                        setCurrentEditedId(product?._id);
                        setFormData(product);
                    }}
                    className="bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-700 cursor-pointer"
                >
                    Edit
                </Button>
                <Button
                    onClick={() => handleDelete(product?._id)}
                    className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-500 cursor-pointer"
                >
                    Delete
                </Button>
            </CardFooter>
        </Card>
    );
}

export default AdminProductTile;
