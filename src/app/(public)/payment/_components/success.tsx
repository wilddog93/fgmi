'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useRegistrationFormMember } from '@/stores/form-register-member';
import { useRegistrationForm } from '@/stores/form-register-program';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';
import React, { FC } from 'react';

type Props = {
  payment_type?: string;
}
const PaymentSuccess: FC<Props> = ({ payment_type }) => {
  const { reset: resetProgram } = useRegistrationForm();
  const { reset: resetMember } = useRegistrationFormMember();

  const reset = () => {
    if(payment_type === 'member') {
      resetMember();
    }
    if(payment_type === 'program') {
      resetProgram();
    }
  }
  return (
    <Card className="max-w-md w-full border-0 shadow-lg">
      <CardHeader className="text-center">
        <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
          <CheckCircle className="w-8 h-8 text-primary" />
        </div>
        <CardTitle className="font-serif text-2xl text-primary">Pembayaran Berhasil!</CardTitle>
      </CardHeader>
      <CardContent className="text-center space-y-4">
        <p className="text-gray-600">
          Selamat! Pendaftaran bootcamp Anda telah berhasil. Kami akan mengirimkan detail lebih lanjut ke email Anda.
        </p>
        <div className="space-y-2">
          <Button 
            asChild 
            onClick={reset}
            className="w-full bg-primary/70 hover:bg-primary/80 text-white"
          >
            <Link href="/">Kembali ke Beranda</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default PaymentSuccess;
