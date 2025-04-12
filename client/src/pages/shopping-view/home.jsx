import { Button } from '@/components/ui/button'
import bannerOne from '../../assets/banner-1.webp'
import bannerTwo from '../../assets/banner-2.webp'
import bannerThree from '../../assets/banner-3.webp'
import { Shirt, Baby, Watch, Footprints, ShoppingBag, Activity, TrendingUp, Flame, Gem, Star, Crown, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Card, CardContent } from '@/components/ui/card'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllFilteredProducts, fetchProductDetails } from '@/store/shop/products-slice'
import ShoppingProducTile from '@/components/shopping-view/product-tile'
import { useNavigate } from 'react-router-dom'
import { addToCart, fetchCartItems } from '@/store/shop/cart-slice'
import { toast, } from "sonner";
import ProductDetailsDialog from '@/components/shopping-view/product-details'

const categoriesWithIcon = [
    { id: "men", label: "Men", icon: Shirt },
    { id: "women", label: "Women", icon: ShoppingBag },
    { id: "kids", label: "Kids", icon: Baby },
    { id: "accessories", label: "Accessories", icon: Watch },
    { id: "footwear", label: "Footwear", icon: Footprints },
];

const brandsWithIcon = [
    { id: "nike", label: "Nike", icon: Activity },
    { id: "adidas", label: "Adidas", icon: TrendingUp },
    { id: "puma", label: "Puma", icon: Flame },
    { id: "levi", label: "Levi's", icon: Gem },
    { id: "zara", label: "Zara", icon: Star },
    { id: "h&m", label: "H&M", icon: Crown },
];

function ShoppingHome() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const { productList, productDetails } = useSelector((state) => state.shopProducts);
    const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
    const { user } = useSelector((state) => state.auth);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const slides = [bannerOne, bannerTwo, bannerThree];

    const handleNavigateToListingPage = (item, section) => {
        sessionStorage.removeItem('filters');
        sessionStorage.setItem('filters', JSON.stringify({ [section]: [item.id] }));
        navigate('/shop/listing');
    };

    function handleGetProductDetails(getCurrentProductId) {
        dispatch(fetchProductDetails(getCurrentProductId));
    }

    function handleAddtoCart(getCurrentProductId) {
        dispatch(
            addToCart({
                userId: user?.id,
                productId: getCurrentProductId,
                quantity: 1,
            })
        ).then((data) => {
            if (data?.payload?.success) {
                dispatch(fetchCartItems(user?.id));
                toast.success("Product added to cart");
            }
        });
    }

    useEffect(() => {
        if (productDetails !== null) setOpenDetailsDialog(true);
    }, [productDetails]);



    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide(prev => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        dispatch(fetchAllFilteredProducts({ filterParams: {}, sortParams: 'price-lowtohigh' }));
    }, [dispatch]);

    return (
        <div className="flex flex-col min-h-screen bg-white">
            {/* Banner Carousel */}
            <div className="relative w-full h-[600px] overflow-hidden">
                {slides.map((slide, index) => (
                    <img
                        key={index}
                        src={slide}
                        alt={`Banner ${index + 1}`}
                        className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
                    />
                ))}
                <Button variant="ghost" size="icon"
                    onClick={() => setCurrentSlide((currentSlide - 1 + slides.length) % slides.length)}
                    className="absolute top-1/2 left-6 transform -translate-y-1/2 bg-white/70 hover:bg-white shadow-md rounded-full"
                >
                    <ChevronLeftIcon className="w-6 h-6 text-gray-800" />
                </Button>
                <Button variant="ghost" size="icon"
                    onClick={() => setCurrentSlide((currentSlide + 1) % slides.length)}
                    className="absolute top-1/2 right-6 transform -translate-y-1/2 bg-white/70 hover:bg-white shadow-md rounded-full"
                >
                    <ChevronRightIcon className="w-6 h-6 text-gray-800" />
                </Button>
            </div>

            {/* Categories */}
            <section className="py-16 bg-gray-100">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-semibold text-center mb-10 text-gray-800">Shop by Category</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
                        {categoriesWithIcon.map((item) => (
                            <Card
                                key={item.id}
                                onClick={() => handleNavigateToListingPage(item, 'category')}
                                className="cursor-pointer hover:shadow-lg transition-shadow border border-gray-300"
                            >
                                <CardContent className="flex flex-col items-center p-6">
                                    <item.icon className="w-12 h-12 text-blue-600 mb-3" />
                                    <span className="font-semibold text-gray-700">{item.label}</span>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Brands */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-semibold text-center mb-10 text-gray-800">Shop by Brand</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
                        {brandsWithIcon.map((brand) => (
                            <Card
                                key={brand.id}
                                onClick={() => handleNavigateToListingPage(brand, 'brand')}
                                className="cursor-pointer hover:shadow-lg transition-shadow border border-gray-300"
                            >
                                <CardContent className="flex flex-col items-center p-6">
                                    <brand.icon className="w-12 h-12 text-green-600 mb-3" />
                                    <span className="font-semibold text-gray-700">{brand.label}</span>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Products */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-semibold text-center mb-10 text-gray-800">Featured Products</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {
                            productList?.length > 0
                                ? productList
                                    .slice(-4) 
                                    .map((productItem, index) => (
                                        <ShoppingProducTile
                                            handleGetProductDetails={handleGetProductDetails}
                                            key={index}
                                            product={productItem}
                                            handleAddtoCart={handleAddtoCart}
                                        />
                                    ))
                                : <p className="text-center col-span-full text-gray-500">No featured products available.</p>
                        }
                    </div>
                </div>
            </section>
            <ProductDetailsDialog
                open={openDetailsDialog}
                setOpen={setOpenDetailsDialog}
                productDetails={productDetails}
            />
        </div>
    );
}

export default ShoppingHome;
