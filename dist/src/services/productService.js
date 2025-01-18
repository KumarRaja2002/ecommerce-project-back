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
exports.ProductService = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const dbClient_1 = require("../dbClient/dbClient");
const db_1 = require("../lib/db"); // Drizzle configuration
const product_1 = require("../schemas/product");
class ProductService {
    findAll(_a) {
        return __awaiter(this, arguments, void 0, function* ({ filters, sort }) {
            const query = db_1.db
                .select()
                .from(product_1.products);
            // Apply filters if provided
            if (filters) {
                query.where((0, drizzle_orm_1.sql) `${drizzle_orm_1.sql.raw(filters)}`);
            }
            // Apply sorting if provided
            if (sort) {
                query.orderBy((0, drizzle_orm_1.sql) `${drizzle_orm_1.sql.raw(sort)}`);
            }
            // Execute the query and return the results
            return query.execute();
        });
    }
    addProduct(newProductData) {
        return __awaiter(this, void 0, void 0, function* () {
            const addedProduct = yield (0, dbClient_1.addSingleRecord)(product_1.products, newProductData);
            return addedProduct;
        });
    }
    updateProductQuantity(productId, quantity) {
        return __awaiter(this, void 0, void 0, function* () {
            return db_1.db.update(product_1.products).set({ quantity }).where((0, drizzle_orm_1.eq)(product_1.products.id, productId));
        });
    }
    getSingleProduct(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Fetching a product by its ID
                const product = yield db_1.db
                    .select()
                    .from(product_1.products)
                    .where((0, drizzle_orm_1.eq)(product_1.products.id, productId))
                    .execute();
                if (product.length === 0) {
                    throw new Error('Product not found');
                }
                return product[0]; // Return the first product, assuming there's only one match
            }
            catch (error) {
                throw new Error('Error fetching product');
            }
        });
    }
    updateProductData(productId, updateData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Update the product in the database
                const updatedProduct = yield db_1.db
                    .update(product_1.products)
                    .set(updateData)
                    .where((0, drizzle_orm_1.eq)(product_1.products.id, productId))
                    .returning()
                    .execute();
                if (updatedProduct.length === 0) {
                    throw new Error('Product not found');
                }
                return updatedProduct[0];
            }
            catch (error) {
                throw new Error('Error updating product');
            }
        });
    }
    deleteProduct(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Delete the product from the database
                const deletedProduct = yield db_1.db
                    .delete(product_1.products)
                    .where((0, drizzle_orm_1.eq)(product_1.products.id, productId))
                    .returning()
                    .execute();
                if (deletedProduct.length === 0) {
                    throw new Error('Product not found');
                }
                return deletedProduct[0];
            }
            catch (error) {
                throw new Error('Error deleting product');
            }
        });
    }
}
exports.ProductService = ProductService;
