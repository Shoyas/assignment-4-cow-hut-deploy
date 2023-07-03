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
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../config"));
const user_1 = require("../../enums/user");
const ApiError_1 = __importDefault(require("../../errors/ApiError"));
const jwtHelpers_1 = require("../../helpers/jwtHelpers");
const sendResponse_1 = __importDefault(require("../../shared/sendResponse"));
const cow_model_1 = require("../modules/cows/cow.model");
const order_model_1 = require("../modules/order/order.model");
/*
const auth =
  (...requiredRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // get authorization token
      const token = req.headers.authorization;
      if (!token) {
        throw new ApiError(
          httpStatus.UNAUTHORIZED,
          'You are not authorized person'
        );
      }
      // verify token
      let verifiedUser = null;

      verifiedUser = jwtHelpers.verifyToken(token, config.jwt.secret as Secret);
      req.user = verifiedUser;
      console.log('verifiedUser: ',verifiedUser)
      // gard using role
      if (requiredRoles.length && !requiredRoles.includes(verifiedUser.role)) {
        throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden on you');
      }
      next();
    } catch (error) {
      next(error);
    }
  };

  */
// Researching for order
const auth = (...requiredRoles) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // get authorization token
        const token = req.headers.authorization;
        if (!token) {
            throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'You are not authorized person');
        }
        // verify token
        let verifiedUser = null;
        verifiedUser = jwtHelpers_1.jwtHelpers.verifyToken(token, config_1.default.jwt.secret);
        req.user = verifiedUser;
        // guard using role
        if (requiredRoles.length && !requiredRoles.includes(verifiedUser.role)) {
            throw new ApiError_1.default(http_status_1.default.FORBIDDEN, 'Forbidden on you');
        }
        if (requiredRoles.includes(user_1.ENUM_USER_ROLE.BUYER) &&
            verifiedUser.role === user_1.ENUM_USER_ROLE.BUYER) {
            const buyerId = verifiedUser.id;
            const order = yield order_model_1.Order.find({ buyer: buyerId }).exec();
            console.log('Orders by buyer:', order);
            // res.status(httpStatus.OK).json({ order });
            // return;
            (0, sendResponse_1.default)(res, {
                statusCode: http_status_1.default.OK,
                success: true,
                message: `Your have placed ${order.length} order`,
                data: order,
            });
        }
        if (requiredRoles.includes(user_1.ENUM_USER_ROLE.SELLER) &&
            verifiedUser.role === user_1.ENUM_USER_ROLE.SELLER) {
            const sellerId = verifiedUser.id;
            const orders = yield cow_model_1.Cow.find({ seller: sellerId }).exec();
            // if (!order || order.seller !== sellerId) {
            //   throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden');
            // }
            console.log('Order gets seller:', orders);
            // res.status(httpStatus.OK).json({ orders });
            // return;
            (0, sendResponse_1.default)(res, {
                statusCode: http_status_1.default.OK,
                success: true,
                message: `You got ${orders.length} order`,
                data: orders,
            });
        }
        next();
    }
    catch (error) {
        next(error);
    }
});
exports.default = auth;
