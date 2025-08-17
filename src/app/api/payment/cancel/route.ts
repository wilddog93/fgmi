import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const transactionId = searchParams.get("transaction_id");

  if (!transactionId) {
    return NextResponse.json(
      { error: "transaction_id required" },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(
      `https://api.sandbox.midtrans.com/v2/${transactionId}/cancel`,
      {
        method: "POST",
        headers: {
          Authorization:
            "Basic " +
            Buffer.from(process.env.MIDTRANS_SERVER_KEY + ":").toString(
              "base64"
            ),
          "Content-Type": "application/json",
        },
        cache: "no-store",
        body: JSON.stringify({
          transaction_status: "cancel",
        }),
      }
    );

    const data = await response.json();
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to cancel payment" },
      { status: 500 }
    );
  }
}
