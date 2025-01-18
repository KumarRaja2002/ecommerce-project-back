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
exports.AuthMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userDataServiceProvider_1 = require("../services/userDataServiceProvider");
const appConfig_1 = __importDefault(require("../../config/appConfig"));
const unauthorisedException_1 = require("../exceptions/unauthorisedException");
const forbiddenException_1 = require("../exceptions/forbiddenException");
const userDataServiceProvider = new userDataServiceProvider_1.UserDataServiceProvider();
class AuthMiddleware {
    checkAuthHeader(c, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const authHeader = c.req.header("authorization");
            if (!c.req.header("authorization")) {
                throw new unauthorisedException_1.UnauthorisedException("No Authorization Token");
            }
            yield next();
        });
    }
    ;
    validateAccessToken(c, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const accessToken = c.req.header("authorization") || "";
                if (accessToken) {
                    const decodedToken = yield jsonwebtoken_1.default.decode(accessToken);
                    if (!decodedToken) {
                        throw new forbiddenException_1.ForbiddenException('Forbidden - Invalid Token');
                    }
                    const user = yield userDataServiceProvider.findUserById(decodedToken.id);
                    if (user) {
                        const tokenSecret = appConfig_1.default.jwt.token_secret + user.password;
                        yield jsonwebtoken_1.default.verify(accessToken, tokenSecret);
                        c.set("user", user);
                        yield next();
                    }
                    else {
                        throw new forbiddenException_1.ForbiddenException('Access Denied - User not found');
                    }
                }
                else {
                    throw new forbiddenException_1.ForbiddenException('Forbidden - Token is required');
                }
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.AuthMiddleware = AuthMiddleware;
