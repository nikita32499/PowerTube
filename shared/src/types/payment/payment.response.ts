import { ResponseSuccessBoolean } from '../../lib/response.types';

export type ResponsePaymentStart = {
    link: string;
}; //TODO:неизвестный ответ

export type ResponsePaymentCancel = ResponseSuccessBoolean;
