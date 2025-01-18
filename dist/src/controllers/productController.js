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
exports.ProductController = void 0;
const filterHelper_1 = require("../helpers/filterHelper");
const sortHelper_1 = require("../helpers/sortHelper");
const productService_1 = require("../services/productService");
const productService = new productService_1.ProductService();
class ProductController {
    listProducts(c) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = c.req.query();
                const filters = filterHelper_1.filterHelper.getProductFilters(query);
                const sort = sortHelper_1.sortHelper.dynamicSort(query);
                // Fetch all products based on filters and sorting
                const products = yield productService.findAll({ filters, sort });
                // Return the fetched products
                return c.json({
                    message: "Products fetched successfully",
                    data: products,
                });
            }
            catch (error) {
                // Handle errors and provide a meaningful response
                console.error("Error fetching products:", error);
                return c.json({
                    message: "Failed to fetch products",
                    error: error.message,
                }, 500);
            }
        });
    }
    addProduct(c) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = c.get('user'); // Assume middleware sets `user`
            console.log(user);
            if (user.usertype !== 'ADMIN') {
                return c.json({ message: 'Only ADMINs can add products' }, 403);
            }
            const newProduct = yield c.req.json();
            const product = yield productService.addProduct(newProduct);
            return c.json({ message: 'Product added successfully', product });
        });
    }
    updateProductQuantity(c) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user } = c.get('user');
            if (user.usertype !== 'ADMIN') {
                return c.json({ message: 'Only ADMINs can update product quantities' }, 403);
            }
            const { productId, quantity } = yield c.req.json();
            const product = yield productService.updateProductQuantity(productId, quantity);
            return c.json({ message: 'Product quantity updated', product });
        });
    }
    getSingleProduct(c) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const productId = +c.req.param('productId'); // Get the productId from the URL parameter
                const product = yield productService.getSingleProduct(productId); // Fetch the product by ID
                return c.json({
                    message: 'Product fetched successfully',
                    data: product,
                });
            }
            catch (error) {
                return c.json({
                    message: error.message || 'Error fetching product',
                    status: 'error',
                });
            }
        });
    }
    // productController.ts
    updateProductData(c) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { user } = c.get('user');
                if (user.usertype !== 'ADMIN') {
                    return c.json({ message: 'Only ADMINs can update product data' }, 403);
                }
                const { productId, updateData } = yield c.req.json(); // Get the productId and data to update
                const updatedProduct = yield productService.updateProductData(productId, updateData);
                return c.json({
                    message: 'Product data updated successfully',
                    data: updatedProduct,
                });
            }
            catch (error) {
                return c.json({
                    message: error.message || 'Error updating product data',
                    status: 'error',
                });
            }
        });
    }
    // productController.ts
    deleteProduct(c) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { user } = c.get('user');
                if (user.usertype !== 'ADMIN') {
                    return c.json({ message: 'Only ADMINs can delete products' }, 403);
                }
                const { productId } = yield c.req.json(); // Get the productId to delete
                const deletedProduct = yield productService.deleteProduct(productId);
                return c.json({
                    message: 'Product deleted successfully',
                    data: deletedProduct,
                });
            }
            catch (error) {
                return c.json({
                    message: error.message || 'Error deleting product',
                    status: 'error',
                });
            }
        });
    }
}
exports.ProductController = ProductController;
