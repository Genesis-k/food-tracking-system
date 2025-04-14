import React, { useState, useEffect } from "react";
import { MapPin, Navigation, Clock, Car, Phone } from "lucide-react";
import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { DriverInfo } from "../../types/types";

interface DeliveryMapProps {
  restaurantLocation?: {
    lat: number;
    lng: number;
    address: string;
  };
  driverLocation?: {
    lat: number;
    lng: number;
  };
  deliveryAddress?: {
    lat: number;
    lng: number;
    address: string;
  };
  eta?: number; // in minutes
  driverInfo?: DriverInfo;
  onCallDriver?: () => void;
}

const DeliveryMap: React.FC<DeliveryMapProps> = ({
  restaurantLocation = {
    lat: 37.7749,
    lng: -122.4194,
    address: "123 Market St, San Francisco, CA",
  },
  driverLocation = {
    lat: 37.78,
    lng: -122.415,
  },
  deliveryAddress = {
    lat: 37.785,
    lng: -122.41,
    address: "456 Mission St, San Francisco, CA",
  },
  eta = 15,
  driverInfo = {
    id: "driver-1",
    name: "Michael Kimani",
    photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
    phone: "+254 712 345 678",
    rating: 4.8,
    vehicle: "Toyota Corolla",
    licensePlate: "KBZ 123A",
  },
  onCallDriver = () => console.log("Calling driver..."),
}) => {
  const [mapLoaded, setMapLoaded] = useState(false);
  const [driverPosition, setDriverPosition] = useState(driverLocation);

  // Simulate driver movement with more realistic path following
  useEffect(() => {
    // Calculate direction vector from restaurant to delivery address
    const directionX = deliveryAddress.lat - restaurantLocation.lat;
    const directionY = deliveryAddress.lng - restaurantLocation.lng;
    const distance = Math.sqrt(
      directionX * directionX + directionY * directionY,
    );
    const normalizedX = directionX / distance;
    const normalizedY = directionY / distance;

    // Speed factor (adjust for faster/slower movement)
    const speedFactor = 0.0008;

    const interval = setInterval(() => {
      setDriverPosition((prev) => {
        // Calculate distance to destination
        const remainingX = deliveryAddress.lat - prev.lat;
        const remainingY = deliveryAddress.lng - prev.lng;
        const remainingDist = Math.sqrt(
          remainingX * remainingX + remainingY * remainingY,
        );

        // If very close to destination, stop moving
        if (remainingDist < 0.001) {
          return prev;
        }

        // Move along the direction vector with some randomness
        return {
          lat:
            prev.lat +
            normalizedX * speedFactor +
            (Math.random() * 0.0002 - 0.0001),
          lng:
            prev.lng +
            normalizedY * speedFactor +
            (Math.random() * 0.0002 - 0.0001),
        };
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [deliveryAddress, restaurantLocation]);

  // Simulate map loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setMapLoaded(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full h-[500px] rounded-lg overflow-hidden border border-gray-200 shadow-md bg-white">
      {/* Map Header */}
      <div className="p-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
        <h3 className="text-lg font-semibold">Live Delivery Tracking</h3>
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-gray-500" />
          <span className="text-sm font-medium">ETA: {eta} minutes</span>
        </div>
      </div>

      {/* Map Content */}
      <div className="relative w-full h-[400px] bg-gray-100">
        {!mapLoaded ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : (
          <>
            {/* Map Placeholder - In a real app, this would be replaced with an actual map component */}
            <div className="absolute inset-0 bg-blue-50">
              {/* Simulated map with grid lines */}
              <div
                className="w-full h-full"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, #e5e7eb 1px, transparent 1px), linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)",
                  backgroundSize: "20px 20px",
                }}
              >
                {/* Restaurant Marker */}
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div
                        className="absolute p-2 bg-red-500 rounded-full transform -translate-x-1/2 -translate-y-1/2"
                        style={{ left: `${30}%`, top: `${40}%` }}
                      >
                        <MapPin className="h-4 w-4 text-white" />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Restaurant: {restaurantLocation.address}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                {/* Driver Marker */}
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div
                        className="absolute p-2 bg-green-500 rounded-full transform -translate-x-1/2 -translate-y-1/2 animate-pulse"
                        style={{
                          left: `${30 + ((driverPosition.lng - restaurantLocation.lng) / (deliveryAddress.lng - restaurantLocation.lng)) * 40}%`,
                          top: `${40 + ((driverPosition.lat - restaurantLocation.lat) / (deliveryAddress.lat - restaurantLocation.lat)) * -10}%`,
                          transition: "left 1s ease-out, top 1s ease-out",
                        }}
                      >
                        <Car className="h-4 w-4 text-white" />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Driver is on the way</p>
                      <p className="text-xs">ETA: {eta} minutes</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                {/* Delivery Address Marker */}
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div
                        className="absolute p-2 bg-blue-500 rounded-full transform -translate-x-1/2 -translate-y-1/2"
                        style={{ left: `${70}%`, top: `${30}%` }}
                      >
                        <Navigation className="h-4 w-4 text-white" />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Delivery Address: {deliveryAddress.address}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                {/* Simulated Route */}
                <svg
                  className="absolute inset-0 w-full h-full"
                  style={{ pointerEvents: "none" }}
                >
                  <path
                    d="M30% 40% Q50% 60% 70% 30%"
                    stroke="#6366F1"
                    strokeWidth="2"
                    strokeDasharray="5,5"
                    fill="none"
                  />
                </svg>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Map Controls and Driver Info */}
      <div className="p-3 border-t border-gray-200 bg-gray-50">
        <div className="flex justify-between items-center mb-3">
          <Button variant="outline" size="sm" className="text-xs">
            <MapPin className="h-3 w-3 mr-1" /> Center Map
          </Button>
          <div className="text-xs text-gray-500">Updated just now</div>
        </div>

        {/* Driver Info Mini Card */}
        {driverInfo && (
          <div className="flex items-center justify-between bg-white p-2 rounded-md border border-gray-200 mt-2">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full overflow-hidden mr-3 border border-primary">
                <img
                  src={driverInfo.photo}
                  alt={driverInfo.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <p className="font-medium text-sm">{driverInfo.name}</p>
                <p className="text-xs text-gray-500">
                  {driverInfo.vehicle} • {driverInfo.licensePlate}
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={onCallDriver}
              className="text-xs"
            >
              <Phone className="h-3 w-3 mr-1" /> Call
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeliveryMap;
