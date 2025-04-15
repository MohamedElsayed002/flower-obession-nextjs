
declare type CartItem = {
    _id : string;
    product: Products
    quantity: number;
    price: number;
    id: string
}

declare type CartResponse = {
    message : string;
    cartItems: CartItem[];
    totalPrice: number;
    totalPriceDiscount: number;
    id: string | null
}