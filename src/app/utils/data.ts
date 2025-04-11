import 'dotenv/config';

import { CategoryDish, CreateOrderRequest, MenuItem, Restaurant } from '../types/types';

const baseUrl = process.env.BASE_URL;

export async function fetchRestaurants({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}): Promise<{ data: Restaurant[]; total: number }> {
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
    const data: { data: Restaurant[]; total: number } = await response.json();
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
  try {
    const response = await fetch(`${baseUrl}/api/restaurants/delivery-time`);
    if (!response.ok) {
      throw new Error('Ошибка загрузки времени доставки');
    }
    const data: { deliveryTime: string }[] = await response.json();
    return data.map(item => item.deliveryTime).sort();
  } catch (error: unknown) {
    console.log('Ошибка:', error);
    return [];
  }
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
}: {
  params: { id: string };
  searchParams: { [key: string]: string };
}): Promise<MenuItem> {
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

export async function fetchCategoriesMenu({
  params,
}: {
  params: { id: string };
}): Promise<CategoryDish[]> {
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
