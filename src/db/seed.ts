import { v4 as uuidv4 } from 'uuid';

import { db } from './index';
import {
  cart,
  categories,
  couriers,
  deliveryAddresses,
  favorites,
  menuItems,
  orders,
  orderStatuses,
  paymentMethods,
  restaurants,
  reviews,
  users,
} from './schema';

async function seed() {
  console.log('🌱 Заполнение базы данных...');

  // Очистка таблиц перед заполнением
  await db.delete(reviews);
  await db.delete(cart);
  await db.delete(favorites);
  await db.delete(orders);
  await db.delete(deliveryAddresses);
  await db.delete(paymentMethods);
  await db.delete(users);
  await db.delete(menuItems);
  await db.delete(categories);
  await db.delete(restaurants);
  await db.delete(orderStatuses);
  await db.delete(couriers);

  const restaurantData = [
    {
      id: uuidv4(),
      name: 'Трапеза Ярополка',
      description: 'Традиционная кухня.',
      rating: 5,
      deliveryTime: '30-40 мин',
      cuisineType: 'Славянская',
      averagePrice: 1500,
      imageUrl: '/images/restaurants/yaropolk.png',
    },
    {
      id: uuidv4(),
      name: 'Мед и перец',
      description: 'Современные блюда с акцентом на местные продукты',
      rating: 4,
      deliveryTime: '40-50 мин',
      cuisineType: 'Европейская',
      averagePrice: 2000,
      imageUrl: '/images/restaurants/honey-pepper.png',
    },
    {
      id: uuidv4(),
      name: '«Славянский пир»',
      description: 'Аутентичные рецепты, блюда для гурманов',
      rating: 3,
      deliveryTime: '25-35 мин',
      cuisineType: 'Микс кулинарных традиций',
      averagePrice: 1200,
      imageUrl: '/images/restaurants/slavic-party.png',
    },
    {
      id: uuidv4(),
      name: 'Берестяной двор',
      description: 'Блюда в старинном стиле, традиционные супы и пироги',
      rating: 4.7,
      deliveryTime: '25-35 мин',
      cuisineType: 'Традиционная русская',
      averagePrice: 1000,
      imageUrl: '/images/restaurants/beresta.png',
    },
    {
      id: uuidv4(),
      name: 'Варган',
      description: 'Специи и ароматы севера и юга',
      rating: 4.2,
      deliveryTime: '20-30 мин',
      cuisineType: 'Микс кулинарных традиций',
      averagePrice: 900,
      imageUrl: '/images/restaurants/vargan.png',
    },
    {
      id: uuidv4(),
      name: 'Булочная у Радмилы',
      description: 'Свежая выпечка, пироги и домашние десерты',
      rating: 3.7,
      deliveryTime: '15-25 мин',
      cuisineType: 'Кондитерская',
      averagePrice: 700,
      imageUrl: '/images/restaurants/radmila.png',
    },
    {
      id: uuidv4(),
      name: '«Городской дворик»',
      description: 'Уличная еда и сытные закуски',
      rating: 2.7,
      deliveryTime: '20-30 мин',
      cuisineType: 'Стритфуд',
      averagePrice: 1000,
      imageUrl: '/images/restaurants/dvorik.png',
    },
    {
      id: uuidv4(),
      name: 'Лесное застолье',
      description: 'Фермерская кухня, экологически чистые продукты',
      rating: 5,
      deliveryTime: '25-35 мин',
      cuisineType: 'Органическая',
      averagePrice: 1950,
      imageUrl: '/images/restaurants/lesnoe.png',
    },
    {
      id: uuidv4(),
      name: 'Рыбацкая артель',
      description: 'Уникальное сочетание вкусов со всего мира.',
      rating: 4.4,
      deliveryTime: '40-50 мин',
      cuisineType: 'Рыбная',
      averagePrice: 900,
      imageUrl: '/images/restaurants/fish.png',
    },
  ];
  await db.insert(restaurants).values(restaurantData);

  const categoryData = [
    { id: uuidv4(), restaurantId: restaurantData[0].id, name: 'Основные блюда' },
    { id: uuidv4(), restaurantId: restaurantData[1].id, name: 'Десерты' },
  ];
  await db.insert(categories).values(categoryData);

  const menuData = [
    {
      id: uuidv4(),
      categoryId: categoryData[0].id,
      restaurantId: restaurantData[0].id,
      name: 'Филе миньон',
      description: 'Нежнейшая говядина с соусом.',
      price: 1500,
      imageUrl: '/images/food.png',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[1].id,
      restaurantId: restaurantData[0].id,
      name: 'Филе миньон 2',
      description: 'Нежнейшая говядина с соусом.',
      price: 1500,
      imageUrl: '/images/food.png',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[1].id,
      restaurantId: restaurantData[0].id,
      name: 'Филе миньон 3',
      description: 'Нежнейшая говядина с соусом.',
      price: 1500,
      imageUrl: '/images/food.png',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[0].id,
      restaurantId: restaurantData[0].id,
      name: 'Филе миньон 4',
      description: 'Нежнейшая говядина с соусом.',
      price: 1500,
      imageUrl: '/images/food.png',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[0].id,
      restaurantId: restaurantData[0].id,
      name: 'Филе миньон 5',
      description: 'Нежнейшая говядина с соусом.',
      price: 1500,
      imageUrl: '/images/food.png',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[0].id,
      restaurantId: restaurantData[0].id,
      name: 'Филе миньон 6',
      description: 'Нежнейшая говядина с соусом.',
      price: 1500,
      imageUrl: '/images/food.png',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[1].id,
      restaurantId: restaurantData[1].id,
      name: 'Чизкейк',
      description: 'Классический чизкейк с ягодами.',
      price: 600,
      imageUrl: '/images/food.png',
    },
  ];
  await db.insert(menuItems).values(menuData);

  const userData = [
    {
      id: uuidv4(),
      firstName: 'Иван',
      lastName: 'Иванов',
      accountName: 'ivan123',
      email: 'ivan@example.com',
      passwordHash: 'hashedpassword',
      phone: '79990001122',
      address: 'Москва',
      cardNumber: '1234123412341234',
    },
  ];
  await db.insert(users).values(userData);

  const addressData = [
    { id: 1, userId: userData[0].id, address: 'Ленина, 10', comment: 'code: 1111' },
  ];
  await db.insert(deliveryAddresses).values(addressData);

  const paymentMethodsData = [
    { id: 1, userId: userData[0].id, type: 'Карта', details: '1234 4321 4321 1234' },
  ];
  await db.insert(paymentMethods).values(paymentMethodsData);

  const statusData = [
    { id: 1, name: 'Создан' },
    { id: 2, name: 'В пути' },
    { id: 3, name: 'Доставлен' },
  ];
  await db.insert(orderStatuses).values(statusData);

  const courierData = [{ id: 1, name: 'Сергей', phone: '79991234567' }];
  await db.insert(couriers).values(courierData);

  const cartData = [
    {
      id: uuidv4(),
      userId: userData[0].id,
      menuItemId: menuData[0].id,
      quantity: 2,
      orderAmount: menuData[0].price * 2,
    },
  ];
  await db.insert(cart).values(cartData);

  const orderData = [
    {
      id: 1,
      userId: userData[0].id,
      deliveryAddressId: addressData[0].id,
      restaurantId: restaurantData[0].id,
      cartId: cartData[0].id,
      courierId: courierData[0].id,
      statusId: statusData[0].id,
      paymentMethodId: paymentMethodsData[0].id,
      orderDate: new Date().toISOString(),
    },
    {
      id: 2,
      userId: userData[0].id,
      deliveryAddressId: addressData[0].id,
      restaurantId: restaurantData[1].id,
      cartId: cartData[0].id,
      courierId: courierData[0].id,
      statusId: statusData[0].id,
      paymentMethodId: paymentMethodsData[0].id,
      orderDate: new Date().toISOString(),
    },
    {
      id: 3,
      userId: userData[0].id,
      deliveryAddressId: addressData[0].id,
      restaurantId: restaurantData[0].id,
      cartId: cartData[0].id,
      courierId: courierData[0].id,
      statusId: statusData[0].id,
      paymentMethodId: paymentMethodsData[0].id,
      orderDate: new Date().toISOString(),
    },
    {
      id: 4,
      userId: userData[0].id,
      deliveryAddressId: addressData[0].id,
      restaurantId: restaurantData[1].id,
      cartId: cartData[0].id,
      courierId: courierData[0].id,
      statusId: statusData[0].id,
      paymentMethodId: paymentMethodsData[0].id,
      orderDate: new Date().toISOString(),
    },
  ];
  await db.insert(orders).values(orderData);

  console.log('✅ База данных успешно заполнена!');
}

seed()
  .then(() => process.exit(0))
  .catch(error => {
    console.error('❌ Ошибка при заполнении базы:', error);
    process.exit(1);
  });
