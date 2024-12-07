import * as bcrypt from 'bcrypt';
import { User } from 'core/entities/user';
import { AuthRepository } from 'core/repository/auth/AuthRepository.types';
import * as jwt from 'jsonwebtoken';
import { EnumUserRole, TUserJwtData } from 'core/types/user.entities';
import { Config } from 'infrastructure/libs/config';


export class AuthRepositoryImpl implements AuthRepository {
    async comparePassword(password: string, hash: string): Promise<boolean> {
        return await bcrypt.compare(password, hash);
    }
    async cryptPassword(password: string): Promise<string> {
        const salt = await bcrypt.genSalt(12);
        return await bcrypt.hash(password, salt);
    }

    async createUserToken(data: TUserJwtData): Promise<string> {
        return jwt.sign(data, Config.JWT_SECRET_KEY, { expiresIn: '24h', algorithm: "RS256" });
    }

    validateToken: AuthRepository['validateToken'] = (token: string) => {
        try {
            const decoded = jwt.verify(token, Config.JWT_SECRET_KEY, { complete: true });
            return decoded.payload as TUserJwtData;
        } catch {
            return null;
        }
    }





}

