import { and, eq } from 'drizzle-orm';
import { db } from '../lib/db';
import { cartItems } from '../schemas/cartItem';

export class CartService {
  async addCartItem(userId: number, productId: number, quantity: number) {
    return db
      .insert(cartItems)
      .values({ user_id: userId, product_id: productId, quantity })
      .returning()
      .execute();
  }

  async getCartItems(userId: number) {
    return db.select().from(cartItems).where(eq(cartItems.user_id, userId));
  }

  async updateCartItem(userId: number, cartItemId: number, quantity: number) {
    return db
      .update(cartItems)
      .set({ quantity })
      .where(
        and(
          eq(cartItems.user_id, userId),
          eq(cartItems.id, cartItemId)
        )
      )
      .returning()
      .execute();
  }

  async deleteCartItem(userId: number, cartItemId: number) {
    return db.delete(cartItems).where(
      and(
        eq(cartItems.user_id, userId),
        eq(cartItems.id, cartItemId)
      )
    );
  }
}
