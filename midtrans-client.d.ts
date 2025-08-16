declare module "midtrans-client" {
  interface SnapConfig {
    isProduction: boolean;
    serverKey: string;
    clientKey: string;
  }

  interface CoreApiConfig {
    isProduction: boolean;
    serverKey: string;
    clientKey: string;
  }

  interface TransactionDetails {
    order_id: string;
    gross_amount: number;
  }

  interface CreateTransactionParam {
    payment_type: string;
    transaction_details: TransactionDetails;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    customer_details?: Record<string, any>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    item_details?: Record<string, any>[];
    qris?: {
      acquirer: string;
    };
  }

  interface ChargeParam {
    payment_type: string;
    transaction_details: TransactionDetails;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    customer_details?: Record<string, any>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    item_details?: Record<string, any>[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  }

  // Snap API
  class Snap {
    constructor(config: SnapConfig);
    createTransaction(
      param: CreateTransactionParam
    ): Promise<{ token: string; redirect_url: string; qr_code_url: string }>;
  }

  // Core API
  class CoreApi {
    constructor(config: CoreApiConfig);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    charge(param: ChargeParam): Promise<any>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    capture(param: { transaction_id: string }): Promise<any>;
    transaction: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      status(orderId: string): Promise<any>;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      notification(body: any): Promise<any>;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      cancel(orderId: string): Promise<any>;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expire(orderId: string): Promise<any>;
    };
  }

  export { Snap, CoreApi };
}

// Tambahan untuk window.snap agar tidak perlu @ts-expect-error
declare global {
  interface Window {
    snap: {
      pay(
        token: string,
        options?: {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onSuccess?: (result: any) => void;
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onPending?: (result: any) => void;
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onError?: (result: any) => void;
          onClose?: () => void;
        }
      ): void;
      embed(
        token: string,
        options: {
          embedId: string;
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onSuccess?: (result: any) => void;
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onPending?: (result: any) => void;
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onError?: (result: any) => void;
          onClose?: () => void;
        }
      ): void;
    };
  }
}
