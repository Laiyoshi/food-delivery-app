import { v4 as uuidv4 } from 'uuid';

import { db } from './index';
import {
  cart,
  categories,
  couriers,
  deliveryAddresses,
  menuItems,
  orders,
  orderStatuses,
  paymentMethods,
  restaurants,
  users,
} from './schema';

async function seed() {
  console.log('🌱 Заполнение базы данных...');
  await db.delete(orders); // Зависит от cart, users, deliveryAddresses и др.
  await db.delete(cart); // Зависит от menuItems
  await db.delete(menuItems); // Зависит от categories и restaurants
  await db.delete(categories); // Зависит от restaurants
  await db.delete(deliveryAddresses); // Зависит от users
  await db.delete(paymentMethods); // Зависит от users
  await db.delete(couriers); // Используется в orders
  await db.delete(orderStatuses); // Используется в orders
  await db.delete(restaurants); // Родитель для categories/menuItems
  await db.delete(users); // Базовая таблица (после всех зависимостей)

  const restaurantData = [
    {
      id: uuidv4(),
      name: 'Трапеза Ярополка',
      description: 'Традиционная кухня',
      rating: 5,
      deliveryTime: '30-40 мин',
      deliveryTimeMinutes: 30,
      cuisineType: 'Славянская',
      averagePrice: 1500,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1744283078/restaurants/ltnv8fxbtrigq7ktnuih.png',
    },
    {
      id: uuidv4(),
      name: 'Мед и перец',
      description: 'Современные блюда с акцентом на местные продукты',
      rating: 4,
      deliveryTime: '40-50 мин',
      deliveryTimeMinutes: 40,
      cuisineType: 'Европейская',
      averagePrice: 2000,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1744282992/restaurants/dmksrgucgscskqnyderw.png',
    },
    {
      id: uuidv4(),
      name: '«Славянский пир»',
      description: 'Аутентичные рецепты, блюда для гурманов',
      rating: 3,
      deliveryTime: '25-35 мин',
      deliveryTimeMinutes: 25,
      cuisineType: 'Микс кулинарных традиций',
      averagePrice: 1200,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1744283037/restaurants/tamoycd2apodlt62izxn.png',
    },
    {
      id: uuidv4(),
      name: 'Берестяной двор',
      description: 'Блюда в старинном стиле, традиционные супы и пироги',
      rating: 4.7,
      deliveryTime: '25-35 мин',
      deliveryTimeMinutes: 25,
      cuisineType: 'Традиционная русская',
      averagePrice: 1000,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1744282880/restaurants/hijm0ygrxnjw6ext4vtq.png',
    },
    {
      id: uuidv4(),
      name: 'Варган',
      description: 'Специи и ароматы севера и юга',
      rating: 4.2,
      deliveryTime: '20-30 мин',
      deliveryTimeMinutes: 20,
      cuisineType: 'Микс кулинарных традиций',
      averagePrice: 900,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1744283074/restaurants/xjvtqvzepgn5dy6veyc4.png',
    },
    {
      id: uuidv4(),
      name: 'Булочная у Радмилы',
      description: 'Свежая выпечка, пироги и домашние десерты',
      rating: 3.7,
      deliveryTime: '15-25 мин',
      deliveryTimeMinutes: 15,
      cuisineType: 'Кондитерская',
      averagePrice: 700,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1744283021/restaurants/nnu4rjijthpod1mnlgr6.png',
    },
    {
      id: uuidv4(),
      name: '«Городской дворик»',
      description: 'Уличная еда и сытные закуски',
      rating: 2.7,
      deliveryTime: '20-30 мин',
      deliveryTimeMinutes: 20,
      cuisineType: 'Стритфуд',
      averagePrice: 1000,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1744282887/restaurants/immcp3xfblmfemrgkejr.png',
    },
    {
      id: uuidv4(),
      name: 'Лесное застолье',
      description: 'Фермерская кухня, экологически чистые продукты',
      rating: 5,
      deliveryTime: '25-35 мин',
      deliveryTimeMinutes: 25,
      cuisineType: 'Органическая',
      averagePrice: 1950,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1744282997/restaurants/l5bdozy7yggpmwie0ej3.png',
    },
    {
      id: uuidv4(),
      name: 'Рыбацкая артель',
      description: 'Уникальное сочетание вкусов со всего мира.',
      rating: 4.4,
      deliveryTime: '40-50 мин',
      deliveryTimeMinutes: 40,
      cuisineType: 'Рыбная',
      averagePrice: 900,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1744282907/restaurants/nqmma33tfli0llg2qczt.png',
    },
    {
      id: uuidv4(),
      name: 'Таверна "Дворик"',
      description: 'Традиционная кухня',
      rating: 3.1,
      deliveryTime: '43-52 мин',
      deliveryTimeMinutes: 43,
      cuisineType: 'Французская',
      averagePrice: 2811,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1744283045/restaurants/kkdcz3aea64l4utpmcyo.jpg',
    },
    {
      id: uuidv4(),
      name: 'Гастрономия Мартина',
      description: 'Традиционная кухня',
      rating: 3.4,
      deliveryTime: '45-55 мин',
      deliveryTimeMinutes: 45,
      cuisineType: 'Средиземноморская',
      averagePrice: 1943,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1744282915/restaurants/ikeh9eovzebwboaj6d4x.jpg',
    },
    {
      id: uuidv4(),
      name: 'Таверна у Маяка',
      description: 'Традиционная кухня',
      rating: 4.7,
      deliveryTime: '42-47 мин',
      deliveryTimeMinutes: 42,
      cuisineType: 'Азиатская',
      averagePrice: 1044,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1744283059/restaurants/yrtr5unupu5oclzcq3vb.jpg',
    },
    {
      id: uuidv4(),
      name: 'Гастрономическая площадь',
      description: 'Современная кухня',
      rating: 2.8,
      deliveryTime: '41-52 мин',
      deliveryTimeMinutes: 41,
      cuisineType: 'Американская',
      averagePrice: 2151,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1744282921/restaurants/swwbq3sw3x1crtaw9ot2.jpg',
    },
    {
      id: uuidv4(),
      name: 'Гриль-Бар "Шеф"',
      description: 'Современная кухня',
      rating: 2.6,
      deliveryTime: '46-49 мин',
      deliveryTimeMinutes: 46,
      cuisineType: 'Средиземноморская',
      averagePrice: 2326,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1744282953/restaurants/zi3fo94bobqjnpfnv2hy.jpg',
    },
    {
      id: uuidv4(),
      name: 'Грильхаус "Восток"',
      description: 'Современная кухня',
      rating: 2.0,
      deliveryTime: '33-40 мин',
      deliveryTimeMinutes: 33,
      cuisineType: 'Азиатская',
      averagePrice: 1342,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1744282949/restaurants/dfsfyosaw6kdnapwvy2n.jpg',
    },
    {
      id: uuidv4(),
      name: 'Шторм на Неве',
      description: 'Восточная кухня',
      rating: 2.8,
      deliveryTime: '32-52 мин',
      deliveryTimeMinutes: 32,
      cuisineType: 'Средиземноморская',
      averagePrice: 1133,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1744283027/restaurants/z3cz0emtx7yhg2qhueng.jpg',
    },
    {
      id: uuidv4(),
      name: 'Гриль-Берег',
      description: 'Современная кухня',
      rating: 4.5,
      deliveryTime: '39-45 мин',
      deliveryTimeMinutes: 39,
      cuisineType: 'Французская',
      averagePrice: 1800,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1744282960/restaurants/a20a3kbag3l4qhey8ogn.jpg',
    },
    {
      id: uuidv4(),
      name: 'Шторм в Балтике',
      description: 'Семейное кафе.',
      rating: 1.7,
      deliveryTime: '35-60 мин',
      deliveryTimeMinutes: 35,
      cuisineType: 'Американская',
      averagePrice: 1900,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1744283036/restaurants/sckos7kmjlykwky2w8tp.jpg',
    },
    {
      id: uuidv4(),
      name: 'Гриль-Кафе "На Неве"',
      description: 'Современная кухня',
      rating: 3.9,
      deliveryTime: '28-50 мин',
      deliveryTimeMinutes: 50,
      cuisineType: 'Кавказская',
      averagePrice: 2555,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1744282972/restaurants/xfwzgyoiossojpw2qtkv.jpg',
    },
    {
      id: uuidv4(),
      name: 'Таверна у Бухты',
      description: 'Традиционная кухня',
      rating: 4.1,
      deliveryTime: '30-45 мин',
      deliveryTimeMinutes: 30,
      cuisineType: 'Русская',
      averagePrice: 1600,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1744283048/restaurants/mhma9qlo7wzviubhjk3n.jpg',
    },
    {
      id: uuidv4(),
      name: 'Гриль-Кафе "Скала"',
      description: 'Современная кухня',
      rating: 4.2,
      deliveryTime: '28-50 мин',
      deliveryTimeMinutes: 28,
      cuisineType: 'Азиатская',
      averagePrice: 1450,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1744282982/restaurants/rapfzkdfaxtwzqsh3hw3.jpg',
    },
    {
      id: uuidv4(),
      name: 'Шторм на Пляже',
      description: 'Современная кухня',
      rating: 2.9,
      deliveryTime: '40-55 мин',
      deliveryTimeMinutes: 40,
      cuisineType: 'Американская',
      averagePrice: 2100,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1744283032/restaurants/ktdmbdwjoxcanzmcjxru.jpg',
    },
    {
      id: uuidv4(),
      name: 'Греческая Таверна',
      description: 'Современная кухня',
      rating: 3.3,
      deliveryTime: '22-50 мин',
      deliveryTimeMinutes: 22,
      cuisineType: 'Греческая',
      averagePrice: 2300,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1744282940/restaurants/myunzvgfgkebjmvbr3dr.jpg',
    },
    {
      id: uuidv4(),
      name: 'Морская Пена',
      description: 'Семейное кафе.',
      rating: 4.3,
      deliveryTime: '45-50 мин',
      deliveryTimeMinutes: 45,
      cuisineType: 'Средиземноморская',
      averagePrice: 1850,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1744283002/restaurants/zq3wggs3xmkb78g1ttv6.jpg',
    },
    {
      id: uuidv4(),
      name: 'Гастрономия "Челси"',
      description: 'Традиционная кухня',
      rating: 2.7,
      deliveryTime: '50-60 мин',
      deliveryTimeMinutes: 50,
      cuisineType: 'Русская',
      averagePrice: 1450,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1744282931/restaurants/flasnw17fdh1qqvboikx.jpg',
    },
    {
      id: uuidv4(),
      name: 'Гриль-Парк "Зелёный"',
      description: 'Восточная кухня',
      rating: 3.5,
      deliveryTime: '35-50 мин',
      deliveryTimeMinutes: 35,
      cuisineType: 'Русская',
      averagePrice: 2300,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1744282990/restaurants/rdsv07qtqh6jd0nnty9s.jpg',
    },
    {
      id: uuidv4(),
      name: 'Гастрономический Плавник',
      description: 'Семейное кафе.',
      rating: 4.0,
      deliveryTime: '30-45 мин',
      deliveryTimeMinutes: 30,
      cuisineType: 'Средиземноморская',
      averagePrice: 2100,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1744282925/restaurants/hs52fknjstkv3s6qs7bk.jpg',
    },
    {
      id: uuidv4(),
      name: 'Гриль-Кафе на Лагуне',
      description: 'Современная кухня',
      rating: 3.9,
      deliveryTime: '30-50 мин',
      deliveryTimeMinutes: 30,
      cuisineType: 'Французская',
      averagePrice: 2200,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1744282967/restaurants/p1ayzaholhto82csn4aa.jpg',
    },
    {
      id: uuidv4(),
      name: 'Фестиваль Вкусов',
      description: 'Гастрономический эксперимент с уникальными блюдами',
      rating: 4.8,
      deliveryTime: '35-45 мин',
      deliveryTimeMinutes: 35,
      cuisineType: 'Фьюжн',
      averagePrice: 1800,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1744282900/restaurants/dlbmt9dyqa53z0ezczat.jpg',
    },
    {
      id: uuidv4(),
      name: 'Бруклинский Вкус',
      description: 'Американская кухня с новыми акцентами',
      rating: 4.2,
      deliveryTime: '30-40 мин',
      deliveryTimeMinutes: 30,
      cuisineType: 'Американская',
      averagePrice: 1600,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1744282883/restaurants/xhbx5rpcejejlwk9njtr.jpg',
    },
    {
      id: uuidv4(),
      name: 'Тайский Лотос',
      description: 'Острая и ароматная кухня Таиланда',
      rating: 4.5,
      deliveryTime: '25-35 мин',
      deliveryTimeMinutes: 25,
      cuisineType: 'Тайская',
      averagePrice: 1300,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1744283072/restaurants/dzauvztdj7sydrter9dj.jpg',
    },
    {
      id: uuidv4(),
      name: 'Пекарня Лавка',
      description: 'Домашний хлеб, пироги и выпечка',
      rating: 3.9,
      deliveryTime: '20-30 мин',
      deliveryTimeMinutes: 20,
      cuisineType: 'Пекарня',
      averagePrice: 500,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1744283016/restaurants/iukvgjzgfn6jpweqpswy.jpg',
    },
    {
      id: uuidv4(),
      name: 'Гриль-Академия',
      description: 'Лучший гриль в городе',
      rating: 4.1,
      deliveryTime: '40-50 мин',
      deliveryTimeMinutes: 40,
      cuisineType: 'Гриль',
      averagePrice: 2200,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1744282951/restaurants/vadgutshdnf4uvzrod4s.jpg',
    },
    {
      id: uuidv4(),
      name: 'Санкт-Петербургский Пирог',
      description: 'Русская выпечка и традиционные блюда',
      rating: 4.3,
      deliveryTime: '30-40 мин',
      deliveryTimeMinutes: 30,
      cuisineType: 'Русская',
      averagePrice: 1200,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1744283023/restaurants/qpkgiqu7hu7xdnuidgj6.jpg',
    },
    {
      id: uuidv4(),
      name: 'Мексиканская Буря',
      description: 'Острые блюда и коктейли по мексиканским рецептам',
      rating: 4.0,
      deliveryTime: '25-35 мин',
      deliveryTimeMinutes: 25,
      cuisineType: 'Мексиканская',
      averagePrice: 1500,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1744282998/restaurants/jhrffxv8j8sbey8xlnqd.jpg',
    },
    {
      id: uuidv4(),
      name: 'Лавка Кофе',
      description: 'Лучший кофе и десерты с акцентом на классику',
      rating: 4.4,
      deliveryTime: '15-20 мин',
      deliveryTimeMinutes: 15,
      cuisineType: 'Кофейня',
      averagePrice: 700,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1744282995/restaurants/hvghnafpycz3uko1ljem.jpg',
    },
    {
      id: uuidv4(),
      name: 'Суши Гурмэ',
      description: 'Свежие суши и сашими по классическим рецептам',
      rating: 5.0,
      deliveryTime: '30-40 мин',
      deliveryTimeMinutes: 30,
      cuisineType: 'Японская',
      averagePrice: 1700,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1744283038/restaurants/a4f6cl9slay4apmpxlnu.jpg',
    },
    {
      id: uuidv4(),
      name: 'Ресторан "Токио"',
      description: 'Уникальное сочетание традиционной японской и современной кухни',
      rating: 4.6,
      deliveryTime: '20-30 мин',
      deliveryTimeMinutes: 20,
      cuisineType: 'Японская',
      averagePrice: 2100,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1744283022/restaurants/w1qlvlqfcsh40xv5t6ze.jpg',
    },
    {
      id: uuidv4(),
      name: 'Кулинарная Мастерская',
      description: 'Традиционная кухня с инновационными подходами',
      rating: 4.0,
      deliveryTime: '25-35 мин',
      deliveryTimeMinutes: 25,
      cuisineType: 'Европейская',
      averagePrice: 1500,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1744282994/restaurants/jwl5jtzbpnq5cnj6os7t.jpg',
    },
    {
      id: uuidv4(),
      name: 'Палитра Вкусов',
      description: 'Блюда со всего мира, от классики до фьюжн',
      rating: 3.9,
      deliveryTime: '35-45 мин',
      deliveryTimeMinutes: 35,
      cuisineType: 'Международная',
      averagePrice: 1600,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1744283006/restaurants/vzwh4ha6clg0vluactxq.jpg',
    },
    {
      id: uuidv4(),
      name: 'Бельгийский Кафе',
      description: 'Бельгийские вафли и пиво',
      rating: 4.3,
      deliveryTime: '25-30 мин',
      deliveryTimeMinutes: 25,
      cuisineType: 'Бельгийская',
      averagePrice: 1800,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1744282879/restaurants/mwljy7krlk3dc0uoh0x7.jpg',
    },
    {
      id: uuidv4(),
      name: 'Паназиатская Кухня',
      description: 'Азия на вашем столе, от Японии до Индии',
      rating: 4.7,
      deliveryTime: '40-50 мин',
      deliveryTimeMinutes: 40,
      cuisineType: 'Азиатская',
      averagePrice: 2000,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1744283007/restaurants/qteysptctonujxxwuzvu.jpg',
    },
    {
      id: uuidv4(),
      name: 'Пивной Пирог',
      description: 'Сытная еда и широкий выбор пива',
      rating: 3.8,
      deliveryTime: '30-40 мин',
      deliveryTimeMinutes: 30,
      cuisineType: 'Пивной бар',
      averagePrice: 1300,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1744283020/restaurants/ac2e5j7v8qdjrlcbomrh.jpg',
    },
    {
      id: uuidv4(),
      name: 'Легенды Средиземноморья',
      description: 'Традиционные блюда с юга Европы',
      rating: 4.5,
      deliveryTime: '35-45 мин',
      deliveryTimeMinutes: 35,
      cuisineType: 'Средиземноморская',
      averagePrice: 2200,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1744282996/restaurants/qzwwqmc8h7c9kxe5ciw6.jpg',
    },
    {
      id: uuidv4(),
      name: 'Гриль-Палата',
      description: 'Лучший гриль-бар в городе с атмосферой уюта',
      rating: 4.2,
      deliveryTime: '40-50 мин',
      deliveryTimeMinutes: 40,
      cuisineType: 'Гриль',
      averagePrice: 1800,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1744282986/restaurants/ommagct3elvio0ridx8t.jpg',
    },
    {
      id: uuidv4(),
      name: 'Мираторг',
      description: 'Стейкхаус с фокусом на мясо высшего качества',
      rating: 4.3,
      deliveryTime: '30-40 мин',
      deliveryTimeMinutes: 30,
      cuisineType: 'Стейкхаус',
      averagePrice: 2500,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1744282999/restaurants/cclfxrcylotiqfemgsnt.jpg',
    },
    {
      id: uuidv4(),
      name: 'Техасская Ранчо',
      description: 'Настоящее техасское барбекю и мясные блюда',
      rating: 4.6,
      deliveryTime: '45-55 мин',
      deliveryTimeMinutes: 45,
      cuisineType: 'Американская',
      averagePrice: 2200,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1744283064/restaurants/gulbqptlifnszyxmmrci.jpg',
    },
    {
      id: uuidv4(),
      name: 'Морской Ветер',
      description: 'Рыбные блюда и морепродукты по особым рецептам',
      rating: 5.0,
      deliveryTime: '25-35 мин',
      deliveryTimeMinutes: 25,
      cuisineType: 'Рыбная',
      averagePrice: 2000,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1744283004/restaurants/hcnxyr8zuxnh7hqlsar7.jpg',
    },
    {
      id: uuidv4(),
      name: 'Веганский Рай',
      description: 'Кухня для веганов и вегетарианцев, богатая витаминами и вкусами',
      rating: 4.7,
      deliveryTime: '30-40 мин',
      deliveryTimeMinutes: 30,
      cuisineType: 'Веганская',
      averagePrice: 1400,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1744283076/restaurants/g1i0ksectamxgjq5heg7.jpg',
    },
    {
      id: uuidv4(),
      name: 'Итальянский Вкус',
      description: 'Традиционная итальянская кухня с акцентом на пасту и пиццу',
      rating: 4.6,
      deliveryTime: '35-45 мин',
      deliveryTimeMinutes: 35,
      cuisineType: 'Итальянская',
      averagePrice: 1800,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1744282993/restaurants/hsvvlejkpngkh6ws0peb.jpg',
    },
  ];
  await db.insert(restaurants).values(restaurantData);

  const categoryData = [
    {
      id: uuidv4(),
      restaurantId: restaurantData[0].id,
      name: 'Основные блюда',
    },
    {
      id: uuidv4(),
      restaurantId: restaurantData[0].id,
      name: 'Напитки',
    },
    {
      id: uuidv4(),
      restaurantId: restaurantData[0].id,
      name: 'Салаты и закуски',
    },
    {
      id: uuidv4(),
      restaurantId: restaurantData[0].id,
      name: 'Выпечка и десерты',
    },
    {
      id: uuidv4(),
      restaurantId: restaurantData[1].id,
      name: 'Основные блюда',
    },
    {
      id: uuidv4(),
      restaurantId: restaurantData[1].id,
      name: 'Напитки',
    },
    {
      id: uuidv4(),
      restaurantId: restaurantData[1].id,
      name: 'Супы',
    },
    {
      id: uuidv4(),
      restaurantId: restaurantData[1].id,
      name: 'Острые закуски',
    },
    {
      id: uuidv4(),
      restaurantId: restaurantData[2].id,
      name: 'Основные блюда',
    },
    {
      id: uuidv4(),
      restaurantId: restaurantData[2].id,
      name: 'Супы',
    },
    {
      id: uuidv4(),
      restaurantId: restaurantData[2].id,
      name: 'Выпечка и сладкое',
    },
    {
      id: uuidv4(),
      restaurantId: restaurantData[2].id,
      name: 'Напитки',
    },
    {
      id: uuidv4(),
      restaurantId: restaurantData[3].id,
      name: 'Основные блюда',
    },
    {
      id: uuidv4(),
      restaurantId: restaurantData[3].id,
      name: 'Закуски и соленья',
    },
    {
      id: uuidv4(),
      restaurantId: restaurantData[3].id,
      name: 'Супы',
    },
    {
      id: uuidv4(),
      restaurantId: restaurantData[3].id,
      name: 'Напитки',
    },
    {
      id: uuidv4(),
      restaurantId: restaurantData[4].id,
      name: 'Основные блюда',
    },
    {
      id: uuidv4(),
      restaurantId: restaurantData[4].id,
      name: 'Закуски',
    },
    {
      id: uuidv4(),
      restaurantId: restaurantData[4].id,
      name: 'Напитки',
    },
    {
      id: uuidv4(),
      restaurantId: restaurantData[4].id,
      name: 'Снеки',
    },
    {
      id: uuidv4(),
      restaurantId: restaurantData[5].id,
      name: 'Выпечка',
    },
    {
      id: uuidv4(),
      restaurantId: restaurantData[5].id,
      name: 'Завтраки',
    },
    {
      id: uuidv4(),
      restaurantId: restaurantData[5].id,
      name: 'Десерты',
    },
    {
      id: uuidv4(),
      restaurantId: restaurantData[5].id,
      name: 'Напитки',
    },
    {
      id: uuidv4(),
      restaurantId: restaurantData[6].id,
      name: 'Основные блюда',
    },
    {
      id: uuidv4(),
      restaurantId: restaurantData[6].id,
      name: 'Закуски',
    },
    {
      id: uuidv4(),
      restaurantId: restaurantData[6].id,
      name: 'Напитки',
    },
    {
      id: uuidv4(),
      restaurantId: restaurantData[7].id,
      name: 'Основные блюда',
    },
    {
      id: uuidv4(),
      restaurantId: restaurantData[7].id,
      name: 'Закуски',
    },
    {
      id: uuidv4(),
      restaurantId: restaurantData[7].id,
      name: 'Супы',
    },
    {
      id: uuidv4(),
      restaurantId: restaurantData[7].id,
      name: 'Напитки',
    },
    {
      id: uuidv4(),
      restaurantId: restaurantData[8].id,
      name: 'Основные блюда',
    },
    {
      id: uuidv4(),
      restaurantId: restaurantData[8].id,
      name: 'Закуски',
    },
    {
      id: uuidv4(),
      restaurantId: restaurantData[8].id,
      name: 'Супы',
    },
    {
      id: uuidv4(),
      restaurantId: restaurantData[8].id,
      name: 'Напитки',
    },
    {
      id: uuidv4(),
      restaurantId: restaurantData[9].id,
      name: 'Горячее с огня',
    },
    {
      id: uuidv4(),
      restaurantId: restaurantData[9].id,
      name: 'Напитки',
    },
    {
      id: uuidv4(),
      restaurantId: restaurantData[9].id,
      name: 'Закуски',
    },
    {
      id: uuidv4(),
      restaurantId: restaurantData[9].id,
      name: 'Десерты',
    },
    {
      id: uuidv4(),
      restaurantId: restaurantData[10].id,
      name: 'Основные блюда',
    },
    {
      id: uuidv4(),
      restaurantId: restaurantData[10].id,
      name: 'Напитки',
    },
    {
      id: uuidv4(),
      restaurantId: restaurantData[10].id,
      name: 'Закуски',
    },
    {
      id: uuidv4(),
      restaurantId: restaurantData[10].id,
      name: 'Десерты',
    },
    {
      id: uuidv4(),
      restaurantId: restaurantData[11].id,
      name: 'Основные блюда',
    },
    {
      id: uuidv4(),
      restaurantId: restaurantData[11].id,
      name: 'Закуски',
    },
    {
      id: uuidv4(),
      restaurantId: restaurantData[11].id,
      name: 'Напитки',
    },
    {
      id: uuidv4(),
      restaurantId: restaurantData[11].id,
      name: 'Десерты',
    },
  ];
  await db.insert(categories).values(categoryData);

  const menuData = [
    {
      id: uuidv4(),
      categoryId: categoryData[0].id,
      restaurantId: restaurantData[0].id,
      name: 'Жаркое по-княжески',
      description: 'Сочное мясо с овощами, запечённое по древним рецептам.',
      price: 1200,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1746358591/zharkoe_po_knyazhesski_zm3ihk.jpg',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[0].id,
      restaurantId: restaurantData[0].id,
      name: 'Печёная баранина с пряностями',
      description: 'Нежная баранина с ароматными травами и специями.',
      price: 1400,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1746358561/pechyona_baranina_s_pryanostyami_yg5dpk.jpg',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[0].id,
      restaurantId: restaurantData[0].id,
      name: 'Курица в медовом соусе',
      description: 'Курица под медово-горчичной глазурью.',
      price: 1100,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1746358583/kuritsa_v_medovom_souse_cussts.jpg',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[0].id,
      restaurantId: restaurantData[0].id,
      name: 'Тушёная свинина с картошкой',
      description: 'Свинина, тушёная вместе с картофелем и луком.',
      price: 1300,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1746358571/tushyonaya_svinina_s_kartoshkoy_hcrovy.jpg',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[0].id,
      restaurantId: restaurantData[0].id,
      name: 'Каша с мясом',
      description: 'Горячая гречневая каша с тушёным мясом.',
      price: 900,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1746358557/kasha_s_myasom_huapbh.jpg',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[1].id,
      restaurantId: restaurantData[0].id,
      name: 'Медовуха с травами',
      description: 'Традиционный напиток из меда с душистыми травами.',
      price: 350,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1746358555/medovuha_s_travami_noqqxq.jpg',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[1].id,
      restaurantId: restaurantData[0].id,
      name: 'Квас с мятой',
      description: 'Освежающий квас с добавлением мяты.',
      price: 250,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1746358558/kvas_s_myatoi_lsxcts.jpg',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[1].id,
      restaurantId: restaurantData[0].id,
      name: 'Морс из лесных ягод',
      description: 'Домашний морс из черники, малины и брусники.',
      price: 300,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1746358567/mors_iz_lesnykh_yagod_vl3vgh.jpg',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[1].id,
      restaurantId: restaurantData[0].id,
      name: 'Яблочный сбитень',
      description: 'Тёплый напиток из яблок и мёда с пряностями.',
      price: 320,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1746358563/yablochnyi_sbiten_gcliny.jpg',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[2].id,
      restaurantId: restaurantData[0].id,
      name: 'Салат из свежей зелени с яйцом',
      description: 'Лёгкий салат с травами и варёным яйцом.',
      price: 300,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1746358577/salat_iz_svezhei_zeleni_s_yaitsom_vf830h.jpg',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[2].id,
      restaurantId: restaurantData[0].id,
      name: 'Свекольник с хреном',
      description: 'Холодный свекольный суп с острой ноткой хрена.',
      price: 350,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1746358554/svekolnik_s_khrenom_ayoejd.jpg',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[2].id,
      restaurantId: restaurantData[0].id,
      name: 'Квашеная капуста с морковью и укропом',
      description: 'Домашняя квашеная капуста с морковью и укропом.',
      price: 250,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1746358552/kvashenaya_kapusta_s_morkovyu_i_ukropom_fjj0ln.jpg',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[2].id,
      restaurantId: restaurantData[0].id,
      name: 'Салат с копчёной рыбой',
      description: 'Салат из копчёной рыбы и свежей зелени.',
      price: 400,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1746358554/salat_s_kopchyonoi_ryboi_yqp69k.jpg',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[3].id,
      restaurantId: restaurantData[0].id,
      name: 'Пирог с ягодами',
      description: 'Тёплый пирог с начинкой из лесных ягод.',
      price: 500,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1746358555/pirog_s_yagodami_j9c1f5.jpg',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[3].id,
      restaurantId: restaurantData[0].id,
      name: 'Лепёшка с луком',
      description: 'Свежая лепёшка, фаршированная луком.',
      price: 300,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1746358552/lepeshka_s_lukom_e2qxuf.jpg',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[3].id,
      restaurantId: restaurantData[0].id,
      name: 'Медовые пряники',
      description: 'Пряники из мёда с ароматом корицы и имбиря.',
      price: 200,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1746358551/medovye_pryanik_grdqkh.jpg',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[0].id,
      restaurantId: restaurantData[1].id,
      name: 'Томлёная говядина с перцем',
      description: 'Мясо томится с душистым перцем и специями.',
      price: 1400,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1746358505/delicious-goulash-ready-dinner_ggc4nn.jpg',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[0].id,
      restaurantId: restaurantData[1].id,
      name: 'Курица в пряной глазури',
      description: 'Курица под сладко-пряной мёдово-имбирной глазурью.',
      price: 1200,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1746358585/kuritsa_v_pryanoy_glazuri_vlrssq.jpg',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[0].id,
      restaurantId: restaurantData[1].id,
      name: 'Острая уха',
      description: 'Уха с морепродуктами и перцем чили.',
      price: 800,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1746358562/ostraya_ukha_fz3sv5.jpg',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[0].id,
      restaurantId: restaurantData[1].id,
      name: 'Курица с имбирём и мёдом',
      description: 'Курица, обжаренная с имбирём и мёдом до карамели.',
      price: 1300,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1746358505/kuritsa_s_imbirem_i_myodom_pbfepj.jpg',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[0].id,
      restaurantId: restaurantData[1].id,
      name: 'Плов с острыми специями',
      description: 'Ароматный плов с перцем чили и барбарисом.',
      price: 900,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1746358561/plov_s_ostrymi_spetsiyami_breyub.jpg',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[1].id,
      restaurantId: restaurantData[1].id,
      name: 'Пряный чай с корицей',
      description: 'Чай с корицей, кардамоном и мёдом.',
      price: 300,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1746358502/pryanyy_chay_s_koritsei_lvdigq.jpg',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[1].id,
      restaurantId: restaurantData[1].id,
      name: 'Настойка на мёде',
      description: 'Крепкая настойка с травами и натуральным мёдом.',
      price: 450,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1746358503/nastoyka_na_myode_jscfit.jpg',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[1].id,
      restaurantId: restaurantData[1].id,
      name: 'Яблочный сбитень',
      description: 'Тёплый напиток из яблок, мёда и пряностей.',
      price: 350,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1746358502/yablochnyy_sbiten_qug31s.jpg',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[1].id,
      restaurantId: restaurantData[1].id,
      name: 'Клюквенный морс с имбирём',
      description: 'Освежающий морс из клюквы с ноткой имбиря.',
      price: 280,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1746358500/klyukvennyy_mors_s_imbirem_vrvp0r.jpg',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[2].id,
      restaurantId: restaurantData[1].id,
      name: 'Рассольник с перловкой',
      description: 'Суп с перловкой, солёными огурцами и душистым перцем.',
      price: 650,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1746358507/rassolnik_s_perlovkoy_gp5gn8.jpg',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[2].id,
      restaurantId: restaurantData[1].id,
      name: 'Суп-пюре из тыквы',
      description: 'Сливочный суп-пюре с ноткой имбиря и тыквенных семечек.',
      price: 600,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1746358564/sup_pyure_iz_tykvy_vdcz63.jpg',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[2].id,
      restaurantId: restaurantData[1].id,
      name: 'Борщ с чесноком',
      description: 'Классический борщ с чесноком и сметаной.',
      price: 700,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1746358570/borshch_s_chesnokom_g5yg6z.jpg',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[2].id,
      restaurantId: restaurantData[1].id,
      name: 'Крем-суп из шампиньонов',
      description: 'Нежный крем-суп с лесными грибами и сливками.',
      price: 720,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1746358508/krem_sup_iz_shampinonov_ou4ion.jpg',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[3].id,
      restaurantId: restaurantData[1].id,
      name: 'Маринованные перцы',
      description: 'Перцы в остром маринаде с чесноком.',
      price: 250,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1746358504/marinovannye_pertsy_xpshuj.jpg',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[3].id,
      restaurantId: restaurantData[1].id,
      name: 'Солёные огурцы с чесноком',
      description: 'Хрустящие огурцы с чесночным ароматом.',
      price: 200,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1746358506/solenye_ogurtsy_s_chesnokom_kkyadn.jpg',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[3].id,
      restaurantId: restaurantData[1].id,
      name: 'Острая капуста',
      description: 'Квашеная капуста с перцем чили.',
      price: 220,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1746358506/ostraya_kapusta_cvowii.jpg',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[0].id,
      restaurantId: restaurantData[2].id,
      name: 'Свинина, запечённая с яблоками',
      description: 'Ароматное мясо, приготовленное по древнему рецепту с кисло-сладкими яблоками.',
      price: 780,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1746358526/svinina_zapechyonnaya_s_yablokami_dpk5n7.jpg',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[0].id,
      restaurantId: restaurantData[2].id,
      name: 'Каша гречневая с грибами',
      description: 'Гречка, томлённая в печи с лесными грибами и пряными травами.',
      price: 450,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1746358524/kasha_grechevaya_s_gribami_ojon45.jpg',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[0].id,
      restaurantId: restaurantData[2].id,
      name: 'Картофель с салом и чесноком',
      description: 'Румяной жареный картофель, щедро приправленный чесноком и поджаренным салом.',
      price: 390,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1746358521/kartofel_s_salom_i_chesnokom_chw6pj.jpg',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[0].id,
      restaurantId: restaurantData[2].id,
      name: 'Телятина по-домашнему',
      description: 'Нежное мясо в сливочном соусе с луком и морковью.',
      price: 690,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1746358524/telyatina_po_domashnemu_mhrsb6.jpg',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[1].id,
      restaurantId: restaurantData[2].id,
      name: 'Щи из кислой капусты',
      description: 'Классический славянский суп на мясном бульоне с томлёной капустой.',
      price: 330,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1746358528/shchi_iz_kisloy_kapusty_pyo5is.jpg',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[1].id,
      restaurantId: restaurantData[2].id,
      name: 'Похлёбка с перловкой',
      description: 'Плотный и сытный суп с крупой, мясом и кореньями.',
      price: 310,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1746358527/pokhlyobka_s_perlovkoy_uswmqb.jpg',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[1].id,
      restaurantId: restaurantData[2].id,
      name: 'Борщ деревенский',
      description: 'Свекольный суп с мясом, сметаной и чесночной гренкой.',
      price: 370,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1746358525/borshch_derevenskiy_jtiahn.jpg',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[2].id,
      restaurantId: restaurantData[2].id,
      name: 'Пышки с маком',
      description: 'Пышные сладкие булочки с маковой начинкой.',
      price: 120,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1746358519/pyshki_s_makom_c3ekou.jpg',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[2].id,
      restaurantId: restaurantData[2].id,
      name: 'Лепёшка с луком',
      description: 'Ржаная лепёшка с запечённым луком и специями.',
      price: 140,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1746358518/lepyoshka_s_lukom_nehe8l.jpg',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[2].id,
      restaurantId: restaurantData[2].id,
      name: 'Пирог с капустой и яйцом',
      description: 'Традиционный открытый пирог на дрожжевом тесте.',
      price: 160,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1746358518/pirog_s_kapustoy_i_yaytsom_tpgqki.jpg',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[2].id,
      restaurantId: restaurantData[2].id,
      name: 'Блинчики с творогом',
      description: 'Тонкие блины с нежной начинкой из сладкого творога.',
      price: 180,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1746358517/blinchiki_s_tvorogom_hzjtqg.jpg',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[2].id,
      restaurantId: restaurantData[2].id,
      name: 'Пирог с брусникой',
      description: 'Ягодный пирог с кисло-сладким вкусом и хрустящей корочкой.',
      price: 190,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1746358519/pirog_s_brusnikoy_s8ybp0.jpg',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[3].id,
      restaurantId: restaurantData[2].id,
      name: 'Квас хлебный',
      description: 'Домашний квас из ржаного хлеба с лёгкой кислинкой.',
      price: 150,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1746358521/kvas_khlebnyy_u9g6fw.jpg',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[3].id,
      restaurantId: restaurantData[2].id,
      name: 'Морс из вишни',
      description: 'Освежающий напиток из лесной вишни.',
      price: 130,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1746358520/mors_iz_vishni_wjfr44.jpg',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[3].id,
      restaurantId: restaurantData[2].id,
      name: 'Сбитень пряный',
      description: 'Горячий медовый напиток с корицей и гвоздикой.',
      price: 170,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1746358526/sbiten_pryanyy_yv4ehj.jpg',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[3].id,
      restaurantId: restaurantData[2].id,
      name: 'Настойка на травах',
      description: 'Крепкий напиток на основе целебных трав по старинному рецепту.',
      price: 210,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1746358520/nastoyka_na_travakh_xunctm.jpg',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[0].id,
      restaurantId: restaurantData[3].id,
      name: 'Утка, тушённая с клюквой',
      description: 'Ароматная утка, медленно томлённая с клюквой и пряностями.',
      price: 780,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1746358457/utka_tushyonnaya_s_klyukvoy_ncpdys.jpg',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[0].id,
      restaurantId: restaurantData[3].id,
      name: 'Картофель, запечённый в печи',
      description: 'Рассыпчатый деревенский картофель с укропом и маслом.',
      price: 320,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1746358475/kartofel_zapechyonnnyy_v_pechi_ftb4r4.jpg',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[0].id,
      restaurantId: restaurantData[3].id,
      name: 'Перловка с грибами и луком',
      description: 'Постное блюдо с ароматными лесными грибами.',
      price: 370,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1746358475/perlovka_s_gribami_i_lukom_a50cul.jpg',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[0].id,
      restaurantId: restaurantData[3].id,
      name: 'Рагу из лесного мяса',
      description: 'Мясное рагу из дичи в густом соусе со специями.',
      price: 840,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1746358457/ragu_iz_lesnogo_myasa_babu9f.jpg',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[1].id,
      restaurantId: restaurantData[3].id,
      name: 'Соленья деревенские',
      description: 'Огурцы, капуста, чеснок — ассорти домашних солений.',
      price: 280,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1746358470/solenya_derevenskie_cj5c2y.jpg',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[1].id,
      restaurantId: restaurantData[3].id,
      name: 'Грибы маринованные',
      description: 'Ассорти лесных грибов в душистом маринаде.',
      price: 340,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1746358467/griby_marinovannye_ldszqf.jpg',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[1].id,
      restaurantId: restaurantData[3].id,
      name: 'Ржаные гренки с чесноком',
      description: 'Хрустящие гренки с пряным ароматом.',
      price: 190,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1746358469/rzhanie_grenki_s_chesnokom_mr3m9b.jpg',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[1].id,
      restaurantId: restaurantData[3].id,
      name: 'Сало с хреном и луком',
      description: 'Нарезка домашнего сала с пряностями.',
      price: 290,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1746358470/salo_s_khrenom_i_lukom_eoftrj.jpg',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[1].id,
      restaurantId: restaurantData[3].id,
      name: 'Икра кабачковая',
      description: 'Классическая овощная закуска по-домашнему.',
      price: 230,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1746358468/ikra_kabachkovaya_rff9hp.jpg',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[2].id,
      restaurantId: restaurantData[3].id,
      name: 'Уха с дымком',
      description: 'На костре, с тремя сортами рыбы и зеленью.',
      price: 510,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1746358459/ukha_s_dymkom_ld603v.jpg',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[2].id,
      restaurantId: restaurantData[3].id,
      name: 'Похлёбка с репой и фасолью',
      description: 'На наваристом бульоне, с деревенскими овощами.',
      price: 390,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1746358458/pokhlyobka_s_repoy_i_fasolyu_r2nrrj.jpg',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[2].id,
      restaurantId: restaurantData[3].id,
      name: 'Куриный бульон с яйцом и зеленью',
      description: 'Лёгкий, ароматный бульон с отварным яйцом.',
      price: 360,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1746358457/kurinyy_bulon_s_yaytsom_i_zelenyu_ydyxvh.jpg',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[3].id,
      restaurantId: restaurantData[3].id,
      name: 'Квас малиновый',
      description: 'Домашний квас с лёгкой ягодной ноткой.',
      price: 160,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1746358476/kvas_malinovyy_ywpika.jpg',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[3].id,
      restaurantId: restaurantData[3].id,
      name: 'Травяной отвар с липой и мёдом',
      description: 'Успокаивающий напиток на основе лесных трав.',
      price: 170,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1746358473/travyanoy_otvar_s_lipoy_i_myodom_p0iczb.jpg',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[3].id,
      restaurantId: restaurantData[3].id,
      name: 'Морс черничный',
      description: 'Свежий морс из северной ягоды.',
      price: 150,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1746358470/mors_chernichnyy_rtssmp.jpg',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[3].id,
      restaurantId: restaurantData[3].id,
      name: 'Настойка на мяте',
      description: 'Домашняя настойка с мятным охлаждающим вкусом.',
      price: 200,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1746358472/nastoyka_na_myate_ncuxn3.jpg',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[0].id,
      restaurantId: restaurantData[4].id,
      name: 'Говяжья вырезка на костре',
      description: 'Сочная говядина, запеченная на живом огне.',
      price: 1600,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1746358477/govyazhya_vyrezka_na_kostre_c69umt.jpg',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[0].id,
      restaurantId: restaurantData[4].id,
      name: 'Свинина в кленовом сиропе',
      description: 'Нежная свинина с ароматной глазурью из кленового сиропа.',
      price: 1350,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1746358480/svinina_v_klenovom_sirop%D0%B5_u1wogx.jpg',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[0].id,
      restaurantId: restaurantData[4].id,
      name: 'Копчёная курица с травами',
      description: 'Курица, медленно копченная с душистыми травами.',
      price: 1200,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1746358478/kopchyonnaya_kuritsa_s_travami_ltf3t6.jpg',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[0].id,
      restaurantId: restaurantData[4].id,
      name: 'Запечённая баранина с розмарином',
      description: 'Баранина, томлённая с пряным розмарином.',
      price: 1700,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1746358482/zapechyonnaya_baranina_s_rozmarinom_yravvg.jpg',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[1].id,
      restaurantId: restaurantData[4].id,
      name: 'Колбаски охотничьи',
      description: 'Домашние копчёные колбаски с пряностями.',
      price: 950,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1746358452/kolbaski_okhotnichi_ix4jqc.jpg',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[1].id,
      restaurantId: restaurantData[4].id,
      name: 'Говяжьи рёбра на углях',
      description: 'Рёбра, приготовленные на древесных углях.',
      price: 1450,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1746358451/govyazhi_ryobra_na_uglyakh_tehfnn.jpg',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[1].id,
      restaurantId: restaurantData[4].id,
      name: 'Шашлык из индейки',
      description: 'Нежный шашлык из маринованной индейки.',
      price: 1100,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1746358454/shashlyk_iz_indeyki_aoazfd.jpg',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[2].id,
      restaurantId: restaurantData[4].id,
      name: 'Светлое пенное',
      description: 'Освежающее светлое крафтовое пиво.',
      price: 400,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1746358454/svetloe_pennoe_qoitxo.jpg',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[2].id,
      restaurantId: restaurantData[4].id,
      name: 'Тёмное крафтовое пиво',
      description: 'Густое и насыщенное тёмное пиво.',
      price: 450,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1746358474/tyomnoe_kraftovoe_pivo_fgaoqg.jpg',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[2].id,
      restaurantId: restaurantData[4].id,
      name: 'Квас с солодом',
      description: 'Домашний квас на солоде и травах.',
      price: 300,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1746358454/kvas_s_solodom_oawpmv.jpg',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[3].id,
      restaurantId: restaurantData[4].id,
      name: 'Копчёные сырные палочки',
      description: 'Сырные палочки, копчённые по старинным рецептам.',
      price: 500,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1746358450/kopchyonnye_syrnye_palochki_dlfmhb.jpg',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[3].id,
      restaurantId: restaurantData[4].id,
      name: 'Орехи в мёде',
      description: 'Ароматные орешки, томлённые в лесном мёде.',
      price: 350,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1746358452/orekhi_v_myode_ohivmx.jpg',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[3].id,
      restaurantId: restaurantData[4].id,
      name: 'Гренки с чесноком',
      description: 'Хрустящие ржаные гренки с чесноком.',
      price: 300,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1746358482/grenki_s_chesnokom_a643i1.jpg',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[3].id,
      restaurantId: restaurantData[4].id,
      name: 'Сушёная рыбка',
      description: 'Традиционная закуска к пиву — вяленая рыбка.',
      price: 600,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1746358453/sushyonaya_rybka_vzpnh1.jpg',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[0].id,
      restaurantId: restaurantData[5].id,
      name: 'Пшеничная лепёшка с мёдом',
      description: 'Мягкая пшеничная лепёшка, политая свежим мёдом.',
      price: 160,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1746358461/pshenichnaya_lepyoshka_s_myodom_c3c1mz.jpg',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[0].id,
      restaurantId: restaurantData[5].id,
      name: 'Ореховый рулет с корицей',
      description: 'Сдобный рулет с грецким орехом и ароматной корицей.',
      price: 190,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1746358466/orekhovyi_rulet_s_koritsei_tbyun5.jpg',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[0].id,
      restaurantId: restaurantData[5].id,
      name: 'Сдобная булочка с изюмом',
      description: 'Пышная булочка с изюмом и сахарной пудрой.',
      price: 140,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1746358461/sdobnaya_bulochka_s_izyumom_hsefsx.jpg',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[0].id,
      restaurantId: restaurantData[5].id,
      name: 'Ячменный пирожок с яблоками',
      description: 'Домашний пирожок из ячменной муки с начинкой из тушёных яблок.',
      price: 150,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1746358465/yachmennyi_pirozhok_s_yablokami_auakdo.jpg',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[1].id,
      restaurantId: restaurantData[5].id,
      name: 'Каша на молоке с ягодами',
      description: 'Овсяная каша с лесными ягодами и мёдом.',
      price: 180,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1746358449/kasha_na_moloke_s_yagodami_usawxe.jpg',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[1].id,
      restaurantId: restaurantData[5].id,
      name: 'Омлет с зеленью и сыром',
      description: 'Пышный омлет с домашним сыром и свежей зеленью.',
      price: 200,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1746358450/omlet_s_zelenyu_i_syrom_uwi1nx.jpg',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[1].id,
      restaurantId: restaurantData[5].id,
      name: 'Гречневая каша с маслом',
      description: 'Рассыпчатая гречневая каша, заправленная деревенским маслом.',
      price: 160,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1746358465/grechnevaya_kasha_s_maslom_wqck7v.jpg',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[1].id,
      restaurantId: restaurantData[5].id,
      name: 'Творожная запеканка',
      description: 'Нежная запеканка с творогом и изюмом.',
      price: 190,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1746358450/tvorozhnaya_zapekanka_igk2u2.jpg',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[2].id,
      restaurantId: restaurantData[5].id,
      name: 'Медовик по-деревенски',
      description: 'Многослойный торт с ароматным мёдом.',
      price: 220,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1746358461/medovik_po_derevenski_ueltvh.jpg',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[2].id,
      restaurantId: restaurantData[5].id,
      name: 'Сырники со сметаной',
      description: 'Поджаристые сырники из домашнего творога со сметаной.',
      price: 170,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1746358463/syrniki_so_smetanoi_jblozl.jpg',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[2].id,
      restaurantId: restaurantData[5].id,
      name: 'Пирог с вишней',
      description: 'Сочный пирог с вишнёвой начинкой и хрустящей корочкой.',
      price: 190,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1746358464/pirog_s_vishnei_qdpuk3.jpg',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[2].id,
      restaurantId: restaurantData[5].id,
      name: 'Мятное печенье',
      description: 'Рассыпчатое печенье с добавлением свежей мяты.',
      price: 130,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1746358462/myatnoe_pechene_q0aifi.jpg',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[3].id,
      restaurantId: restaurantData[5].id,
      name: 'Молоко из глиняного кувшина',
      description: 'Свежайшее молоко, подаваемое в традиционной посуде.',
      price: 90,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1746358450/moloko_iz_glinyanogo_kuvshina_dspggr.jpg',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[3].id,
      restaurantId: restaurantData[5].id,
      name: 'Чай с душицей',
      description: 'Травяной чай с добавлением душицы, приятный и успокаивающий.',
      price: 110,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1746358467/chai_s_dushitsei_aznsyd.jpg',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[3].id,
      restaurantId: restaurantData[5].id,
      name: 'Компот из сухофруктов',
      description: 'Сладкий компот из яблок, груш и изюма.',
      price: 120,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1746358449/kompot_iz_sukhofruktov_jabxo4.jpg',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[0].id,
      restaurantId: restaurantData[6].id,
      name: 'Жаркое по-домашнему',
      description: 'Картофель с мясом, тушёные в горшочке с овощами.',
      price: 480,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1746358495/zharkoe_po_domashnemu_huhfbm.jpg',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[0].id,
      restaurantId: restaurantData[6].id,
      name: 'Тефтели в томатном соусе',
      description: 'Мясные тефтели, запечённые с ароматным томатным соусом.',
      price: 430,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1746358492/tefteli_v_tomatnom_souse_irz5up.jpg',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[0].id,
      restaurantId: restaurantData[6].id,
      name: 'Гречка с грибами и луком',
      description: 'Рассыпчатая гречневая каша с шампиньонами и луком.',
      price: 320,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1746358491/grechka_s_gribami_i_lukom_nwmdq5.jpg',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[0].id,
      restaurantId: restaurantData[6].id,
      name: 'Картофельное пюре с котлетой',
      description: 'Домашняя котлета из фарша с нежным картофельным пюре.',
      price: 390,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1746358491/kartofelnoe_pyure_s_kotletoi_qde2wi.jpg',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[1].id,
      restaurantId: restaurantData[6].id,
      name: 'Салат из свежих овощей',
      description: 'Огурцы, помидоры, зелень с лёгкой заправкой.',
      price: 270,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1746358487/salat_iz_svezhikh_ovoshchei_ssbvno.jpg',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[1].id,
      restaurantId: restaurantData[6].id,
      name: 'Селёдка с луком и картошкой',
      description: 'Солёная сельдь с отварным картофелем и репчатым луком.',
      price: 350,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1746358487/seledka_s_lukom_i_kartoshkoi_nd7cvk.jpg',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[1].id,
      restaurantId: restaurantData[6].id,
      name: 'Маринованные огурцы',
      description: 'Хрустящие домашние огурцы в уксусной заливке.',
      price: 190,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1746358487/marinovannye_ogurtsy_czjdgo.jpg',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[2].id,
      restaurantId: restaurantData[6].id,
      name: 'Узвар',
      description: 'Компот из сухофруктов по традиционному рецепту.',
      price: 150,
      imageUrl: 'https://res.cloudinary.com/ddv46fj7f/image/upload/v1746358491/uzvar_frmkmr.jpg',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[2].id,
      restaurantId: restaurantData[6].id,
      name: 'Морс из клюквы',
      description: 'Освежающий морс, насыщенный витаминами.',
      price: 170,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1746358490/mors_iz_klyukvy_quhcyf.jpg',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[2].id,
      restaurantId: restaurantData[6].id,
      name: 'Чай с облепихой',
      description: 'Горячий чай с облепихой, мёдом и пряностями.',
      price: 200,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1746358488/chai_s_oblepikhoy_y8pzip.jpg',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[2].id,
      restaurantId: restaurantData[6].id,
      name: 'Домашний лимонад',
      description: 'Лимонад с мятой и цитрусовыми, приготовленный на месте.',
      price: 180,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1746358492/domashnii_limonad_xo0082.jpg',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[0].id,
      restaurantId: restaurantData[7].id,
      name: 'Олений стейк с брусничным соусом',
      description: 'Сочный стейк из оленины с насыщенным брусничным соусом.',
      price: 1650,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1746358497/oleniy_steik_s_brusnichnym_sousom_vin0gi.jpg',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[0].id,
      restaurantId: restaurantData[7].id,
      name: 'Жаркое из дичи',
      description: 'Ароматное тушёное мясо дикой птицы и зверя с овощами.',
      price: 1450,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1746358499/zharkoe_iz_dichi_s8gptt.jpg',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[0].id,
      restaurantId: restaurantData[7].id,
      name: 'Перловка с белыми грибами',
      description: 'Традиционная каша с ароматом леса и грибов.',
      price: 780,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1746358497/perlovka_s_belymi_gribami_ba2pth.jpg',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[0].id,
      restaurantId: restaurantData[7].id,
      name: 'Запечённый заяц с розмарином',
      description: 'Мягкое мясо зайца, приготовленное с душистыми травами.',
      price: 1320,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1746358498/zapechyonnyi_zayats_s_rozmarinom_ejvcba.jpg',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[1].id,
      restaurantId: restaurantData[7].id,
      name: 'Соленья с лесными грибами',
      description: 'Ассорти из домашних солений и маринованных грибов.',
      price: 560,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1746358494/solenya_s_lesnymi_gribami_ghrwzl.jpg',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[1].id,
      restaurantId: restaurantData[7].id,
      name: 'Ржаные гренки с чесноком',
      description: 'Хрустящие гренки с острым ароматом чеснока.',
      price: 350,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1746358493/rzhanie_grenki_s_chesnokom_rvvr49.jpg',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[1].id,
      restaurantId: restaurantData[7].id,
      name: 'Паштет из куропатки',
      description: 'Нежный паштет с ягодным соусом и тостами.',
      price: 620,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1746358494/pashtet_iz_kuropatki_wmeelh.jpg',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[2].id,
      restaurantId: restaurantData[7].id,
      name: 'Грибной крем-суп',
      description: 'Насыщенный крем-суп из лесных грибов.',
      price: 590,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1746358500/gribnoy_krem_sup_hknzno.jpg',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[2].id,
      restaurantId: restaurantData[7].id,
      name: 'Щи из квашеной капусты',
      description: 'Кисловатые щи по старинному рецепту.',
      price: 470,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1746358500/shchi_iz_kvashenoi_kapusty_xcb01x.jpg',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[2].id,
      restaurantId: restaurantData[7].id,
      name: 'Уха из речной рыбы',
      description: 'Лёгкий рыбный суп с зеленью.',
      price: 520,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1746358501/ukha_iz_rechnoy_ryby_qj4upf.jpg',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[3].id,
      restaurantId: restaurantData[7].id,
      name: 'Мёдовый сбитень',
      description: 'Горячий напиток с мёдом и пряностями.',
      price: 290,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1746358496/myodovyi_sbiten_ogtbsb.jpg',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[3].id,
      restaurantId: restaurantData[7].id,
      name: 'Морс из черники',
      description: 'Освежающий напиток из лесной ягоды.',
      price: 270,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1746358495/mors_iz_cherniki_oaz9yk.jpg',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[3].id,
      restaurantId: restaurantData[7].id,
      name: 'Кисель из лесных ягод',
      description: 'Плотный напиток с насыщенным ягодным вкусом.',
      price: 250,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1746358499/kisel_iz_lesnykh_yagod_wnhqrc.jpg',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[3].id,
      restaurantId: restaurantData[7].id,
      name: 'Травяной чай',
      description: 'Чай из лесных трав: мята, чабрец, зверобой.',
      price: 240,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1746358497/travyanoy_chai_s5w2fz.jpg',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[0].id,
      restaurantId: restaurantData[8].id,
      name: 'Запечённый судак с лимоном',
      description: 'Нежное филе судака, запечённое с ломтиками лимона и тимьяном.',
      price: 1050,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1746358514/zapechyonnyi_sudak_s_limonom_d4xnpa.jpg',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[0].id,
      restaurantId: restaurantData[8].id,
      name: 'Жареный сом с луком',
      description: 'Сом, обжаренный до золотистой корочки с карамелизированным луком.',
      price: 1100,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1746358513/zharenyi_som_s_lukom_ua9wjj.jpg',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[0].id,
      restaurantId: restaurantData[8].id,
      name: 'Угорь в сливочном соусе',
      description: 'Нежный угорь под соусом из сливок и белого вина.',
      price: 1350,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1746358512/ugor_v_slivochnom_souse_us2ttc.jpg',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[0].id,
      restaurantId: restaurantData[8].id,
      name: 'Филе щуки в панировке',
      description: 'Хрустящее филе щуки в травяной панировке.',
      price: 950,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1746358515/file_shchuki_v_panirovke_tzxtf4.jpg',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[1].id,
      restaurantId: restaurantData[8].id,
      name: 'Селёдка с луком и картофелем',
      description: 'Солёная сельдь подаётся с отварным картофелем и маринованным луком.',
      price: 320,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1746358510/seledka_s_lukom_i_kartofelem_yawdrx.jpg',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[1].id,
      restaurantId: restaurantData[8].id,
      name: 'Икра щуки с тостами',
      description: 'Домашняя икра щуки подаётся на хрустящих тостах.',
      price: 410,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1746358508/ikra_shchuki_s_tostami_hp1wgq.jpg',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[1].id,
      restaurantId: restaurantData[8].id,
      name: 'Рыбные котлеты',
      description: 'Сочные котлеты из речной рыбы с зеленью и специями.',
      price: 480,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1746358508/rybnye_kotlety_lk5ij4.jpg',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[2].id,
      restaurantId: restaurantData[8].id,
      name: 'Уха по-царски',
      description: 'Богатый рыбный бульон с несколькими сортами рыбы и овощами.',
      price: 680,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1746358515/ukha_po_tsarski_z1khxk.jpg',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[2].id,
      restaurantId: restaurantData[8].id,
      name: 'Речной рыбный рассольник',
      description: 'Суп на рассоле с рыбой, перловкой и огурцами.',
      price: 620,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1746358514/rechnoy_rybnyi_rassolnik_mglvfh.jpg',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[2].id,
      restaurantId: restaurantData[8].id,
      name: 'Крем-суп из лосося',
      description: 'Нежный суп-пюре из лосося со сливками.',
      price: 730,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1746358513/krem_sup_iz_lososya_cx8ozg.jpg',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[3].id,
      restaurantId: restaurantData[8].id,
      name: 'Хреновуха',
      description: 'Острый настой на хрене с ноткой меда.',
      price: 290,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1746358509/khrenovukha_ekvgds.jpg',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[3].id,
      restaurantId: restaurantData[8].id,
      name: 'Морс клюквенный',
      description: 'Освежающий морс из клюквы с мятой.',
      price: 260,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1746358516/mors_klyukvennyi_w0tzmb.jpg',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[3].id,
      restaurantId: restaurantData[8].id,
      name: 'Квас хлебный',
      description: 'Домашний квас на ржаном солоде.',
      price: 230,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1746358511/kvas_khlebnyi_kfzad9.jpg',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[3].id,
      restaurantId: restaurantData[8].id,
      name: 'Травяной настой',
      description: 'Чай из луговых трав с лёгкой горчинкой.',
      price: 200,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1746358511/travyanoy_nastoy_nhq1mt.jpg',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[0].id,
      restaurantId: restaurantData[9].id,
      name: 'Гриль-сети с бараниной',
      description: 'Сочные куски баранины, жаренные на открытом огне.',
      price: 1300,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1746358527/gril_seti_s_baraninoy_de4ypj.jpg',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[0].id,
      restaurantId: restaurantData[9].id,
      name: 'Свиное ребро на углях',
      description: 'Тосты свиных ребрышек, запечённые на углях до золотистой корочки.',
      price: 1400,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1746358529/svinnoe_rebro_na_uglyakh_leastv.jpg',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[0].id,
      restaurantId: restaurantData[9].id,
      name: 'Рыба на мангале',
      description: 'Свежая рыба, запечённая на мангале с лимоном и зеленью.',
      price: 1100,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1746358529/ryba_na_mangale_yfjte1.jpg',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[0].id,
      restaurantId: restaurantData[9].id,
      name: 'Телячья нога в травах',
      description: 'Мясо телячьей ноги, томлённое в травах.',
      price: 1500,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1746358530/telyachya_noga_v_travakh_lmilod.jpg',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[0].id,
      restaurantId: restaurantData[9].id,
      name: 'Картошка с укропом',
      description: 'Запечённая картошка с укропом и чесноком.',
      price: 500,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1746358528/kartoshka_s_ukropom_mtzji4.jpg',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[1].id,
      restaurantId: restaurantData[9].id,
      name: 'Медовуха',
      description: 'Сладкий напиток на основе мёда, идеально подойдёт к мясным блюдам.',
      price: 300,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1746358539/medovukha_czrfue.jpg',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[1].id,
      restaurantId: restaurantData[9].id,
      name: 'Травяной чай',
      description: 'Чай с лечебными травами, прекрасно утоляет жажду.',
      price: 200,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1746358538/travyanoy_chay_dwl4uh.jpg',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[1].id,
      restaurantId: restaurantData[9].id,
      name: 'Грог с пряностями',
      description: 'Тёплый алкогольный напиток с корицей и другими пряностями.',
      price: 350,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1746358537/grog_s_pryanostyami_eooznk.jpg',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[1].id,
      restaurantId: restaurantData[9].id,
      name: 'Черный чай с лимоном',
      description: 'Чёрный чай с ломтями свежего лимона.',
      price: 150,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1746358535/chernyy_chay_s_limonom_nch6yt.jpg',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[1].id,
      restaurantId: restaurantData[9].id,
      name: 'Квас домашний',
      description: 'Освежающий квас, сваренный по старинному рецепту.',
      price: 250,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1746358536/kvas_domashniy_hbh0ff.jpg',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[2].id,
      restaurantId: restaurantData[9].id,
      name: 'Греческий салат',
      description: 'Салат с оливками, фетой и свежими овощами.',
      price: 450,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1746358536/grecheskiy_salat_bn5pyp.jpg',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[2].id,
      restaurantId: restaurantData[9].id,
      name: 'Солёные огурцы с хреном',
      description: 'Огурцы, заквашенные с чесноком и хреном.',
      price: 250,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1746358534/solenye_ogurtsy_s_khrenom_gfc7pf.jpg',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[2].id,
      restaurantId: restaurantData[9].id,
      name: 'Творожная масса с зеленью',
      description: 'Творог, смешанный с зеленью и чесноком.',
      price: 350,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1746358534/tvorozhnaya_massa_s_zelenyu_k6jveo.jpg',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[2].id,
      restaurantId: restaurantData[9].id,
      name: 'Блины с икрой',
      description: 'Тонкие блины с красной икрой.',
      price: 500,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1746358533/bliny_s_ikroy_ij8vkr.jpg',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[2].id,
      restaurantId: restaurantData[9].id,
      name: 'Жареные грибы с луком',
      description: 'Обжаренные грибы с луком и специями.',
      price: 400,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1746358536/zharenye_griby_s_lukom_sp6es0.jpg',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[3].id,
      restaurantId: restaurantData[9].id,
      name: 'Пирог с яблоками',
      description: 'Пирог с яблочной начинкой, посыпанный сахаром.',
      price: 350,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1746358532/pirog_s_yablokami_h73toh.jpg',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[3].id,
      restaurantId: restaurantData[9].id,
      name: 'Блинчики с медом',
      description: 'Маленькие блинчики, политые мёдом.',
      price: 300,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1746358531/blinchiki_s_medom_ns4pee.jpg',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[3].id,
      restaurantId: restaurantData[9].id,
      name: 'Торт с орехами',
      description: 'Торт с орехами и слоёным тестом.',
      price: 400,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1746358533/tort_s_orekhami_s8pzlq.jpg',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[3].id,
      restaurantId: restaurantData[9].id,
      name: 'Кекс с ягодами',
      description: 'Нежный кекс с ягодами и сладкой глазурью.',
      price: 350,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1746358530/keks_s_yagodami_iljrx8.jpg',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[3].id,
      restaurantId: restaurantData[9].id,
      name: 'Мёд с орехами',
      description: 'Натуральный мёд с орехами.',
      price: 250,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1746358531/myod_s_orekhami_h5zij2.jpg',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[0].id,
      restaurantId: restaurantData[10].id,
      name: 'Говядина по-строгановски',
      description: 'Нежное мясо, тушёное в сметанном соусе с грибами и луком.',
      price: 1600,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1746358484/govyadina_po_stroganovski_rsam8a.jpg',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[0].id,
      restaurantId: restaurantData[10].id,
      name: 'Курица в медово-горчичном соусе',
      description: 'Медово-горчичный соус придает курице невероятный вкус.',
      price: 1300,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1746358485/kuritsa_v_medovo_gorchichnom_souse_dcijan.jpg',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[0].id,
      restaurantId: restaurantData[10].id,
      name: 'Свинина по-французски',
      description: 'Мясо свинины, запечённое с сыром, луком и картошкой.',
      price: 1400,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1746358487/svinina_po_frantsuzski_dihwzd.jpg',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[0].id,
      restaurantId: restaurantData[10].id,
      name: 'Филе индейки с лимоном',
      description: 'Филе индейки, приправленное лимоном и специями, запечённое в духовке.',
      price: 1500,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1746358487/file_indeyki_s_limonom_vh9krm.jpg',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[0].id,
      restaurantId: restaurantData[10].id,
      name: 'Гриль-самбар с овощами',
      description: 'Овощи, жаренные на гриле с особым самбаром.',
      price: 1200,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1746358486/gril_sambar_s_ovoshchami_wzdkff.jpg',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[1].id,
      restaurantId: restaurantData[10].id,
      name: 'Грог',
      description: 'Тёплый алкогольный напиток с пряностями.',
      price: 350,
      imageUrl: 'https://res.cloudinary.com/ddv46fj7f/image/upload/v1746358481/grog_dcz7l1.jpg',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[1].id,
      restaurantId: restaurantData[10].id,
      name: 'Вишневый пунш',
      description: 'Освежающий алкогольный напиток с вишней.',
      price: 400,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1746358482/vishnevyi_punsh_iueyxm.jpg',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[1].id,
      restaurantId: restaurantData[10].id,
      name: 'Медовуха',
      description: 'Традиционный напиток на основе мёда.',
      price: 300,
      imageUrl: 'https://res.cloudinary.com/ddv46fj7f/image/upload/v1746358483/medovuha_ye46sk.jpg',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[1].id,
      restaurantId: restaurantData[10].id,
      name: 'Травяной чай',
      description: 'Чай с полезными травами.',
      price: 200,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1746358481/travyanoi_chai_drcn6m.jpg',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[1].id,
      restaurantId: restaurantData[10].id,
      name: 'Черный кофе',
      description: 'Сильный чёрный кофе для бодрости.',
      price: 150,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1746358477/chernyi_kofe_n9vvrr.jpg',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[2].id,
      restaurantId: restaurantData[10].id,
      name: 'Греческий салат',
      description: 'Салат с оливками, фетой, помидорами и огурцами.',
      price: 500,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1746358468/grecheskii_salat_vomw5m.jpg',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[2].id,
      restaurantId: restaurantData[10].id,
      name: 'Капрезе',
      description: 'Салат из помидоров, моцареллы и базилика.',
      price: 450,
      imageUrl: 'https://res.cloudinary.com/ddv46fj7f/image/upload/v1746358471/kapreze_jchiud.jpg',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[2].id,
      restaurantId: restaurantData[10].id,
      name: 'Цезарь с курицей',
      description: 'Листья салата, куриное филе, соус Цезарь и пармезан.',
      price: 600,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1746358475/tsezar_s_kuritsey_p2upnr.jpg',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[2].id,
      restaurantId: restaurantData[10].id,
      name: 'Тартар из лосося',
      description: 'Свежий лосось с авокадо и специями.',
      price: 700,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1746358471/tartar_iz_lososya_wbgdo3.jpg',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[2].id,
      restaurantId: restaurantData[10].id,
      name: 'Салат с авокадо и креветками',
      description: 'Салат с авокадо, креветками и зелёными листьями.',
      price: 750,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1746358471/salat_s_avokado_i_krevetkami_mexbcj.jpg',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[3].id,
      restaurantId: restaurantData[10].id,
      name: 'Шоколадный торт',
      description: 'Нежный шоколадный торт с орехами.',
      price: 400,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1746358463/shokoladnyi_tort_p5xad5.jpg',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[3].id,
      restaurantId: restaurantData[10].id,
      name: 'Тирамису',
      description: 'Итальянский десерт с маскарпоне и кофе.',
      price: 450,
      imageUrl: 'https://res.cloudinary.com/ddv46fj7f/image/upload/v1746358466/tiramisu_ynvo8j.jpg',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[3].id,
      restaurantId: restaurantData[10].id,
      name: 'Пирог с ягодами',
      description: 'Сладкий пирог с ягодами в хрустящей корочке.',
      price: 350,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1746358461/pirog_s_yagodami_ioqojx.jpg',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[3].id,
      restaurantId: restaurantData[10].id,
      name: 'Медовик',
      description: 'Пирог с медом и орехами.',
      price: 300,
      imageUrl: 'https://res.cloudinary.com/ddv46fj7f/image/upload/v1746358458/medovik_xsozcg.jpg',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[3].id,
      restaurantId: restaurantData[10].id,
      name: 'Чизкейк',
      description: 'Творожный десерт с фруктовой начинкой.',
      price: 500,
      imageUrl: 'https://res.cloudinary.com/ddv46fj7f/image/upload/v1746358455/chizkeik_lrjbr4.jpg',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[0].id,
      restaurantId: restaurantData[11].id,
      name: 'Свинина на вертеле',
      description: 'Сочная свинина, приготовленная на открытом огне.',
      price: 1200,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1746358550/svinina_na_verte%D0%BB%D0%B5_eo0ook.jpg',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[0].id,
      restaurantId: restaurantData[11].id,
      name: 'Говядина, тушёная в вине',
      description: 'Мягкая говядина, тушёная в вине с пряными травами.',
      price: 1500,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1746358547/govyadina_tushyonaya_v_vine_nzeyi1.jpg',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[0].id,
      restaurantId: restaurantData[11].id,
      name: 'Жареная рыба',
      description: 'Свежая рыба, жаренная до золотистой корочки.',
      price: 900,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1746358550/zharenaya_ryba_ghvy0b.jpg',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[0].id,
      restaurantId: restaurantData[11].id,
      name: 'Запечённая курица с лимоном',
      description: 'Курица, запечённая с лимоном и свежими травами.',
      price: 1000,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1746358550/zapechonnaya_kuritsa_s_limonom_lvpi9f.jpg',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[0].id,
      restaurantId: restaurantData[11].id,
      name: 'Печёная картошка с сыром',
      description: 'Запечённый картофель с плавленым сыром и зеленью.',
      price: 500,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1746358550/pechyonnaya_kartoshka_s_syrom_sefadd.jpg',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[1].id,
      restaurantId: restaurantData[11].id,
      name: 'Квас на меду',
      description: 'Освежающий квас с добавлением натурального мёда.',
      price: 200,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1746358547/kvas_na_medu_ozaody.jpg',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[1].id,
      restaurantId: restaurantData[11].id,
      name: 'Ягодный морс',
      description: 'Сладкий морс из лесных ягод.',
      price: 250,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1746358547/yagodnyy_mors_uwcv72.jpg',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[1].id,
      restaurantId: restaurantData[11].id,
      name: 'Сбитень с гвоздикой',
      description: 'Тёплый напиток на мёде и пряностях.',
      price: 350,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1746358546/sbiten_s_gvozdikoy_ufelva.jpg',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[1].id,
      restaurantId: restaurantData[11].id,
      name: 'Чай с мятой',
      description: 'Чай с ароматной мятой, придающей свежесть.',
      price: 150,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1746358547/chay_s_myatoy_ez4ai8.jpg',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[1].id,
      restaurantId: restaurantData[11].id,
      name: 'Кофе по-деревенски',
      description: 'Крепкий кофе, сваренный по старинному рецепту.',
      price: 300,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1746358544/kofe_po_derevenski_ydnevc.jpg',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[2].id,
      restaurantId: restaurantData[11].id,
      name: 'Маринованные огурцы',
      description: 'Хрустящие огурцы в маринаде с пряностями.',
      price: 150,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1746358542/marinovannye_ogurtsy_uhts8x.jpg',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[2].id,
      restaurantId: restaurantData[11].id,
      name: 'Сырная нарезка',
      description: 'Ассорти сыров с различными добавками.',
      price: 500,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1746358544/syrnaya_narezka_mj9yyq.jpg',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[2].id,
      restaurantId: restaurantData[11].id,
      name: 'Печёные баклажаны с чесноком',
      description: 'Запечённые баклажаны с чесноком и зеленью.',
      price: 400,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1746358542/pechyonyye_baklazhany_s_chesnokom_anvdab.jpg',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[2].id,
      restaurantId: restaurantData[11].id,
      name: 'Солёная рыба с горчицей',
      description: 'Солёная рыба с пикантным горчичным соусом.',
      price: 600,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1746358543/solyonaya_ryba_s_gorchitsey_zbysyd.jpg',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[2].id,
      restaurantId: restaurantData[11].id,
      name: 'Жареные грибы с луком',
      description: 'Лесные грибы, обжаренные с луком.',
      price: 350,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1746358544/zharenye_griby_s_lukom_qcqvfi.jpg',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[3].id,
      restaurantId: restaurantData[11].id,
      name: 'Мёд с орехами',
      description: 'Натуральный мёд с добавлением орехов.',
      price: 250,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1746358541/myod_s_orekhami_vpvedz.jpg',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[3].id,
      restaurantId: restaurantData[11].id,
      name: 'Пирог с вишней',
      description: 'Тёплый пирог с вишнями и сахарной пудрой.',
      price: 300,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1746358544/pirog_s_vishney_vuvkcv.jpg',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[3].id,
      restaurantId: restaurantData[11].id,
      name: 'Блины с ягодами',
      description: 'Мягкие блины с ягодной начинкой.',
      price: 350,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1746358539/bliny_s_yagodami_qonmj6.jpg',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[3].id,
      restaurantId: restaurantData[11].id,
      name: 'Запечённые яблоки с медом',
      description: 'Тёплые яблоки, запечённые с медом и корицей.',
      price: 400,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1746358541/zapechyonnye_yabloki_s_medom_l1a4h4.jpg',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[3].id,
      restaurantId: restaurantData[11].id,
      name: 'Кекс с орехами',
      description: 'Мягкий кекс с орехами и сахарной корочкой.',
      price: 250,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1746358539/keks_s_orekhami_ozdfrq.jpg',
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
    },
  ];
  await db.insert(users).values(userData);

  const addressData = [
    { id: 1, userId: userData[0].id, address: 'Ленина, 10', comment: 'code: 1111' },
  ];
  await db.insert(deliveryAddresses).values(addressData);

  const paymentMethodsData = [
    { id: 1, userId: userData[0].id, type: 'card', details: '1234 4321 4321 1234' },
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
