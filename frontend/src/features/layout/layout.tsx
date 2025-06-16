import { Link, Route, Routes } from 'react-router-dom';
import { Menu } from 'lucide-react';
import OrderModal from '../orders/order-modal';
import { Button } from '@/components/ui/button';
import HomePage from '../home/home-page';
import PricesPage from '../prices/prices-page';
import FleetPage from '../fleet/fleet';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { useState } from 'react';

export default function Layout() {
  const [showOrderModal, setShowOrderModal] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-6">
            <Link to={'/'} className="flex items-center gap-2">
              <img src="../public/logo.png" className="h-8 w-8 text-blue-600" />
              <span className="font-semibold text-xl tracking-tight">Best Transfers Israel</span>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <Button
              onClick={() => setShowOrderModal(true)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Book Now
            </Button>
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className={navigationMenuTriggerStyle()}>
                    <Menu />
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <NavigationMenuLink href="/">Home</NavigationMenuLink>
                    <NavigationMenuLink href="/fleet">Fleet</NavigationMenuLink>
                    <NavigationMenuLink href="/tablePrices">Prices</NavigationMenuLink>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/tablePrices" element={<PricesPage />} />
          <Route path="/fleet" element={<FleetPage />} />
        </Routes>
      </main>

      <OrderModal open={showOrderModal} onClose={() => setShowOrderModal(false)} />

      <footer className="border-t bg-gray-50 mt-auto">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-semibold mb-4">TWC Transport</h3>
              <p className="text-sm text-gray-600">Premium transportation services across Israel</p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Contact</h3>
              <p className="text-sm text-gray-600">
                Email: info@twc.com
                <br />
                Phone: +972-123-456-789
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Hours</h3>
              <p className="text-sm text-gray-600">
                24/7 Service
                <br />
                Available all year round
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
