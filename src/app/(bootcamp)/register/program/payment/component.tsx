'use client';

import React, { useEffect, useState } from 'react';
import { MidtransResponse, useRegistrationForm } from '../form-register';
import { useRouter } from 'next/navigation';
import QRCode from 'react-qr-code';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useCountdown } from '@/lib/hooks/use-countdown';


function PaymentQRIS({ data }: { data: MidtransResponse }) {
  const qrAction = data?.actions.find((a) => a.name === "generate-qr-code");
  const deeplink = data?.actions.find((a) => a.name === "deeplink-redirect");
  const statusAction = data?.actions.find((a) => a.name === "get-status");
  const cancelAction = data?.actions.find((a) => a.name === "cancel");
  
  const [isTransactionStatus, setIsTransactionStatus] = useState("pending");

  // console.log({ 
  //   default: data?.expiry_time,
  //   date: new Date(data?.expiry_time)
  // }, "data-qris");

  const handleStatus = async ({ order_id }: { order_id: string }) => {
    const res = await fetch(`/api/payment/status?order_id=${data?.order_id}`);
    const result = await res.json();
    setIsTransactionStatus(result.transaction_status);
    console.log(result, "data-status");
  }

  const countdown = useCountdown(new Date(data?.expiry_time), async () => {
    console.log("countdown done");
    // const res = await fetch(`/api/payment/status?order_id=${data?.order_id}`);

    // const result = await res.json();
    const result = await handleStatus({ order_id: data?.order_id });
    console.log(result, "data-status");
  });



  return (
    <div className="w-full mx-auto p-6 bg-white shadow rounded-2xl space-y-6">
      <h2 className="text-xl font-semibold text-center">
        Pembayaran QRIS / GoPay
      </h2>

      {/* QR Code */}
      {qrAction && (
        <div className="flex justify-center">
          {
            isTransactionStatus === "pending" ? <QRCode value={qrAction.url} size={256} /> :
            <div className='size-[256px] flex justify-center-safe items-center-safe'>Lakukan pembayaran ulang</div>
          }
          {/* <Image src={qrAction.url} alt="qris" width={256} height={256} /> */}
        </div>
      )}

      {/* Detail Transaksi */}
      <div className="space-y-2 text-sm text-center">
        <p className='font-bold'>
          <span className="font-medium">Order ID:</span> {data?.order_id}
        </p>
        <p className='font-bold'>
          <span className="font-medium">Nominal:</span> Rp{" "}
          {parseInt(data?.gross_amount).toLocaleString("id-ID")}
        </p>
        <p className='font-bold'>
          <span className="font-medium">Status:</span>{" "}
          <span className="capitalize">{isTransactionStatus}</span>
        </p>
        <p className='font-bold'>
          <span className="font-medium">Kadaluarsa: {typeof countdown === "number" && countdown < 0 ? 'Expired' : countdown }</span> 
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-2 items-center justify-center">
        {/* Tombol Deeplink */}
        {deeplink && (
          <Button asChild className="w-full max-w-fit">
            <a href={deeplink.url} target="_blank" rel="noopener noreferrer">
              Bayar dengan GoPay
            </a>
          </Button>
        )}

        {/* Tombol Status */}
        {statusAction && (
          <Button asChild className="w-full max-w-fit">
            <a href={statusAction.url} target="_blank" rel="noopener noreferrer">
              Status Transaksi
            </a>
          </Button>
        )}

        {/* Tombol Batal */}
        {cancelAction && (
          <Button asChild className="w-full max-w-fit">
            <a href={cancelAction.url} target="_blank" rel="noopener noreferrer">
              Batal Transaksi
            </a>
          </Button>
        )}
      </div>
    </div>
  );
}

const PaymentComponent = ({
  order_id,
  transaction_id,
  payment_type,
} : {
  order_id?: string,
  transaction_id?: string,
  payment_type?: string
}) => {
  const router = useRouter();
  const { dataForm, setDataForm, reset } = useRegistrationForm();
  // show payment
  useEffect(() => {
    if (!transaction_id) {
      router.push("/register/program");
      return;
    }

    const loadSnap = () => {
      // @ts-expect-error : Type 'Window' is not assignable to type 'Snap'.
      if (!window.snap) return;

      // @ts-expect-error : Type 'Window' is not assignable to type 'Snap'.
      window?.snap?.embed(transaction_id, {
        embedId: "snap-container",
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onSuccess: (result: any) => {
          alert("Pembayaran berhasil! Selamat datang di bootcamp!");
          console.log(result, "success");
          // reset();
          // setDataForm({ ...dataForm, tokenPayment: "" });
          // router.push("/payment/success");
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onPending: (result: any) => {
          alert("Menunggu pembayaran Anda...");
          // router.push("/payment/pending");
          console.log(result, "pending");
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onError: (result: any) => {
          alert("Pembayaran gagal. Silakan coba lagi.");
          console.log(result, "error");
          // setDataForm({ ...dataForm, tokenPayment: "" });
          // router.push("/payment/failed");
        },
        onClose: () => {
          reset();
        },
      });
    };

    if(payment_type === 'all') {
      if (!document.querySelector("#snap-script")) {
        const script = document.createElement("script");
        script.id = "snap-script";
        script.src = "https://app.sandbox.midtrans.com/snap/snap.js";
        script.setAttribute(
          "data-client-key",
          process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY!
        );
        script.onload = loadSnap;
        document.body.appendChild(script);
      } else {
        // pastikan snap sudah ready
        // @ts-expect-error : Type 'Window' is not assignable to type 'Snap'.
        if (window.snap) {
          loadSnap();
        } else {
          (document.querySelector("#snap-script") as HTMLScriptElement).onload = loadSnap;
        }
      }
    }

  }, [transaction_id, payment_type]);

  useEffect(() => {
    if (payment_type === "gopay") {
      console.log("gopay");
    }

  }, [transaction_id]);

  if (!order_id || !transaction_id) return null;
  if (payment_type === "gopay") {
    return <PaymentQRIS data={dataForm.recordPayment as MidtransResponse} />
  }
  return <div id="snap-container" className="w-full max-w-fit mx-auto"></div>
}

export default PaymentComponent;
