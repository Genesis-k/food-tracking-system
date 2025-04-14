import React from "react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Link } from "react-router-dom";
import { getDisplayAmount } from "../../utils/currencyConverter";

interface CartSummaryProps {
  subtotal: number;
  deliveryFee: number;
  tax: number;
  total: number;
  currency?: string;
  onCheckout: () => void;
}

const CartSummary: React.FC<CartSummaryProps> = ({
  subtotal,
  deliveryFee,
  tax,
  total,
  currency = "USD",
  onCheckout,
}) => {
  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal</span>
          <span>{getDisplayAmount(subtotal, currency)}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600">Delivery Fee</span>
          <span>{getDisplayAmount(deliveryFee, currency)}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600">Tax</span>
          <span>{getDisplayAmount(tax, currency)}</span>
        </div>

        <Separator className="my-2" />

        <div className="flex justify-between font-semibold">
          <span>Total</span>
          <span>{getDisplayAmount(total, currency)}</span>
        </div>
      </div>

      <Button className="w-full mt-6" onClick={onCheckout}>
        Checkout
      </Button>

      <div className="mt-4 text-center">
        <Link
          to="/restaurants"
          className="text-sm text-primary hover:underline"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default CartSummary;
