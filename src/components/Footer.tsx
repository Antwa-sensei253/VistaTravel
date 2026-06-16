import { Link } from "react-router-dom";
import { Compass, Mail, Phone, MapPin, Instagram, Twitter, Facebook } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Footer() {
  return (
    <footer className="bg-foreground text-background py-12 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-ocean-gradient flex items-center justify-center">
                <Compass className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-display font-bold">VistaTravel</span>
            </Link>
            <p className="text-background/70 text-sm mb-4">
              Discover extraordinary destinations and create memories that last a
              lifetime. Your adventure starts here.
            </p>
            <div className="flex gap-3">
              <Button size="icon" variant="ghost" className="rounded-full hover:bg-background/10">
                <Instagram className="w-5 h-5" />
              </Button>
              <Button size="icon" variant="ghost" className="rounded-full hover:bg-background/10">
                <Twitter className="w-5 h-5" />
              </Button>
              <Button size="icon" variant="ghost" className="rounded-full hover:bg-background/10">
                <Facebook className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-background/70">
              <li>
                <Link to="/destinations" className="hover:text-background transition-colors">
                  All Destinations
                </Link>
              </li>
              <li>
                <Link to="/destinations?category=beach" className="hover:text-background transition-colors">
                  Beach Getaways
                </Link>
              </li>
              <li>
                <Link to="/destinations?category=adventure" className="hover:text-background transition-colors">
                  Adventure Tours
                </Link>
              </li>
              <li>
                <Link to="/destinations?category=city" className="hover:text-background transition-colors">
                  City Escapes
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm text-background/70">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                hello@vistatravel.com
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                +1 (555) 123-4567
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                123 Travel Street, Adventure City
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-display font-semibold mb-4">Stay Updated</h4>
            <p className="text-sm text-background/70 mb-4">
              Subscribe to get special offers and travel inspiration.
            </p>
            <div className="flex gap-2">
              <Input
                placeholder="Your email"
                className="bg-background/10 border-background/20 text-background placeholder:text-background/50"
              />
              <Button className="bg-coral hover:bg-coral/90">
                <Mail className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-background/10 pt-8 text-center text-sm text-background/50">
          <p>© 2024 VistaTravel. All rights reserved. Made by Ahmed Abdulrahim</p>
        </div>
      </div>
    </footer>
  );
}
