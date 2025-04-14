import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { PlusCircle, Pencil, Trash2 } from "lucide-react";

interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  address: string;
  rating: number;
}

const RestaurantManagement = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([
    {
      id: "1",
      name: "Tasty Bites",
      cuisine: "Italian",
      address: "123 Main St",
      rating: 4.5,
    },
    {
      id: "2",
      name: "Spice Garden",
      cuisine: "Indian",
      address: "456 Oak Ave",
      rating: 4.2,
    },
    {
      id: "3",
      name: "Sushi Palace",
      cuisine: "Japanese",
      address: "789 Pine Blvd",
      rating: 4.7,
    },
  ]);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentRestaurant, setCurrentRestaurant] = useState<Restaurant | null>(
    null,
  );
  const [formData, setFormData] = useState({
    name: "",
    cuisine: "",
    address: "",
    rating: 0,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "rating" ? parseFloat(value) : value,
    });
  };

  const handleAddRestaurant = () => {
    const newRestaurant = {
      id: Date.now().toString(),
      ...formData,
    };
    setRestaurants([...restaurants, newRestaurant]);
    setFormData({ name: "", cuisine: "", address: "", rating: 0 });
    setIsAddDialogOpen(false);
  };

  const handleEditClick = (restaurant: Restaurant) => {
    setCurrentRestaurant(restaurant);
    setFormData({
      name: restaurant.name,
      cuisine: restaurant.cuisine,
      address: restaurant.address,
      rating: restaurant.rating,
    });
    setIsEditDialogOpen(true);
  };

  const handleUpdateRestaurant = () => {
    if (!currentRestaurant) return;

    const updatedRestaurants = restaurants.map((restaurant) =>
      restaurant.id === currentRestaurant.id
        ? { ...restaurant, ...formData }
        : restaurant,
    );

    setRestaurants(updatedRestaurants);
    setIsEditDialogOpen(false);
    setCurrentRestaurant(null);
    setFormData({ name: "", cuisine: "", address: "", rating: 0 });
  };

  const handleDeleteRestaurant = (id: string) => {
    setRestaurants(restaurants.filter((restaurant) => restaurant.id !== id));
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Restaurant Management</h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <PlusCircle className="h-4 w-4" />
              <span>Add Restaurant</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Restaurant</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Restaurant Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="cuisine">Cuisine Type</Label>
                <Input
                  id="cuisine"
                  name="cuisine"
                  value={formData.cuisine}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="rating">Rating (0-5)</Label>
                <Input
                  id="rating"
                  name="rating"
                  type="number"
                  min="0"
                  max="5"
                  step="0.1"
                  value={formData.rating}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <Button onClick={handleAddRestaurant}>Save Restaurant</Button>
          </DialogContent>
        </Dialog>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Cuisine</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {restaurants.map((restaurant) => (
              <TableRow key={restaurant.id}>
                <TableCell className="font-medium">{restaurant.name}</TableCell>
                <TableCell>{restaurant.cuisine}</TableCell>
                <TableCell>{restaurant.address}</TableCell>
                <TableCell>{restaurant.rating}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleEditClick(restaurant)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleDeleteRestaurant(restaurant.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Restaurant</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-name">Restaurant Name</Label>
              <Input
                id="edit-name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-cuisine">Cuisine Type</Label>
              <Input
                id="edit-cuisine"
                name="cuisine"
                value={formData.cuisine}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-address">Address</Label>
              <Input
                id="edit-address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-rating">Rating (0-5)</Label>
              <Input
                id="edit-rating"
                name="rating"
                type="number"
                min="0"
                max="5"
                step="0.1"
                value={formData.rating}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <Button onClick={handleUpdateRestaurant}>Update Restaurant</Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RestaurantManagement;
