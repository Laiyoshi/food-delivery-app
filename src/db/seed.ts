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
  users,
} from './schema';

async function seed() {
  console.log('🌱 Заполнение базы данных...');

  // Очистка таблиц перед заполнением
  await db.delete(restaurants);
  await db.delete(menuItems);
  await db.delete(categories);
  await db.delete(cart);
  await db.delete(favorites);
  await db.delete(orders);
  await db.delete(deliveryAddresses);
  await db.delete(paymentMethods);
  await db.delete(users);
  await db.delete(orderStatuses);
  await db.delete(couriers);

  const restaurantData = [
    {
      id: uuidv4(),
      name: 'Трапеза Ярополка',
      description: 'Традиционная кухня',
      rating: 5,
      deliveryTime: '30-40 мин',
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
      deliveryTime: '47-42 мин',
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
      deliveryTime: '41-32 мин',
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
      deliveryTime: '52-32 мин',
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
      cuisineType: 'Итальянская',
      averagePrice: 1800,
      imageUrl:
        'https://res.cloudinary.com/ddv46fj7f/image/upload/v1744282993/restaurants/hsvvlejkpngkh6ws0peb.jpg',
    },
  ];
  await db.insert(restaurants).values(restaurantData);

  const categoryData = [
    { id: uuidv4(), restaurantId: restaurantData[0].id, name: 'Основные блюда' },
    { id: uuidv4(), restaurantId: restaurantData[1].id, name: 'Основные блюда' },
    { id: uuidv4(), restaurantId: restaurantData[0].id, name: 'Десерты' },
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
      restaurantId: restaurantData[1].id,
      name: 'Филе миньон 2',
      description: 'Нежнейшая говядина с соусом.',
      price: 1500,
      imageUrl: '/images/food.png',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[2].id,
      restaurantId: restaurantData[0].id,
      name: 'Филе миньон 3',
      description: 'Нежнейшая говядина с соусом.',
      price: 1500,
      imageUrl: '/images/food.png',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[3].id,
      restaurantId: restaurantData[1].id,
      name: 'Филе миньон 4',
      description: 'Нежнейшая говядина с соусом.',
      price: 1500,
      imageUrl: '/images/food.png',
    },
    {
      id: uuidv4(),
      categoryId: categoryData[2].id,
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
