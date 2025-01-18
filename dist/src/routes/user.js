"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const hono_1 = require("hono");
const userController_1 = require("../controllers/userController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const userController = new userController_1.UserController();
const authMiddleware = new authMiddleware_1.AuthMiddleware();
exports.userRoutes = new hono_1.Hono();
// Customer Sign Up Route
exports.userRoutes.post('/signup', userController.customerSignUp.bind(userController));
// Admin Sign Up Route (Create Admin)
exports.userRoutes.post('/create-admin', authMiddleware.checkAuthHeader, authMiddleware.validateAccessToken, userController.createAdmin.bind(userController));
// Sign In Route
exports.userRoutes.post('/signin', userController.signIn.bind(userController));
// Get User by ID Route
exports.userRoutes.get('/:id', userController.getProfile.bind(userController));
// Update User Route (Protected)
exports.userRoutes.patch('/:id', authMiddleware.checkAuthHeader, authMiddleware.validateAccessToken, userController.update.bind(userController));
// Delete User Route (Protected)
exports.userRoutes.delete('/:id', authMiddleware.checkAuthHeader, authMiddleware.validateAccessToken, userController.delete.bind(userController));
// Get User Profile (Protected)
exports.userRoutes.get('/profile', authMiddleware.checkAuthHeader, authMiddleware.validateAccessToken, userController.getProfile.bind(userController));
exports.userRoutes.post('/forgot-password', userController.forgotPassword.bind(userController));
exports.userRoutes.post('/reset-password', userController.resetPassword.bind(userController));
