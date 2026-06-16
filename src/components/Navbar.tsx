import { Link, useLocation, useNavigate } from "react-router-dom";
import { Compass, Menu, X, Briefcase, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { useTravel } from "@/context/TravelContext";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

export function Navbar() {
  const { userMode, setUserMode, bookings } = useTravel();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { t, i18n } = useTranslation();

  const activeBookings = bookings.filter((b) => b.status === "confirmed").length;

  const navLinks = userMode === "customer" 
    ? [
        { href: "/", label: t("nav.home") },
        { href: "/destinations", label: t("nav.destinations") },
      ]
    : [
        { href: "/provider", label: t("nav.dashboard") },
        { href: "/provider/add", label: t("nav.add_package") },
      ];

  const navigate = useNavigate();

  const toggleMode = () => {
    const newMode = userMode === "customer" ? "provider" : "customer";
    setUserMode(newMode);
    navigate(newMode === "provider" ? "/provider" : "/");
  };

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === "en" ? "ar" : "en");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-xl bg-ocean-gradient flex items-center justify-center group-hover:shadow-glow transition-shadow">
            <Compass className="w-6 h-6 text-primary-foreground" />
          </div>
          <span className="text-xl font-display font-bold text-gradient">
            VistaTravel
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary relative",
                location.pathname === link.href
                  ? "text-primary"
                  : "text-muted-foreground"
              )}
            >
              {link.label}
              {location.pathname === link.href && (
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full" />
              )}
            </Link>
          ))}
          
          {userMode === "customer" && (
            <Link to="/bookings" className="relative">
              <Button variant="ghost" size="sm" className="gap-2">
                {t("nav.my_bookings")}
                {activeBookings > 0 && (
                  <Badge className="bg-coral text-coral-foreground h-5 w-5 p-0 flex items-center justify-center text-xs">
                    {activeBookings}
                  </Badge>
                )}
              </Button>
            </Link>
          )}
        </div>

        {/* Mode Toggle & Mobile Menu */}
        <div className="flex items-center gap-2">
          <Button
            onClick={toggleLanguage}
            variant="ghost"
            size="sm"
            className="font-semibold px-2"
          >
            {i18n.language === "en" ? "AR" : "EN"}
          </Button>

          <Button
            onClick={toggleMode}
            variant={userMode === "provider" ? "default" : "outline"}
            size="sm"
            className={cn(
              "hidden sm:flex gap-2 transition-all",
              userMode === "provider" && "bg-ocean-gradient hover:opacity-90"
            )}
          >
            {userMode === "customer" ? (
              <>
                <Briefcase className="w-4 h-4" />
                {t("nav.provider_view")}
              </>
            ) : (
              <>
                <User className="w-4 h-4" />
                {t("nav.customer_view")}
              </>
            )}
          </Button>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <div className="flex flex-col gap-6 mt-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "text-lg font-medium transition-colors hover:text-primary",
                      location.pathname === link.href
                        ? "text-primary"
                        : "text-foreground"
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
                
                {userMode === "customer" && (
                  <Link
                    to="/bookings"
                    onClick={() => setIsOpen(false)}
                    className="text-lg font-medium flex items-center gap-2"
                  >
                    {t("nav.my_bookings")}
                    {activeBookings > 0 && (
                      <Badge className="bg-coral">{activeBookings}</Badge>
                    )}
                  </Link>
                )}

                <Button
                  onClick={() => {
                    toggleMode();
                    setIsOpen(false);
                  }}
                  variant={userMode === "provider" ? "default" : "outline"}
                  className="mt-4"
                >
                  {userMode === "customer" ? t("nav.switch_provider") : t("nav.switch_customer")}
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
