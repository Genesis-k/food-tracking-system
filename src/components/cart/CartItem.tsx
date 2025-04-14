import React from "react";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { getDisplayAmount } from "../../utils/currencyConverter";

export interface CartItemProps {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  options?: string[];
  currency?: string;
  onIncrement: (id: string) => void;
  onDecrement: (id: string) => void;
  onRemove: (id: string) => void;
}

const CartItem: React.FC<CartItemProps> = ({
  id,
  name,
  price,
  quantity,
  image,
  options = [],
  currency = "USD",
  onIncrement,
  onDecrement,
  onRemove,
}) => {
  return (
    <div className="flex border-b border-gray-200 py-4">
      <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md">
        <img src={image} alt={name} className="h-full w-full object-cover" />
      </div>

      <div className="ml-4 flex flex-1 flex-col">
        <div className="flex justify-between">
          <div>
            <h3 className="text-base font-medium text-gray-900">{name}</h3>
            {options.length > 0 && (
              <div className="mt-1 text-sm text-gray-500">
                {options.map((option, index) => (
                  <span key={index} className="block">
                    • {option}
                  </span>
                ))}
              </div>
            )}
          </div>
          <p className="text-sm font-medium text-gray-900">
            {getDisplayAmount(price * quantity, currency)}
          </p>
        </div>

        <div className="flex flex-1 items-end justify-between text-sm">
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              className="h-7 w-7"
              onClick={() => onDecrement(id)}
              disabled={quantity <= 1}
            >
              <Minus className="h-3 w-3" />
            </Button>
            <span className="text-gray-500 w-5 text-center">{quantity}</span>
            <Button
              variant="outline"
              size="icon"
              className="h-7 w-7"
              onClick={() => onIncrement(id)}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>

          <Button
            variant="ghost"
            size="sm"
            className="text-red-500 hover:text-red-700 hover:bg-red-50 p-0 h-auto"
            onClick={() => onRemove(id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
