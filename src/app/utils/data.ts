import 'dotenv/config';

import {
  CategoryDish,
  CreateOrderRequest,
  MenuItem,
  Restaurant,
  SearchParams,
} from '../types/types';

type RestaurantPromise = { data: Restaurant[]; total: number };
type ParamsProps = { params: { id: string } };
type SearchProps = {
  searchParams: SearchParams;
};
type MenuSearchProps = SearchProps & ParamsProps;

const baseUrl = process.env.BASE_URL;

export async function fetchRestaurants({ searchParams }: SearchParams): Promise<RestaurantPromise> {
  try {
    const searchParameters = await searchParams;
    const params = new URLSearchParams();

    Object.entries(searchParameters).forEach(([key, value]) => {
      params.append(key, value.toString());
    });

    const response = await fetch(`${baseUrl}/api/restaurants${'?' + params.toString()}`);
    if (!response.ok) {
      throw new Error('Ошибка загрузки данных');
    }
    const data: RestaurantPromise = await response.json();
    return data;
  } catch (error: unknown) {
    console.log('Ошибка:', error);
    return { data: [], total: 0 };
  }
}

export async function fetchCuisineType(): Promise<string[]> {
  try {
    const response = await fetch(`${baseUrl}/api/restaurants/cuisine-type`);
    if (!response.ok) {
      throw new Error('Ошибка загрузки типов кухни');
    }
    const data: { cuisineType: string }[] = await response.json();
    return data.map(item => item.cuisineType);
  } catch (error: unknown) {
    console.log('Ошибка:', error);
    return [];
  }
}

export async function fetchDeliveryTime(): Promise<string[]> {
  return ['15', '30', '45'];
}

export async function fetchLastOrdersRestaurants(): Promise<Restaurant[]> {
  try {
    const response = await fetch(`${baseUrl}/api/restaurants/last-order-restaurant`);
    if (!response.ok) {
      throw new Error('Ошибка загрузки данных');
    }
    const data: Restaurant[] = await response.json();
    return data;
  } catch (error: unknown) {
    console.log('Ошибка:', error);
    return [];
  }
}

export async function fetchRestaurantMenu({
  params,
  searchParams,
}: MenuSearchProps): Promise<MenuItem> {
  const { id } = await params;
  const searchParameters = await searchParams;

  const parameters = new URLSearchParams();
  try {
    Object.entries(searchParameters).forEach(([key, value]) => {
      parameters.append(key, value.toString());
    });
    const response = await fetch(
      `${baseUrl}/api/menu/${id}${parameters.toString() ? '?' + parameters.toString() : ''}`
    );
    if (!response.ok) {
      throw new Error('Ошибка загрузки данных');
    }
    const data: MenuItem = await response.json();
    return data;
  } catch (error) {
    console.log('Ошибка:', error);
    return { restaurantName: '', menu: [] };
  }
}

export async function fetchCategoriesMenu({ params }: ParamsProps): Promise<CategoryDish[]> {
  const { id } = await params;
  try {
    const response = await fetch(`${baseUrl}/api/menu/categories/${id}`);
    if (!response.ok) {
      throw new Error('Ошибка загрузки данных');
    }
    const data: CategoryDish[] = await response.json();
    return data;
  } catch (error) {
    console.log('Ошибка', error);
    return [];
  }
}

export async function fetchPostOrder(orderData: CreateOrderRequest) {
  try {
    const response = await fetch(`/api/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });
    if (response.status === 401) {
      return response;
    }

    if (!response.ok) {
      throw new Error('Ошибка в отправке запроса');
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.log('Error: ', error);
    throw error;
  }
}
