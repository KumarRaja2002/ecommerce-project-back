import { CartService } from '../services/cartService';
import { Context } from 'hono';
import { db } from '../lib/db';
import { products } from '../schemas/product';
import { cartItems } from '../schemas/cartItem';
import { eq,sql } from 'drizzle-orm';
const cartService = new CartService();
export class CartController {
  

  async addToCart(c: Context) {
    const user = c.get('user');
    const { productId, quantity } = await c.req.json(); // Fixed quantity = 1
  
    try {
      const createdCartItem = await db.transaction(async (tx) => {
        // Check if the product exists and has sufficient stock
        const product = await tx
          .select()
          .from(products)
          .where(eq(products.id, productId));
  
        if (!product || product[0].quantity < quantity) {
          throw new Error('Product is out of stock');
        }
  
        // Retrieve product price
        const productPrice = product[0].price; // Assuming price is stored in the product table
  
        // Calculate total price
        const totalPrice = productPrice * quantity;
  
        // Add item to the cart
        const cartItem = await tx
          .insert(cartItems)
          .values({
            user_id: user.id,
            product_id: productId,
            quantity: quantity, // Fixed quantity
            total_price: totalPrice, // Store the total price in the cart item
          })
          .returning();
  
        // Reduce the product quantity by the purchased amount
        await tx
          .update(products)
          .set({ quantity: sql`${products.quantity} - ${quantity}` })
          .where(eq(products.id, productId));
  
        // Return the created cart item and total price
        return { cartItem: cartItem[0], totalPrice };
      });
  
      return c.json({ message: 'Item added to cart', createdCartItem });
    } catch (error) {
      console.error('Error adding to cart:', error);
      return c.json({ message: 'Error adding to cart', error: (error as Error).message }, 500);
    }
  }
  

  async getCartItems(c: Context) {
    const user = c.get('user');
    const cartItems = await cartService.getCartItems(user.id);
    return c.json(cartItems);
  }

  async updateCartItem(c: Context) {
    const user = c.get('user');
    const { cartItemId, quantity } = await c.req.json();

    try {
      const updatedCartItem = await db.transaction(async (tx) => {
        // Fetch the current cart item
        const existingCartItem = await tx
          .select()
          .from(cartItems)
          .where(eq(cartItems.id, cartItemId))

        if (!existingCartItem) {
          throw new Error('Cart item not found');
        }

        // Calculate the quantity difference
        const quantityDifference = quantity - existingCartItem[0].quantity;

        // Update the product quantity
        await tx
          .update(products)
          .set({
            quantity: sql`${products.quantity} - ${quantityDifference}`,
          })
          .where(eq(products.id, existingCartItem[0].product_id));

        // Update the cart item
        const updatedItem = await tx
          .update(cartItems)
          .set({ quantity })
          .where(eq(cartItems.id, cartItemId))
          .returning();

        return updatedItem[0];
      });

      return c.json({ message: 'Cart item updated', updatedCartItem });
    } catch (error) {
      console.error('Error updating cart item:', error);
      return c.json({ message: 'Error updating cart item', error: (error as Error).message }, 500);
    }
  }

  // Delete cart item and adjust product quantity
  async deleteCartItem(c: Context) {
    const user = c.get('user');
    const cartItemId = +c.req.param();

    try {
      await db.transaction(async (tx) => {
        // Fetch the cart item to be deleted
        const cartItem = await tx
          .select()
          .from(cartItems)
          .where(eq(cartItems.id, cartItemId))

        if (!cartItem) {
          throw new Error('Cart item not found');
        }

        // Restore the product quantity
        await tx
          .update(products)
          .set({
            quantity: sql`${products.quantity} + ${cartItem[0].quantity}`,
          })
          .where(eq(products.id, cartItem[0].product_id));

        // Delete the cart item
        await tx.delete(cartItems).where(eq(cartItems.id, cartItemId));
      });

      return c.json({ message: 'Cart item deleted' });
    } catch (error) {
      console.error('Error deleting cart item:', error);
      return c.json({ message: 'Error deleting cart item', error: (error as Error).message }, 500);
    }
  }
}
