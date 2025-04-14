import React, { useState, useEffect } from "react";
import { Bell, CheckCircle, Clock, Truck, MapPin } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";

type NotificationStatus =
  | "order_accepted"
  | "preparation_complete"
  | "driver_pickup"
  | "driver_nearby"
  | "delivery_complete";

type NotificationData = {
  id: string;
  status: NotificationStatus;
  title: string;
  description: string;
  time: Date;
};

interface NotificationHandlerProps {
  orderId?: string;
  onStatusChange?: (status: NotificationStatus) => void;
  autoTriggerDemo?: boolean;
}

const NotificationHandler = ({
  orderId = "ORD-12345",
  onStatusChange,
  autoTriggerDemo = true,
}: NotificationHandlerProps) => {
  const { toast } = useToast();
  const [lastStatus, setLastStatus] = useState<NotificationStatus | null>(null);
  const [notifications, setNotifications] = useState<NotificationData[]>([]);

  // Function to trigger a notification
  const triggerNotification = (status: NotificationStatus) => {
    let notificationData: NotificationData;

    switch (status) {
      case "order_accepted":
        notificationData = {
          id: `${orderId}-${status}`,
          status,
          title: "Order Accepted",
          description: "Restaurant is now preparing your order",
          time: new Date(),
        };
        break;
      case "preparation_complete":
        notificationData = {
          id: `${orderId}-${status}`,
          status,
          title: "Preparation Complete",
          description: "Your order is ready for pickup",
          time: new Date(),
        };
        break;
      case "driver_pickup":
        notificationData = {
          id: `${orderId}-${status}`,
          status,
          title: "Driver Picked Up Order",
          description: "Your order is on the way",
          time: new Date(),
        };
        break;
      case "driver_nearby":
        notificationData = {
          id: `${orderId}-${status}`,
          status,
          title: "Driver Approaching",
          description: "Your driver is almost at your location",
          time: new Date(),
        };
        break;
      case "delivery_complete":
        notificationData = {
          id: `${orderId}-${status}`,
          status,
          title: "Order Delivered",
          description: "Your order has been delivered. Enjoy!",
          time: new Date(),
        };
        break;
      default:
        return;
    }

    // Add notification to the list
    setNotifications((prev) => [notificationData, ...prev]);
    setLastStatus(status);

    // Call the onStatusChange callback if provided
    if (onStatusChange) {
      onStatusChange(status);
    }

    // Show toast notification
    toast({
      title: notificationData.title,
      description: notificationData.description,
      action: <ToastAction altText="View details">View</ToastAction>,
    });
  };

  // Demo mode - automatically trigger notifications in sequence
  useEffect(() => {
    if (!autoTriggerDemo) return;

    const statuses: NotificationStatus[] = [
      "order_accepted",
      "preparation_complete",
      "driver_pickup",
      "driver_nearby",
      "delivery_complete",
    ];

    const intervals = [3000, 6000, 9000, 12000, 15000];

    const timers = statuses.map((status, index) => {
      return setTimeout(() => {
        triggerNotification(status);
      }, intervals[index]);
    });

    // Cleanup timers on unmount
    return () => {
      timers.forEach((timer) => clearTimeout(timer));
    };
  }, [autoTriggerDemo]);

  // Get icon based on notification status
  const getStatusIcon = (status: NotificationStatus) => {
    switch (status) {
      case "order_accepted":
        return <Clock className="h-5 w-5 text-blue-500" />;
      case "preparation_complete":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "driver_pickup":
        return <Truck className="h-5 w-5 text-orange-500" />;
      case "driver_nearby":
        return <MapPin className="h-5 w-5 text-red-500" />;
      case "delivery_complete":
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      default:
        return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };

  // Format time for display
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 w-full max-w-md">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Order Updates</h3>
        <Bell className="h-5 w-5 text-gray-500" />
      </div>

      {notifications.length === 0 ? (
        <div className="text-center py-6 text-gray-500">
          <p>No notifications yet</p>
          <p className="text-sm mt-2">
            Updates will appear here as your order progresses
          </p>
        </div>
      ) : (
        <div className="space-y-3 max-h-[300px] overflow-y-auto">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className="flex items-start space-x-3 p-2 hover:bg-gray-50 rounded-md"
            >
              <div className="mt-1">{getStatusIcon(notification.status)}</div>
              <div className="flex-1">
                <p className="font-medium">{notification.title}</p>
                <p className="text-sm text-gray-600">
                  {notification.description}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  {formatTime(notification.time)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Manual trigger buttons for testing - can be removed in production */}
      <div className="mt-4 pt-3 border-t border-gray-200">
        <p className="text-xs text-gray-500 mb-2">Test Controls:</p>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => triggerNotification("order_accepted")}
            className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
          >
            Order Accepted
          </button>
          <button
            onClick={() => triggerNotification("preparation_complete")}
            className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded hover:bg-green-200"
          >
            Preparation Complete
          </button>
          <button
            onClick={() => triggerNotification("driver_pickup")}
            className="px-2 py-1 text-xs bg-orange-100 text-orange-700 rounded hover:bg-orange-200"
          >
            Driver Pickup
          </button>
          <button
            onClick={() => triggerNotification("driver_nearby")}
            className="px-2 py-1 text-xs bg-red-100 text-red-700 rounded hover:bg-red-200"
          >
            Driver Nearby
          </button>
          <button
            onClick={() => triggerNotification("delivery_complete")}
            className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded hover:bg-green-200"
          >
            Delivery Complete
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationHandler;
