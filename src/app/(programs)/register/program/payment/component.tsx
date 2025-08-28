'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import QRCode from 'react-qr-code';
import { CheckCircleIcon, CheckIcon, ChevronLeftCircle } from 'lucide-react';
import { toast } from 'sonner';

import { MidtransResponse, useRegistrationForm } from '../../../../../stores/form-register-program';
import { Button } from '@/components/ui/button';
import { useCountdown } from '@/lib/hooks/use-countdown';
import { cn } from '@/lib/utils';
import axios from 'axios';


// -------------------- PaymentQRIS --------------------
interface PaymentQRISProps {
  id: string;
  data: MidtransResponse;
}

const PaymentQRIS = ({ id, data }: PaymentQRISProps) => {
  const router = useRouter();
  const { dataForm, setDataForm } = useRegistrationForm();

  const qrAction = data?.actions.find((a) => a.name === 'generate-qr-code');
  const deeplink = data?.actions.find((a) => a.name === 'deeplink-redirect');
  const cancelAction = data?.actions.find((a) => a.name === 'cancel');

  const [status, setStatus] = useState<string>('expired');

  const fetchStatus = async (orderId: string) => {
    try {
      const res = await axios.get(`http://localhost:4000/v1/payment/status?order_id=${orderId}`);
      const result = res.data;
      console.log(result, 'response')
      setStatus(result?.result?.transaction_status ?? 'expired');
      return result;
    } catch (err) {
      console.error('Fetch status error:', err);
    }
  };

  const countdown = useCountdown(new Date(data?.expiry_time), () => {
    fetchStatus(id);
  });

  const handleCancel = async () => {
    try {
      const res = await fetch(`/api/payment/cancel?transaction_id=${data?.transaction_id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ transaction_status: 'cancel' }),
      });

      const result = await res.json();

      if (!res.ok) {
        toast.error('Gagal membatalkan pembayaran', {
          description: 'Silakan coba lagi.',
        });
        return;
      }

      setStatus(result.transaction_status);
      setDataForm({ ...dataForm, recordPayment: undefined });

      toast.success('Pembayaran dibatalkan', {
        description: 'Silakan periksa status pembayaran di halaman pembayaran.',
      });
    } catch (err) {
      console.error(err);
      toast.error('Terjadi kesalahan, coba lagi.');
    }
  };

  useEffect(() => {
    if (!id) return;

    fetchStatus(id);

    const interval = setInterval(() => {
      if (['cancel', 'expired', 'settlement'].includes(status)) {
        clearInterval(interval);
        return;
      }
      fetchStatus(data.order_id);
    }, 5000);

    return () => clearInterval(interval);
  }, [id, status]);

  return (
    <div className="w-full mx-auto p-6 bg-white shadow rounded-2xl space-y-6">
      <h2 className="text-xl font-semibold text-center">Pembayaran QRIS / GoPay</h2>

      {/* QR Code */}
      {qrAction && (
        <div className="flex justify-center">
          {status === 'pending' ? (
            <QRCode value={qrAction.url} size={256} />
          ) : status === 'settlement' ? (
            <div className="relative flex justify-center items-center">
              <QRCode value={qrAction.url} size={256} className="blur-sm" />
              <Button
                onClick={() => router.push('/register/program')}
                className="absolute flex flex-col gap-2 text-xl inset-0 size-[256px] bg-green-200/10 hover:bg-green-300/10 text-white font-bold hover:scale-105 transition hover:cursor-pointer"
              >
                <CheckCircleIcon className='text-green-500 size-10' />
                Transaksi berhasil!
              </Button>
            </div>
          ) : (
            <div className="relative flex justify-center items-center">
              <QRCode value={qrAction.url} size={256} className="blur-sm" />
              <Button
                onClick={() => router.push('/register/program')}
                className="absolute inset-0 size-[256px] bg-transparent hover:bg-transparent text-white font-bold hover:scale-105 transition"
              >
                Lakukan pembayaran ulang
              </Button>
            </div>
          )}
        </div>
      )}

      {/* Detail Transaksi */}
      <div className="space-y-2 text-sm text-center">
        <p className="font-bold">
          Order ID: <span className="font-medium">{data?.order_id || '-'}</span>
        </p>
        <p className="font-bold">
          Nominal: Rp{' '}
          {data?.gross_amount ? parseInt(data.gross_amount).toLocaleString('id-ID') : 0}
        </p>
        <p className="font-bold">
          Status: <span className="capitalize">{status === "settlement" ? "Berhasil" : status}</span>
        </p>
        <p className="font-bold">
          Waktu tersisa:{' '}
          {status === 'cancel'
            ? 'Pembayaran telah dibatalkan' 
            : status === 'settlement' 
              ? 'Pembayaran telah selesai'
              : typeof countdown === 'number' && countdown < 0
              ? 'Kadaluarsa'
            : countdown}
        </p>
      </div>

      {/* Tombol Aksi */}
      <div className={cn("flex flex-col md:flex-row gap-2 items-center justify-center")}>
        {deeplink && !['cancel', 'expired', 'settlement'].includes(status) && (
          <Button asChild className="w-full max-w-fit">
            <a href={deeplink.url} target="_blank" rel="noopener noreferrer">
              Bayar dengan GoPay
            </a>
          </Button>
        )}

        {cancelAction && !['cancel', 'expired', 'settlement'].includes(status)  && (
          <Button
            onClick={handleCancel}
            className="w-full max-w-fit hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            variant="destructive"
            disabled={['cancel', 'expired'].includes(status)}
          >
            {['cancel', 'expired'].includes(status)
              ? 'Pembayaran Telah Batal'
              : 'Batal Pembayaran'}
          </Button>
        )}

        {['cancel', 'expired', 'settlement'].includes(status) && (
          <Button
            onClick={() => router.push('/register/program')}
            className="w-full max-w-fit"
            variant="outline"
          >
            <ChevronLeftCircle className="size-4" />
            Kembali ke Program Bootcamp
          </Button>
        )}
      </div>
    </div>
  );
}


// -------------------- PaymentSnap --------------------

// type global for snap
declare global {
  interface Window {
    snap: {
      embed: (
        token: string,
        options: {
          embedId: string;
          onSuccess?: () => void;
          onPending?: () => void;
          onError?: () => void;
          onClose?: () => void;
        }
      ) => void;
    };
  }
}
interface PaymentComponentProps {
  order_id?: string;
  payment_type?: string;
  token?: string;
}

const PaymentComponent = ({ order_id, payment_type, token }: PaymentComponentProps) => {
  const router = useRouter();
  const { dataForm, reset } = useRegistrationForm();

  useEffect(() => {
    if (!order_id) {
      router.push('/register/program');
      return;
    }

    const loadSnap = () => {
      if (!window.snap || !token) return;

      window.snap.embed(token, {
        embedId: 'snap-container',
        onSuccess: () => {
          toast.success('Pembayaran berhasil!');
        },
        onPending: () => {
          toast.info('Menunggu pembayaran Anda...');
        },
        onError: () => {
          toast.error('Pembayaran gagal. Silakan coba lagi.');
        },
        onClose: () => {
          reset();
        },
      });
    };

    if (payment_type === 'snap') {
      if (!document.querySelector('#snap-script')) {
        const script = document.createElement('script');
        script.id = 'snap-script';
        script.src = 'https://app.sandbox.midtrans.com/snap/snap.js';
        script.setAttribute('data-client-key', process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY!);
        script.onload = loadSnap;
        document.body.appendChild(script);
      } else {
        if (window.snap) {
          loadSnap();
        } else {
          (document.querySelector('#snap-script') as HTMLScriptElement).onload = loadSnap;
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, payment_type, reset, router]);

  if (!order_id) return null;

  if (payment_type === 'gopay') {
    return <PaymentQRIS id={order_id} data={dataForm.recordPayment as MidtransResponse} />;
  }

  return <div id="snap-container" className="w-full max-w-fit mx-auto" />;
};

export default PaymentComponent;
