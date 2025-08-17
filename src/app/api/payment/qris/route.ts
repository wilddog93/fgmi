import { NextRequest, NextResponse } from "next/server";
import midtransClient from "midtrans-client";

export async function POST(req: NextRequest) {
  const { orderId, grossAmount, customerDetails, itemDetails } =
    await req.json();

  const core = new midtransClient.CoreApi({
    isProduction: false,
    serverKey: process.env.MIDTRANS_SERVER_KEY!,
    clientKey: process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY!,
  });
  const parameter = {
    payment_type: "gopay",
    transaction_details: {
      order_id: orderId,
      gross_amount: grossAmount,
    },
    customer_details: {
      fullName: customerDetails.fullName,
      email: customerDetails.email,
      phone: customerDetails.phone,
    },
    item_details: itemDetails,
    gopay: {
      enable_callback: true, // optional
      callback_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/success`,
    },
  };
  try {
    const transaction = await core.charge(parameter);
    console.log(transaction, "response-qris");
    return NextResponse.json(transaction);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
