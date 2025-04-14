import React, { useState } from "react";
import RestaurantCard, { RestaurantProps } from "./RestaurantCard";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Search, SlidersHorizontal } from "lucide-react";

// Sample data for restaurants
const sampleRestaurants: RestaurantProps[] = [
  {
    id: "1",
    name: "Burger Palace",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&q=80",
    cuisine: "American • Burgers",
    rating: 4.5,
    deliveryTime: "15-25 min",
    deliveryFee: "$1.99",
    distance: "1.2 miles",
    isFeatured: true,
  },
  {
    id: "2",
    name: "Pizza Heaven",
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&q=80",
    cuisine: "Italian • Pizza",
    rating: 4.3,
    deliveryTime: "20-30 min",
    deliveryFee: "$2.49",
    distance: "1.8 miles",
  },
  {
    id: "3",
    name: "Sushi Express",
    image:
      "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=500&q=80",
    cuisine: "Japanese • Sushi",
    rating: 4.7,
    deliveryTime: "25-35 min",
    deliveryFee: "$3.99",
    distance: "2.3 miles",
    isNew: true,
  },
  {
    id: "4",
    name: "Taco Fiesta",
    image:
      "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=500&q=80",
    cuisine: "Mexican • Tacos",
    rating: 4.2,
    deliveryTime: "15-25 min",
    deliveryFee: "Free",
    distance: "0.9 miles",
  },
  {
    id: "5",
    name: "Noodle House",
    image:
      "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=500&q=80",
    cuisine: "Chinese • Noodles",
    rating: 4.1,
    deliveryTime: "20-30 min",
    deliveryFee: "$1.49",
    distance: "1.5 miles",
  },
  {
    id: "6",
    name: "Salad Bar",
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&q=80",
    cuisine: "Healthy • Salads",
    rating: 4.4,
    deliveryTime: "15-25 min",
    deliveryFee: "$2.99",
    distance: "1.1 miles",
    isNew: true,
  },
  {
    id: "7",
    name: "Indian Spice",
    image:
      "https://images.unsplash.com/photo-1585937421612-70a008356c36?w=500&q=80",
    cuisine: "Indian • Curry",
    rating: 4.6,
    deliveryTime: "25-35 min",
    deliveryFee: "$2.49",
    distance: "2.0 miles",
  },
  {
    id: "8",
    name: "Mediterranean Delight",
    image:
      "https://images.unsplash.com/photo-1544378730-8b5104b18790?w=500&q=80",
    cuisine: "Mediterranean • Kebabs",
    rating: 4.3,
    deliveryTime: "20-30 min",
    deliveryFee: "Free",
    distance: "1.7 miles",
    isFeatured: true,
  },
];

const RestaurantList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredRestaurants, setFilteredRestaurants] =
    useState(sampleRestaurants);

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.trim() === "") {
      setFilteredRestaurants(sampleRestaurants);
    } else {
      const filtered = sampleRestaurants.filter(
        (restaurant) =>
          restaurant.name.toLowerCase().includes(value.toLowerCase()) ||
          restaurant.cuisine.toLowerCase().includes(value.toLowerCase()),
      );
      setFilteredRestaurants(filtered);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Restaurants</h1>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="text"
            placeholder="Search restaurants or cuisines"
            className="pl-10"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4" />
          <span>Filters</span>
        </Button>
      </div>

      {/* Restaurant Grid */}
      {filteredRestaurants.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredRestaurants.map((restaurant) => (
            <RestaurantCard key={restaurant.id} {...restaurant} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500">
            No restaurants found matching your search.
          </p>
        </div>
      )}
    </div>
  );
};

export default RestaurantList;
