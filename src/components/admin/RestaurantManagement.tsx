import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
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
  DialogDescription,
  DialogFooter,
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
  status: "active" | "inactive";
}

const RestaurantManagement = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([
    {
      id: "1",
      name: "Pasta Paradise",
      cuisine: "Italian",
      address: "123 Main St",
      status: "active",
    },
    {
      id: "2",
      name: "Sushi Supreme",
      cuisine: "Japanese",
      address: "456 Oak Ave",
      status: "active",
    },
    {
      id: "3",
      name: "Burger Barn",
      cuisine: "American",
      address: "789 Pine Rd",
      status: "inactive",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingRestaurant, setEditingRestaurant] = useState<Restaurant | null>(
    null,
  );

  const filteredRestaurants = restaurants.filter(
    (restaurant) =>
      restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      restaurant.cuisine.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleAddRestaurant = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newRestaurant: Restaurant = {
      id: Date.now().toString(),
      name: formData.get("name") as string,
      cuisine: formData.get("cuisine") as string,
      address: formData.get("address") as string,
      status: "active",
    };

    setRestaurants([...restaurants, newRestaurant]);
    setIsAddDialogOpen(false);
    e.currentTarget.reset();
  };

  const handleEditRestaurant = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingRestaurant) return;

    const formData = new FormData(e.currentTarget);
    const updatedRestaurants = restaurants.map((restaurant) =>
      restaurant.id === editingRestaurant.id
        ? {
            ...restaurant,
            name: formData.get("name") as string,
            cuisine: formData.get("cuisine") as string,
            address: formData.get("address") as string,
            status:
              (formData.get("status") as "active" | "inactive") || "active",
          }
        : restaurant,
    );

    setRestaurants(updatedRestaurants);
    setEditingRestaurant(null);
  };

  const handleDeleteRestaurant = (id: string) => {
    setRestaurants(restaurants.filter((restaurant) => restaurant.id !== id));
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex-1 max-w-sm">
          <Input
            placeholder="Search restaurants..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-1">
              <PlusCircle className="h-4 w-4" />
              <span>Add Restaurant</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Restaurant</DialogTitle>
              <DialogDescription>
                Enter the details for the new restaurant.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddRestaurant} className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Restaurant Name</Label>
                <Input id="name" name="name" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="cuisine">Cuisine Type</Label>
                <Input id="cuisine" name="cuisine" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="address">Address</Label>
                <Input id="address" name="address" required />
              </div>
              <DialogFooter>
                <Button type="submit">Add Restaurant</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        <Dialog
          open={!!editingRestaurant}
          onOpenChange={(open) => !open && setEditingRestaurant(null)}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Restaurant</DialogTitle>
              <DialogDescription>
                Update the restaurant details.
              </DialogDescription>
            </DialogHeader>
            {editingRestaurant && (
              <form onSubmit={handleEditRestaurant} className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-name">Restaurant Name</Label>
                  <Input
                    id="edit-name"
                    name="name"
                    defaultValue={editingRestaurant.name}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-cuisine">Cuisine Type</Label>
                  <Input
                    id="edit-cuisine"
                    name="cuisine"
                    defaultValue={editingRestaurant.cuisine}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-address">Address</Label>
                  <Input
                    id="edit-address"
                    name="address"
                    defaultValue={editingRestaurant.address}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-status">Status</Label>
                  <select
                    id="edit-status"
                    name="status"
                    defaultValue={editingRestaurant.status}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
                <DialogFooter>
                  <Button type="submit">Save Changes</Button>
                </DialogFooter>
              </form>
            )}
          </DialogContent>
        </Dialog>
      </div>

      <Table>
        <TableCaption>List of all restaurants in the system</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Cuisine</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredRestaurants.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center">
                No restaurants found
              </TableCell>
            </TableRow>
          ) : (
            filteredRestaurants.map((restaurant) => (
              <TableRow key={restaurant.id}>
                <TableCell className="font-medium">{restaurant.name}</TableCell>
                <TableCell>{restaurant.cuisine}</TableCell>
                <TableCell>{restaurant.address}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      restaurant.status === "active"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {restaurant.status}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setEditingRestaurant(restaurant)}
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
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default RestaurantManagement;
