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
    data : Order[]
    total: number;
    page: number;
    totalPages: number
  }
  
  export type OrdersResponse = Order[];
  