import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import accImg from '../../assets/account.jpg';
import Orders from '@/components/shopping-view/orders';
import Address from '@/components/shopping-view/address';

function ShoppingAccount() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header Image */}
      <div className="relative h-[250px] w-full">
        <img
          src={accImg}
          alt="Account Header"
          className="h-full w-full object-cover rounded-b-xl shadow-sm"
        />
      </div>

      {/* Content */}
      <div className="container max-w-4xl mx-auto px-4 py-10">
        <div className="rounded-xl bg-white shadow-md p-6 sm:p-8 border border-gray-200">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">Your Account</h2>
          
          <Tabs defaultValue="orders" className="w-full">
            {/* Tab Buttons */}
            <TabsList className="mb-6 bg-gray-100 rounded-lg p-1 space-x-2">
              <TabsTrigger
                value="orders"
                className="px-4 py-2 text-sm font-medium rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-gray-900"
              >
                Orders
              </TabsTrigger>
              <TabsTrigger
                value="address"
                className="px-4 py-2 text-sm font-medium rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-gray-900"
              >
                Address
              </TabsTrigger>
            </TabsList>

            {/* Tab Content */}
            <TabsContent value="orders">
              <Orders />
            </TabsContent>
            <TabsContent value="address">
              <Address />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default ShoppingAccount;
