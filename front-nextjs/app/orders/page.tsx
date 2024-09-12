'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

// Mock data for demonstration
const mockOrders = [
  { id: 1, type: 'food', itemName: 'Pizza Margherita', quantity: 2, specialInstructions: 'Extra cheese', status: 'pending' },
  { id: 2, type: 'drink', itemName: 'Coca Cola', quantity: 3, specialInstructions: 'No ice', status: 'preparing' },
  { id: 3, type: 'food', itemName: 'Chicken Salad', quantity: 1, specialInstructions: 'Dressing on the side', status: 'ready' },
  { id: 4, type: 'other', itemName: 'Utensils', quantity: 1, specialInstructions: 'Eco-friendly please', status: 'completed' },
]

export default function RestaurantOrdersPage() {
  const [orders, setOrders] = useState(mockOrders)
  const router = useRouter()

  const handleStatusChange = (orderId: number, newStatus: string) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ))
  }

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Restaurant Orders</CardTitle>
          <CardDescription>Manage your incoming orders</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Item Name</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Special Instructions</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.type}</TableCell>
                  <TableCell>{order.itemName}</TableCell>
                  <TableCell>{order.quantity}</TableCell>
                  <TableCell>{order.specialInstructions}</TableCell>
                  <TableCell>
                    <Badge variant={
                      order.status === 'completed' ? 'default' :
                      order.status === 'ready' ? 'secondary' :
                      order.status === 'preparing' ? 'accent' : 'destructive'
                    }>
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <select 
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                      className="border rounded p-1"
                    >
                      <option value="pending">Pending</option>
                      <option value="preparing">Preparing</option>
                      <option value="ready">Ready</option>
                      <option value="completed">Completed</option>
                    </select>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button variant="link" onClick={() => router.push('/')}>
            Back to Dashboard
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}