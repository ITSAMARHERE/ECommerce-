import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { capturePayment } from "@/store/shop/order-slice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

function PaypalReturnPage() {
    const dispatch = useDispatch();
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const paymentId = params.get("paymentId");
    const payerId = params.get("PayerID");

    useEffect(() => {
        console.log("All URL params:", Object.fromEntries(params.entries()));
        
        const paymentId = params.get('paymentId') || params.get('token') || params.get('payment_id');
        const payerId = params.get('PayerID') || params.get('payer_id');
        
        console.log("Resolved PaymentId:", paymentId, "PayerId:", payerId);
        
        if (paymentId && payerId) {
            const orderId = JSON.parse(sessionStorage.getItem('currentOrderId'));
            
            dispatch(capturePayment({paymentId, payerId, orderId})).then(data => {
                if (data?.payload?.success) {
                    sessionStorage.removeItem('currentOrderId');
                    window.location.href = '/shop/payment-success';
                }
            });
        }
    }, [params, dispatch]);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Processing Payment...Please wait!</CardTitle>
            </CardHeader>
        </Card>
    );
}

export default PaypalReturnPage;