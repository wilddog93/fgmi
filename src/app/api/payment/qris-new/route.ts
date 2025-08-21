// // app/api/payment/route.ts
// import { NextRequest, NextResponse } from "next/server";
// import { SnapBi } from "midtrans-client";

// const snapBi = new SnapBi({
//   isProduction: false,
//   serverKey: process.env.MIDTRANS_SERVER_KEY!,
//   clientKey: process.env.MIDTRANS_CLIENT_KEY!,
// });

// export async function POST(req: NextRequest) {
//   const { orderId, grossAmount, customerDetails, itemDetails } =
//     await req.json();
//   try {
//     const transaction = await snapBi.createTransaction({
//       payment_method: "qris",
//       transaction_details: {
//         order_id: orderId,
//         gross_amount: grossAmount,
//       },
//       qris: {
//         acquirer: "gopay",
//       },
//       customer_details: {
//         first_name: customerDetails.fullName,
//         email: customerDetails.email,
//         phone: customerDetails.phone,
//       },
//       item_details: itemDetails,
//     });

//     return NextResponse.json(transaction);
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   } catch (e: any) {
//     return NextResponse.json(
//       { error: e.message, details: e.ApiResponse },
//       { status: 500 }
//     );
//   }
// }

import { NextResponse, NextRequest } from "next/server";
import midtransClient from "midtrans-client";

const coreApi = new midtransClient.CoreApi({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY!,
  clientKey: process.env.MIDTRANS_CLIENT_KEY!,
});

export async function POST(req: NextRequest) {
  const { orderId, grossAmount, customerDetails, itemDetails } =
    await req.json();

  try {
    const transaction = await coreApi.charge({
      payment_type: "gopay",
      transaction_details: {
        order_id: orderId,
        gross_amount: grossAmount,
      },
      qris: {
        acquirer: "gopay",
      },
      customer_details: customerDetails,
      item_details: itemDetails,
    });

    return NextResponse.json(transaction);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message, details: e.ApiResponse },
      { status: 500 }
    );
  }
}
