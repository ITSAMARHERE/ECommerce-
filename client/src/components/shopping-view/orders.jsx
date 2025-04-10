import { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import ShoppingOrderDetailsView from "./order-details";

function ShoppingOrders() {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

  const orders = [
    {
      id: "123456",
      date: "27/06/2025",
      status: "In Process",
      price: "$1000",
    },
  ];

  return (
    <Card className="w-full border border-gray-300 shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Order History</CardTitle>
      </CardHeader>
      <CardContent className="overflow-x-auto p-0">
        <Table className="w-full border-t border-gray-200">
          <TableHeader>
            <TableRow className="bg-gray-50 border-b border-gray-200">
              <TableHead className="min-w-[100px]">Order ID</TableHead>
              <TableHead className="min-w-[120px]">Order Date</TableHead>
              <TableHead className="min-w-[120px]">Order Status</TableHead>
              <TableHead className="min-w-[100px]">Order Price</TableHead>
              <TableHead className="text-right min-w-[120px]">
                <span className="sr-only">Details</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id} className="border-b border-gray-200">
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>{order.status}</TableCell>
                <TableCell>{order.price}</TableCell>
                <TableCell className="text-right">
                  <Button size="sm" className="cursor-pointer" onClick={() => setOpenDetailsDialog(true)}>
                    View Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>

      <Dialog open={openDetailsDialog} onOpenChange={setOpenDetailsDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Order Details</DialogTitle>
          </DialogHeader>
          <ShoppingOrderDetailsView />
        </DialogContent>
      </Dialog>
    </Card>
  );
}

export default ShoppingOrders;
