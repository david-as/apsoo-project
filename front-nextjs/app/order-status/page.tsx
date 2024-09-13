import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, ArrowLeft, CheckCircle, XCircle } from "lucide-react"

type OrderStatus = "success" | "payment-failed" | "out-of-stock" | "general-error"

interface OrderStatusProps {
  status: OrderStatus
  orderNumber?: string
}

export default function OrderStatus({ status, orderNumber }: OrderStatusProps) {
  const getStatusContent = () => {
    switch (status) {
      case "success":
        return {
          icon: <CheckCircle className="h-12 w-12 text-green-500" />,
          title: "Order Successful!",
          message: `Thank you for your purchase. Your order number is #${orderNumber}.`,
          buttonText: "Return to Shop",
        }
      case "payment-failed":
        return {
          icon: <XCircle className="h-12 w-12 text-red-500" />,
          title: "Payment Failed",
          message: "We couldn't process your payment. Please try again or use a different payment method.",
          buttonText: "Retry Payment",
        }
      case "out-of-stock":
        return {
          icon: <AlertTriangle className="h-12 w-12 text-yellow-500" />,
          title: "Item(s) Out of Stock",
          message: "We're sorry, but one or more items in your order are currently out of stock.",
          buttonText: "Modify Order",
        }
      case "general-error":
        return {
          icon: <XCircle className="h-12 w-12 text-red-500" />,
          title: "Order Error",
          message: "An unexpected error occurred while processing your order. Please try again later.",
          buttonText: "Return to Shop",
        }
      default:
        return {
          icon: <AlertTriangle className="h-12 w-12 text-yellow-500" />,
          title: "Unknown Status",
          message: "We couldn't determine the status of your order. Please contact customer support.",
          buttonText: "Contact Support",
        }
    }
  }

  const { icon, title, message, buttonText } = getStatusContent()

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">{title}</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <div className="flex justify-center mb-4">{icon}</div>
          <p className="text-gray-600">{message}</p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button className="w-full">
            <ArrowLeft className="mr-2 h-4 w-4" /> {buttonText}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}