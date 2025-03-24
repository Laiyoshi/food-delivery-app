import { sql } from 'drizzle-orm';
import { integer, real, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { v4 as uuid4 } from 'uuid';

export const restaurants = sqliteTable('restaurants', {
  id: text('id')
    .primaryKey()
    .$default(() => uuid4()),
  name: text('name').notNull(),
  description: text('description').notNull(),
  rating: real('rating').default(0),
  deliveryTime: text('delivery_time').notNull(),
  cuisineType: text('cuisine_type').notNull(),
  averagePrice: real('average_price'),
  imageUrl: text('image_url'),
});

export const categories = sqliteTable('categories', {
  id: text('id')
    .primaryKey()
    .$default(() => uuid4()),
  restaurantId: text('restaurant_id')
    .notNull()
    .references(() => restaurants.id),
  name: text('name').notNull(),
});

export const menuItems = sqliteTable('menu_items', {
  id: text('id')
    .primaryKey()
    .$default(() => uuid4()),
  categoryId: text('category_id').references(() => categories.id),
  restaurantId: text('restaurant_id').references(() => restaurants.id),
  name: text('name').notNull(),
  description: text('description').notNull(),
  price: real('price').notNull(),
  imageUrl: text('image_url'),
});

export const favorites = sqliteTable('favorites', {
  id: text('id')
    .primaryKey()
    .$default(() => uuid4()),
  userId: text('user_id').notNull(),
  restaurantId: text('restaurant_id').notNull(),
});

export const cart = sqliteTable('cart', {
  id: text('id')
    .primaryKey()
    .$default(() => uuid4()),
  userId: text('user_id'),
  menuItemId: text('menu_item_id').references(() => menuItems.id),
  quantity: integer('quantity').default(1),
  orderAmount: integer('order_amount').default(0),
});

export const users = sqliteTable('users', {
  id: text('id')
    .primaryKey()
    .$default(() => uuid4()),
  firstName: text('first_name', { length: 30 }).notNull(),
  lastName: text('last_name', { length: 30 }).notNull(),
  accountName: text('account_name', { length: 10 }).notNull().unique(),
  email: text('email').notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  phone: text('phone').notNull(),
  createdAt: text('created_at').default(sql`(strftime('%s', 'now'))`),
  avatar: text('avatar'),
  address: text('address').notNull(),
  cardNumber: text('cardNumber', { length: 16 }).notNull(),
});

export const orderStatuses = sqliteTable('order_statuses', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').unique(),
});

export const paymentMethods = sqliteTable('payment_methods', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: text('user_id').references(() => users.id),
  type: text('type'),
  details: text('details'),
});

export const deliveryAddresses = sqliteTable('delivery_addresses', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: text('user_id').references(() => users.id),
  address: text('address'),
  comment: text('comment'),
});

export const couriers = sqliteTable('couriers', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name'),
  phone: text('phone'),
});

export const orders = sqliteTable('orders', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: text('user_id').references(() => users.id),
  deliveryAddressId: integer('delivery_address_id').references(() => deliveryAddresses.id),
  restaurantId: text('restaurant_id').references(() => restaurants.id),
  // cartId: text('cart_id').references(() => cart.id),
  courierId: integer('courier_id').references(() => couriers.id),
  statusId: integer('status_id').references(() => orderStatuses.id),
  paymentMethodId: integer('payment_method_id').references(() => paymentMethods.id),
  orderDate: text('order_date').default(sql`(strftime('%s', 'now'))`),
});

export const reviews = sqliteTable('reviews', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  orderId: integer('order_id')
    .references(() => orders.id)
    .unique(),
  restaurantRating: integer('restaurant_rating'),
  deliveryRating: integer('delivery_rating'),
  comment: text('comment'),
  createdAt: text('created_at').default(sql`(strftime('%s', 'now'))`),
});
