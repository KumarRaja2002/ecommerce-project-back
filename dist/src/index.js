"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_server_1 = require("@hono/node-server");
const hono_1 = require("hono");
const appConfig_1 = __importDefault(require("../config/appConfig"));
const cors_1 = require("hono/cors");
const logger_1 = require("hono/logger");
const product_1 = require("./routes/product");
const user_1 = require("./routes/user");
const cart_1 = require("./routes/cart");
const app = new hono_1.Hono();
app.use("*", (0, cors_1.cors)());
app.use((0, logger_1.logger)());
app.get('/', (c) => {
    return c.text('Hello Hono!');
});
app.route('/' + appConfig_1.default.app.api_version + '/products', product_1.productRoutes);
app.route('/' + appConfig_1.default.app.api_version + '/users', user_1.userRoutes);
app.route('/' + appConfig_1.default.app.api_version + '/carts', cart_1.cartRoutes);
const port = appConfig_1.default.app.port;
console.log(`Server is running on port ${port}`);
app.onError((err, c) => {
    c.status(err.status || 500);
    return c.json({
        success: false,
        status: err.status || 500,
        message: err.message || 'Something went wrong',
        errors: err.errData || null
    });
});
(0, node_server_1.serve)({
    fetch: app.fetch,
    port
});
