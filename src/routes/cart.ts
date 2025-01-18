import { Hono } from 'hono';
import { CartController } from '../controllers/cartController';
import { AuthMiddleware } from '../middlewares/authMiddleware';

export const cartRoutes = new Hono();
const authMiddleware = new AuthMiddleware();
const cartController = new CartController();

// Add an item to the cart
cartRoutes.post('/', authMiddleware.checkAuthHeader,
  authMiddleware.validateAccessToken, cartController.addToCart);

// Get all cart items for the user
cartRoutes.get('/', authMiddleware.checkAuthHeader,
  authMiddleware.validateAccessToken, cartController.getCartItems);

// Update the quantity of a cart item
cartRoutes.put('/:cartItemId', authMiddleware.checkAuthHeader,
  authMiddleware.validateAccessToken, cartController.updateCartItem);

// Delete a cart item
cartRoutes.delete('/:cartItemId', authMiddleware.checkAuthHeader,
  authMiddleware.validateAccessToken, cartController.deleteCartItem);
