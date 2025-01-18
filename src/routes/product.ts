import { Hono } from 'hono';
import { ProductController } from '../controllers/productController';
import { AuthMiddleware } from '../middlewares/authMiddleware';

export const productRoutes = new Hono();
const authMiddleware = new AuthMiddleware();
const productsController = new ProductController();

productRoutes.get('/:productId', productsController.getSingleProduct)
productRoutes.get('/', productsController.listProducts)
productRoutes.post('/', authMiddleware.checkAuthHeader,
  authMiddleware.validateAccessToken, productsController.addProduct)
productRoutes.put('/:productId', authMiddleware.checkAuthHeader,
  authMiddleware.validateAccessToken, productsController.updateProductQuantity)
productRoutes.delete('/:productId', authMiddleware.checkAuthHeader,
  authMiddleware.validateAccessToken, productsController.deleteProduct)
productRoutes.put('/:productId', authMiddleware.checkAuthHeader,
  authMiddleware.validateAccessToken, productsController.updateProductData)