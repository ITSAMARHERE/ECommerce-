import { HousePlug, LogOut, Menu, ShoppingCart, UserCog } from "lucide-react";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { SheetTrigger, Sheet, SheetContent } from "../ui/sheet";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { shoppingViewHeaderMenuItems } from "@/config";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { logoutUser } from "@/store/auth-slice";
import UserCartWrapper from "./cart-wrapper";
import { useEffect, useState } from "react";
import { fetchCartItems } from "@/store/shop/cart-slice";
import { Label } from "../ui/label";

function MenuItems() {

  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  function handleNavigate(getCurrentMenuItem) {
    sessionStorage.removeItem('filters')
    const currentFilter = getCurrentMenuItem.id !== 'home' && getCurrentMenuItem.id !== 'products'
     ?
      {
        category: [getCurrentMenuItem.id]
      } : null

    sessionStorage.setItem('filters', JSON.stringify(currentFilter));

    location.pathname.includes('listing') && currentFilter !== null ?
    setSearchParams(new URLSearchParams(`?category=${getCurrentMenuItem.id}`)) :

    navigate(getCurrentMenuItem.path)
  }
  return (
    <nav className="flex flex-col mb-3 lg:mb-0 lg:items-center gap-4 lg:flex-row">
      {shoppingViewHeaderMenuItems.map((menuItem) => (
        <Label
          onClick={() => handleNavigate(menuItem)}
          key={menuItem.id}
          className="text-sm cursor-pointer font-medium relative group transition-all"
        >
          <span className="hover:text-blue-600 transition-colors duration-300">
            {menuItem.label}
          </span>
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
        </Label>
      ))}
    </nav>
  );
}

function HeaderRightContent() {
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector(state => state.shopCart);
  const [openCartSheet, setOpenCartSheet] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(logoutUser());
  }

  useEffect(() => {
    if (user?.id) {
      console.log("Fetching cart for user ID:", user.id);
      dispatch(fetchCartItems(user?.id));
    } else {
      console.log("User ID is not available.");
    }
  }, [dispatch, user?.id]);
  
  console.log(cartItems, "myname")

  return (
    <div className="flex lg:items-center lg:flex-row flex-col gap-4">
      <Sheet open={openCartSheet} onOpenChange={() => setOpenCartSheet(false)}>
        <Button
          onClick={() => setOpenCartSheet(true)}
          size="icon"
          className=" cursor-pointer border border-gray-300 bg-white hover:bg-gray-100 transition-all duration-200 shadow-sm rounded-xl p-2"
        >
          <ShoppingCart className="w-5 h-5 text-gray-700" />
          <span className="sr-only">User cart</span>
        </Button>


        <UserCartWrapper
        setOpenCartSheet = {setOpenCartSheet}
        cartItems={
          cartItems && cartItems.items && cartItems.items.length > 0 ? cartItems.items : []} />
      </Sheet>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="bg-black cursor-pointer hover:scale-105 transition-transform shadow-md">
            <AvatarFallback className="bg-black text-white font-extrabold">
              {user?.userName[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          side="right"
          className="w-60 bg-white border border-gray-200 rounded-xl shadow-lg p-2 space-y-1"
        >
          <DropdownMenuLabel className="text-sm font-medium text-gray-500 px-2">
            Logged in as <span className="font-semibold text-gray-700">{user?.userName}</span>
          </DropdownMenuLabel>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            onClick={() => navigate("/shop/account")}
            className="cursor-pointer px-3 py-2 rounded-lg hover:bg-gray-100 flex items-center gap-2 text-gray-700 transition-colors"
          >
            <UserCog className="h-4 w-4 text-gray-500" />
            Account
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={handleLogout}
            className="cursor-pointer px-3 py-2 rounded-lg hover:bg-red-100 flex items-center gap-2 text-red-600 transition-colors"
          >
            <LogOut className="h-4 w-4 text-red-500" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

    </div>
  );
}

function ShoppingHeader() {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-300 bg-white">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <Link
          to="/shop/home"
          className="flex items-center gap-2 hover:text-blue-600 transition-colors duration-300"
        >
          <HousePlug className="h-6 w-6 text-blue-500" />
          <span className="font-bold text-gray-800 text-lg">Ecommerce</span>
        </Link>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="lg:hidden hover:bg-blue-100"
            >
              <Menu className="h-6 w-6 text-gray-700" />
              <span className="sr-only">Toggle header menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="w-full max-w-xs bg-white shadow-md border border-gray-300"
          >
            <MenuItems />
            <HeaderRightContent />
          </SheetContent>
        </Sheet>
        <div className="hidden lg:block">
          <MenuItems />
        </div>
        <div className="hidden lg:block">
          <HeaderRightContent />
        </div>
      </div>
    </header>
  );
}

export default ShoppingHeader;
