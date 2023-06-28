import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import {
  IAdmin,
  ILoginAdmin,
  ILoginAdminResponse,
  IRefreshTokenResponse,
} from './admin.interface';
import { Admin } from './admin.model';

const createAdmin = async (user: IAdmin): Promise<IAdmin> => {
  const createAdmin = await Admin.create(user);
  if (!createAdmin) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create admin!');
  }

  return createAdmin;
};

const loginAdmin = async (
  payload: ILoginAdmin
): Promise<ILoginAdminResponse> => {
  const { phoneNumber, password } = payload;

  const isAdminExist = await Admin.isAdminExist(phoneNumber);

  if (!isAdminExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Admin does not exist');
  }

  if (
    isAdminExist.password &&
    !(await Admin.isPasswordMatched(password, isAdminExist?.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
  }

  // create access token  & refresh token
  const { phoneNumber: adminPhoneNumber, role, id } = isAdminExist;
  const accessToken = jwtHelpers.createToken(
    { adminPhoneNumber, role, id },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  const refreshToken = jwtHelpers.createToken(
    { adminPhoneNumber, role, id },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
    role,
    id,
  };
};
// Promise<IRefreshTokenResponse>

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  // verify token
  let verifiedToken = null;
  try {
    verifiedToken = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_secret as Secret
    );
  } catch (error) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid refresh token');
  }

  const { adminPhoneNumber } = verifiedToken;
  // checking delete admin's refresh token
  const isAdminExist = await Admin.isAdminExist(adminPhoneNumber);
  if (!isAdminExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Admin does not exist');
  }
  // Generate new access token
  const newAccessToken = jwtHelpers.createToken(
    { id: isAdminExist.id, role: isAdminExist.role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  return {
    accessToken: newAccessToken,
  };
};

export const AdminService = {
  createAdmin,
  loginAdmin,
  refreshToken,
};
