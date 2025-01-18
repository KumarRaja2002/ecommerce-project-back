import { pgTable, serial, text, boolean, integer, uniqueIndex } from 'drizzle-orm/pg-core';

export const products = pgTable('products', {
  id: serial('id').primaryKey().notNull(), // Auto-incrementing ID
  name: text('name').notNull(), // Product name
  price: integer('price').notNull(), // Price
  rating: integer('rating').default(0), // Rating (default 0)
  about: text('about').notNull(), // Product description
  quantity: integer('quantity').notNull(), // Quantity in stock
  available: boolean('available').default(true), // Availability status
  image_url: text('image_url'),
  category: text('category')
});

export type Product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert;
export type ProductTable = typeof products;
