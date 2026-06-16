import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TravelProvider } from "@/context/TravelContext";
import HomePage from "./pages/HomePage";
import DestinationsPage from "./pages/DestinationsPage";
import BookingsPage from "./pages/BookingsPage";
import ProviderDashboard from "./pages/ProviderDashboard";
import AddPackagePage from "./pages/AddPackagePage";
import PaymentPage from "./pages/PaymentPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TravelProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/destinations" element={<DestinationsPage />} />
            <Route path="/bookings" element={<BookingsPage />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/provider" element={<ProviderDashboard />} />
            <Route path="/provider/add" element={<AddPackagePage />} />
            <Route path="/provider/edit/:id" element={<AddPackagePage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </TravelProvider>
  </QueryClientProvider>
);

export default App;
