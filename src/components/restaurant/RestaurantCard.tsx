import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { Star, Clock, MapPin, ArrowRight } from "lucide-react";
import { Badge } from "../ui/badge";

export interface RestaurantProps {
  id: string;
  name: string;
  image: string;
  cuisine: string;
  rating: number;
  deliveryTime: string;
  deliveryFee: string;
  distance: string;
  isNew?: boolean;
  isFeatured?: boolean;
}

const RestaurantCard: React.FC<RestaurantProps> = ({
  id,
  name,
  image,
  cuisine,
  rating,
  deliveryTime,
  deliveryFee,
  distance,
  isNew = false,
  isFeatured = false,
}) => {
  return (
    <Card className="overflow-hidden h-full bg-white hover:shadow-md transition-shadow duration-300">
      <div className="relative h-48">
        <img src={image} alt={name} className="w-full h-full object-cover" />
        <div className="absolute top-2 right-2 flex flex-col gap-2">
          {isNew && (
            <Badge className="bg-blue-500 hover:bg-blue-600">New</Badge>
          )}
          {isFeatured && (
            <Badge className="bg-amber-500 hover:bg-amber-600">Featured</Badge>
          )}
        </div>
        <div className="absolute bottom-2 left-2 bg-white rounded-full px-2 py-1 text-sm font-medium flex items-center shadow-sm">
          <Star className="h-3 w-3 text-yellow-500 mr-1" fill="currentColor" />
          <span>{rating.toFixed(1)}</span>
        </div>
      </div>

      <CardContent className="p-4">
        <h3 className="font-bold text-lg mb-1 line-clamp-1">{name}</h3>
        <p className="text-gray-500 text-sm mb-2">{cuisine}</p>
        <div className="flex items-center text-sm text-gray-500 space-x-4">
          <div className="flex items-center">
            <Clock className="h-3 w-3 mr-1" />
            <span>{deliveryTime}</span>
          </div>
          <div className="flex items-center">
            <MapPin className="h-3 w-3 mr-1" />
            <span>{distance}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <span className="text-sm font-medium">
          {deliveryFee === "Free" ? (
            <span className="text-green-600">Free Delivery</span>
          ) : (
            <span>Delivery: {deliveryFee}</span>
          )}
        </span>
        <Button variant="ghost" size="sm" asChild className="p-0">
          <Link to={`/restaurant/${id}`} className="flex items-center">
            <span className="mr-1">Menu</span>
            <ArrowRight className="h-3 w-3" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RestaurantCard;
