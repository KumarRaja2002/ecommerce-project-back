import { asc, desc, eq, sql } from 'drizzle-orm';
import { addSingleRecord } from '../dbClient/dbClient';
import { db } from '../lib/db'; // Drizzle configuration
import { NewProduct, Product, products } from '../schemas/product';

export class ProductService {
  public async findAll({ filters, sort }: { filters?: any; sort?: any }) {
    const query = db
      .select()
      .from(products);
  
    // Apply filters if provided
    if (filters) {
      query.where(sql`${sql.raw(filters)}`);
    }
  
    // Apply sorting if provided
    if (sort) {
      query.orderBy(sql`${sql.raw(sort)}`);
    }
  
    // Execute the query and return the results
    return query.execute();
  }
  
  
  async addProduct(newProductData: NewProduct){
    const addedProduct = await addSingleRecord<Product>(products, newProductData);
    return addedProduct;
  }

  async updateProductQuantity(productId: number, quantity: number) {
    return db.update(products).set({ quantity }).where(eq(products.id, productId));
  }

public async getSingleProduct(productId: number) {
  try {
    // Fetching a product by its ID
    const product = await db
      .select()
      .from(products)
      .where(eq(products.id, productId))
      .execute();

    if (product.length === 0) {
      throw new Error('Product not found');
    }

    return product[0]; // Return the first product, assuming there's only one match
  } catch (error) {
    throw new Error('Error fetching product');
  }
}

public async updateProductData(productId: number, updateData: Partial<Product>) {
  try {
    // Update the product in the database
    const updatedProduct = await db
      .update(products)
      .set(updateData)
      .where(eq(products.id, productId))
      .returning()
      .execute();

    if (updatedProduct.length === 0) {
      throw new Error('Product not found');
    }

    return updatedProduct[0];
  } catch (error) {
    throw new Error('Error updating product');
  }
}

public async deleteProduct(productId: number) {
  try {
    // Delete the product from the database
    const deletedProduct = await db
      .delete(products)
      .where(eq(products.id, productId))
      .returning()
      .execute();

    if (deletedProduct.length === 0) {
      throw new Error('Product not found');
    }

    return deletedProduct[0];
  } catch (error) {
    throw new Error('Error deleting product');
  }
}

}

