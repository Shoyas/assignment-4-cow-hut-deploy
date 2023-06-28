/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';
import { IUserRoles } from '../users/user.interface';

export type IAdmin = {
  phoneNumber: string;
  role: IUserRoles;
  password: string;
  name: {
    firstName: string;
    lastName: string;
  };
  address: string;
  id?: string;
};

export type ILoginAdmin = {
  phoneNumber: string;
  password: string;
};

export type ILoginAdminResponse = {
  accessToken: string;
  refreshToken?: string;
  role: string;
  id?: string;
  phoneNumber?: string;
};

export type IRefreshTokenResponse = {
  accessToken: string;
};

export type AdminModel = {
  isAdminExist(
    phoneNumber: string
  ): Promise<Pick<IAdmin, 'phoneNumber' | 'password' | 'role' | 'id'>>;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
} & Model<IAdmin>;

// export type AdminModel = Model<IAdmin, Record<string, unknown>>;
