declare module "midtrans-client" {
  interface SnapConfig {
    isProduction: boolean;
    serverKey: string;
    clientKey: string;
  }

  interface TransactionDetails {
    order_id: string;
    gross_amount: number;
  }

  interface CreateTransactionParam {
    transaction_details: TransactionDetails;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    customer_details?: Record<string, any>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    item_details?: Record<string, any>[];
  }

  class Snap {
    constructor(config: SnapConfig);
    createTransaction(
      param: CreateTransactionParam
    ): Promise<{ token: string; redirect_url: string }>;
  }

  export { Snap };
}
