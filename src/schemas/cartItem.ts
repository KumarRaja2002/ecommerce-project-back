import { pgTable, serial, integer, text, foreignKey } from 'drizzle-orm/pg-core';
import { products } from '../schemas/product';
import { users } from '../schemas/user'; // Assuming you have a `users` table schema.

export const cartItems = pgTable(
  'cart_items',
  {
    id: serial('id').primaryKey().notNull(), // Auto-incrementing ID
    user_id: integer('user_id')
      .notNull()
      .references(() => users.id), // Reference to the `users` table
    product_id: integer('product_id')
      .notNull()
      .references(() => products.id), // Reference to the `products` table
    quantity: integer('quantity').notNull(), // Quantity of product in cart
    total_price: integer('total_price'), // Total price for this cart item
    note: text('note'), // Optional note for the cart item
  }
);

export type CartItem = typeof cartItems.$inferSelect;
export type NewCartItem = typeof cartItems.$inferInsert;
