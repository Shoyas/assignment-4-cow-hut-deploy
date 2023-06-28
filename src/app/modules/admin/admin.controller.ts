import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import config from '../../../config';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { ILoginAdminResponse, IRefreshTokenResponse } from './admin.interface';
import { AdminService } from './admin.service';

const createAdmin: RequestHandler = catchAsync(async (req, res) => {
  const user = req.body;
  const result = await AdminService.createAdmin(user);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin is created successfully!',
    data: result,
  });
});

const loginAdmin: RequestHandler = catchAsync(async (req, res) => {
  // console.log(req.cookies, 'cookie');
  const { ...loginData } = req.body;
  const result = await AdminService.loginAdmin(loginData);
  const { refreshToken, role, id, accessToken } = result;
  //   console.log('With refresh token: ', refreshToken, role, id);
  // set refresh cookie
  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
    role: role,
    id: id,
  };
  res.cookie('refreshToken', refreshToken, cookieOptions);

  sendResponse<ILoginAdminResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin login successfully!',
    data: { role, id, accessToken },
  });
});

const refreshToken: RequestHandler = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;
  const result = await AdminService.refreshToken(refreshToken);

  // set refresh cookie
  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };
  res.cookie('refreshToken', refreshToken, cookieOptions);

  sendResponse<IRefreshTokenResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin login successfully!',
    data: result,
  });
});

export const AdminController = {
  createAdmin,
  loginAdmin,
  refreshToken,
};
