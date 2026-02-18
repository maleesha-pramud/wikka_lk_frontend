export interface CartItem {
  id: string;
  productId: string;
  title: string;
  price: number;
  image: string;
  condition?: string;
  location: string;
  sellerId: string;
  sellerName: string;
  quantity: number;
}

export interface CartSummary {
  subtotal: number;
  shipping: number;
  total: number;
  itemCount: number;
}

export interface ShippingAddress {
  fullName: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface PaymentMethod {
  type: 'card' | 'cash_on_delivery' | 'bank_transfer';
  cardHolderName?: string;
  cardNumber?: string;
  expiryDate?: string;
  cvv?: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  shippingAddress: ShippingAddress;
  paymentMethod: PaymentMethod;
  summary: CartSummary;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
}
