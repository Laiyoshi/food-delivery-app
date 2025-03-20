/* eslint-disable @typescript-eslint/no-unused-vars */
import { MenuList } from '@/app/components/MenuList';
import { CategoryDish } from '@/app/types/types';
import { fetchCategoriesMenu, fetchRestaurantMenu } from '@/app/utils/data';

declare global {
  interface PageProps {
    params: { id: string };
    searchParams?: { [key: string]: string };
  }
}

export default async function Menu({
  params,
  searchParams,
}: PageProps) {
    const menuData = { 
      restaurantName: "Test Restaurant",
      menu: [] 
    };
    const categories: CategoryDish[] = [];


  return <MenuList menuData={menuData} categories={categories} />;
}
