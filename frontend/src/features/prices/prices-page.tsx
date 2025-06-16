import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { usePrices } from './usePrices';
import { CLASSES } from '../orders/consts';

export interface Price {
  to: string;
  from: string;
  price: number;
  premium: number;
  luxury: number;
  standart: number;
}

export default function Prices() {
  const { getPrice, destinations } = usePrices();

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Our Prices</h1>
          <p className="text-gray-600">Transparent pricing for all your transportation needs</p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="Luxury" className="w-full">
            <TabsList className="mb-8">
              {CLASSES.map((classType) => (
                <TabsTrigger key={classType} value={classType}>
                  {classType}
                </TabsTrigger>
              ))}
            </TabsList>

            {CLASSES.map((classType) => (
              <TabsContent key={classType} value={classType}>
                <div className="rounded-lg border bg-white">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>From / To</TableHead>
                        {destinations.map((dest) => (
                          <TableHead key={dest}>{dest}</TableHead>
                        ))}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {destinations.map((from) => (
                        <TableRow key={from}>
                          <TableCell className="font-medium">{from}</TableCell>
                          {destinations.map((to) => (
                            <TableCell key={to}>
                              {from === to ? (
                                '-'
                              ) : getPrice({ from, to }) ? (
                                <span className="font-medium">
                                  ₪
                                  {getPrice({ from, to })?.[classType.toLowerCase() as keyof Price]}
                                </span>
                              ) : (
                                <span className="text-gray-400">On request</span>
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
            <h3 className="text-lg font-semibold mb-4">Additional Information</h3>
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
