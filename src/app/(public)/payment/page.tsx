import React from 'react';
import PaymentPending from './_components/pending';
import PaymentFailed from './_components/failed';
import PaymentSuccess from './_components/success';

type Props = {
  params: Promise<{
    status: string;
    payment_type: string;
  }>;
}

const PaymentPage: React.FC<Props> = async({ params }) => {
  const { status, payment_type } = await params;
  if(status === 'berhasil') {
    return <PaymentSuccess payment_type={payment_type} />;
  }
  if(status === 'gagal') {
    return <PaymentFailed payment_type={payment_type} />;
  }
  return <PaymentPending />;
}

export default PaymentPage;
