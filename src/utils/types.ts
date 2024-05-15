export type UserType = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  salt: string;
};

export type SignupUserReqBodyType = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role?: string;
};
export type LoginUserReqBodyType = {
  email: string;
  password: string;
};
export type UpdateUserReqBodyType = {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
};
export type RequestParamType = {
  id: string;
};
