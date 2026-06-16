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
import { useTranslation } from "react-i18next";

// Replace with your actual publishable key or use an env variable
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || "pk_test_sample");

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const { t } = useTranslation();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true);

        if (!stripe || !elements) {
            // Fallback for demo/mock environment without valid key
            setTimeout(() => {
                setLoading(false);
                toast.success(t("payment_form.success_mock"));
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
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : t("payment_form.pay_now")}
            </Button>
        </form>
    );
};

// Fallback Mock Form if Stripe Key is missing or invalid for rendering
const MockPaymentForm = () => {
    const { t } = useTranslation();
    const [loading, setLoading] = useState(false);

    const handleMockPay = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            toast.success(t("payment_form.success_demo"));
        }, 2000);
    };

    return (
        <form onSubmit={handleMockPay} className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="card-number">{t("payment_form.card_number")}</Label>
                <div className="relative">
                    <CreditCard className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input id="card-number" placeholder={t("placeholders.card_number")} className="pl-9" required />
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="expiry">{t("payment_form.expiry")}</Label>
                    <Input id="expiry" placeholder={t("placeholders.expiry")} required />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="cvc">{t("payment_form.cvc")}</Label>
                    <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input id="cvc" placeholder={t("placeholders.cvc")} className="pl-9" required />
                    </div>
                </div>
            </div>
            <div className="space-y-2">
                <Label htmlFor="name">{t("payment_form.cardholder")}</Label>
                <Input id="name" placeholder={t("placeholders.cardholder")} required />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : t("payment_form.pay_securely")}
            </Button>
            <p className="text-xs text-center text-muted-foreground flex items-center justify-center gap-1">
                <Lock className="h-3 w-3" /> {t("payment_form.ssl_encryption")}
            </p>
        </form>
    );
};

export const PaymentForm = () => {
    // Check if we have a key to determine which form to render
    const hasStripeKey = !!import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
    const { t } = useTranslation();

    return (
        <Card className="w-full max-w-md mx-auto shadow-lg">
            <CardHeader>
                <CardTitle>{t("payment_form.title")}</CardTitle>
                <CardDescription>{t("payment_form.desc")}</CardDescription>
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
