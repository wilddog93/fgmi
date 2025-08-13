import type { NextApiRequest, NextApiResponse } from "next";
import midtransClient from "midtrans-client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return res.status(405).end();

  const coreApi = new midtransClient.CoreApi({
    isProduction: false,
    serverKey: process.env.MIDTRANS_SERVER_KEY!,
    clientKey: process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY!,
  });

  try {
    const statusResponse = await coreApi.transaction.notification(req.body);

    console.log("Notification received:", statusResponse);

    // Bisa update DB sesuai status transaksi
    // statusResponse.transaction_status: "capture", "settlement", "pending", "deny", "expire", "cancel"

    res.status(200).json({ message: "Notification processed" });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
