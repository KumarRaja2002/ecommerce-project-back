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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const otpService_1 = require("./otpService");
const userDataServiceProvider_1 = require("../services/userDataServiceProvider");
const userDataServiceProvider = new userDataServiceProvider_1.UserDataServiceProvider();
class UserService {
    constructor() {
        this.otpService = new otpService_1.OTPService();
    }
    sendForgotPasswordOTP(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield userDataServiceProvider.findUserByEmail(email);
            if (!user) {
                throw new Error('User with this email does not exist.');
            }
            const otp = this.otpService.generateOTP();
            yield this.otpService.sendOTP(email, otp);
            yield this.otpService.storeOTP(email, otp);
        });
    }
    resetPassword(email, otp, newPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            const isOTPValid = yield this.otpService.verifyOTP(email, otp);
            if (!isOTPValid) {
                throw new Error('Invalid or expired OTP.');
            }
            const hashedPassword = yield bcrypt_1.default.hash(newPassword, 10);
            const user = yield userDataServiceProvider.findUserByEmail(email);
            if (!user) {
                throw new Error('User not found.');
            }
            yield userDataServiceProvider.updateUserByEmail({
                password: hashedPassword,
                name: user.name,
                email: user.email,
                usertype: user.usertype
            }, email);
        });
    }
}
exports.UserService = UserService;
