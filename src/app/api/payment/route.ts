import { NextResponse, NextRequest } from "next/server";
import midtransClient from "midtrans-client";

const snap = new midtransClient.Snap({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY!,
  clientKey: process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY!,
});

export const POST = async (req: NextRequest) => {
  const { orderId, grossAmount, customerDetails, itemDetails } =
    await req.json();
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
    callbacks: {
      finish: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/success`,
      error: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/failed`,
      pending: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/pending`,
    },
  };
  try {
    const transaction = await snap.createTransaction(parameter);
    console.log(transaction, "transaction");
    return NextResponse.json({
      token: transaction.token,
      redirectUrl: transaction.redirect_url,
    });
  } catch (err) {
    console.error("Midtrans API error:", err);
    return NextResponse.json(
      { error: "Gagal membuat token pembayaran" },
      { status: 500 }
    );
  }
};
