export enum EnumPaymentStatus {
    PENDING = 'pending',
    COMPLETED = 'completed',
    FAILED = 'failed',
    CANCELLED = 'cancelled',
}

export enum EnumPaymentCurrency {
    RUB = 'RUB',
    // BTC = 'BTC',
    // XMR = 'XMR',
    // USDT = 'USDT',
}

export enum EnumEnumPaymentType {
    CARD = 'card',
    SBP = 'sbp',
    CRYPTO = 'crypto',
}

export enum EnumSubscriptionStatus {
    ACTIVE = 'active',
    INACTIVE = 'inactive',
    CANCELLED = 'cancelled',
    EXPIRED = 'expired',
    TRIALING = 'trialing',
}

// Тип для описания валюты
export type TPaymentMethod = {
    currency: EnumPaymentCurrency.RUB;
    type: EnumEnumPaymentType.CARD | EnumEnumPaymentType.SBP;
};
// | {
//       type: EnumEnumPaymentType.CRYPTO;
//       currency:
//           | EnumPaymentCurrency.BTC
//           | EnumPaymentCurrency.XMR
//           | EnumPaymentCurrency.USDT;
//   };
// export enum EnumSubscription
// Тип для описания периодов подписки

export enum EnumSubscriptionPeriod {
    Month1 = 'Month1',
    Month3 = 'Month3',
    Month6 = 'Month6',
    Year1 = 'Eear1',
}

export type TSubscriptionVariants =
    | {
          period: EnumSubscriptionPeriod.Month1;
          price: {
              [EnumPaymentCurrency.RUB]: 180;
          };
      }
    | {
          period: EnumSubscriptionPeriod.Month3;
          price: {
              [EnumPaymentCurrency.RUB]: 480;
          };
      }
    | {
          period: EnumSubscriptionPeriod.Month6;
          price: {
              [EnumPaymentCurrency.RUB]: 760;
          };
      }
    | {
          period: EnumSubscriptionPeriod.Year1;
          price: {
              [EnumPaymentCurrency.RUB]: 1080;
          };
      };
export type TTrialPeriod = {
    duration: 'Day1';
};

// Тип для отдельной оплаты подписки
export type TPayment<D extends object = object> = {
    id: number; // Уникальный идентификатор оплаты
    subscriptionId: string; // ID связанной подписки
    status: EnumPaymentStatus; // Статус оплаты
    createdAt: number; // Дата оплаты
    method: TPaymentMethod; // Метод оплаты
    period: EnumSubscriptionPeriod; // время работы подписки
    details: D | null; // Дополнительные данные о платеже
};

export type TSubscription = {
    status: EnumSubscriptionStatus; // Статус подписки\
    payments: TPayment[]; // Список оплат, связанных с подпиской
};

export abstract class AbstractPayment<D extends object = object> implements TPayment {
    abstract id: number; // Уникальный идентификатор оплаты
    abstract subscriptionId: string; // ID связанной подписки
    abstract status: EnumPaymentStatus; // Статус оплаты
    abstract createdAt: number; // Дата оплаты
    abstract method: TPaymentMethod; // Метод оплаты
    abstract period: EnumSubscriptionPeriod; // Время работы подписки
    abstract details: D | null; // Дополнительные данные о платеже

    // Метод для проверки, завершена ли оплата
    abstract isCompleted(): boolean;

    abstract getDetails(): D | null;
}
