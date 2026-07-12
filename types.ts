export interface MenuItem {
  id: string;
  name: string;
  category: 'Veg' | 'Non-Veg' | 'Beverages' | 'Desserts';
  cuisine: 'Indian' | 'Chinese' | 'Italian';
  subCategory: string; // e.g., "Curries", "Biryani", "Appetizers", "Noodles", "Pizza", "Pasta"
  description: string;
  price: number;
  rating: number;
  reviewsCount: number;
  isVeg: boolean;
  isSpecial?: boolean;
  image: string;
  isAvailable: boolean;
}

export interface CartItem {
  menuItemId: string;
  quantity: number;
  notes?: string;
}

export interface TableReservation {
  id: string;
  name: string;
  phone: string;
  email: string;
  guestsCount: number;
  date: string;
  time: string;
  specialRequest?: string;
  status: 'Pending' | 'Confirmed' | 'Cancelled';
  tableNumber?: number;
  createdAt: string;
}

export interface OrderItem {
  menuItemId: string;
  name: string;
  quantity: number;
  price: number;
  isVeg: boolean;
}

export interface Order {
  id: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  deliveryAddress: string;
  items: OrderItem[];
  subtotal: number;
  gst: number;
  deliveryCharge: number;
  total: number;
  couponApplied?: string;
  status: 'Pending' | 'Received' | 'Preparing' | 'Out for Delivery' | 'Delivered';
  createdAt: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  text: string;
  date: string;
  avatar?: string;
}
