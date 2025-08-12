import { NextRequest, NextResponse } from "next/server";
import { Snap } from "midtrans-client";

const snap = new Snap({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY!,
  clientKey: process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY!,
});

export async function POST(request: NextRequest) {
  try {
    const { orderId, grossAmount, customerDetails, itemDetails } =
      await request.json();

    const parameter = {
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
    };

    const token = await snap.createTransaction(parameter);

    return NextResponse.json({ token });
  } catch (error) {
    console.error("Error processing the request:", error);
    return NextResponse.error();
  }
}
