import { Button } from '@/components/ui/button'
import bannerOne from '../../assets/banner-1.webp'
import bannerTwo from '../../assets/banner-2.webp'
import bannerThree from '../../assets/banner-3.webp'
import {
    Airplay, BabyIcon, ChevronLeftIcon, ChevronRightIcon,
    CloudLightning, Heater, Images, Shirt, ShirtIcon,
    ShoppingBasket, UmbrellaIcon, WashingMachine, WatchIcon
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllFilteredProducts } from '@/store/shop/products-slice'
import ShoppingProducTile from '@/components/shopping-view/product-tile'

const categoriesWithIcon = [
    { id: "men", label: "Men", icon: ShirtIcon },
    { id: "women", label: "Women", icon: CloudLightning },
    { id: "kids", label: "Kids", icon: BabyIcon },
    { id: "accessories", label: "Accessories", icon: WatchIcon },
    { id: "footwear", label: "Footwear", icon: UmbrellaIcon },
];

const brandsWithIcon = [
    { id: "nike", label: "Nike", icon: Shirt },
    { id: "adidas", label: "Adidas", icon: WashingMachine },
    { id: "puma", label: "Puma", icon: ShoppingBasket },
    { id: "levi", label: "Levi's", icon: Airplay },
    { id: "zara", label: "Zara", icon: Images },
    { id: "h&m", label: "H&M", icon: Heater },
];

function ShoppingHome() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const { productList } = useSelector(state => state.shopProducts);
    const dispatch = useDispatch();
    const slides = [bannerOne, bannerTwo, bannerThree];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide(prevSlide => (prevSlide + 1) % slides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        dispatch(fetchAllFilteredProducts({ filterParams: {}, sortParams: 'price-lowtohigh' }));
    }, [dispatch]);

    return (
        <div className="flex flex-col min-h-screen">
            {/* Banner Slider */}
            <div className="relative w-full h-[600px] overflow-hidden">
                {slides.map((slide, index) => (
                    <img
                        src={slide}
                        key={index}
                        className={`${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'} absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out`}
                        alt={`Slide ${index + 1}`}
                    />
                ))}

                {/* Gradient Overlay */}
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-white/60 via-transparent to-black/40 z-10 pointer-events-none"></div>

                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length)}
                    className="absolute top-1/2 left-6 z-20 transform -translate-y-1/2 bg-white shadow-md hover:bg-gray-100"
                >
                    <ChevronLeftIcon className='w-6 h-6 text-gray-700' />
                </Button>

                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setCurrentSlide(prev => (prev + 1) % slides.length)}
                    className="absolute top-1/2 right-6 z-20 transform -translate-y-1/2 bg-white shadow-md hover:bg-gray-100"
                >
                    <ChevronRightIcon className='w-6 h-6 text-gray-700' />
                </Button>
            </div>

            {/* Categories */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Shop by Category</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                        {categoriesWithIcon.map(({ id, label, icon: Icon }) => (
                            <Card key={id} className="group cursor-pointer hover:shadow-lg transition-all duration-300 border border-gray-200 rounded-xl">
                                <CardContent className="flex flex-col items-center justify-center p-6">
                                    <Icon className='w-12 h-12 mb-3 text-primary group-hover:scale-110 transition-transform duration-300' />
                                    <span className="text-lg font-medium text-gray-700 group-hover:text-primary">{label}</span>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Brands */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4">
                    <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Shop by Brand</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                        {brandsWithIcon.map(({ id, label, icon: Icon }) => (
                            <Card key={id} className="group cursor-pointer hover:shadow-lg transition-all duration-300 border border-gray-200 rounded-xl">
                                <CardContent className="flex flex-col items-center justify-center p-6">
                                    <Icon className='w-12 h-12 mb-3 text-primary group-hover:scale-110 transition-transform duration-300' />
                                    <span className="text-lg font-medium text-gray-700 group-hover:text-primary">{label}</span>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Products */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Featured Products</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {productList && productList.length > 0 && productList.map(product => (
                            <ShoppingProducTile key={product.id} product={product} />
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}

export default ShoppingHome;
