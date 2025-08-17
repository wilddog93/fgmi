import { NextRequest, NextResponse } from "next/server";
import midtransClient from "midtrans-client";

const coreApi = new midtransClient.CoreApi({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY!,
  clientKey: process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY!,
});

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const orderId = searchParams.get("order_id");

  if (!orderId) {
    return NextResponse.json({ error: "order_id required" }, { status: 400 });
  }

  try {
    const response = await fetch(
      `https://api.sandbox.midtrans.com/v2/${orderId}/status`,
      {
        headers: {
          Authorization:
            "Basic " +
            Buffer.from(process.env.MIDTRANS_SERVER_KEY + ":").toString(
              "base64"
            ),
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    );

    const statusResponse = await response.json();

    console.log("Status response:", statusResponse);

    // Bisa update DB sesuai status transaksi
    // statusResponse.transaction_status: "capture", "settlement", "pending", "deny", "expire", "cancel"
    if (statusResponse.transaction_status === "settlement") {
      // Update DB
      // Update status
      // Send notification
    }
    if (statusResponse.transaction_status === "pending") {
      // Update DB
      // Update status
      // Send notification
    }
    if (statusResponse.transaction_status === "deny") {
      // Update DB
      // Update status
    }
    if (statusResponse.transaction_status === "expire") {
      // coreApi.cancelTransaction(orderId);
      // Update DB
      await coreApi.transaction.expire(orderId);
    }
    if (statusResponse.transaction_status === "cancel") {
      // Update DB
      // Update status
      await coreApi.transaction.cancel(orderId);
      // Send notification
    }

    return NextResponse.json(statusResponse, { status: 200 });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
