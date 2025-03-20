import { MenuList } from '@/app/components/MenuList';
import { fetchCategoriesMenu, fetchRestaurantMenu } from '@/app/utils/data';

export default async function Menu(props: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string }>;
}) {
  const params = await props.params;
  const searchParams = await props.searchParams;

  const menuData = await fetchRestaurantMenu({ params, searchParams });
  const categories = await fetchCategoriesMenu({ params });

  return <MenuList menuData={menuData} categories={categories} />;
}
