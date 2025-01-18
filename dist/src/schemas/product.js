"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.products = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
exports.products = (0, pg_core_1.pgTable)('products', {
    id: (0, pg_core_1.serial)('id').primaryKey().notNull(), // Auto-incrementing ID
    name: (0, pg_core_1.text)('name').notNull(), // Product name
    price: (0, pg_core_1.integer)('price').notNull(), // Price
    rating: (0, pg_core_1.integer)('rating').default(0), // Rating (default 0)
    about: (0, pg_core_1.text)('about').notNull(), // Product description
    quantity: (0, pg_core_1.integer)('quantity').notNull(), // Quantity in stock
    available: (0, pg_core_1.boolean)('available').default(true), // Availability status
    image_url: (0, pg_core_1.text)('image_url'),
    category: (0, pg_core_1.text)('category')
});
