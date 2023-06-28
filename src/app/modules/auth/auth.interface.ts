export type ILoginUser = {
  phoneNumber: string;
  password: string;
};

export type ILoginUserResponse = {
  accessToken: string;
  refreshToken?: string;
  id?: string;
  role?: string;
};

export type IRefreshTokenResponse = {
  accessToken: string;
  refreshToken?: string;
  id?: string;
  role?: string;
};
