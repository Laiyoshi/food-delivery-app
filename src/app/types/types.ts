export interface Restaurant {
  id: string;
  name: string;
  description: string;
  rating: number;
  deliveryTime: string;
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

export interface Cuisine {
  cuisineType: string;
}

export interface Delivery {
  deliveryTime: string;
}
