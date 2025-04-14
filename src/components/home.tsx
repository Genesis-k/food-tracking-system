import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { ArrowRight, Utensils, Clock, MapPin, Star } from "lucide-react";

function Home() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="bg-primary text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Food Delivery Made Simple
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            Order from your favorite restaurants and track your delivery in
            real-time
          </p>
          <div className="flex flex-wrap gap-4">
            <Button
              size="lg"
              className="bg-white text-primary hover:bg-gray-100"
            >
              Order Now
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-primary/20"
            >
              <Link to="/tracking">Track Order</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-white">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Utensils className="text-primary h-6 w-6" />
                </div>
                <CardTitle>Choose Your Food</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Browse through hundreds of restaurants and select your
                  favorite dishes
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-white">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Clock className="text-primary h-6 w-6" />
                </div>
                <CardTitle>Fast Delivery</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Our drivers will deliver your food as quickly as possible
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-white">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <MapPin className="text-primary h-6 w-6" />
                </div>
                <CardTitle>Real-time Tracking</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Track your order in real-time and know exactly when it will
                  arrive
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Popular Restaurants Section */}
      <div className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Popular Restaurants
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <Card key={item} className="overflow-hidden">
                <div className="h-48 bg-gray-200 relative">
                  <img
                    src={`https://images.unsplash.com/photo-157954292951${item}-9e396f3cc809?w=500&q=80`}
                    alt="Restaurant"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-white rounded-full px-2 py-1 text-sm font-medium flex items-center">
                    <Star
                      className="h-3 w-3 text-yellow-500 mr-1"
                      fill="currentColor"
                    />
                    <span>4.{item}</span>
                  </div>
                </div>
                <CardContent className="pt-4">
                  <h3 className="font-bold text-lg mb-1">
                    Restaurant Name {item}
                  </h3>
                  <p className="text-gray-500 text-sm mb-2">
                    Italian • 25-35 min
                  </p>
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin className="h-3 w-3 mr-1" />
                    <span>1.{item} miles away</span>
                  </div>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button variant="ghost" className="w-full justify-between">
                    <span>View Menu</span>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button variant="outline" size="lg">
              View All Restaurants
            </Button>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 px-4 bg-primary/5">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to order?</h2>
          <p className="text-lg mb-8">
            Download our app and get your first delivery fee waived!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg">Order Online</Button>
            <Button size="lg" variant="outline">
              <Link to="/tracking">Track Your Order</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
