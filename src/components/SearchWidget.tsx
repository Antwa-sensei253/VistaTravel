import { useState } from "react";
import { Search, Calendar, Users, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface SearchWidgetProps {
  onSearch?: (filters: {
    destination: string;
    checkIn: Date | undefined;
    checkOut: Date | undefined;
    guests: number;
  }) => void;
}

export function SearchWidget({ onSearch }: SearchWidgetProps) {
  const navigate = useNavigate();
  const [destination, setDestination] = useState("");
  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();
  const [guests, setGuests] = useState(2);
  const { t } = useTranslation();

  const handleSearch = () => {
    if (onSearch) {
      onSearch({ destination, checkIn, checkOut, guests });
    }
    navigate(`/destinations?search=${encodeURIComponent(destination)}`);
  };

  return (
    <div className="bg-background/95 backdrop-blur-md rounded-2xl p-4 md:p-6 shadow-xl w-full max-w-4xl mx-auto animate-fade-in border border-border">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Destination */}
        <div className="relative">
          <label className="text-xs font-medium text-foreground/70 mb-1 block">
            {t("search_widget.where_to")}
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/50" />
            <Input
              placeholder={t("search_widget.destination_placeholder")}
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="pl-10 h-12 border-border bg-background text-foreground"
            />
          </div>
        </div>

        {/* Check-in */}
        <div>
          <label className="text-xs font-medium text-foreground/70 mb-1 block">
            {t("search_widget.check_in")}
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full h-12 justify-start text-left font-normal border-border bg-background text-foreground",
                  !checkIn && "text-foreground/50"
                )}
              >
                <Calendar className="mr-2 h-4 w-4" />
                {checkIn ? format(checkIn, "MMM dd, yyyy") : t("search_widget.add_date")}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <CalendarComponent
                mode="single"
                selected={checkIn}
                onSelect={setCheckIn}
                disabled={(date) => date < new Date()}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Check-out */}
        <div>
          <label className="text-xs font-medium text-foreground/70 mb-1 block">
            {t("search_widget.check_out")}
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full h-12 justify-start text-left font-normal border-border bg-background text-foreground",
                  !checkOut && "text-foreground/50"
                )}
              >
                <Calendar className="mr-2 h-4 w-4" />
                {checkOut ? format(checkOut, "MMM dd, yyyy") : t("search_widget.add_date")}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <CalendarComponent
                mode="single"
                selected={checkOut}
                onSelect={setCheckOut}
                disabled={(date) => date < (checkIn || new Date())}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Guests & Search */}
        <div className="flex gap-2">
          <div className="flex-1">
            <label className="text-xs font-medium text-foreground/70 mb-1 block">
              {t("search_widget.guests")}
            </label>
            <div className="relative">
              <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/50" />
              <Input
                type="number"
                min={1}
                max={10}
                value={guests}
                onChange={(e) => setGuests(parseInt(e.target.value) || 1)}
                className="pl-10 h-12 border-border bg-background text-foreground"
              />
            </div>
          </div>
          <div className="flex items-end">
            <Button
              onClick={handleSearch}
              size="lg"
              className="h-12 px-6 bg-ocean-gradient hover:opacity-90 transition-opacity"
            >
              <Search className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
