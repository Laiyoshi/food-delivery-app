export type Restaurant = {
  id: string;
  name: string;
  description: string;
  rating: number;
  deliveryTime: string;
  deliveryTimeMinutes: number;
  cuisineType: string;
  averagePrice: number;
  imageUrl: string;
};

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

export type CardProps = {
  restaurantData: restaurantData;
};

export type FilterDropdownProps<T extends string | number> = {
  label: string;
  value: T;
  onChange: (value: T) => void;
  options: number[] | string[];
};

export type CategoryFilter = {
  category: string;
  categoryFilter: string[];
};

export type Dish = {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  restaurantId: string;
};

export type MenuItem = {
  restaurantName: string;
  menu: {
    category: string;
    dishes: Dish[];
  }[];
};

export type MenuItemProps = {
  menuData: Dish;
};

export type CartQuantity = {
  quantity: number;
  restaurantId: string;
};

export type CartItem = Dish & CartQuantity;

export type PromiseCart = {
  menuItemId: string;
  quantity: number;
  price: number;
};

export type CreateOrderRequest = {
  userId: string;
  deliveryAddressId: number;
  restaurantId: string;
  paymentMethodId: number;
  cart: PromiseCart[];
  orderAmount: number;
};

export type RestaurantListProps = {
  restaurantData: Restaurant[];
  lastOrdersData: Restaurant[];
};

export type FilterSectionProps = {
  cuisineOptions: string[];
  deliveryOptions: string[];
};

export type CategoryDish = {
  id: string;
  name: string;
};

export type SearchParams = { [key: string]: string };
export type ParamsRequest = { params: Promise<{ id: string }> };

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

export interface OrderData {
  id: number;
  orderDate: string; // ISO-формат даты
  status: string;
  restaurant: string;
  deliveryAddress: string;
  deliveryTimeMinutes: number;
  paymentMethod: string;
  courierName: string;
  courierPhone: string;
  items: {
    name: string;
    quantity: number;
    price: number;
    restaurantId: string;
  }[];
  total: number; // Общая сумма заказа
}

export interface AccountSettingsFormProps {
  user: {
    firstName: string;
    lastName: string;
    email: string;
    accountName: string;
    phone: string;
    address?: string;
    cardNumber?: string;
    currentPassword?: string;
    newPassword?: string;
    repeatPassword?: string;
  };
}

export interface UserState {
  userId: string | null;
  paymentMethodId: number | null;
  deliveryAddressId: number | null;
  avatar: string | null;
  setUserId: (id: string | null) => void;
  setPaymentMethodId: (id: number | null) => void;
  setDeliveryAddressId: (id: number | null) => void;
  setAvatar: (url: string | null) => void;

}
