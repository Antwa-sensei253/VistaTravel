import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
    Elements,
    PaymentElement,
    useStripe,
    useElements,
} from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2, CreditCard, Lock } from "lucide-react";

// Replace with your actual publishable key or use an env variable
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || "pk_test_sample");

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true);

        if (!stripe || !elements) {
            // Fallback for demo/mock environment without valid key
            setTimeout(() => {
                setLoading(false);
                toast.success("Payment successful! (Mock Mode)");
            }, 2000);
            return;
        }

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: window.location.origin + "/bookings",
            },
        });

        if (error) {
            toast.error(error.message);
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <PaymentElement />
            <Button disabled={!stripe || loading} className="w-full">
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Pay Now"}
            </Button>
        </form>
    );
};

// Fallback Mock Form if Stripe Key is missing or invalid for rendering
const MockPaymentForm = () => {
    const [loading, setLoading] = useState(false);

    const handleMockPay = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            toast.success("Payment successful! (Demo)");
        }, 2000);
    };

    return (
        <form onSubmit={handleMockPay} className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="card-number">Card Number</Label>
                <div className="relative">
                    <CreditCard className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input id="card-number" placeholder="0000 0000 0000 0000" className="pl-9" required />
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="expiry">Expiry</Label>
                    <Input id="expiry" placeholder="MM/YY" required />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="cvc">CVC</Label>
                    <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input id="cvc" placeholder="123" className="pl-9" required />
                    </div>
                </div>
            </div>
            <div className="space-y-2">
                <Label htmlFor="name">Cardholder Name</Label>
                <Input id="name" placeholder="John Doe" required />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Pay Securely"}
            </Button>
            <p className="text-xs text-center text-muted-foreground flex items-center justify-center gap-1">
                <Lock className="h-3 w-3" /> Secure SSL Encryption
            </p>
        </form>
    );
};

export const PaymentForm = () => {
    // Check if we have a key to determine which form to render
    const hasStripeKey = !!import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;

    return (
        <Card className="w-full max-w-md mx-auto shadow-lg">
            <CardHeader>
                <CardTitle>Payment Details</CardTitle>
                <CardDescription>Complete your booking securely.</CardDescription>
            </CardHeader>
            <CardContent>
                {hasStripeKey ? (
                    // Note: In a real app, you need a clientSecret from the backend.
                    // For this UI demo, we wrap with Elements but it might fail without clientSecret/mode.
                    // We'll use the MockForm primarily for this pure frontend demo unless configured.
                    <Elements stripe={stripePromise} options={{ mode: 'payment', currency: 'usd', amount: 1000 }}>
                        <CheckoutForm />
                    </Elements>
                ) : (
                    <MockPaymentForm />
                )}
            </CardContent>
        </Card>
    );
};
