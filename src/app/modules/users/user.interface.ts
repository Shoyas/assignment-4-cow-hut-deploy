/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

export type IUserRoles = 'seller' | 'buyer' | 'admin';

export type IUser = {
  password: string;
  role: IUserRoles;
  name: {
    firstName: string;
    lastName: string;
  };
  phoneNumber: string;
  address: string;
  budget: number;
  income: number;
  id?: string;
};

export type UserModel = {
  isUserExist(
    phoneNumber: string
  ): Promise<Pick<IUser, 'phoneNumber' | 'password' | 'role' | 'id'>>;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
} & Model<IUser>;

// export type UserModel = Model<IUser, Record<string, unknown>>;

export type IUserFilter = {
  searchTerm: string;
};
