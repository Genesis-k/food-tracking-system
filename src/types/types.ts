/**
 * Common type definitions for the application
 */

/**
 * Driver information type
 */
export interface DriverInfo {
  id: string;
  name: string;
  photo: string;
  phone: string;
  rating: number;
  vehicle: string;
  licensePlate: string;
  location?: {
    lat: number;
    lng: number;
  };
  status?: "available" | "assigned" | "on_the_way" | "arrived" | "completed";
}

/**
 * Restaurant type
 */
export interface Restaurant {
  id: string;
  name: string;
  image: string;
  cuisine: string;
  rating: number;
  deliveryTime: string;
  deliveryFee: string | number;
  distance: string;
  address?: string;
  description?: string;
  isNew?: boolean;
  isFeatured?: boolean;
  menu?: MenuItem[];
}

/**
 * Menu item type
 */
export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  popular?: boolean;
  options?: MenuItemOption[];
}

/**
 * Menu item option type
 */
export interface MenuItemOption {
  name: string;
  choices: {
    id: string;
    name: string;
    price?: number;
  }[];
  required?: boolean;
  multiple?: boolean;
}

/**
 * Order status type
 */
export interface OrderStatus {
  id: string;
  label: string;
  completed: boolean;
  current: boolean;
  time: string;
}
