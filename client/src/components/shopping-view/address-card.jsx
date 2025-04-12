import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Label } from "../ui/label";

function AddressCard({
  addressInfo,
  handleDeleteAddress,
  handleEditAddress,
  setCurrentSelectedAddress,
  selectedId,
}) {
  const isSelected = selectedId?._id === addressInfo?._id;

  return (
    <Card
      onClick={
        setCurrentSelectedAddress
          ? () => setCurrentSelectedAddress(addressInfo)
          : null
      }
      className={` transition-all duration-200 ${
        isSelected
          ? "border-[2px] border-gray-900 bg-gray-50"
          : "border border-gray-200 hover:border-gray-400"
      }`}
    >
      <CardContent className="grid gap-2 p-4 text-sm text-gray-800">
        <Label>Address: {addressInfo?.address}</Label>
        <Label>City: {addressInfo?.city}</Label>
        <Label>Pincode: {addressInfo?.pincode}</Label>
        <Label>Phone: {addressInfo?.phone}</Label>
        {addressInfo?.notes && <Label>Notes: {addressInfo?.notes}</Label>}
      </CardContent>

      <CardFooter className="px-4 pb-4 pt-2 flex justify-end gap-3">
        <Button
          variant="outline"
          className="cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            handleEditAddress(addressInfo);
          }}
        >
          Edit
        </Button>
        <Button
          variant="destructive"
          className="cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            handleDeleteAddress(addressInfo);
          }}
        >
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
}

export default AddressCard;
