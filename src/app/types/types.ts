export interface Restaurant {
  id: string;
  name: string;
  description: string;
  rating: number;
  deliveryTime: string;
  deliveryTimeMinutes: number;
  cuisineType: string;
  averagePrice: number;
  imageUrl: string;
}

type restaurantData = {
  id: string;
  name: string;
  description: string;
  rating: number;
  deliveryTime: string;
  cuisineType: string;
  averagePrice: number;
  imageUrl: string;
};

export type CardTypeProps = {
  restaurantData: restaurantData;
};

export interface FilterDropdownProps<T extends string | number> {
  label: string;
  value: T;
  onChange: (value: T) => void;
  options: number[] | string[];
}

export interface CategoryFilter {
  category: string;
  categoryFilter: string[];
}

export interface Dish {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  restaurantId: string;
}

export interface MenuItem {
  restaurantName: string;
  menu: {
    category: string;
    dishes: Dish[];
  }[];
}

export type menuItemProps = {
  menuData: Dish;
};

export interface CartItem extends Dish {
  quantity: number;
}

export interface StoreState {
  cart: CartItem[];
  cartAmount: number;
  updateAmount: () => void;
  addToCart: (item: Dish) => void;
  removeFromCart: (id: string) => void;
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

export interface PromiseCart {
  menuItemId: string;
  quantity: number;
  price: number;
}

export interface CreateOrderRequest {
  userId: string;
  deliveryAddressId: number;
  restaurantId: string;
  paymentMethodId: number;
  cart: PromiseCart[];
  orderAmount: number;
}

export interface RestaurantListProps {
  restaurantData: Restaurant[];
  lastOrdersData: Restaurant[];
}

export interface FilterSectionProps {
  cuisineOptions: string[];
  deliveryOptions: string[];
}

export interface CategoryDish {
  id: string;
  name: string;
}

export type AuthFooterProps = {
  question: string;
  linkText: string;
  linkHref: string;
  isInsideForm?: boolean;
  className?: string;
};

export type AuthFormProps = {
  title: string;
  children: React.ReactNode;
  className?: string;
};

export interface OrderItemProps {
  id: number;
  orderDate: string; // ISO-формат даты
  restaurant: string;
  amount: number; // Сумма заказа
  status: 'Создан' | 'В пути' | 'Доставлен'; // Перечисление статусов
}

export interface OrderData {
  orderId: number;
  orderDate: string; // ISO-формат даты
  status: string;
  restaurant: string;
  deliveryAddress: string;
  paymentMethod: string;
  courierName: string;
  courierPhone: string;
  items: {
    name: string;
    quantity: number;
    price: number;
  }[];
  total: number; // Общая сумма заказа
}

export interface ReviewData {
  restaurantRating: number;
  deliveryRating: number;
  comment: string;
  orderId: number;
}

export interface AccountSettingsFormProps {
  user: {
    firstName: string;
    lastName: string;
    email: string;
    accountName: string;
    phone: string;
  };
}

export interface UserState {
  userId: string | null;
  paymentMethodId: number | null;
  deliveryAddressId: number | null;
  setUserId: (id: string | null) => void;
  setPaymentMethodId: (id: number | null) => void;
  setDeliveryAddressId: (id: number | null) => void;
}
