"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const bcrypt = __importStar(require("bcrypt"));
const userDataServiceProvider_1 = require("../services/userDataServiceProvider"); // Assuming your service provider is set up
const responseHelper_1 = require("../helpers/responseHelper"); // Helper for sending responses
const resourseAlreadyExistsException_1 = require("../exceptions/resourseAlreadyExistsException"); // Custom exceptions
const unauthorisedException_1 = require("../exceptions/unauthorisedException");
const notFounException_1 = require("../exceptions/notFounException");
const appHelper_1 = require("../helpers/appHelper");
const userService_1 = require("../services/userService");
const userDataServiceProvider = new userDataServiceProvider_1.UserDataServiceProvider();
class UserController {
    constructor() {
        // Sign Up for customers and admins
        this.userService = new userService_1.UserService();
        // Helper function to generate auth tokens
    }
    customerSignUp(c) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const reqData = yield c.req.json();
                // Check if the email already exists
                const existedUser = yield userDataServiceProvider.findUserByEmail(reqData.email);
                if (existedUser) {
                    throw new resourseAlreadyExistsException_1.ResourceAlreadyExistsException("email", "Email already exists.");
                }
                // Default usertype is 'customer'
                reqData.usertype = "customer";
                // Create the customer user
                const userData = yield userDataServiceProvider.create(reqData);
                const { password } = userData, userDataWithoutPassword = __rest(userData, ["password"]);
                return responseHelper_1.ResponseHelper.sendSuccessResponse(c, 200, "Customer registered successfully", userDataWithoutPassword);
            }
            catch (error) {
                throw error;
            }
        });
    }
    // Create Admin (admin only)
    createAdmin(c) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const reqData = yield c.req.json();
                // Check if the email already exists
                const existedUser = yield userDataServiceProvider.findUserByEmail(reqData.email);
                if (existedUser) {
                    throw new resourseAlreadyExistsException_1.ResourceAlreadyExistsException("email", "Email already exists.");
                }
                // Get the logged-in user from context
                const loggedInUser = c.get("user");
                console.log(loggedInUser);
                // Only admins are allowed to create other admins
                if (loggedInUser.usertype !== "ADMIN") {
                    throw new unauthorisedException_1.UnauthorisedException("Only admins can create new admins.");
                }
                // Set usertype to 'admin'
                reqData.usertype = "ADMIN";
                // Create the new admin user
                const userData = yield userDataServiceProvider.create(reqData);
                const { password } = userData, userDataWithoutPassword = __rest(userData, ["password"]);
                return responseHelper_1.ResponseHelper.sendSuccessResponse(c, 200, "Admin created successfully", userDataWithoutPassword);
            }
            catch (error) {
                throw error;
            }
        });
    }
    // Sign In for customers and admins
    signIn(c) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const reqData = yield c.req.json();
                const userData = yield userDataServiceProvider.findUserByEmail(reqData.email);
                if (!userData) {
                    throw new unauthorisedException_1.UnauthorisedException("Invalid credentials.");
                }
                const matchPassword = yield bcrypt.compare(reqData.password, userData.password);
                if (!matchPassword) {
                    throw new unauthorisedException_1.UnauthorisedException("Invalid credentials.");
                }
                const { token, refreshToken } = yield (0, appHelper_1.getUserAuthTokens)(userData);
                const { password } = userData, userDataWithoutPassword = __rest(userData, ["password"]);
                let response = {
                    user_details: userDataWithoutPassword,
                    access_token: token,
                    refresh_token: refreshToken,
                };
                return responseHelper_1.ResponseHelper.sendSuccessResponse(c, 200, "User logged in successfully", response);
            }
            catch (error) {
                throw error;
            }
        });
    }
    // Get User Profile (either for admin or customer)
    getProfile(c) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = c.get("user"); // Get logged-in user from context
                const userData = yield userDataServiceProvider.findUserById(user.id);
                if (!userData) {
                    throw new notFounException_1.NotFoundException("User not found.");
                }
                delete userData.password; // Exclude password in response
                return responseHelper_1.ResponseHelper.sendSuccessResponse(c, 200, "User profile fetched successfully", userData);
            }
            catch (error) {
                throw error;
            }
        });
    }
    // Update User Account (admins can update any user, customers can only update their own)
    update(c) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = +c.req.param("id");
                const reqData = yield c.req.json();
                const userData = yield userDataServiceProvider.findUserById(userId);
                if (!userData) {
                    throw new notFounException_1.NotFoundException("User not found.");
                }
                // Check if the logged-in user is an admin or is updating their own profile
                const loggedInUser = c.get("user");
                console.log(loggedInUser);
                if (loggedInUser.id !== userId) {
                    throw new unauthorisedException_1.UnauthorisedException("You are not authorized to update this user's details.");
                }
                const emailExist = yield userDataServiceProvider.findUserByEmail(reqData.email);
                if (emailExist && emailExist.id !== userId) {
                    throw new resourseAlreadyExistsException_1.ResourceAlreadyExistsException("email", "Email already exists.");
                }
                yield userDataServiceProvider.updateUserById(reqData, userId);
                return responseHelper_1.ResponseHelper.sendSuccessResponse(c, 200, "User account updated successfully.");
            }
            catch (error) {
                throw error;
            }
        });
    }
    // Delete User Account (admins can delete any user, customers can only delete their own)
    delete(c) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = +c.req.param("id");
                const userData = yield userDataServiceProvider.findUserById(userId);
                if (!userData) {
                    throw new notFounException_1.NotFoundException("User not found.");
                }
                const loggedInUser = c.get("user");
                if (loggedInUser.id !== userId) {
                    throw new unauthorisedException_1.UnauthorisedException("You are not authorized to delete this user's account.");
                }
                yield userDataServiceProvider.deleteUserById(userId);
                return responseHelper_1.ResponseHelper.sendSuccessResponse(c, 200, "User account deleted successfully.");
            }
            catch (error) {
                throw error;
            }
        });
    }
    forgotPassword(c) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email } = yield c.req.json();
                if (!email) {
                    return responseHelper_1.ResponseHelper.sendErrorResponse(c, 400, 'Email is required.');
                }
                yield this.userService.sendForgotPasswordOTP(email);
                ;
                return responseHelper_1.ResponseHelper.sendSuccessResponse(c, 200, 'OTP sent successfully.');
            }
            catch (error) {
                return responseHelper_1.ResponseHelper.sendErrorResponse(c, 500, error.message);
            }
        });
    }
    resetPassword(c) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, otp, newPassword } = yield c.req.json();
                if (!email || !otp || !newPassword) {
                    return responseHelper_1.ResponseHelper.sendErrorResponse(c, 400, 'Email, OTP, and new password are required.');
                }
                yield this.userService.resetPassword(email, otp, newPassword);
                return responseHelper_1.ResponseHelper.sendSuccessResponse(c, 200, 'Password reset successfully.');
            }
            catch (error) {
                return responseHelper_1.ResponseHelper.sendErrorResponse(c, 500, error.message);
            }
        });
    }
}
exports.UserController = UserController;
