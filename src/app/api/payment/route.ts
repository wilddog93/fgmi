import { NextResponse } from "next/server";
import midtransClient from "midtrans-client";

export async function POST(req: Request) {
  try {
    const { orderId, grossAmount, customerDetails, itemDetails } =
      await req.json();

    const snap = new midtransClient.Snap({
      isProduction: false,
      serverKey: process.env.MIDTRANS_SERVER_KEY!,
      clientKey: process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY!,
    });

    const parameter = {
      payment_type: "qris",
      transaction_details: {
        order_id: orderId,
        gross_amount: grossAmount,
      },
      customer_details: {
        first_name: customerDetails.fullName,
        email: customerDetails.email,
        phone: customerDetails.phone,
      },
      item_details: itemDetails,
      qris: {
        acquirer: "gopay",
      },
    };

    const transaction = await snap.createTransaction(parameter);

    return NextResponse.json({
      token: transaction.token,
      redirectUrl: transaction.redirect_url,
      qr_code_url: transaction.qr_code_url,
    });
  } catch (err) {
    console.error("Midtrans API error:", err);
    return NextResponse.json(
      { error: "Gagal membuat token pembayaran" },
      { status: 500 }
    );
  }
}
