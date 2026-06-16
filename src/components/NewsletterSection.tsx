import { useState } from "react";
import { Send, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export function NewsletterSection() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success("Thanks for subscribing! 🎉", {
        description: "You'll receive our best travel deals in your inbox.",
      });
      setEmail("");
    }
  };

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <div className="relative bg-ocean-gradient rounded-3xl p-8 md:p-12 overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
          
          <div className="relative z-10 max-w-2xl mx-auto text-center text-white">
            <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full mb-6">
              <Mail className="w-4 h-4" />
              <span className="text-sm font-medium">Newsletter</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Get Exclusive Travel Deals
            </h2>
            <p className="text-white/80 mb-8">
              Subscribe to our newsletter and be the first to know about amazing destinations, 
              special offers, and travel tips.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 bg-white/20 border-white/30 text-white placeholder:text-white/60 flex-1"
                required
              />
              <Button
                type="submit"
                size="lg"
                className="h-12 bg-sand hover:bg-sand/90 text-foreground font-semibold gap-2"
              >
                Subscribe
                <Send className="w-4 h-4" />
              </Button>
            </form>

            <p className="text-xs text-white/60 mt-4">
              No spam, unsubscribe anytime. We respect your privacy.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}