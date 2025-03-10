import { Cuisine, Delivery, Restaurant } from '../types/types';

export async function fetchRestaurants(): Promise<Restaurant[]> {
  try {
    const responce = await fetch('http://localhost:3000/api/restaurants');
    if (!responce.ok) {
      throw new Error('Ошибка загрузки данных');
    }
    const data: Restaurant[] = await responce.json();
    return data;
  } catch (error: unknown) {
    console.log('Ошибка:', error);
    return [];
  }
}

export async function fetchCuisineType(): Promise<Cuisine[]> {
  try {
    const responce = await fetch('http://localhost:3000/api/restaurants/cuisine-type');
    if (!responce.ok) {
      throw new Error('Ошибка загрузки типов кухни');
    }
    const data: Cuisine[] = await responce.json();
    return data;
  } catch (error: unknown) {
    console.log('Ошибка:', error);
    return [];
  }
}

export async function fetchDeliveryTime(): Promise<Delivery[]> {
  try {
    const responce = await fetch('http://localhost:3000/api/restaurants/delivery-time');
    if (!responce.ok) {
      throw new Error('Ошибка загрузки времени доставки');
    }
    const data: Delivery[] = await responce.json();
    return data;
  } catch (error: unknown) {
    console.log('Ошибка:', error);
    return [];
  }
}

export async function fetchLastOrdersRestaurants(): Promise<Restaurant[]> {
  try {
    const responce = await fetch('http://localhost:3000/api/restaurants/last-order-restaurant');
    if (!responce.ok) {
      throw new Error('Ошибка загрузки данных');
    }
    const data: Restaurant[] = await responce.json();
    return data;
  } catch (error: unknown) {
    console.log('Ошибка:', error);
    return [];
  }
}
