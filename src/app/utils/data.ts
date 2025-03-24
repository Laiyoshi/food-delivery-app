import 'dotenv/config';

import { CategoryDish, MenuItem, PromiseCart, Restaurant } from '../types/types';

const base_url = process.env.BASE_URL ? process.env.BASE_URL : "";

export async function fetchRestaurants({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}): Promise<Restaurant[]> {
  try {
    const searchParameters = await searchParams;
    const params = new URLSearchParams();
    Object.entries(searchParameters).forEach(([key, value]) => {
      params.append(key, value.toString());
    });

    const response = await fetch(`${base_url}/api/restaurants${'?' + params.toString()}`);
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

export async function fetchCuisineType(): Promise<string[]> {
  try {
    const response = await fetch(`${base_url}/api/restaurants/cuisine-type`);
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
    const response = await fetch(`${base_url}/api/restaurants/delivery-time`);
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
    const response = await fetch(`${base_url}/api/restaurants/last-order-restaurant`);
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
      `${process.env.HOST}${id}${parameters.toString() ? '?' + parameters.toString() : ''}`
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
    const response = await fetch(`${base_url}/api/menu/categories/${id}`);
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

export async function fetchPostOrder(orderData: PromiseCart[]): Promise<PromiseCart[]> {
  try {
    const response = await fetch(`{base_url}/api/cart`, {
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

export async function fetchRegisterUser(
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  address: string,
  cardNumber: string,
): Promise<{ success?: string; error?: string }> {
  try {
    const response = await fetch(`${base_url}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ firstName, lastName, email, password, address, cardNumber }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Ошибка при регистрации");
    }

    return { success: data.message };
  } catch (error: unknown) {
    console.error("Ошибка:", error);
    return { error: (error as Error).message };
  }
}

export async function fetchLoginUser(data: { identifier: string; password: string }) {
  try {
    const response = await fetch(`${base_url}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Ошибка входа');
    }

    return await response.json();
  } catch (error: unknown) {
    console.error('Ошибка:', error);
    throw error;
  }
}
