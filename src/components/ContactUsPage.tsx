import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  ArrowLeft,
  MapPin,
  Phone,
  Mail,
  Send,
  CheckCircle,
} from "lucide-react";

const ContactUsPage = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send the form data to a server
    console.log("Form submitted:", formData);
    setFormSubmitted(true);
    // Reset form after submission
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
    // Reset the submission status after 5 seconds
    setTimeout(() => setFormSubmitted(false), 5000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 bg-white">
      <div className="flex items-center mb-6">
        <Link to="/" className="mr-4">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">Contact Us</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
          <p className="text-gray-600 mb-6">
            We'd love to hear from you! Whether you have a question about our
            services, need help with an order, or want to partner with us, our
            team is ready to assist you.
          </p>

          <div className="space-y-6">
            <div className="flex items-start">
              <div className="bg-primary/10 p-2 rounded-full mr-4">
                <MapPin className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-medium">Our Office</h3>
                <p className="text-gray-600">
                  123 Delivery Street, Suite 456
                  <br />
                  Foodville, FD 12345
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-primary/10 p-2 rounded-full mr-4">
                <Phone className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-medium">Phone</h3>
                <p className="text-gray-600">
                  Customer Support: +1 (555) 123-4567
                  <br />
                  Hours: Mon-Fri, 8am-8pm
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-primary/10 p-2 rounded-full mr-4">
                <Mail className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-medium">Email</h3>
                <p className="text-gray-600">
                  General Inquiries: info@fooddelivery.com
                  <br />
                  Support: support@fooddelivery.com
                </p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Send us a Message</CardTitle>
            </CardHeader>
            <CardContent>
              {formSubmitted ? (
                <div className="flex flex-col items-center justify-center py-6">
                  <CheckCircle className="h-12 w-12 text-green-500 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Thank You!</h3>
                  <p className="text-gray-600 text-center">
                    Your message has been sent successfully. We'll get back to
                    you as soon as possible.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Your Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full">
                    <Send className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">
          Frequently Asked Questions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              question: "How do I track my order?",
              answer:
                "You can track your order in real-time through our app or website. Simply go to 'My Orders' and select the order you want to track.",
            },
            {
              question: "What if my order is late?",
              answer:
                "If your order is taking longer than expected, please contact our customer support. We may offer compensation depending on the circumstances.",
            },
            {
              question: "How do I become a delivery driver?",
              answer:
                "To become a delivery driver, visit the 'Careers' section on our website and apply through the driver application form.",
            },
            {
              question: "How can restaurants partner with you?",
              answer:
                "Restaurants interested in partnering with us can contact our partnerships team at partners@fooddelivery.com or call +1 (555) 765-4321.",
            },
          ].map((faq, index) => (
            <Card key={index}>
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="rounded-lg overflow-hidden h-[400px]">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.215651639618!2d-73.98784492426285!3d40.75798597138946!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25855c6480299%3A0x55194ec5a1ae072e!2sTimes%20Square!5e0!3m2!1sen!2sus!4v1710341987619!5m2!1sen!2sus"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Office Location"
        ></iframe>
      </div>
    </div>
  );
};

export default ContactUsPage;
