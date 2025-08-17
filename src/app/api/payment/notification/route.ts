import { NextRequest, NextResponse } from "next/server";
import midtransClient from "midtrans-client";

const coreApi = new midtransClient.CoreApi({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY!,
  clientKey: process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY!,
});

export async function GET(
  req: NextRequest,
  { params }: { params: { orderId: string } }
) {
  try {
    const statusResponse = await coreApi.transaction.status(params.orderId);

    console.log("Status response:", statusResponse);

    // Bisa update DB sesuai status transaksi
    // statusResponse.transaction_status: "capture", "settlement", "pending", "deny", "expire", "cancel"

    return NextResponse.json(statusResponse, { status: 200 });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
