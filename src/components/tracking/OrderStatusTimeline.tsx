import React from "react";
import { Check, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export interface OrderStatus {
  id: string;
  label: string;
  completed: boolean;
  current: boolean;
  time?: string;
}

export interface OrderStatusTimelineProps {
  statuses?: OrderStatus[];
  currentStep?: number;
  progress?: number;
}

const OrderStatusTimeline = ({
  statuses = [
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
      completed: true,
      current: false,
      time: "12:45 PM",
    },
    {
      id: "pickup",
      label: "Pickup",
      completed: false,
      current: true,
      time: "1:05 PM",
    },
    {
      id: "delivery",
      label: "Delivery",
      completed: false,
      current: false,
      time: "1:20 PM",
    },
  ],
  currentStep = 2,
  progress = 65,
}: OrderStatusTimelineProps) => {
  return (
    <div className="w-full bg-white p-6 rounded-lg shadow-sm">
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">Order Status</h2>
        <Badge variant="secondary" className="text-sm">
          <Clock className="mr-1 h-3 w-3" /> ETA:{" "}
          {statuses[statuses.length - 1].time}
        </Badge>
      </div>

      {/* Progress bar */}
      <Progress value={progress} className="h-2 mb-6" />

      {/* Status timeline */}
      <div className="flex justify-between relative">
        {/* Connecting line */}
        <div className="absolute top-4 left-0 right-0 h-0.5 bg-gray-200 -z-10" />

        {/* Status points */}
        {statuses.map((status, index) => (
          <TooltipProvider key={status.id}>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex flex-col items-center space-y-2">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      status.completed
                        ? "bg-green-500 text-white"
                        : status.current
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {status.completed ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <span className="text-xs font-medium">{index + 1}</span>
                    )}
                  </div>
                  <span
                    className={`text-sm font-medium ${status.current ? "text-blue-500" : status.completed ? "text-green-500" : "text-gray-500"}`}
                  >
                    {status.label}
                  </span>
                  {status.time && (
                    <span className="text-xs text-gray-500">{status.time}</span>
                  )}
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>
                  {status.completed
                    ? "Completed"
                    : status.current
                      ? "In Progress"
                      : "Pending"}
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>
    </div>
  );
};

export default OrderStatusTimeline;
