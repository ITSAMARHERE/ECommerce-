import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { brandOptionsMap, categoryOptionsMap } from "@/config";
import { Badge } from "../ui/badge";

function ShoppingProducTile({ product }) {
  return (
    <Card className="w-full max-w-md mx-auto border border-gray-200 transition-transform duration-300 ease-in-out hover:scale-[1.02] hover:shadow-lg overflow-hidden rounded-2xl">
      {/* Image Section */}
      <div className="relative w-full">
        <img
          src={product?.image}
          alt={product?.title}
          className="w-full h-[220px] object-cover block rounded-t-2xl"
        />
        {product?.salePrice > 0 && (
          <Badge className="absolute top-2 left-2 bg-orange-300 hover:bg-orange-400 text-white font-semibold">
            Sale
          </Badge>
        )}
      </div>

      {/* Content Section */}
      <CardContent className="p-4">
        <h2 className="text-lg font-semibold mb-2 truncate">{product?.title}</h2>
        <div className="flex justify-between text-sm text-gray-500 mb-2">
          <span>{categoryOptionsMap[product?.category]}</span>
          <span>{brandOptionsMap[product?.brand]}</span>
        </div>

        {/* Prices */}
        <div className="flex justify-between items-center">
          <span
            className={`${
              product?.salePrice > 0 ? "line-through text-gray-500" : "text-primary"
            } text-base font-semibold`}
          >
            ${product?.price}
          </span>
          {product?.salePrice > 0 && (
            <span className="text-base font-bold text-primary">
              ${product?.salePrice}
            </span>
          )}
        </div>
      </CardContent>

      {/* Add to Cart Button */}
      <CardFooter>
        <Button className="w-full cursor-pointer">Add to cart</Button>
      </CardFooter>
    </Card>
  );
}

export default ShoppingProducTile;
