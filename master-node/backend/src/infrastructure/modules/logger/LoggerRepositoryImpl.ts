import { Injectable } from '@nestjs/common';
import { LoggerRepository } from 'core/repository/logger/LoggerRepository';

@Injectable()
export class LoggerRepositoryImpl implements LoggerRepository {
    error(type: string, message: string, details?: string | object): void {
        console.debug(type, message, details);
        throw new Error('Method not implemented.');
    }
    info(type: string, message: string, details?: string | object): void {
        console.debug(type, message, details);
        throw new Error('Method not implemented.');
    }
    warn(type: string, message: string, details?: string | object): void {
        console.debug(type, message, details);
        throw new Error('Method not implemented.');
    }
    debug(type: string, message: string, details?: string | object): void {
        console.debug(type, message, details);
    }
    fatal: LoggerRepository['fatal'] = (
        type: string,
        message: string,
        details?: string | object,
    ) => {
        console.debug(type, message, details);
        throw new Error('Method not implemented.');
    };
}
