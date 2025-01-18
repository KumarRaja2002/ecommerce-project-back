import { filterHelper } from '../helpers/filterHelper';
import { sortHelper } from '../helpers/sortHelper';
import { ProductService } from '../services/productService';
import { Context } from 'hono';
const productService = new ProductService()
export class ProductController {
 
  public async listProducts(c: Context) {
    try {
      const query = c.req.query();
  
      const filters = filterHelper.getProductFilters(query);
      const sort = sortHelper.dynamicSort(query);
  
      // Fetch all products based on filters and sorting
      const products = await productService.findAll({ filters, sort });
  
      // Return the fetched products
      return c.json({
        message: "Products fetched successfully",
        data: products,
      });
    } catch (error) {
      // Handle errors and provide a meaningful response
      console.error("Error fetching products:", error);
      return c.json(
        {
          message: "Failed to fetch products",
          error: (error as Error).message,
        },
        500
      );
    }
  }

  async addProduct(c: Context) {
    const user  = c.get('user'); // Assume middleware sets `user`
    console.log(user)
    if (user.usertype !== 'ADMIN') {
      return c.json({ message: 'Only ADMINs can add products' }, 403);
    }

    const newProduct = await c.req.json();
    const product = await productService.addProduct(newProduct);
    return c.json({ message: 'Product added successfully', product });
  }

  async updateProductQuantity(c: Context) {
    const { user } = c.get('user');
    if (user.usertype !== 'ADMIN') {
      return c.json({ message: 'Only ADMINs can update product quantities' }, 403);
    }

    const { productId, quantity } = await c.req.json();
    const product = await productService.updateProductQuantity(productId, quantity);
    return c.json({ message: 'Product quantity updated', product });
  }

  async getSingleProduct(c: Context) {
    try {
      const  productId  = +c.req.param('productId'); // Get the productId from the URL parameter
      const product = await productService.getSingleProduct(productId); // Fetch the product by ID
  
      return c.json({
        message: 'Product fetched successfully',
        data: product,
      });
    } catch (error) {
      return c.json({
        message: (error as Error).message || 'Error fetching product',
        status: 'error',
      });
    }
  }

  // productController.ts

async updateProductData(c: Context) {
  try {
    const { user } = c.get('user');
    if (user.usertype !== 'ADMIN') {
      return c.json({ message: 'Only ADMINs can update product data' }, 403);
    }

    const { productId, updateData } = await c.req.json(); // Get the productId and data to update
    const updatedProduct = await productService.updateProductData(productId, updateData);

    return c.json({
      message: 'Product data updated successfully',
      data: updatedProduct,
    });
  } catch (error) {
    return c.json({
      message: (error as Error).message || 'Error updating product data',
      status: 'error',
    });
  }
}

// productController.ts

async deleteProduct(c: Context) {
  try {
    const { user } = c.get('user');
    if (user.usertype !== 'ADMIN') {
      return c.json({ message: 'Only ADMINs can delete products' }, 403);
    }

    const { productId } = await c.req.json(); // Get the productId to delete
    const deletedProduct = await productService.deleteProduct(productId);

    return c.json({
      message: 'Product deleted successfully',
      data: deletedProduct,
    });
  } catch (error) {
    return c.json({
      message: (error as Error).message || 'Error deleting product',
      status: 'error',
    });
  }
}


}
