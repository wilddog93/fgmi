"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Shield, CheckCircle, Users, Clock, Award, CreditCard } from "lucide-react"
import { cn } from "@/lib/utils"
import { Alert } from "@/components/ui/alert"
import TextField from "@/components/client/molecule/textfield"
import SelectSingle from "@/components/client/molecule/select-single"
import Link from "next/link"

interface FormData {
  fullName: string
  email: string
  phone: string
  segmentasi: string;
  instansi: string;
  bootcamp: string
  experience: string
  motivation: string
  paymentMethod: string
}

const bootcampOptions = [
  { id: "program-1", name: "Program 1", price: 8500000, duration: "16 minggu" },
  { id: "program-2", name: "Program 2", price: 7500000, duration: "14 minggu" },
  { id: "program-3", name: "Program 3", price: 9500000, duration: "18 minggu" },
  { id: "program-4", name: "Program 4", price: 8000000, duration: "12 minggu" },
]

const segmentasiOptions = [
  { id: "1", name: "Student" },
  { id: "2", name: "Fresh Graduate" },
  { id: "3", name: "Professional" },
]

export default function BootcampRegistration() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    segmentasi: "",
    instansi: "",
    bootcamp: "",
    experience: "",
    motivation: "",
    paymentMethod: "",
  })
  const [isProcessing, setIsProcessing] = useState(false)
  const [showPayment, setShowPayment] = useState(false)
  const [paymentLink, setPaymentLink] = useState<string>("")

  const selectedBootcamp = bootcampOptions.find((b) => b.id === formData.bootcamp)

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  // const handlePayment = async () => {
  //   if (!selectedBootcamp) return

  //   setIsProcessing(true)

  //   try {
  //     // Create transaction token from backend
  //     const response = await fetch("/api/payment", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         orderId: `BOOTCAMP-${Date.now()}`,
  //         grossAmount: selectedBootcamp.price,
  //         customerDetails: {
  //           fullName: formData.fullName,
  //           email: formData.email,
  //           phone: formData.phone,
  //         },
  //         itemDetails: [
  //           {
  //             id: selectedBootcamp.id,
  //             price: selectedBootcamp.price,
  //             quantity: 1,
  //             name: selectedBootcamp.name,
  //           },
  //         ],
  //       }),
  //     })

  //     const { token } = await response.json()

  //     // Show Midtrans Snap payment
  //     setShowPayment(true)

  //     // Load Snap.js and trigger payment
  //     const script = document.createElement("script")
  //     script.src = "https://app.sandbox.midtrans.com/snap/snap.js"
  //     script.setAttribute(
  //       "data-client-key",
  //       process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY!,
  //     )
  //     script.onload = () => {
  //       // @ts-expect-error : Type 'Window' is not assignable to type 'Snap'
  //       window.snap.embed(token, {
  //         embedId: "snap-container",
  //         // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //         onSuccess: (result: any) => {
  //           alert("Pembayaran berhasil! Selamat datang di bootcamp!")
  //           console.log(result)
  //           setShowPayment(false)
  //         },
  //         // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //         onPending: (result: any) => {
  //           alert("Menunggu pembayaran Anda...")
  //           console.log(result)
  //         },
  //         // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //         onError: (result: any) => {
  //           alert("Pembayaran gagal. Silakan coba lagi.")
  //           console.log(result)
  //           setShowPayment(false)
  //         },
  //         onClose: () => {
  //           setShowPayment(false)
  //         },
  //       })
  //     }
  //     document.head.appendChild(script)
  //   } catch (error) {
  //     console.error("Payment error:", error)
  //     alert("Terjadi kesalahan. Silakan coba lagi.")
  //   } finally {
  //     setIsProcessing(false)
  //   }
  // }

  const handlePayment = async () => {
    if (!selectedBootcamp) return;
    setIsProcessing(true);

    try {
      const response = await fetch("/api/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId: `BOOTCAMP-${Date.now()}`,
          grossAmount: selectedBootcamp.price,
          customerDetails: {
            fullName: formData.fullName,
            email: formData.email,
            phone: formData.phone,
          },
          itemDetails: [
            {
              id: selectedBootcamp.id,
              price: selectedBootcamp.price,
              quantity: 1,
              name: selectedBootcamp.name,
            },
          ],
        }),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`API Error: ${text}`);
      }

      const { token } = await response.json();

      if(token) {
        setShowPayment(true);
        if (!document.querySelector("#snap-script")) {
          const script = document.createElement("script");
          script.id = "snap-script";
          script.src = "https://app.sandbox.midtrans.com/snap/snap.js";
          script.setAttribute(
            "data-client-key",
            process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY!
          );
          document.body.appendChild(script);
          script.onload = () => {
            // @ts-expect-error : Type 'Window' is not assignable to type 'Snap'.
            window.snap.embed(token, { 
              embedId: "snap-container",
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              onSuccess: (result: any) => {
                alert("Pembayaran berhasil! Selamat datang di bootcamp!")
                console.log(result)
                setShowPayment(false)
              },
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              onPending: (result: any) => {
                alert("Menunggu pembayaran Anda...")
                console.log(result)
              },
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              onError: (result: any) => {
                alert("Pembayaran gagal. Silakan coba lagi.")
                console.log(result)
                setShowPayment(false)
              },
              onClose: () => {
                setShowPayment(false)
              },
            });
          };
        } else {
          // @ts-expect-error : Type 'Window' is not assignable to type 'Snap'.
          window.snap.embed(token, { embedId: "snap-container" });
        }
      }
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan saat membuat transaksi");
    } finally {
      setIsProcessing(false);
    }
  };


  if (showPayment) {
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
              <div id="snap-container" className="w-full max-w-fit mx-auto"></div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  currentStep >= step ? "bg-primary text-white" : "bg-primary/10 text-gray-500"
                }`}
              >
                {currentStep > step ? <CheckCircle className="w-5 h-5" /> : step}
              </div>
              {step < 3 && <div className={`w-16 h-1 mx-2 ${currentStep > step ? "bg-primary" : "bg-gray-200"}`} />}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className={cn("lg:col-span-2", currentStep === 1 && !selectedBootcamp && "lg:col-span-3")}>
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl text-primary">
                  {currentStep === 1 && "Mari berkenalan!"}
                  {currentStep === 2 && "Pilih program favoritmu!"}
                  {currentStep === 3 && "Konfirmasi & Pembayaran"}
                </CardTitle>
                <CardDescription>
                  {currentStep === 1 && "Berikan informasi kontak dan latar belakang Anda"}
                  {currentStep === 2 && "Pilih program bootcamp yang sesuai dengan minat Anda"}
                  {currentStep === 3 && "Tinjau pilihan Anda dan lakukan pembayaran"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Step 1: Personal Information */}
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <div className="form-section">
                      <h3 className="text-lg font-semibold mb-4 text-primary">Informasi Pribadi</h3>
                      <div className="grid md:grid-cols-1 gap-4">
                        <div className="flex flex-col gap-2">
                          <TextField 
                            label="Email"
                            inputProps={{
                              placeholder: "nama@email.com",
                              value: formData.email || "",
                              onChange: (e) => handleInputChange("email", e.target.value),
                            }}
                            fullwidth
                            className="mb-4"
                            required
                          />
                        </div>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <TextField 
                            label="Nama Lengkap"
                            inputProps={{
                              placeholder: "Masukkan nama lengkap",
                              value: formData.fullName || "",
                              onChange: (e) => handleInputChange("fullName", e.target.value),
                            }}
                            fullwidth
                            className=""
                            required
                          />
                        </div>
                        <div>
                          <TextField 
                            label="Nomor Telepon/Handphone"
                            inputProps={{
                              placeholder: "08xxxxxxxxxx",
                              value: formData.phone || "",
                              onChange: (e) => handleInputChange("phone", e.target.value),
                            }}
                            fullwidth
                            className=""
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="form-section">
                      <h3 className="text-lg font-semibold mb-4 text-primary">Latar Belakang</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <SelectSingle
                          button={{
                            label: "Segmentasi",
                            props: {
                              className: "w-full",
                            },
                          }}
                          command={{
                            options: segmentasiOptions.map((item) => ({
                              value: item.id,
                              label: item.name,
                            })),
                          }}
                          value={formData.segmentasi}
                          onChange={(value: string) => handleInputChange("segmentasi", value)}
                        />
                        <TextField 
                          label="Instansi"
                          inputProps={{
                            placeholder: "Masukkan nama instansi",
                            value: formData.instansi || "",
                            onChange: (e) => handleInputChange("instansi", e.target.value),
                          }}
                          fullwidth
                          className=""
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Bootcamp Selection */}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <div className="form-section">
                      <h3 className="text-lg font-semibold mb-4 text-primary">Pilih Program Bootcamp</h3>
                      <div className="grid gap-4">
                        {bootcampOptions.map((bootcamp) => (
                          <div
                            key={bootcamp.id}
                            className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                              formData.bootcamp === bootcamp.id
                                ? "border-primary/30 bg-primary text-white"
                                : "border-gray-200 hover:border-primary"
                            }`}
                            onClick={() => handleInputChange("bootcamp", bootcamp.id)}
                          >
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-semibold text-lg">{bootcamp.name}</h4>
                                <div className={cn("flex flex-col md:flex-row items-start md:items-center gap-4 mt-2 text-sm text-muted-foreground", formData.bootcamp === bootcamp.id && "text-white")}>
                                  <div className="flex items-center gap-1">
                                    <Clock className="w-4 h-4" />
                                    {bootcamp.duration}
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Users className="w-4 h-4" />
                                    Kelas kecil
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Award className="w-4 h-4" />
                                    Sertifikat
                                  </div>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className={cn("text-2xl font-bold text-primary", formData.bootcamp === bootcamp.id && "text-white")}>
                                  Rp {bootcamp.price.toLocaleString("id-ID")}
                                </div>
                                <div className={cn("text-sm text-muted-foreground", formData.bootcamp === bootcamp.id && "text-white")}>Total biaya</div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: Confirmation & Payment */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <div className="form-section">
                      <h3 className="text-lg font-semibold mb-4 text-primary">Ringkasan Pendaftaran</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Nama:</span>
                          <span className="font-medium">
                            {formData.fullName}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Email:</span>
                          <span className="font-medium">{formData.email}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Program:</span>
                          <span className="font-medium">{selectedBootcamp?.name}</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between text-lg font-semibold">
                          <span>Total Biaya:</span>
                          <span className="text-primary">
                            Rp {selectedBootcamp?.price.toLocaleString("id-ID")}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="form-section">
                      <h3 className="text-lg font-semibold mb-4 text-primary">Metode Pembayaran</h3>
                      <div className="space-y-3">
                        <Alert variant="default" className="bg-primary/5 border-primary/5 flex items-center gap-2">
                          <Shield className="w-5 h-5 text-primary stroke-primary" />
                          <span className="text-sm text-primary">Pembayaran diamankan dengan Midtrans</span>
                        </Alert>
                        <div className="flex items-center gap-2 text-sm">
                          <CreditCard className="w-4 h-4" />
                          <span>Mendukung: Credit Card, Bank Transfer, E-Wallet, dan lainnya</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between pt-6">
                  <Button
                    variant="outline"
                    onClick={handlePrevStep}
                    disabled={currentStep === 1}
                    className={cn("px-8 hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed", currentStep === 1 && "hidden")}
                  >
                    Kembali
                  </Button>

                  {currentStep < 3 ? (
                    <Button
                      onClick={handleNextStep}
                      className={cn("px-8 hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed", currentStep === 1 && "ml-auto")}
                      disabled={
                        (currentStep === 1 &&
                          (!formData.fullName || !formData.email || !formData.phone)) ||
                        (currentStep === 2 && !formData.bootcamp)
                      }
                    >
                      Lanjutkan
                    </Button>
                  ) : (
                    <Button
                      onClick={handlePayment}
                      disabled={isProcessing}
                      className={cn("px-8 hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed")}
                    >
                      {isProcessing ? "Memproses..." : "Bayar Sekarang"}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {selectedBootcamp && (
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl text-primary">Program Terpilih</CardTitle>
                </CardHeader>
                <CardContent>
                  <h4 className="font-semibold text-lg mb-2">{selectedBootcamp.name}</h4>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      Durasi: {selectedBootcamp.duration}
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      Maksimal 15 peserta per kelas
                    </div>
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4" />
                      Sertifikat resmi
                    </div>
                  </div>
                  <Separator className="my-4" />
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">
                      Rp {selectedBootcamp.price.toLocaleString("id-ID")}
                    </div>
                    <div className="text-sm text-gray-500">Total Biaya Pendaftaran</div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
