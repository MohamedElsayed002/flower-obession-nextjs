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
  
  export type OrdersResponse = Order[];
  