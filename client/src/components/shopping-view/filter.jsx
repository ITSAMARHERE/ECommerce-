import { filterOptions } from "@/config";
import { Fragment } from "react";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { Separator } from "../ui/separator";

function ProductFilter({filters, handleFilter}) {
    return (
        <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
            <div className="pb-4 border-b border-gray-300">
                <h2 className="text-lg font-extrabold text-gray-900">Filters</h2>
            </div>
            <div className="py-4 space-y-6">
                {Object.keys(filterOptions).map((keyItem, index) => (
                    <Fragment key={index}>
                        <div className="p-3 border border-gray-300 rounded-lg">
                            <h3 className="text-base font-bold text-gray-800">{keyItem}</h3>
                            <div className="grid gap-3 mt-2">
                                {filterOptions[keyItem].map((option, idx) => (
                                    <Label key={idx} className="flex font-medium items-center gap-2 text-gray-700 hover:text-gray-900 cursor-pointer">
                                        <Checkbox
                                        checked={
                                            filters && Object.keys(filters).length > 0 && 
                                            filters[keyItem] && filters[keyItem].indexOf(option.id) > -1
                                        }
                                        onCheckedChange={()=>handleFilter(keyItem, option.id)} 
                                        className="border-gray-400 focus:ring-2 focus:ring-gray-500"/>
                                        {option.label}
                                    </Label>
                                ))}
                            </div>
                        </div>
                        {index !== Object.keys(filterOptions).length - 1 && <Separator className="border-gray-300" />}
                    </Fragment>
                ))}
            </div>
        </div>
    );
}

export default ProductFilter;
