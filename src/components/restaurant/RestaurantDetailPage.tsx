import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  Star,
  Clock,
  MapPin,
  Plus,
  Info,
  ShoppingCart,
} from "lucide-react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { getDisplayAmount } from "../../utils/currencyConverter";
import { Restaurant, MenuItem } from "../../types/types";

// Sample restaurant data
const sampleRestaurant: Restaurant = {
  id: "1",
  name: "Burger Palace",
  image:
    "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80",
  cuisine: "American • Burgers",
  rating: 4.5,
  deliveryTime: "15-25 min",
  deliveryFee: "$1.99",
  distance: "1.2 miles",
  address: "123 Main Street, Nairobi",
  description:
    "Serving the juiciest burgers in town since 2010. Our beef is locally sourced and our buns are baked fresh daily.",
  menu: [
    {
      id: "1",
      name: "Classic Burger",
      description:
        "Beef patty, lettuce, tomato, onion, pickles, and our special sauce",
      price: 8.99,
      image:
        "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&q=80",
      category: "Burgers",
      popular: true,
    },
    {
      id: "2",
      name: "Cheese Burger",
      description:
        "Beef patty, American cheese, lettuce, tomato, onion, pickles, and our special sauce",
      price: 9.99,
      image:
        "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=300&q=80",
      category: "Burgers",
      popular: true,
    },
    {
      id: "3",
      name: "Bacon Burger",
      description:
        "Beef patty, bacon, American cheese, lettuce, tomato, onion, and our special sauce",
      price: 10.99,
      image:
        "https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=300&q=80",
      category: "Burgers",
    },
    {
      id: "4",
      name: "French Fries",
      description:
        "Crispy golden fries seasoned with our special blend of spices",
      price: 3.99,
      image:
        "https://images.unsplash.com/photo-1576107232684-1279f390859f?w=300&q=80",
      category: "Sides",
      popular: true,
    },
    {
      id: "5",
      name: "Onion Rings",
      description:
        "Crispy battered onion rings served with our special dipping sauce",
      price: 4.99,
      image:
        "https://images.unsplash.com/photo-1639024471283-03518883512d?w=300&q=80",
      category: "Sides",
    },
    {
      id: "6",
      name: "Chocolate Milkshake",
      description:
        "Rich and creamy chocolate milkshake topped with whipped cream",
      price: 4.99,
      image:
        "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=300&q=80",
      category: "Drinks",
    },
  ],
};

// Group menu items by category
const groupMenuByCategory = (menu: MenuItem[]) => {
  return menu.reduce(
    (acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = [];
      }
      acc[item.category].push(item);
      return acc;
    },
    {} as Record<string, MenuItem[]>,
  );
};

// Sort categories in a specific order
const sortCategories = (categories: string[]) => {
  // Define the order of categories (customize as needed)
  const categoryOrder = ["Burgers", "Sides", "Drinks", "Desserts"];

  return categories.sort((a, b) => {
    const indexA = categoryOrder.indexOf(a);
    const indexB = categoryOrder.indexOf(b);

    // If both categories are in the predefined order
    if (indexA !== -1 && indexB !== -1) {
      return indexA - indexB;
    }

    // If only one category is in the predefined order
    if (indexA !== -1) return -1;
    if (indexB !== -1) return 1;

    // If neither category is in the predefined order, sort alphabetically
    return a.localeCompare(b);
  });
};

interface RestaurantDetailPageProps {
  onAddToCart?: (item: MenuItem, quantity: number) => void;
  currency?: string;
}

const RestaurantDetailPage: React.FC<RestaurantDetailPageProps> = ({
  onAddToCart = (item) => console.log(`Added ${item.name} to cart`),
  currency = "USD",
}) => {
  const { id } = useParams<{ id: string }>();
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("menu");
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    // In a real app, this would fetch the restaurant data from an API
    // For now, we'll use the sample data
    setTimeout(() => {
      setRestaurant(sampleRestaurant);
      setLoading(false);
    }, 500);
  }, [id]);

  const handleAddToCart = (item: MenuItem) => {
    onAddToCart(item, 1);
    setCartCount((prev) => prev + 1);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!restaurant) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Restaurant not found</h2>
          <Button asChild>
            <Link to="/restaurants">Back to Restaurants</Link>
          </Button>
        </div>
      </div>
    );
  }

  const menuByCategory = groupMenuByCategory(restaurant.menu || []);
  const categories = sortCategories(Object.keys(menuByCategory));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with restaurant image */}
      <div className="relative h-64 md:h-80">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
          <Link to="/restaurants">
            <Button
              variant="outline"
              size="icon"
              className="bg-white/80 hover:bg-white"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <Link to="/cart">
            <Button
              variant="outline"
              size="icon"
              className="bg-white/80 hover:bg-white relative"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Button>
          </Link>
        </div>
        <div className="absolute bottom-4 left-4 right-4 text-white">
          <h1 className="text-2xl md:text-3xl font-bold">{restaurant.name}</h1>
          <div className="flex items-center mt-1 text-sm">
            <span className="flex items-center mr-3">
              <Star
                className="h-4 w-4 text-yellow-400 mr-1"
                fill="currentColor"
              />
              {restaurant.rating.toFixed(1)}
            </span>
            <span className="flex items-center mr-3">
              <Clock className="h-4 w-4 mr-1" />
              {restaurant.deliveryTime}
            </span>
            <span className="flex items-center">
              <MapPin className="h-4 w-4 mr-1" />
              {restaurant.distance}
            </span>
          </div>
        </div>
      </div>

      {/* Restaurant info and menu */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600">{restaurant.cuisine}</p>
              <p className="text-gray-600 text-sm mt-1">{restaurant.address}</p>
            </div>
            <Badge variant="outline" className="flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              {restaurant.deliveryTime}
            </Badge>
          </div>
          {restaurant.description && (
            <p className="mt-4 text-gray-700">{restaurant.description}</p>
          )}
        </div>

        {/* Tabs for Menu and Info */}
        <Tabs
          defaultValue="menu"
          value={activeTab}
          onValueChange={setActiveTab}
        >
          <TabsList className="mb-6">
            <TabsTrigger value="menu">Menu</TabsTrigger>
            <TabsTrigger value="info">Info</TabsTrigger>
          </TabsList>

          <TabsContent value="menu" className="space-y-8">
            <div className="sticky top-0 z-10 bg-gray-50 py-2 mb-4 overflow-x-auto">
              <div className="flex space-x-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const element = document.getElementById(
                        `category-${category}`,
                      );
                      if (element) {
                        element.scrollIntoView({ behavior: "smooth" });
                      }
                    }}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>

            {categories.map((category) => (
              <div
                key={category}
                id={`category-${category}`}
                className="scroll-mt-16"
              >
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  {category}
                  <div className="h-px flex-grow bg-gray-200 ml-4"></div>
                </h2>
                <div className="space-y-4">
                  {menuByCategory[category].map((item) => (
                    <div
                      key={item.id}
                      className="flex items-start p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
                    >
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h3 className="font-medium">{item.name}</h3>
                          <p className="font-medium">
                            {getDisplayAmount(item.price, currency)}
                          </p>
                        </div>
                        <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                          {item.description}
                        </p>
                        {item.popular && (
                          <Badge className="mt-2 bg-amber-100 text-amber-800 hover:bg-amber-200">
                            Popular
                          </Badge>
                        )}
                      </div>
                      <div className="ml-4 flex flex-col items-end">
                        {item.image && (
                          <div className="h-20 w-20 rounded-md overflow-hidden mb-2">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                        )}
                        <Button
                          size="sm"
                          className="mt-2"
                          onClick={() => handleAddToCart(item)}
                        >
                          <Plus className="h-4 w-4 mr-1" /> Add
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="info">
            <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
              <div>
                <h2 className="text-lg font-semibold mb-2">Restaurant Info</h2>
                <p className="text-gray-700">{restaurant.description}</p>
              </div>
              <Separator />
              <div>
                <h2 className="text-lg font-semibold mb-2">Address</h2>
                <p className="text-gray-700">{restaurant.address}</p>
              </div>
              <Separator />
              <div>
                <h2 className="text-lg font-semibold mb-2">Hours</h2>
                <div className="space-y-1">
                  <p className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span>10:00 AM - 10:00 PM</span>
                  </p>
                  <p className="flex justify-between">
                    <span>Saturday - Sunday</span>
                    <span>11:00 AM - 11:00 PM</span>
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default RestaurantDetailPage;
