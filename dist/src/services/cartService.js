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
exports.CartService = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = require("../lib/db");
const cartItem_1 = require("../schemas/cartItem");
class CartService {
    addCartItem(userId, productId, quantity) {
        return __awaiter(this, void 0, void 0, function* () {
            return db_1.db
                .insert(cartItem_1.cartItems)
                .values({ user_id: userId, product_id: productId, quantity })
                .returning()
                .execute();
        });
    }
    getCartItems(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return db_1.db.select().from(cartItem_1.cartItems).where((0, drizzle_orm_1.eq)(cartItem_1.cartItems.user_id, userId));
        });
    }
    updateCartItem(userId, cartItemId, quantity) {
        return __awaiter(this, void 0, void 0, function* () {
            return db_1.db
                .update(cartItem_1.cartItems)
                .set({ quantity })
                .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(cartItem_1.cartItems.user_id, userId), (0, drizzle_orm_1.eq)(cartItem_1.cartItems.id, cartItemId)))
                .returning()
                .execute();
        });
    }
    deleteCartItem(userId, cartItemId) {
        return __awaiter(this, void 0, void 0, function* () {
            return db_1.db.delete(cartItem_1.cartItems).where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(cartItem_1.cartItems.user_id, userId), (0, drizzle_orm_1.eq)(cartItem_1.cartItems.id, cartItemId)));
        });
    }
}
exports.CartService = CartService;
