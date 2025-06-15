import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Users, Fuel, Calendar } from "lucide-react";
import { Car } from "../orders/types";

const FLEET: Car[] = [
  {
    id: "1",
    name: "Mercedes-Benz S-Class",
    class: "Luxury",
    capacity: 3,
    year: 2023,
    images: [
      "https://images.unsplash.com/photo-1622037022288-861c8c3c4ddf?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&q=80",
    ],
  },
  {
    id: "2",
    name: "Mercedes-Benz V-Class",
    class: "Premium",
    capacity: 7,
    year: 2023,
    images: [
      "https://images.unsplash.com/photo-1559416523-140ddc3d238c?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1570733117311-d990c3816c47?auto=format&fit=crop&q=80",
    ],
  },
  {
    id: "3",
    name: "BMW 7 Series",
    class: "Luxury",
    capacity: 3,
    year: 2023,
    images: [
      "https://images.unsplash.com/photo-1523983388277-336a66bf9bcd?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1556189250-72ba954cfc2b?auto=format&fit=crop&q=80",
    ],
  },
];

export default function Fleet() {
  const [selectedCar, setSelectedCar] = React.useState<Car>({} as Car);
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Our Premium Fleet</h1>
          <p className="text-gray-600">
            Choose from our selection of luxury vehicles for your journey
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FLEET.map((car) => (
            <Card
              key={car.id}
              className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => {
                setSelectedCar(car);
                setIsOpen(true);
              }}
            >
              <div className="aspect-[16/9] overflow-hidden">
                <img
                  src={car.images[0]}
                  alt={car.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">{car.name}</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Users className="w-4 h-4" />
                    <span>Up to {car.capacity} passengers</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Fuel className="w-4 h-4" />
                    <span>{car.class}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>{car.year}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Dialog
          open={isOpen}
          onOpenChange={(open) => {
            setIsOpen(open);
            setSelectedCar({} as Car);
          }}
        >
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>{selectedCar?.name}</DialogTitle>
            </DialogHeader>
            <div className="mt-4">
              <div className="grid grid-cols-2 gap-4">
                {selectedCar?.images?.map((image, index) => (
                  <div
                    key={index}
                    className="aspect-[16/9] overflow-hidden rounded-lg"
                  >
                    <img
                      src={image}
                      alt={`${selectedCar.name} - View ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
              <div className="mt-6 grid grid-cols-3 gap-4">
                <div className="text-center">
                  <Users className="w-6 h-6 mx-auto mb-2" />
                  <p className="font-medium">
                    {selectedCar?.capacity} Passengers
                  </p>
                </div>
                <div className="text-center">
                  <Fuel className="w-6 h-6 mx-auto mb-2" />
                  <p className="font-medium">{selectedCar?.class}</p>
                </div>
                <div className="text-center">
                  <Calendar className="w-6 h-6 mx-auto mb-2" />
                  <p className="font-medium">{selectedCar?.year}</p>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
