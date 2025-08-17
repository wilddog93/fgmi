'use client';

import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { useRegistrationForm } from "../../register/program/form-register";

export default function PaymentSuccess() {
  
  return (
    <div className="min-h-screen bg-gradient-to-br flex items-center justify-center p-4">
      <Card className="max-w-md w-full border-0 shadow-lg">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
          </div>
          <CardTitle className="font-serif text-2xl text-primary">Menunggu Pembayaran!</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-gray-600">
            Harap tunggu sampai pembayaran Anda selesai. Kami akan mengirimkan detail lebih lanjut ke email Anda.
          </p>
          <div className="space-y-2">
            <Button 
              asChild 
              className="w-full bg-primary/70 hover:bg-primary/80 text-white"
            >
              <Link href="/">Kembali ke Beranda</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
