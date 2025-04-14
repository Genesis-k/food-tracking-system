import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import CartItem, { CartItemProps } from "./CartItem";
import CartSummary from "./CartSummary";
import { Button } from "../ui/button";
import { ShoppingCart, ArrowLeft, RefreshCw } from "lucide-react";
import { formatCurrency } from "../../utils/currencyConverter";

// Sample cart items
const initialCartItems: Omit<
  CartItemProps,
  "onIncrement" | "onDecrement" | "onRemove"
>[] = [
  {
    id: "1",
    name: "Chicken Burger",
    price: 8.99,
    quantity: 1,
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&q=80",
    options: ["No onions", "Extra sauce"],
  },
  {
    id: "2",
    name: "French Fries (Large)",
    price: 3.99,
    quantity: 1,
    image:
      "https://images.unsplash.com/photo-1576107232684-1279f390859f?w=300&q=80",
  },
  {
    id: "3",
    name: "Chocolate Milkshake",
    price: 4.99,
    quantity: 1,
    image:
      "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=300&q=80",
  },
];

const CartPage = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [subtotal, setSubtotal] = useState(0);
  const [deliveryFee, setDeliveryFee] = useState(2.99);
  const [tax, setTax] = useState(0);
  const [total, setTotal] = useState(0);
  const [currency, setCurrency] = useState<"USD" | "KSH">("USD");

  // Calculate totals whenever cart items change
  useEffect(() => {
    const newSubtotal = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );
    const newTax = newSubtotal * 0.08; // 8% tax rate
    const newTotal = newSubtotal + deliveryFee + newTax;

    setSubtotal(newSubtotal);
    setTax(newTax);
    setTotal(newTotal);
  }, [cartItems, deliveryFee]);

  // Handle quantity increment
  const handleIncrement = (id: string) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  };

  // Handle quantity decrement
  const handleDecrement = (id: string) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item,
      ),
    );
  };

  // Handle item removal
  const handleRemove = (id: string) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  // Handle checkout
  const handleCheckout = () => {
    // In a real app, this would process the order and redirect to payment
    alert("Proceeding to checkout...");
    // Simulate order placement and redirect to tracking
    setTimeout(() => {
      navigate("/tracking");
    }, 1000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Link to="/" className="mr-4">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Your Cart</h1>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-2"
          onClick={() =>
            setCurrency((prev) => (prev === "USD" ? "KSH" : "USD"))
          }
        >
          <RefreshCw className="h-4 w-4" />
          <span>{currency === "USD" ? "Switch to KSh" : "Switch to $"}</span>
        </Button>
      </div>

      {cartItems.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">Cart Items</h2>
              <div className="divide-y divide-gray-200">
                {cartItems.map((item) => (
                  <CartItem
                    key={item.id}
                    {...item}
                    currency={currency}
                    onIncrement={handleIncrement}
                    onDecrement={handleDecrement}
                    onRemove={handleRemove}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <CartSummary
              subtotal={subtotal}
              deliveryFee={deliveryFee}
              tax={tax}
              total={total}
              currency={currency}
              onCheckout={handleCheckout}
            />
          </div>
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm">
          <ShoppingCart className="h-16 w-16 mx-auto text-gray-400 mb-4" />
          <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
          <p className="text-gray-500 mb-6">
            Looks like you haven't added any items to your cart yet.
          </p>
          <Button asChild>
            <Link to="/restaurants">Browse Restaurants</Link>
          </Button>
        </div>
      )}
    </div>
  );
};

export default CartPage;
