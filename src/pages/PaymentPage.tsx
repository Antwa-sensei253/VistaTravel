import { PaymentForm } from "@/components/PaymentForm";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const PaymentPage = () => {
    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8">
            <div className="max-w-6xl mx-auto">
                <div className="mb-8">
                    <Button variant="ghost" asChild className="mb-4">
                        <Link to="/destinations" className="flex items-center gap-2">
                            <ArrowLeft className="h-4 w-4" /> Back to Destinations
                        </Link>
                    </Button>
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">Checkout</h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                    {/* Order Summary Section */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-lg p-6 shadow-sm border">
                            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                            <div className="space-y-4">
                                <div className="flex justify-between items-start pb-4 border-b">
                                    <div>
                                        <h3 className="font-medium text-lg">Detailed Travel Package</h3>
                                        <p className="text-sm text-gray-500">7 Days / 6 Nights</p>
                                    </div>
                                    <p className="font-semibold">$1,299.00</p>
                                </div>

                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Subtotal</span>
                                    <span>$1,299.00</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Taxes & Fees</span>
                                    <span>$150.00</span>
                                </div>

                                <div className="pt-4 border-t flex justify-between items-center">
                                    <span className="font-bold text-lg">Total</span>
                                    <span className="font-bold text-lg text-primary">$1,449.00</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                            <p className="text-sm text-blue-800">
                                <strong>Free Cancellation:</strong> Cancel up to 48 hours before your trip for a full refund.
                            </p>
                        </div>
                    </div>

                    {/* Payment Section */}
                    <div className="lg:pl-8">
                        <PaymentForm />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentPage;
