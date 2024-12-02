import { Injectable } from '@nestjs/common';
import { Config } from '_libs/config';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { SchemaUserJwtData, TUserJwtData } from 'shared-vpn-master';
@Injectable()
export class AuthService {
    async hashPassword(password: string): Promise<string> {
        const salt = await bcrypt.genSalt(12);

        return await bcrypt.hash(password, salt);
    }

    async checkPassword(password: string, hashPassword: string): Promise<boolean> {
        return await bcrypt.compare(password, hashPassword);
    }

    async createToken(payload: TUserJwtData): Promise<string> {
        const token = jwt.sign(payload, Config.JWT_SECRET_KEY, {
            algorithm: 'HS512',
            expiresIn: '7d',
        });
        return token;
    }
    validateToken(token: string): TUserJwtData | false {
        const payload = jwt.verify(token, Config.JWT_SECRET_KEY);
        const result = SchemaUserJwtData.safeParse(payload);

        if (!result.success) return false;
        return result.data;
    }
}
