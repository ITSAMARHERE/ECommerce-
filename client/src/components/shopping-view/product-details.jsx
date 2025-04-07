import { StarIcon } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { Dialog, DialogContent } from "../ui/dialog";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";

function ProductDetailsDialog({ open, setOpen, productDetails }) {
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="bg-white grid grid-cols-1 md:grid-cols-2 gap-6 p-6 sm:p-8 md:p-10 max-w-[95vw] sm:max-w-[90vw] lg:max-w-[65vw] rounded-2xl shadow-2xl">

                {/* Image Section */}
                <div className="relative overflow-hidden rounded-xl border border-gray-200 shadow-md">
                    <img
                        src={productDetails?.image}
                        alt={productDetails?.title}
                        className="aspect-square w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                </div>

                {/* Details Section */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-md p-5 flex flex-col gap-4">
                    <h1 className="text-3xl font-bold text-gray-900">{productDetails?.title}</h1>
                    <p className="text-gray-700 text-sm leading-relaxed">{productDetails?.description}</p>

                    {/* Price Section */}
                    <div className="flex justify-between items-center mt-2">
                        <span
                            className={`text-xl font-medium ${productDetails?.salePrice > 0 ? "text-gray-400 line-through" : "text-black"}`}
                        >
                            ${productDetails?.price}
                        </span>
                        {productDetails?.salePrice > 0 && (
                            <span className="text-xl font-bold text-black">
                                ${productDetails?.salePrice}
                            </span>
                        )}
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mt-2">
                        <div className="flex gap-0.5">
                            {[...Array(5)].map((_, i) => (
                                <StarIcon key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            ))}
                        </div>
                        <span className="text-xs text-muted-foreground">(4.5)</span>
                    </div>

                    <Button className="mt-3 w-full text-sm py-2.5">Add to Cart</Button>

                    <Separator className="my-5" />

                    {/* Reviews */}
                    <div className="max-h-[250px] overflow-y-auto pr-1">
                        <h2 className="text-lg font-semibold mb-3">Reviews</h2>
                        <div className="grid gap-4">
                            {[1, 2, 3].map((_, idx) => (
                                <div key={idx} className="flex items-start gap-3">
                                    <Avatar className="w-9 h-9 border">
                                        <AvatarFallback>AP</AvatarFallback>
                                    </Avatar>
                                    <div className="flex flex-col gap-1">
                                        <div className="flex items-center gap-2">
                                            <h3 className="text-sm font-semibold">Amar Pal</h3>
                                        </div>
                                        <div className="flex gap-0.5">
                                            {[...Array(5)].map((_, i) => (
                                                <StarIcon key={i} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                                            ))}
                                        </div>
                                        <p className="text-xs text-muted-foreground">
                                            This is an awesome product.
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Review Input */}
                        <div className="mt-4 flex gap-2">
                            <Input placeholder="Write a review..." className="flex-1 text-sm" />
                            <Button size="sm">Submit</Button>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default ProductDetailsDialog;
