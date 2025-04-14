import React, { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import DeliveryMap from "./DeliveryMap";
import OrderStatusTimeline from "./OrderStatusTimeline";
import DriverInfoCard from "./DriverInfoCard";

interface OrderStatus {
  id: string;
  label: string;
  completed: boolean;
  current: boolean;
  time: string;
}

const TrackingInterface = () => {
  const [eta, setEta] = useState<number>(25);
  const [driverInfo, setDriverInfo] = useState({
    name: "Michael Kimani",
    photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
    phone: "+254 712 345 678",
    rating: 4.8,
    vehicle: "Toyota Corolla",
    licensePlate: "KBZ 123A",
  });
  const [orderStatuses, setOrderStatuses] = useState<OrderStatus[]>([
    {
      id: "placed",
      label: "Order Placed",
      completed: true,
      current: false,
      time: "12:30 PM",
    },
    {
      id: "preparing",
      label: "Preparation",
      completed: false,
      current: true,
      time: "12:45 PM",
    },
    {
      id: "pickup",
      label: "Pickup",
      completed: false,
      current: false,
      time: "1:05 PM",
    },
    {
      id: "delivery",
      label: "Delivery",
      completed: false,
      current: false,
      time: "1:20 PM",
    },
  ]);

  // Simulate ETA updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Add small random variations to ETA to simulate real-time updates
      setEta((prev) => {
        // Don't go below 1 minute unless delivery is complete
        if (prev <= 1) return 1;

        // Random variation between -1 and 0 minutes
        const variation = Math.random() * -1;
        return Math.max(1, Math.round(prev + variation));
      });
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  // Simulate order status progression
  useEffect(() => {
    // Simulate preparation completion after 10 seconds
    const preparationTimer = setTimeout(() => {
      const updatedStatuses = [...orderStatuses];
      updatedStatuses[1].completed = true;
      updatedStatuses[1].current = false;
      updatedStatuses[2].current = true;
      setOrderStatuses(updatedStatuses);
    }, 10000);

    // Simulate pickup after 20 seconds
    const pickupTimer = setTimeout(() => {
      const updatedStatuses = [...orderStatuses];
      updatedStatuses[2].completed = true;
      updatedStatuses[2].current = false;
      updatedStatuses[3].current = true;
      setOrderStatuses(updatedStatuses);
      // Reduce ETA when driver picks up
      setEta((prev) => Math.max(10, prev - 5));
    }, 20000);

    return () => {
      clearTimeout(preparationTimer);
      clearTimeout(pickupTimer);
    };
  }, [orderStatuses]);

  // Calculate progress percentage for the timeline
  const calculateProgress = () => {
    const completedSteps = orderStatuses.filter(
      (status) => status.completed,
    ).length;
    const currentStep = orderStatuses.findIndex((status) => status.current);

    if (currentStep === -1) return 100; // All completed

    return (completedSteps / orderStatuses.length) * 100;
  };

  const handleCallDriver = () => {
    // In a real app, this would initiate a call to the driver
    alert(`Calling driver at ${driverInfo.phone}`);
  };

  const handleMessageDriver = () => {
    // In a real app, this would open a messaging interface
    alert(`Messaging driver at ${driverInfo.phone}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-10">
      {/* Header */}
      <header className="bg-primary text-white p-4 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/">
              <Button variant="ghost" className="text-white p-0 mr-2">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-xl font-bold">Order Tracking</h1>
          </div>
          <div className="text-sm font-medium">Order #12345</div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* Order Status Timeline */}
        <OrderStatusTimeline
          statuses={orderStatuses}
          currentStep={orderStatuses.findIndex((s) => s.current)}
          progress={calculateProgress()}
        />

        {/* Two column layout for larger screens */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column - Map */}
          <div className="lg:col-span-2 space-y-6">
            <DeliveryMap eta={eta} />
          </div>

          {/* Right column - Driver Info and Order Details */}
          <div className="lg:col-span-1 space-y-6">
            {/* Driver Info Card */}
            <DriverInfoCard
              {...driverInfo}
              onCallDriver={handleCallDriver}
              onMessageDriver={handleMessageDriver}
            />

            {/* Order Details */}
            <div className="bg-white rounded-lg shadow p-4">
              <h2 className="text-lg font-semibold mb-4">Order Details</h2>
              <div className="space-y-4">
                <div className="border-b pb-4">
                  <h3 className="font-medium mb-2">Items</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>1 × Chicken Burger</span>
                      <span>$8.99</span>
                    </div>
                    <div className="flex justify-between">
                      <span>1 × French Fries</span>
                      <span>$3.99</span>
                    </div>
                    <div className="flex justify-between">
                      <span>1 × Soda</span>
                      <span>$1.99</span>
                    </div>
                  </div>
                </div>
                <div className="border-b pb-4">
                  <h3 className="font-medium mb-2">Restaurant</h3>
                  <p>Burger Palace</p>
                  <p className="text-sm text-gray-500">
                    123 Market St, San Francisco, CA
                  </p>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Delivery Address</h3>
                  <p>456 Mission St, San Francisco, CA</p>
                </div>
                <div className="pt-4 border-t">
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>$14.97</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TrackingInterface;
