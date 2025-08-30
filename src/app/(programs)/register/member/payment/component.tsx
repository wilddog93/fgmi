'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { MidtransResponse, useRegistrationForm } from '../../../../../stores/form-register-program';
import PaymentQRIS from '@/components/client/templates/sections/payment-qris';

declare global {
  interface Window {
    snap: {
      pay(
        token: string,
        options?: {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onSuccess?: (result: any) => void;
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onPending?: (result: any) => void;
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onError?: (result: any) => void;
          onClose?: () => void;
        }
      ): void;
      embed(
        token: string,
        options: {
          embedId: string;
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onSuccess?: (result: any) => void;
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onPending?: (result: any) => void;
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onError?: (result: any) => void;
          onClose?: () => void;
        }
      ): void;
    };
  }
}

// -------------------- PaymentSnap --------------------
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
    return <PaymentQRIS id={order_id} statusData={dataForm.recordPayment as MidtransResponse} data={dataForm} />;
  }

  return <div id="snap-container" className="w-full max-w-fit mx-auto" />;
};

export default PaymentComponent;
