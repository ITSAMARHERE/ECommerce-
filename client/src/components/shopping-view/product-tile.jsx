import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { brandOptionsMap, categoryOptionsMap } from "@/config";
import { Badge } from "../ui/badge";

function ShoppingProductTile({ product, handleGetProductDetails, handleAddtoCart }) {
  if (!product) return null;

  const stockBadge = () => {
    if (product?.totalStock === 0) {
      return (
        <Badge className="absolute top-2 left-2 bg-red-600 text-white font-semibold text-xs sm:text-sm px-2 py-1">
          Out of Stock
        </Badge>
      );
    } else if (product?.totalStock < 10) {
      return (
        <Badge className="absolute top-2 left-2 bg-red-600 text-white font-semibold text-xs sm:text-sm px-2 py-1">
          {`Only ${product?.totalStock} left`}
        </Badge>
      );
    } else if (product?.salePrice > 0) {
      return (
        <Badge className="absolute top-2 left-2 bg-orange-300 text-white font-semibold text-xs sm:text-sm px-2 py-1">
          Sale
        </Badge>
      );
    }
    return null;
  };

  return (
    <Card className="w-full h-full border border-gray-200 shadow-sm transition-all duration-300 ease-in-out hover:shadow-lg overflow-hidden rounded-xl flex flex-col">
      <div 
        onClick={() => handleGetProductDetails(product?._id)}
        className="cursor-pointer flex-grow"
      >
        {/* Image Section */}
        <div className="relative w-full overflow-hidden">
          <div className="relative pt-[75%]"> {/* 4:3 aspect ratio */}
            <img
              src={product?.image}
              alt={product?.title}
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
            />
            {stockBadge()}
          </div>
        </div>

        {/* Content Section */}
        <CardContent className="p-3 sm:p-4">
          <h2 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2 line-clamp-1">{product?.title}</h2>
          <div className="flex justify-between text-xs sm:text-sm text-gray-500 mb-2">
            <span className="truncate max-w-[45%]">{categoryOptionsMap[product?.category]}</span>
            <span className="truncate max-w-[45%]">{brandOptionsMap[product?.brand]}</span>
          </div>

          {/* Prices */}
          <div className="flex justify-between items-center mt-2">
            <span
              className={`${
                product?.salePrice > 0 ? "line-through text-gray-500" : "text-primary"
              } text-sm sm:text-base font-semibold`}
            >
              ${product?.price?.toFixed(2)}
            </span>
            {product?.salePrice > 0 && (
              <span className="text-sm sm:text-base font-bold text-primary">
                ${product?.salePrice?.toFixed(2)}
              </span>
            )}
          </div>
        </CardContent>
      </div>
      
      {/* Add to Cart Button */}
      <CardFooter className="p-3 sm:p-4 pt-0 sm:pt-1">
        {product?.totalStock === 0 ? (
          <Button className="w-full opacity-60 cursor-not-allowed text-xs sm:text-sm h-9">
            Out Of Stock
          </Button>
        ) : (
          <Button
            onClick={() => handleAddtoCart(product?._id, product?.totalStock)}
            className="w-full text-xs sm:text-sm h-9 hover:opacity-90 transition-opacity"
          >
            Add to cart
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

export default ShoppingProductTile;