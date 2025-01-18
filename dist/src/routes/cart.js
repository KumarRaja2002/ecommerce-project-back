"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartRoutes = void 0;
const hono_1 = require("hono");
const cartController_1 = require("../controllers/cartController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
exports.cartRoutes = new hono_1.Hono();
const authMiddleware = new authMiddleware_1.AuthMiddleware();
const cartController = new cartController_1.CartController();
// Add an item to the cart
exports.cartRoutes.post('/', authMiddleware.checkAuthHeader, authMiddleware.validateAccessToken, cartController.addToCart);
// Get all cart items for the user
exports.cartRoutes.get('/', authMiddleware.checkAuthHeader, authMiddleware.validateAccessToken, cartController.getCartItems);
// Update the quantity of a cart item
exports.cartRoutes.put('/:cartItemId', authMiddleware.checkAuthHeader, authMiddleware.validateAccessToken, cartController.updateCartItem);
// Delete a cart item
exports.cartRoutes.delete('/:cartItemId', authMiddleware.checkAuthHeader, authMiddleware.validateAccessToken, cartController.deleteCartItem);
