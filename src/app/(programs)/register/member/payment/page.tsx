

import { Alert } from '@/components/ui/alert';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield } from 'lucide-react';
import React from 'react';
import PaymentComponent from './component';

type SearchParams = Record<string, string | string[] | undefined>;
interface Props {
  searchParams: Promise<SearchParams>;
}

const Page = async ({ searchParams }: Props) => {
  const paramsData = await searchParams;
  const { order_id, transaction_id, payment_type } = paramsData;

  // const res = await fetch(`/api/payment/status`, {
  //   method: "GET",
  //   credentials: "include",
  //   mode: "cors",
  //   headers: {
  //     "Content-Type": "application/json",
  //     Authorization:
  //         "Basic " +
  //         Buffer.from(process.env.MIDTRANS_SERVER_KEY + ":").toString(
  //           "base64"
  //         ),
  //     },
  // });

  // const data = await res.json();
  // console.log(data, "data-status");

  return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card className="border-0 shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-primary">Selesaikan Pembayaran</CardTitle>
              <CardDescription>Gunakan payment gateway yang aman dan terpercaya</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4 w-full">
              <Alert variant="default" className="bg-primary/5 border-primary/5 flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary stroke-primary" />
                <span className="text-sm text-primary">Pembayaran diamankan dengan enkripsi SSL 256-bit</span>
              </Alert>
              <PaymentComponent order_id={order_id as string} transaction_id={transaction_id as string} payment_type={payment_type as string} />
            </CardContent>
          </Card>
        </div>
      </div>
    )
}

export default Page;
