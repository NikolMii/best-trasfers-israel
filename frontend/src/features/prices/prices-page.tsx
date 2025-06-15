import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { VehicleClass } from "../orders/types";

const PRICES: Record<VehicleClass, Record<string, Record<string, number>>> = {
  Luxury: {
    "Ben Gurion Airport": {
      Jerusalem: 350,
      "Tel Aviv": 200,
      Haifa: 550,
    },
    Jerusalem: {
      "Tel Aviv": 300,
      Haifa: 650,
      "Ben Gurion Airport": 350,
    },
    "Tel Aviv": {
      Jerusalem: 300,
      Haifa: 450,
      "Ben Gurion Airport": 200,
    },
  },
  Premium: {
    "Ben Gurion Airport": {
      Jerusalem: 450,
      "Tel Aviv": 250,
      Haifa: 650,
    },
    Jerusalem: {
      "Tel Aviv": 400,
      Haifa: 750,
      "Ben Gurion Airport": 450,
    },
    "Tel Aviv": {
      Jerusalem: 400,
      Haifa: 550,
      "Ben Gurion Airport": 250,
    },
  },
};

const DESTINATIONS = ["Ben Gurion Airport", "Jerusalem", "Tel Aviv", "Haifa"];

export default function Prices() {
  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Our Prices</h1>
          <p className="text-gray-600">
            Transparent pricing for all your transportation needs
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="Luxury" className="w-full">
            <TabsList className="mb-8">
              {Object.keys(PRICES).map((classType) => (
                <TabsTrigger key={classType} value={classType}>
                  {classType}
                </TabsTrigger>
              ))}
            </TabsList>

            {Object.entries(PRICES).map(([classType, prices]) => (
              <TabsContent key={classType} value={classType}>
                <div className="rounded-lg border bg-white">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>From / To</TableHead>
                        {DESTINATIONS.map((dest) => (
                          <TableHead key={dest}>{dest}</TableHead>
                        ))}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {DESTINATIONS.map((from) => (
                        <TableRow key={from}>
                          <TableCell className="font-medium">{from}</TableCell>
                          {DESTINATIONS.map((to) => (
                            <TableCell key={to}>
                              {from === to ? (
                                "-"
                              ) : prices[from]?.[to] ? (
                                <span className="font-medium">
                                  ₪{prices[from][to]}
                                </span>
                              ) : (
                                <span className="text-gray-400">
                                  On request
                                </span>
                              )}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
            ))}
          </Tabs>

          <div className="mt-8 p-6 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">
              Additional Information
            </h3>
            <ul className="space-y-2 text-gray-600">
              <li>• Prices are in Israeli Shekels (₪)</li>
              <li>• Rates include VAT</li>
              <li>• Night surcharge may apply (22:00-06:00)</li>
              <li>• Holiday rates may vary</li>
              <li>• Custom routes available upon request</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
