"use client"

import React, { Fragment, useCallback, useEffect, useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Shield, CheckCircle, Users, Clock, Award, CreditCard } from "lucide-react"
import { cn } from "@/lib/utils"
import { Alert } from "@/components/ui/alert"
import SmartForm from "@/components/client/molecule/form/smart-form"
import { FormRegistrationData, MidtransResponse, useRegistrationForm } from "./form-register"
import { useForm } from "react-hook-form"
import SmartTextField from "@/components/client/molecule/form/smart-textfield"
import SmartSelectSingle from "@/components/client/molecule/form/smart-select-single"
import { useRouter } from "next/navigation"
import QRCode from "react-qr-code";

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

function PaymentQRIS({ data }: { data: MidtransResponse }) {
  const qrAction = data.actions.find((a) => a.name === "generate-qr-code");
  const deeplink = data.actions.find((a) => a.name === "deeplink-redirect");
  const statusAction = data.actions.find((a) => a.name === "get-status");
  const cancelAction = data.actions.find((a) => a.name === "cancel");


  return (
    <div className="w-full mx-auto p-6 bg-white shadow rounded-2xl space-y-6">
      <h2 className="text-xl font-semibold text-center">
        Pembayaran QRIS / GoPay
      </h2>

      {/* QR Code */}
      {qrAction && (
        <div className="flex justify-center">
          <QRCode value={qrAction.url} size={256} />
        </div>
      )}

      {/* Detail Transaksi */}
      <div className="space-y-2 text-sm text-center">
        <p>
          <span className="font-medium">Order ID:</span> {data.order_id}
        </p>
        <p>
          <span className="font-medium">Nominal:</span> Rp{" "}
          {parseInt(data.gross_amount).toLocaleString("id-ID")}
        </p>
        <p>
          <span className="font-medium">Status:</span>{" "}
          <span className="capitalize">{data.transaction_status}</span>
        </p>
        <p>
          <span className="font-medium">Kadaluarsa:</span> {data.expiry_time}
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

export default function BootcampRegistration() {
  const router = useRouter();
  const { step, dataForm, setStep, setDataForm, reset } = useRegistrationForm();

  const { 
    handleSubmit, 
    control, 
    formState: { errors, isValid }, 
    getValues,
    watch,
    setValue,
    ...formMethods
  } = useForm<FormRegistrationData>();
  const [isProcessing, setIsProcessing] = useState(false)
  const [showPayment, setShowPayment] = useState(false)

  const selectedBootcamp = bootcampOptions.find((b) => b.id === dataForm.bootcamp)

  const handleInputChange = (field: keyof FormRegistrationData, value: string) => {
    setDataForm({ ...dataForm, [field]: value })
  }

  const handleNextStep = useCallback(() => {
    if (step < 3) {
      setStep(step + 1)
      setDataForm({ 
        ...dataForm, 
        fullName: watch("fullName"),
        email: watch("email"),
        phone: watch("phone"),
        segmentasi: watch("segmentasi"),
        instansi: watch("instansi"),
        bootcamp: watch("bootcamp"),
      })
    }
  }, [step, dataForm, watch])

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const disabledStep = (step: number): boolean => {
    const isValidStepOne = !watch("email") || !watch("fullName") || !watch("phone") || !watch("segmentasi") || !watch("instansi");
    const isValidStepTwo = !isValid;
    if(step === 1) {
      return isValidStepOne ? true : false
    }
    if(step === 2) {
      return isValidStepTwo ? true : false
    }
    return true
  }

  const onSubmitPayment = async(data: FormRegistrationData) => {
    console.log(data, 'form data');
    if (!selectedBootcamp) return;
    setIsProcessing(true);
    const orderId = `BOOTCAMP-${Date.now()}`;
    try {
      const response = await fetch("/api/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId,
          grossAmount: selectedBootcamp.price,
          customerDetails: {
            fullName: data.fullName,
            email: data.email,
            phone: data.phone,
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
      const { token, redirectUrl, qr_code_url } = await response.json();
      router.replace(`/register/program/payment?order_id=${orderId}&transaction_id=${token}&payment_type=all`);
      setDataForm({ ...data, tokenPayment: token });
      console.log(token, redirectUrl, qr_code_url, "result");
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan saat membuat transaksi");
    } finally {
      setIsProcessing(false);
    }
  }

  useEffect(() => {
    if(dataForm) {
      formMethods.reset(dataForm);
    }
  }, [dataForm])

  useEffect(() => {
    formMethods.register("bootcamp", {
      required: true,
    })
  }, [])

  // show payment qris
  // useEffect(() => {
  //   if (!dataForm.recordPayment?.transaction_id) {
  //     setShowPayment(false);
  //     return;
  //   }
  //   setShowPayment(true);
  // }, [dataForm.recordPayment]);

  const handleCreatQRCode = async (data: FormRegistrationData) => {
    if (!selectedBootcamp) return;
    setIsProcessing(true);
    const orderId = `BOOTCAMP-${Date.now()}`;
    try {
      const response = await fetch("/api/payment/qris", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId,
          grossAmount: selectedBootcamp.price,
          customerDetails: {
            fullName: data.fullName,
            email: data.email,
            phone: data.phone,
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
      const result = await response.json();
      console.log(result, "qris");
      setDataForm({ ...dataForm, recordPayment: result });
      const transaction_id = result.transaction_id;
      setIsProcessing(false);
      router.replace(`/register/program/payment?order_id=${orderId}&transaction_id=${transaction_id}&payment_type=gopay`);
      // setShowPayment(true);
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan saat membuat QR Code");
      setIsProcessing(false);
    } finally {
      setIsProcessing(false);
    }
  }

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
              {dataForm.recordPayment && 
                <PaymentQRIS data={dataForm.recordPayment} />
              }
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
          {[1, 2, 3].map((currentStep) => (
            <div key={currentStep} className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  step >= currentStep ? "bg-primary text-white" : "bg-primary/10 text-gray-500"
                }`}
              >
                {step > currentStep ? <CheckCircle className="w-5 h-5" /> : currentStep}
              </div>
              {currentStep < 3 && <div className={`w-16 h-1 mx-2 ${step > currentStep ? "bg-primary" : "bg-gray-200"}`} />}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className={cn("lg:col-span-2", step === 1 && !selectedBootcamp && "lg:col-span-3")}>
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl text-primary">
                  {step === 1 && "Mari berkenalan!"}
                  {step === 2 && "Pilih program favoritmu!"}
                  {step === 3 && "Konfirmasi & Pembayaran"}
                </CardTitle>
                <CardDescription>
                  {step === 1 && "Berikan informasi kontak dan latar belakang Anda"}
                  {step === 2 && "Pilih program bootcamp yang sesuai dengan minat Anda"}
                  {step === 3 && "Tinjau pilihan Anda dan lakukan pembayaran"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <SmartForm
                  // onSubmit={onSubmitPayment}
                  onSubmit={handleCreatQRCode}
                  propsUseForm={{
                    defaultValues: dataForm,
                    mode: "onSubmit",
                    formControl: {
                      control,
                      getValues,
                      handleSubmit,
                      setValue,
                      watch,
                      ...formMethods
                    },
                  }}
                  className="space-y-6"
                >
                  {/* Step 1: Personal Information */}
                  {step === 1 && (
                    <Fragment>
                      <div className="grid grid-cols-2 gap-2">
                        <h3 className="col-span-2 text-lg font-semibold mb-4 text-primary">Informasi Pribadi</h3>
                        <SmartTextField
                          name="email"
                          label="Email"
                          validation={{
                            required: true,
                          }}
                          className="col-span-2 mb-4"
                          fullwidth
                          inputProps={{
                            placeholder: "nama@email.com",
                          }}
                        />
                        <SmartTextField
                          name="fullName"
                          label="Nama Lengkap"
                          required
                          validation={{
                            required: true,
                          }}
                          className="mb-4"
                          fullwidth
                          inputProps={{
                            placeholder: "Masukkan nama lengkap",
                          }}
                        />
                        <SmartTextField
                          name="phone"
                          label="Nomor Telepon/Handphone"
                          required
                          validation={{
                            required: true,
                          }}
                          className="mb-4"
                          fullwidth
                          inputProps={{
                            placeholder: "08xxxxxxxxxx",
                          }}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <h3 className="col-span-2 text-lg font-semibold mb-4 text-primary">Latar Belakang</h3>
                        <SmartSelectSingle
                          name="segmentasi"
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
                          className="col-span-2"
                        />
                        <SmartTextField
                          name="instansi"
                          label="Instansi"
                          required
                          validation={{
                            required: true,
                          }}
                          className="col-span-2 mb-4"
                          fullwidth
                          inputProps={{
                            placeholder: "Masukkan nama instansi",
                          }}
                        />
                      </div>
                    </Fragment>
                  )}
                  {/* Step 2: Bootcamp Selection */}
                  {step === 2 && (
                    <div className="grid grid-cols-1 gap-2">
                      <h3 className="text-lg font-semibold mb-4 text-primary">Pilih Program Bootcamp</h3>
                      <div className="grid gap-4">
                        {bootcampOptions.map((bootcamp) => (
                          <div
                            key={bootcamp.id}
                            className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                              dataForm.bootcamp === bootcamp.id
                                ? "border-primary/30 bg-primary text-white"
                                : "border-gray-200 hover:border-primary"
                            }`}
                            onClick={() => handleInputChange("bootcamp", bootcamp.id)}
                          >
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-semibold text-lg">{bootcamp.name}</h4>
                                <div className={cn("flex flex-col md:flex-row items-start md:items-center gap-4 mt-2 text-sm text-muted-foreground", dataForm.bootcamp === bootcamp.id && "text-white")}>
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
                                <div className={cn("text-2xl font-bold text-primary", dataForm.bootcamp === bootcamp.id && "text-white")}>
                                  Rp {bootcamp.price.toLocaleString("id-ID")}
                                </div>
                                <div className={cn("text-sm text-muted-foreground", dataForm.bootcamp === bootcamp.id && "text-white")}>Total biaya</div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Step 3: Confirmation & Payment */}
                  {step === 3 && (
                    <Fragment>
                      <div className="grid grid-cols-1 gap-2">
                        <h3 className="text-lg font-semibold mb-4 text-primary">Ringkasan Pendaftaran</h3>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Nama:</span>
                            <span className="font-medium">
                              {dataForm.fullName}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Email:</span>
                            <span className="font-medium">{dataForm.email}</span>
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

                      <div className="grid grid-cols-1 gap-2">
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
                    </Fragment>
                  )}

                  {/* Navigation Buttons */}
                  <div className="flex justify-between pt-6">
                    <Button
                      type="button" 
                      variant="outline"
                      onClick={handlePrevStep}
                      disabled={step === 1}
                      className={cn("px-8 hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed", step === 1 && "hidden")}
                    >
                      Kembali
                    </Button>

                    {step < 3 ? (
                      <Button
                        type="button"
                        onClick={handleNextStep}
                        className={cn("px-8 hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed", step === 1 && "ml-auto")}
                        disabled={disabledStep(step)}
                      >
                        Lanjutkan
                      </Button>
                    ) : (
                      <Button
                        type="button"
                        // onClick={handleSubmit(onSubmitPayment)}
                        onClick={handleSubmit(handleCreatQRCode)}
                        disabled={isProcessing || !isValid}
                        className={cn("px-8 hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed")}
                      >
                        {isProcessing ? "Memproses..." : "Bayar Sekarang"}
                      </Button>
                    )}
                  </div>
                </SmartForm>
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
