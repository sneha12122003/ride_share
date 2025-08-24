"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { CreditCard, Plus, Trash2 } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

interface PaymentMethod {
  id: string
  type: "card" | "paypal" | "applepay" | "googlepay"
  name: string
  details: string
  isDefault: boolean
}

export function PaymentMethods() {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: "1",
      type: "card",
      name: "Visa ending in 4242",
      details: "Expires 12/25",
      isDefault: true,
    },
    {
      id: "2",
      type: "paypal",
      name: "PayPal",
      details: "user@example.com",
      isDefault: false,
    },
  ])
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newPaymentType, setNewPaymentType] = useState<"card" | "paypal" | "applepay" | "googlepay">("card")

  const handleAddPaymentMethod = (e: React.FormEvent) => {
    e.preventDefault()

    // In a real app, you would call your API to add the payment method
    // and then update the state with the response

    const newMethod: PaymentMethod = {
      id: `${paymentMethods.length + 1}`,
      type: newPaymentType,
      name:
        newPaymentType === "card"
          ? "Visa ending in 1234"
          : newPaymentType === "paypal"
            ? "PayPal"
            : newPaymentType === "applepay"
              ? "Apple Pay"
              : "Google Pay",
      details: newPaymentType === "card" ? "Expires 12/28" : "user@example.com",
      isDefault: false,
    }

    setPaymentMethods([...paymentMethods, newMethod])
    setIsAddDialogOpen(false)

    toast({
      title: "Payment method added",
      description: `Your ${newMethod.name} has been added successfully.`,
    })
  }

  const handleSetDefault = (id: string) => {
    setPaymentMethods(
      paymentMethods.map((method) => ({
        ...method,
        isDefault: method.id === id,
      })),
    )

    toast({
      title: "Default payment method updated",
      description: "Your default payment method has been updated.",
    })
  }

  const handleRemove = (id: string) => {
    const methodToRemove = paymentMethods.find((method) => method.id === id)

    if (methodToRemove?.isDefault) {
      toast({
        title: "Cannot remove default payment method",
        description: "Please set another payment method as default first.",
        variant: "destructive",
      })
      return
    }

    setPaymentMethods(paymentMethods.filter((method) => method.id !== id))

    toast({
      title: "Payment method removed",
      description: "Your payment method has been removed.",
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Methods</CardTitle>
        <CardDescription>Manage your payment methods for ride bookings</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {paymentMethods.map((method) => (
            <div
              key={method.id}
              className={`flex items-center justify-between rounded-lg border p-4 ${
                method.isDefault ? "border-primary bg-primary/5" : ""
              }`}
            >
              <div className="flex items-center space-x-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <CreditCard className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">{method.name}</p>
                  <p className="text-sm text-muted-foreground">{method.details}</p>
                  {method.isDefault && <span className="text-xs text-primary">Default payment method</span>}
                </div>
              </div>
              <div className="flex space-x-2">
                {!method.isDefault && (
                  <Button variant="outline" size="sm" onClick={() => handleSetDefault(method.id)}>
                    Set as Default
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-destructive"
                  onClick={() => handleRemove(method.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="w-full">
              <Plus className="mr-2 h-4 w-4" />
              Add Payment Method
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Payment Method</DialogTitle>
              <DialogDescription>Add a new payment method to your account</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddPaymentMethod}>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label>Payment Type</Label>
                  <RadioGroup
                    defaultValue="card"
                    onValueChange={(value) => setNewPaymentType(value as any)}
                    className="grid grid-cols-2 gap-4"
                  >
                    <div className="flex items-center space-x-2 rounded-md border p-3">
                      <RadioGroupItem value="card" id="card" />
                      <Label htmlFor="card" className="flex-1 cursor-pointer">
                        Credit Card
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 rounded-md border p-3">
                      <RadioGroupItem value="paypal" id="paypal" />
                      <Label htmlFor="paypal" className="flex-1 cursor-pointer">
                        PayPal
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 rounded-md border p-3">
                      <RadioGroupItem value="applepay" id="applepay" />
                      <Label htmlFor="applepay" className="flex-1 cursor-pointer">
                        Apple Pay
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 rounded-md border p-3">
                      <RadioGroupItem value="googlepay" id="googlepay" />
                      <Label htmlFor="googlepay" className="flex-1 cursor-pointer">
                        Google Pay
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {newPaymentType === "card" && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiryDate">Expiry Date</Label>
                        <Input id="expiryDate" placeholder="MM/YY" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvc">CVC</Label>
                        <Input id="cvc" placeholder="123" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="nameOnCard">Name on Card</Label>
                      <Input id="nameOnCard" placeholder="John Doe" />
                    </div>
                  </>
                )}

                {newPaymentType === "paypal" && (
                  <div className="space-y-2">
                    <Label htmlFor="paypalEmail">PayPal Email</Label>
                    <Input id="paypalEmail" type="email" placeholder="your@email.com" />
                  </div>
                )}
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Add Payment Method</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  )
}
