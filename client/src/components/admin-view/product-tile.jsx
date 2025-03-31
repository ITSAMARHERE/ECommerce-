import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";

function AdminProductTile({ product, setFormData, setOpenCreateProductsDialog, setCurrentEditedId }) {
    const handleEdit = () => {
        setFormData({
            image: product.image,
            title: product.title,
            description: product.description,
            category: product.category,
            brand: product.brand,
            price: product.price,
            salePrice: product.salePrice,
            totalStock: product.totalStock,
        });
        setCurrentEditedId(product.id); // Set the product ID for editing
        setOpenCreateProductsDialog(true); // Open the form
    };

    return (
        <Card className="w-[250px] mx-auto rounded-lg bg-white border border-gray-200 overflow-hidden shadow-md">
            {/* Product Image - Overlapping with Negative Margin */}
            <div className="relative w-full h-[350px] -mt-16"> {/* Negative margin to pull image up */}
                <img
                    src={product?.image}
                    alt={product?.title}
                    className="w-full h-full object-cover rounded-t-lg"
                />
            </div>

            {/* Product Details */}
            <CardContent className="p-3 pt-0"> {/* Reduced padding for less gap */}
                <h2 className="text-lg font-semibold text-gray-900 mt-0 mb-1"> {/* Reduced margin-bottom */}
                    {product?.title}
                </h2>
                <p className="text-sm text-gray-600 mt-1 mb-1 line-clamp-2">{product?.description}</p> {/* Reduced margin */}
                <div className="flex justify-between items-center mt-1"> {/* Reduced margin-top */}
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

            {/* Buttons */}
            <CardFooter className="flex justify-end gap-4 px-3 pb-2"> {/* Increased gap between buttons */}
                <Button
                    onClick={handleEdit}
                    className="bg-gray-800 text-white px-3 py-1.5 rounded-md cursor-pointer hover:bg-gray-700"
                >
                    Edit
                </Button>
                <Button
                    className="bg-red-600 text-white px-3 py-1.5 rounded-md cursor-pointer hover:bg-red-500"
                >
                    Delete
                </Button>
            </CardFooter>
        </Card>
    );
}

export default AdminProductTile;
