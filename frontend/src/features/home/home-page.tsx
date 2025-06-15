import React from "react";
import { MapPin, Shield, Clock } from "lucide-react";
import OrderModal from "../orders/order-modal";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [showOrderModal, setShowOrderModal] = React.useState(false);

  return (
    <div>
      <section className="relative h-[600px] flex items-center">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1621954773013-b891bb7c02ba?auto=format&fit=crop&q=80"
            alt="Luxury Car"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Premium Transportation Across Israel
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Experience comfort and reliability with our premium transfer
              service. From Ben Gurion Airport to any destination in Israel.
            </p>
            <Button
              onClick={() => setShowOrderModal(true)}
              size="lg"
              className="bg-blue-600 hover:bg-blue-700"
            >
              Book Your Transfer
            </Button>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-blue-100 flex items-center justify-center">
                <MapPin className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Any Destination</h3>
              <p className="text-gray-600">
                Travel to any point in Israel with comfort and style
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-blue-100 flex items-center justify-center">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Safe & Reliable</h3>
              <p className="text-gray-600">
                Professional drivers and well-maintained vehicles
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-blue-100 flex items-center justify-center">
                <Clock className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">24/7 Service</h3>
              <p className="text-gray-600">
                Available round the clock for your convenience
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Why Choose Us?</h2>
            <p className="text-gray-600 mb-8">
              We provide premium transportation services with a focus on
              comfort, reliability, and customer satisfaction. Our fleet of
              luxury vehicles and professional drivers ensure a seamless travel
              experience.
            </p>
            <Button
              onClick={() => setShowOrderModal(true)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Book Your Transfer
            </Button>
          </div>
        </div>
      </section>

      <OrderModal
        open={showOrderModal}
        onClose={() => setShowOrderModal(false)}
      />
    </div>
  );
}
