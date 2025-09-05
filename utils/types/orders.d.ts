export interface ShippingAddress {
  street: string;
  city: string;
  phone: string;
  _id: string;
  id: string;
}



export interface Order {
  _id: string;
  id: string;
  user: string;
  cartItems: CartItem[];
  totalOrderPrice: number;
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  paymentStatus: string;
  isPaid: boolean;
  isDelivered: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  paidAt?: string;
  deliveredAt?: string;
}

export interface OrderAdminResponse {
  data: Order[]
  total: number;
  page: number;
  totalPages: number
}

export type OrdersResponse = Order[];

// Order Receipt Types
export interface OrderReceiptItem {
  product: {
    _id: string;
    name?: string;
    productName?: string;
    price: number;
  };
  quantity: number;
  price: number;
}

export interface OrderReceiptData {
  _id: string;
  orderId: string;
  user: {
    _id: string;
    name: string;
    email: string;
  };
  cartItems: OrderReceiptItem[];
  totalOrderPrice: number;
  paymentMethod: 'Cash' | 'Card';
  isPaid: boolean;
  isDelivered: boolean;
  shippingAddress: {
    street: string;
    city: string;
    phone: string;
  };
  createdAt: string;
  deliveredAt?: string;
  paidAt?: string;
}
