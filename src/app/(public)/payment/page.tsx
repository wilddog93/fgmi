import React from 'react';
import PaymentPending from './_components/pending';
import PaymentFailed from './_components/failed';
import PaymentSuccess from './_components/success';

type Props = {
  searchParams: Promise<{
    status: string;
    payment_type: string;
  }>;
}

const PaymentPage: React.FC<Props> = async({ searchParams }) => {
  const { status, payment_type } = await searchParams;
  if(status === 'berhasil' || status === 'success') {
    return <PaymentSuccess payment_type={payment_type} />;
  }
  if(status === 'gagal' || status === 'failed' || status === 'cancel') {
    return <PaymentFailed payment_type={payment_type} />;
  }
  return <PaymentPending />;
}

export default PaymentPage;
