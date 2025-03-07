import { sql } from 'drizzle-orm'
import { sqliteTable, text, real, integer } from 'drizzle-orm/sqlite-core'
import { v4 as uuid4 } from 'uuid'

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
  imageUrl: text('image_url')
})

export const menuItems = sqliteTable('menu_items', {
  id: text('id')
    .primaryKey()
    .$default(() => uuid4()),
  restaurantId: text('restaurant_id')
    .notNull()
    .references(() => restaurants.id, {
      onDelete: 'cascade'
    }),
  categoryId: text('category_id')
    .notNull()
    .references(() => categories.id, {
      onDelete: 'cascade'
    }),
  name: text('name').notNull(),
  description: text('description').notNull(),
  price: real('price').notNull(),
  imageUrl: text('image_url')
})

export const categories = sqliteTable('categories', {
  id: text('id')
    .primaryKey()
    .$default(() => uuid4()),
  restaurantId: text('restaurant_id')
    .notNull()
    .references(() => restaurants.id),
  name: text('name').notNull()
})

export const cart = sqliteTable('cart', {
  id: text('id')
    .primaryKey()
    .$default(() => uuid4()),
  userId: text('user_id')
    .notNull()
    .references(() => users.id),
  menuItemId: text('menu_item_id')
    .notNull()
    .references(() => menuItems.id),
  quantity: integer('quantity').default(1),
  orderAmount: integer('order_amount').default(0)
})

export const users = sqliteTable('users', {
  id: text('id')
    .primaryKey()
    .$default(() => uuid4()),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  passwordHash: text('password_hash').notNull()
})

export const favorites = sqliteTable('favorites', {
  id: text('id')
    .primaryKey()
    .$default(() => uuid4()),
  userId: text('user_id')
    .notNull()
    .references(() => users.id),
  restaurantId: text('restaurant_id')
    .notNull()
    .references(() => restaurants.id)
})

export const recentOrders = sqliteTable('recent_orders', {
  id: text('id')
    .primaryKey()
    .$default(() => uuid4()),
  userId: text('user_id')
    .notNull()
    .references(() => users.id),
  restaurantId: text('restaurant_id')
    .notNull()
    .references(() => restaurants.id),
  createdAt: text('created_at')
    .notNull()
    .default(sql`(strftime('%s', 'now'))`)
})
