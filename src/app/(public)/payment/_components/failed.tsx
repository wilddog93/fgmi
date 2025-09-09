'use client';

import { XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { useRegistrationForm } from "../../../../stores/form-register-program";
import { useRegistrationFormMember } from "../../../../stores/form-register-member";
import { FC } from "react";

type Props = {
  payment_type?: string;
}

const PaymentFailed:FC<Props> = ({ payment_type }) => {
  const { dataForm: dataProgram, setDataForm: setDataProgram } = useRegistrationForm();
  const { dataForm: dataMember, setDataForm: setDataMember } = useRegistrationFormMember();

  const backToForm = () => {
    if(payment_type === 'member') {
      setDataMember({ ...dataMember, recordPayment: undefined });
    }
    if(payment_type === 'program') {
      setDataProgram({ ...dataProgram, recordPayment: undefined });
    }
  }
  return (
    <Card className="max-w-md w-full border-0 shadow-lg">
      <CardHeader className="text-center">
        <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
          <XCircle className="w-8 h-8 text-red-600" />
        </div>
        <CardTitle className="font-serif text-2xl text-primary">Pembayaran Gagal</CardTitle>
      </CardHeader>
      <CardContent className="text-center space-y-4">
        <p className="text-gray-600">
          Maaf, terjadi kesalahan dalam proses pembayaran. Silakan coba lagi atau hubungi customer service kami.
        </p>
        <div className="space-y-2">
          <Button asChild 
            className="w-full"
            onClick={backToForm}
          >
            <Link href="/">Coba Lagi</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default PaymentFailed;
