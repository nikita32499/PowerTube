import { ResponseSuccessBoolean } from '../../lib/response.types';
import { TUser, TUserJwtData } from '../user.entities';

export type ResponseUserLogin = {
    user: {
        id: TUser['id'];
    };
};

export type ResponseUserRegister = ResponseUserLogin;

export type ResponseUserUpdateRole = ResponseSuccessBoolean;

export type ResponseUserUpdateEmail = ResponseSuccessBoolean;

export type ResponseUserResetPassword = ResponseSuccessBoolean;

export type ResponseUserDelete = ResponseSuccessBoolean;

export type ResponseUserValidateToken =
    | {
          success: false;
      }
    | {
          success: true;
          user: TUserJwtData;
      };
