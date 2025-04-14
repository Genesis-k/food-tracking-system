import React from "react";
import { Phone, MessageCircle } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "../ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

interface DriverInfoCardProps {
  name?: string;
  photo?: string;
  phone?: string;
  rating?: number;
  vehicle?: string;
  licensePlate?: string;
  onCallDriver?: () => void;
  onMessageDriver?: () => void;
}

const DriverInfoCard = ({
  name = "Michael Rodriguez",
  photo = "https://api.dicebear.com/7.x/avataaars/svg?seed=driver123",
  phone = "(555) 123-4567",
  rating = 4.8,
  vehicle = "Toyota Corolla",
  licensePlate = "KBZ 123A",
  onCallDriver = () => console.log("Calling driver..."),
  onMessageDriver = () => console.log("Messaging driver..."),
}: DriverInfoCardProps) => {
  return (
    <Card className="w-full max-w-[350px] bg-white">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-bold">Your Driver</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16 border-2 border-primary">
            <AvatarImage src={photo} alt={name} />
            <AvatarFallback>
              {name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-medium text-base">{name}</h3>
            <p className="text-sm text-muted-foreground">{phone}</p>
            <div className="flex items-center mt-1">
              <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
              <span className="text-xs text-green-600">On the way</span>
            </div>
            {(vehicle || licensePlate) && (
              <p className="text-xs text-gray-500 mt-1">
                {vehicle} {licensePlate && `• ${licensePlate}`}
              </p>
            )}
            {rating && (
              <div className="flex items-center mt-1">
                <span className="text-xs bg-yellow-100 text-yellow-800 px-1.5 py-0.5 rounded">
                  ★ {rating.toFixed(1)}
                </span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-0">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                className="flex-1 mr-2"
                onClick={onCallDriver}
              >
                <Phone className="h-4 w-4 mr-2" />
                Call
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Call your driver</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                className="flex-1"
                onClick={onMessageDriver}
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                Message
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Message your driver</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardFooter>
    </Card>
  );
};

export default DriverInfoCard;
