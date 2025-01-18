"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartController = void 0;
const cartService_1 = require("../services/cartService");
const db_1 = require("../lib/db");
const product_1 = require("../schemas/product");
const cartItem_1 = require("../schemas/cartItem");
const drizzle_orm_1 = require("drizzle-orm");
class CartController {
    constructor() {
        this.cartService = new cartService_1.CartService();
    }
    addToCart(c) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = c.get('user');
            const { productId, quantity } = yield c.req.json(); // Fixed quantity = 1
            try {
                const createdCartItem = yield db_1.db.transaction((tx) => __awaiter(this, void 0, void 0, function* () {
                    // Check if the product exists and has sufficient stock
                    const product = yield tx
                        .select()
                        .from(product_1.products)
                        .where((0, drizzle_orm_1.eq)(product_1.products.id, productId));
                    if (!product || product[0].quantity < quantity) {
                        throw new Error('Product is out of stock');
                    }
                    // Add item to the cart
                    const cartItem = yield tx
                        .insert(cartItem_1.cartItems)
                        .values({
                        user_id: user.id,
                        product_id: productId,
                        quantity: quantity, // Fixed quantity
                    })
                        .returning();
                    // Reduce the product quantity by 1
                    yield tx
                        .update(product_1.products)
                        .set({ quantity: (0, drizzle_orm_1.sql) `${product_1.products.quantity} - ${quantity}` })
                        .where((0, drizzle_orm_1.eq)(product_1.products.id, productId));
                    // Return the created cart item
                    return cartItem[0];
                }));
                return c.json({ message: 'Item added to cart', createdCartItem });
            }
            catch (error) {
                console.error('Error adding to cart:', error);
                return c.json({ message: 'Error adding to cart', error: error.message }, 500);
            }
        });
    }
    getCartItems(c) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = c.get('user');
            const cartItems = yield this.cartService.getCartItems(user.id);
            return c.json(cartItems);
        });
    }
    updateCartItem(c) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = c.get('user');
            const { cartItemId, quantity } = yield c.req.json();
            try {
                const updatedCartItem = yield db_1.db.transaction((tx) => __awaiter(this, void 0, void 0, function* () {
                    // Fetch the current cart item
                    const existingCartItem = yield tx
                        .select()
                        .from(cartItem_1.cartItems)
                        .where((0, drizzle_orm_1.eq)(cartItem_1.cartItems.id, cartItemId));
                    if (!existingCartItem) {
                        throw new Error('Cart item not found');
                    }
                    // Calculate the quantity difference
                    const quantityDifference = quantity - existingCartItem[0].quantity;
                    // Update the product quantity
                    yield tx
                        .update(product_1.products)
                        .set({
                        quantity: (0, drizzle_orm_1.sql) `${product_1.products.quantity} - ${quantityDifference}`,
                    })
                        .where((0, drizzle_orm_1.eq)(product_1.products.id, existingCartItem[0].product_id));
                    // Update the cart item
                    const updatedItem = yield tx
                        .update(cartItem_1.cartItems)
                        .set({ quantity })
                        .where((0, drizzle_orm_1.eq)(cartItem_1.cartItems.id, cartItemId))
                        .returning();
                    return updatedItem[0];
                }));
                return c.json({ message: 'Cart item updated', updatedCartItem });
            }
            catch (error) {
                console.error('Error updating cart item:', error);
                return c.json({ message: 'Error updating cart item', error: error.message }, 500);
            }
        });
    }
    // Delete cart item and adjust product quantity
    deleteCartItem(c) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = c.get('user');
            const cartItemId = +c.req.param();
            try {
                yield db_1.db.transaction((tx) => __awaiter(this, void 0, void 0, function* () {
                    // Fetch the cart item to be deleted
                    const cartItem = yield tx
                        .select()
                        .from(cartItem_1.cartItems)
                        .where((0, drizzle_orm_1.eq)(cartItem_1.cartItems.id, cartItemId));
                    if (!cartItem) {
                        throw new Error('Cart item not found');
                    }
                    // Restore the product quantity
                    yield tx
                        .update(product_1.products)
                        .set({
                        quantity: (0, drizzle_orm_1.sql) `${product_1.products.quantity} + ${cartItem[0].quantity}`,
                    })
                        .where((0, drizzle_orm_1.eq)(product_1.products.id, cartItem[0].product_id));
                    // Delete the cart item
                    yield tx.delete(cartItem_1.cartItems).where((0, drizzle_orm_1.eq)(cartItem_1.cartItems.id, cartItemId));
                }));
                return c.json({ message: 'Cart item deleted' });
            }
            catch (error) {
                console.error('Error deleting cart item:', error);
                return c.json({ message: 'Error deleting cart item', error: error.message }, 500);
            }
        });
    }
}
exports.CartController = CartController;
