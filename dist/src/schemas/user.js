"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.users = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
exports.users = (0, pg_core_1.pgTable)('users', {
    id: (0, pg_core_1.serial)('id').primaryKey().notNull(), // Auto-incrementing ID
    name: (0, pg_core_1.varchar)('name', { length: 256 }).notNull(), // Name with max length 256
    mobile_number: (0, pg_core_1.varchar)('mobile_number', { length: 15 }), // Unique mobile number
    email: (0, pg_core_1.varchar)('email', { length: 256 }).notNull(), // Email
    usertype: (0, pg_core_1.text)('usertype').notNull(), // User type (admin or customer)
    password: (0, pg_core_1.varchar)('password', { length: 256 }).notNull(),
}, (table) => {
    return {
        mobileNumberIdx: (0, pg_core_1.uniqueIndex)('mobile_number_idx').on(table.mobile_number), // Unique index on mobile number
    };
});
