import { MenuItem, Restaurant } from '../types/types';

export async function fetchRestaurants(): Promise<Restaurant[]> {
  try {
    const response = await fetch('http://localhost:3000/api/restaurants');
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
    const response = await fetch('http://localhost:3000/api/restaurants/cuisine-type');
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
    const response = await fetch('http://localhost:3000/api/restaurants/delivery-time');
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
    const response = await fetch('http://localhost:3000/api/restaurants/last-order-restaurant');
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
}: {
  params: { id: string };
}): Promise<MenuItem> {
  const { id } = await params;
  try {
    const response = await fetch(`http://localhost:3000/api/menu/${id}`);
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
