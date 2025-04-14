import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import {
  ArrowLeft,
  Users,
  Award,
  Clock,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";

const AboutUsPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 bg-white">
      <div className="flex items-center mb-6">
        <Link to="/" className="mr-4">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">About Us</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
          <p className="text-gray-600 mb-4">
            Founded in 2023, FoodDelivery is a premier food delivery platform
            connecting hungry customers with their favorite local restaurants.
            What started as a small startup has quickly grown into a trusted
            service used by thousands of customers daily.
          </p>
          <p className="text-gray-600 mb-4">
            Our mission is simple: to make delicious food accessible to
            everyone, everywhere. We believe that good food should be just a few
            clicks away, whether you're at home, at work, or on the go.
          </p>
          <p className="text-gray-600">
            With a network of over 500 restaurant partners and 1,000+ delivery
            drivers, we're proud to serve communities across the country,
            bringing convenience and culinary diversity to your doorstep.
          </p>
        </div>
        <div className="relative h-[300px] lg:h-auto rounded-lg overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80"
            alt="Team working together"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Why Choose Us
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gray-50">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="bg-primary/10 p-3 rounded-full mb-4">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Fast Delivery</h3>
                <p className="text-gray-600">
                  Our efficient delivery network ensures your food arrives hot
                  and fresh, with an average delivery time of just 30 minutes.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-50">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="bg-primary/10 p-3 rounded-full mb-4">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">
                  Quality Restaurants
                </h3>
                <p className="text-gray-600">
                  We partner only with the best restaurants, ensuring high
                  quality meals and a diverse range of cuisines to choose from.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-50">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="bg-primary/10 p-3 rounded-full mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Customer Support</h3>
                <p className="text-gray-600">
                  Our dedicated support team is available 24/7 to assist with
                  any questions or concerns about your order.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Our Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              name: "Sarah Johnson",
              role: "CEO & Founder",
              image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
            },
            {
              name: "Michael Chen",
              role: "CTO",
              image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
            },
            {
              name: "Jessica Williams",
              role: "Operations Director",
              image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jessica",
            },
            {
              name: "David Rodriguez",
              role: "Marketing Manager",
              image: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
            },
          ].map((member, index) => (
            <Card key={index}>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="w-24 h-24 rounded-full overflow-hidden mb-4">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-lg font-semibold">{member.name}</h3>
                  <p className="text-gray-500">{member.role}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-8">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Contact Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col items-center text-center">
            <div className="bg-primary/10 p-3 rounded-full mb-4">
              <MapPin className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Our Office</h3>
            <p className="text-gray-600">
              123 Delivery Street
              <br />
              Suite 456
              <br />
              Foodville, FD 12345
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="bg-primary/10 p-3 rounded-full mb-4">
              <Phone className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Phone</h3>
            <p className="text-gray-600">
              Customer Support: +1 (555) 123-4567
              <br />
              Restaurant Partners: +1 (555) 765-4321
              <br />
              Driver Support: +1 (555) 987-6543
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="bg-primary/10 p-3 rounded-full mb-4">
              <Mail className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Email</h3>
            <p className="text-gray-600">
              General Inquiries: info@fooddelivery.com
              <br />
              Support: support@fooddelivery.com
              <br />
              Partnerships: partners@fooddelivery.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;
