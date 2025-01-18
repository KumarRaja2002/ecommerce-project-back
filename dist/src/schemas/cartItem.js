"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartItems = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const product_1 = require("../schemas/product");
const user_1 = require("../schemas/user"); // Assuming you have a `users` table schema.
exports.cartItems = (0, pg_core_1.pgTable)('cart_items', {
    id: (0, pg_core_1.serial)('id').primaryKey().notNull(), // Auto-incrementing ID
    user_id: (0, pg_core_1.integer)('user_id')
        .notNull()
        .references(() => user_1.users.id), // Reference to the `users` table
    product_id: (0, pg_core_1.integer)('product_id')
        .notNull()
        .references(() => product_1.products.id), // Reference to the `products` table
    quantity: (0, pg_core_1.integer)('quantity').notNull(), // Quantity of product in cart
    total_price: (0, pg_core_1.integer)('total_price'), // Total price for this cart item
    note: (0, pg_core_1.text)('note'), // Optional note for the cart item
});
