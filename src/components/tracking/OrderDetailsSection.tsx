import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import { ShoppingBag, MapPin, Receipt, Phone, Clock } from "lucide-react";

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  options?: string[];
}

interface RestaurantInfo {
  name: string;
  address: string;
  phone: string;
  orderTime: string;
}

interface OrderReceipt {
  subtotal: number;
  deliveryFee: number;
  tax: number;
  tip: number;
  total: number;
}

interface OrderDetailsProps {
  orderItems?: OrderItem[];
  restaurantInfo?: RestaurantInfo;
  orderReceipt?: OrderReceipt;
  orderNumber?: string;
}

const OrderDetailsSection: React.FC<OrderDetailsProps> = ({
  orderItems = [
    {
      id: "1",
      name: "Chicken Burger",
      quantity: 1,
      price: 12.99,
      options: ["No onions", "Extra sauce"],
    },
    {
      id: "2",
      name: "French Fries (Large)",
      quantity: 1,
      price: 4.99,
    },
    {
      id: "3",
      name: "Chocolate Milkshake",
      quantity: 1,
      price: 5.99,
    },
  ],
  restaurantInfo = {
    name: "Burger Palace",
    address: "123 Main Street, Anytown",
    phone: "(555) 123-4567",
    orderTime: "Today at 12:30 PM",
  },
  orderReceipt = {
    subtotal: 23.97,
    deliveryFee: 2.99,
    tax: 2.4,
    tip: 4.0,
    total: 33.36,
  },
  orderNumber = "#12345",
}) => {
  return (
    <div className="w-full max-w-md bg-white rounded-xl shadow-md overflow-hidden">
      <Card className="h-full">
        <CardHeader className="bg-primary/5">
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl font-bold">Order Details</CardTitle>
            <Badge variant="outline" className="text-primary">
              {orderNumber}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="p-4 overflow-auto max-h-[500px]">
          {/* Items Ordered List */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <ShoppingBag className="h-5 w-5 text-primary" />
              <h3 className="font-semibold text-lg">Items Ordered</h3>
            </div>
            <ul className="space-y-3">
              {orderItems.map((item) => (
                <li key={item.id} className="border-b pb-2">
                  <div className="flex justify-between">
                    <div>
                      <span className="font-medium">{item.quantity}x </span>
                      <span>{item.name}</span>
                      {item.options && item.options.length > 0 && (
                        <div className="text-sm text-gray-500 ml-5 mt-1">
                          {item.options.map((option, idx) => (
                            <div key={idx}>• {option}</div>
                          ))}
                        </div>
                      )}
                    </div>
                    <span className="font-medium">
                      ${item.price.toFixed(2)}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <Separator className="my-4" />

          {/* Restaurant Information */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <MapPin className="h-5 w-5 text-primary" />
              <h3 className="font-semibold text-lg">Restaurant Information</h3>
            </div>
            <div className="space-y-2 pl-1">
              <p className="font-medium">{restaurantInfo.name}</p>
              <p className="text-gray-600 text-sm">{restaurantInfo.address}</p>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Phone className="h-4 w-4" />
                <span>{restaurantInfo.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock className="h-4 w-4" />
                <span>Order placed: {restaurantInfo.orderTime}</span>
              </div>
            </div>
          </div>

          <Separator className="my-4" />

          {/* Order Receipt */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Receipt className="h-5 w-5 text-primary" />
              <h3 className="font-semibold text-lg">Receipt</h3>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>${orderReceipt.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Delivery Fee</span>
                <span>${orderReceipt.deliveryFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span>${orderReceipt.tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tip</span>
                <span>${orderReceipt.tip.toFixed(2)}</span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>${orderReceipt.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderDetailsSection;
