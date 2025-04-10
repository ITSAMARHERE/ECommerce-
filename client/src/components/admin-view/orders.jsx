import { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import AdminOrderDetailsView from "./order-details";

function AdminOrdersView() {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

  return (
    <Card className="w-full border border-gray-200 shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">All Orders</CardTitle>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <Table className="border border-gray-200 rounded-md">
          <TableHeader>
            <TableRow>
              <TableHead className="min-w-[120px]">Order ID</TableHead>
              <TableHead className="min-w-[120px]">Order Date</TableHead>
              <TableHead className="min-w-[120px]">Order Status</TableHead>
              <TableHead className="min-w-[100px]">Order Price</TableHead>
              <TableHead className="text-right min-w-[120px]">
                <span className="sr-only">Details</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>123456</TableCell>
              <TableCell>27/06/2025</TableCell>
              <TableCell>
                <span className="px-2 py-1 rounded-md bg-yellow-100 text-yellow-800 text-sm font-medium">
                  In Process
                </span>
              </TableCell>
              <TableCell>$1000</TableCell>
              <TableCell className="text-right">
                <Button size="sm" onClick={() => setOpenDetailsDialog(true)} className="cursor-pointer">
                  View Details
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>

      <Dialog open={openDetailsDialog} onOpenChange={setOpenDetailsDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Order Details</DialogTitle>
          </DialogHeader>
          <AdminOrderDetailsView />
        </DialogContent>
      </Dialog>
    </Card>
  );
}

export default AdminOrdersView;
