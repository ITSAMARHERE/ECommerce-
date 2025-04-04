import ProductFilter from "@/components/shopping-view/filter";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { sortOptions } from "@/config";
import { fetchAllFilteredProducts } from "@/store/shop/products-slice";
import { ArrowUpDownIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ShoppingProducTile from "@/components/shopping-view/product-tile";

function ShoppingListing() {
  const dispatch = useDispatch();
  const { productList } = useSelector((state) => state.shopProducts);
  const [filters,setFilters] = useState({});
  const [sort, setSort ] = useState(null);

  function handleSort (value){
    setSort(value);
  }

function handleFilter(getSectionId,getCurrentOptions){
    console.log(getSectionId,getCurrentOptions);

    let cpyFilters = {...filters};
    const indexOfCurrentSection = Object.keys(cpyFilters).indexOf(getSectionId);

    if(indexOfCurrentSection === -1){
        cpyFilters = {
            ...cpyFilters,
            [getSectionId]: [getCurrentOptions]
        };
    }else{
        const indexofCurrentOption = cpyFilters[getSectionId].indexOf(getCurrentOptions);

        if(indexofCurrentOption === -1) cpyFilters[getSectionId].push(getCurrentOptions)
            else cpyFilters[getSectionId].splice(indexOfCurrentSection , 1)
    }

    setFilters(cpyFilters);
    sessionStorage.setItem('filters', JSON.stringify(cpyFilters))
}

useEffect(()=>{
    setSort("price-lowtohigh");
    setFilters(JSON.parse(sessionStorage.getItem("filters")) || {})
},[])

  useEffect(() => {
    dispatch(fetchAllFilteredProducts());
  }, [dispatch]);

  console.log(filters, "filters")

  return (
    <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-6 p-4 md:p-8 bg-gray-50 min-h-screen">
      {/* Sidebar Filter */}
      <aside className="bg-white rounded-2xl shadow-md p-4 border border-gray-200 sticky top-4 h-fit">
        <ProductFilter filters={filters} handleFilter={handleFilter} />
      </aside>

      {/* Product List Section */}
      <section className="bg-white rounded-2xl shadow-md border border-gray-200 flex flex-col">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">All Products</h2>
          <div className="flex items-center gap-3">
            <span className="text-gray-600 text-sm">
              {productList?.length ?? 0} Products
            </span>

            {/* Sorting */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2 text-sm"
                >
                  <ArrowUpDownIcon className="h-4 w-4" />
                  Sort by
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-48 bg-white border shadow-lg rounded-lg"
              >
                <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
                  {sortOptions.map((sortItem) => (
                    <DropdownMenuRadioItem
                      key={sortItem.id}
                      value={sortItem.id}
                    >
                      {sortItem.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
          {productList && productList.length > 0 ? (
            productList.map((productItem, index) => (
              <ShoppingProducTile key={index} product={productItem} />
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500 py-16">
              No products found.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default ShoppingListing;
