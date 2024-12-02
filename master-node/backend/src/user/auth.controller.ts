import { AuthService } from 'auth/auth.service';
import { TUserJwtData } from 'shared-vpn-master';
import { UserService } from './user.service';

export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService,
    ) {}

    async login(login: string, password: string) {
        const user = await this.userService.getByLogin(login);
        if (!user) return null;

        const passwordValidate = await this.authService.checkPassword(
            password,
            user.password,
        );
        if (!passwordValidate) return null;

        await this.userService.updateLastAt(user.id);
        const userData: TUserJwtData = {
            userId: user.id,
        };

        const token = await this.authService.createToken(userData);

        return { user, token };
    }
}
