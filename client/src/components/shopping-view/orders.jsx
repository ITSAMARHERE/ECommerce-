import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Dialog } from "../ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import ShoppingOrderDetailsView from "./order-details";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrdersByUserId,
  getOrderDetails,
  resetOrderDetails,
} from "@/store/shop/order-slice";
import { Badge } from "../ui/badge";

function ShoppingOrders() {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { orderList, orderDetails } = useSelector((state) => state.shopOrder);

  function handleFetchOrderDetails(getId) {
    dispatch(getOrderDetails(getId));
  }

  useEffect(() => {
    if (user?.id) {
      dispatch(getAllOrdersByUserId(user.id));
    }
  }, [dispatch, user?.id]);

  console.log(orderDetails,"orderDetails")

  return (
    <Card className="border border-gray-300 shadow-sm">
      <CardHeader className="border-b border-gray-300">
        <CardTitle className="text-lg font-semibold text-gray-800">
          Order History
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Table className="w-full border border-gray-300">
          <TableHeader className="bg-gray-100">
            <TableRow className="border-b border-gray-300">
              <TableHead className="border-r border-gray-300 px-4 py-2 text-gray-700">Order ID</TableHead>
              <TableHead className="border-r border-gray-300 px-4 py-2 text-gray-700">Order Date</TableHead>
              <TableHead className="border-r border-gray-300 px-4 py-2 text-gray-700">Order Status</TableHead>
              <TableHead className="border-r border-gray-300 px-4 py-2 text-gray-700">Order Price</TableHead>
              <TableHead className="px-4 py-2 text-gray-700">
                <span className="sr-only">Details</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orderList && orderList.length > 0
              ? orderList.map((orderItem) => (
                  <TableRow key={orderItem._id} className="border-b border-gray-300 hover:bg-gray-50">
                    <TableCell className="border-r border-gray-300 px-4 py-2">{orderItem?._id}</TableCell>
                    <TableCell className="border-r border-gray-300 px-4 py-2">{orderItem?.orderDate.split("T")[0]}</TableCell>
                    <TableCell className="border-r border-gray-300 px-4 py-2">
                      <Badge
                        className={`py-1 px-3 capitalize text-white ${
                          orderItem?.orderStatus === "confirmed"
                            ? "bg-green-500"
                            : orderItem?.orderStatus === "rejected"
                            ? "bg-red-600"
                            : "bg-black"
                        }`}
                      >
                        {orderItem?.orderStatus}
                      </Badge>
                    </TableCell>
                    <TableCell className="border-r border-gray-300 px-4 py-2">${orderItem?.totalAmount}</TableCell>
                    <TableCell className="px-4 py-2">
                      <Dialog
                        open={openDetailsDialog}
                        onOpenChange={() => {
                          setOpenDetailsDialog(false);
                          dispatch(resetOrderDetails());
                        }}
                      >
                        <Button
                          onClick={() => {
                            setOpenDetailsDialog(true);
                            handleFetchOrderDetails(orderItem?._id);
                          }}
                          variant="outline"
                          className="text-sm cursor-pointer"
                        >
                          View Details
                        </Button>
                        <ShoppingOrderDetailsView orderDetails={orderDetails} />
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))
              : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-6 text-gray-500">
                    No orders found.
                  </TableCell>
                </TableRow>
              )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default ShoppingOrders;
