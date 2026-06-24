export interface Orders {
  id: number;
  deliveredAt: string | null;
  paymentMethod: 'UPI' | 'COD';
  paymentStatus: 'paid' | 'pending';
  shippingAddress: string;
  status: 'pending'  | 'delivered' | 'cancelled';
  totalPrice: number;
  userId: number;

  createdAt: string;
  updatedAt: string;

  OrderItems: OrderItems[];
}

interface OrderItems {
  id: number;
  image: string | null;
  orderId: number;
  price: number;
  productId: number;
  productName: string;
  quantity: number;
  createdAt: string;
  updatedAt: string;

}
