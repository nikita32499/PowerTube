import { TUser } from '../user.entities';

export type RequestUserRegister =
    | {
          type: 'login'; // при переходе на логин и пароль
          uid: string;
          login: string;
          password: string;
          email: string;
      }
    | {
          type: 'uid'; // Генерация на стороне сервераа
      };

export type RequestUserLogin =
    | {
          type: 'login';
          login: string;
          password: string;
      }
    | {
          type: 'uid';
          id: string;
      };

export type RequestUserUpdateRole = {
    role: Pick<TUser, 'role'>;
    id: TUser['id'];
};
export type RequestUserUpdateEmail = {
    email: Pick<TUser, 'email'>;
    id: TUser['id'];
};

export type RequestUserResetPassword = {
    login: string;
    id: TUser['id'];
};

export type RequestUserDelete = {
    id: TUser['id'];
};

export type RequestUserValidateToken = {
    token: string;
};
