import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../config';
import { ENUM_USER_ROLE } from '../../enums/user';
import ApiError from '../../errors/ApiError';
import { jwtHelpers } from '../../helpers/jwtHelpers';
import sendResponse from '../../shared/sendResponse';
import { Cow } from '../modules/cows/cow.model';
import { Order } from '../modules/order/order.model';

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
      // guard using role
      if (requiredRoles.length && !requiredRoles.includes(verifiedUser.role)) {
        throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden on you');
      }

      if (
        requiredRoles.includes(ENUM_USER_ROLE.BUYER) &&
        verifiedUser.role === ENUM_USER_ROLE.BUYER
      ) {
        const buyerId = verifiedUser.id;
        const order = await Order.find({ buyer: buyerId }).exec();
        console.log('Orders by buyer:', order);

        // res.status(httpStatus.OK).json({ order });
        // return;
        sendResponse(res, {
          statusCode: httpStatus.OK,
          success: true,
          message: `Your have placed ${order.length} order`,
          data: order,
        });
      }

      if (
        requiredRoles.includes(ENUM_USER_ROLE.SELLER) &&
        verifiedUser.role === ENUM_USER_ROLE.SELLER
      ) {
        const sellerId = verifiedUser.id;
        const orders = await Cow.find({ seller: sellerId }).exec();

        // if (!order || order.seller !== sellerId) {
        //   throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden');
        // }

        console.log('Order gets seller:', orders);
        // res.status(httpStatus.OK).json({ orders });
        // return;

        sendResponse(res, {
          statusCode: httpStatus.OK,
          success: true,
          message: `You got ${orders.length} order`,
          data: orders,
        });
      }

      next();
    } catch (error) {
      next(error);
    }
  };

export default auth;
