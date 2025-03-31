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
        <Card className="w-full max-w-md mx-auto shadow-lg rounded-xl overflow-hidden bg-white transform transition duration-300 hover:scale-105 hover:shadow-2xl">
            {/* Product Image */}
            <div className="relative w-full h-[300px] mb-0"> {/* Reduced margin-bottom to 0 */}
                <img
                    src={product?.image}
                    alt={product?.title}
                    className="w-full h-full object-cover rounded-t-xl"
                />
            </div>

            {/* Product Details */}
            <CardContent className="p-3 space-y-2"> {/* Reduced padding and space between content */}
                <h2 className="text-xl font-extrabold text-gray-900 mt-0 mb-0 truncate">{product?.title}</h2> {/* Reduced margin-top to 0 and margin-bottom to 0 */}
                <p className="text-sm text-gray-600 mb-2 line-clamp-2">{product?.description}</p>
                <div className="flex justify-between items-center">
                    {product?.salePrice > 0 ? (
                        <>
                            <span className="text-lg font-semibold text-gray-500 line-through">${product?.price}</span>
                            <span className="text-lg font-bold text-red-600">${product?.salePrice}</span>
                        </>
                    ) : (
                        <span className="text-lg font-semibold text-gray-900">${product?.price}</span>
                    )}
                </div>
            </CardContent>

            {/* Buttons */}
            <CardFooter className="flex justify-between items-center px-3 pb-3"> {/* Reduced padding here */}
                <Button
                    onClick={handleEdit}
                    className="bg-black text-white hover:bg-gray-800 px-5 py-2 rounded-lg shadow-md transform transition duration-300"
                >
                    Edit
                </Button>
                <Button
                    className="bg-red-600 text-white hover:bg-red-500 px-5 py-2 rounded-lg shadow-md transform transition duration-300"
                >
                    Delete
                </Button>
            </CardFooter>
        </Card>
    );
}

export default AdminProductTile;
