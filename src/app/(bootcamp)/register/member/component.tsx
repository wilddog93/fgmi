"use client"

import React, { Fragment, useCallback, useEffect, useState } from "react"
import { Shield, CheckCircle, Users, Clock, Award, CreditCard, X } from "lucide-react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Alert } from "@/components/ui/alert"
import { cn } from "@/lib/utils"

import { FormRegistrationData, useRegistrationForm } from "../../../../stores/form-register-member"

import SmartForm from "@/components/client/molecule/form/smart-form"
import SmartTextField from "@/components/client/molecule/form/smart-textfield"
import SmartSelectSingle from "@/components/client/molecule/form/smart-select-single"
import SmartMultiSelect from "@/components/client/molecule/form/smart-multi-select"


const packageOptions = [
  { id: "basic", name: "Basic", price: 30000, duration: "16 minggu" },
  { id: "intermediate", name: "Intermediate", price: 60000, duration: "14 minggu" },
  { id: "advanced", name: "Advanced", price: 100000, duration: "18 minggu" },
]

const interestOptions = [
  { id: "Geophysics", name: "Geophysics" },
  { id: "Geology", name: "Geology" },
  { id: "Geochemistry", name: "Geochemistry" },
  { id: "Geotechnical", name: "Geotechnical" },
  { id: "Environmental", name: "Environmental" },
  { id: "Others", name: "Others" }
]

const segmentasiOptions = [
  { id: "1", name: "Student" },
  { id: "2", name: "Fresh Graduate" },
  { id: "3", name: "Professional" },
]

export default function MemberRegistration() {
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

  const selectedPackage = packageOptions.find((b) => b.id === dataForm.package)

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
        interest: watch("interest"),
        package: watch("package"),
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
    if (!selectedPackage) return;
    setIsProcessing(true);
    const orderId = `MEMBER-${Date.now()}`;
    try {
      const response = await fetch("/api/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId,
          grossAmount: selectedPackage.price,
          customerDetails: {
            fullName: data.fullName,
            email: data.email,
            phone: data.phone,
          },
          itemDetails: [
            {
              id: selectedPackage.id,
              price: selectedPackage.price,
              quantity: 1,
              name: selectedPackage.name,
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
    formMethods.register("package", {
      required: true,
    })
  }, [])

  const handleCreatQRCode = async (data: FormRegistrationData) => {
    if (!selectedPackage) return;
    setIsProcessing(true);
    const orderId = `MEMBER-${Date.now()}`;
    try {
      const response = await fetch("/api/payment/qris", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId,
          grossAmount: selectedPackage.price,
          customerDetails: {
            fullName: data.fullName,
            email: data.email,
            phone: data.phone,
          },
          itemDetails: [
            {
              id: selectedPackage.id,
              price: selectedPackage.price,
              quantity: 1,
              name: selectedPackage.name,
            },
          ],
        }),
      });
      const result = await response.json();
      console.log(result, "qris");
      setDataForm({ ...dataForm, recordPayment: result });
      const transaction_id = result.transaction_id || '';
      setIsProcessing(false);
      toast.success("Berhasil", {
        duration: 3000,
        position: "top-right",
        description: "QR Code telah dibuat. Silakan periksa status pembayaran di halaman pembayaran.",
      })
      if(transaction_id) {
        router.replace(`/register/program/payment?order_id=${orderId}&transaction_id=${transaction_id}&payment_type=gopay`);
        // setShowPayment(true);
      }
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan saat membuat QR Code");
      setIsProcessing(false);
    } finally {
      setIsProcessing(false);
    }
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
          <div className={cn("lg:col-span-2", step <= 3 && !selectedPackage && "lg:col-span-3")}>
            <Card className="animate-reveal shadow-lg transform transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-2xl text-primary">
                  {step === 1 && "Mari berkenalan!"}
                  {step === 2 && "Pilih paket member pilihanmu!"}
                  {step === 3 && "Konfirmasi & Pembayaran"}
                </CardTitle>
                <CardDescription>
                  {step === 1 && "Berikan informasi kontak dan latar belakang Anda"}
                  {step === 2 && "Pilih pilihan paket member yang sesuai dengan minat Anda"}
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
                          className="col-span-1"
                        />
                        <SmartTextField
                          name="instansi"
                          label="Instansi"
                          required
                          validation={{
                            required: true,
                          }}
                          className="col-span-1 mb-4"
                          fullwidth
                          inputProps={{
                            placeholder: "Masukkan nama instansi",
                          }}
                        />
                        <SmartMultiSelect
                          name="interest"
                          label="Pilih minat"
                          validation={{
                            required: true,
                          }}
                          className="col-span-2"
                          options={interestOptions.map((item) => ({
                            value: item.id,
                            label: item.name,
                          }))}
                          commandProps={{
                            className: "col-span-2",
                          }}
                          
                        />
                      </div>
                    </Fragment>
                  )}
                  {/* Step 2: Package Selection */}
                  {step === 2 && (
                    <div className="grid grid-cols-1 gap-2">
                      <h3 className="text-lg font-semibold mb-4 text-primary">Pilih Paket Member</h3>
                      <div className="grid gap-4">
                        {packageOptions.map((pack) => (
                          <div
                            key={pack.id}
                            className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                              dataForm.package === pack.id
                                ? "border-primary/30 bg-primary text-white"
                                : "border-gray-200 hover:border-primary"
                            }`}
                            onClick={() => handleInputChange("package", pack.id)}
                          >
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-semibold text-lg">{pack.name}</h4>
                                <div className={cn("flex flex-col md:flex-row items-start md:items-center gap-4 mt-2 text-sm text-muted-foreground", dataForm.package === pack.id && "text-white")}>
                                  <div className="flex items-center gap-1">
                                    <Clock className="w-4 h-4" />
                                    {pack.duration}
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
                                <div className={cn("text-2xl font-bold text-primary", dataForm.package === pack.id && "text-white")}>
                                  Rp {pack.price.toLocaleString("id-ID")}
                                </div>
                                <div className={cn("text-sm text-muted-foreground", dataForm.package === pack.id && "text-white")}>Total biaya</div>
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
                            <span className="font-medium">{selectedPackage?.name}</span>
                          </div>
                          <Separator />
                          <div className="flex justify-between text-lg font-semibold">
                            <span>Total Biaya:</span>
                            <span className="text-primary">
                              Rp {selectedPackage?.price.toLocaleString("id-ID")}
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
            {selectedPackage && (
              <Card className="animate-reveal shadow-lg transform transition-all duration-300">
                <CardHeader className="flex items-center justify-between">
                  <CardTitle className="text-xl text-primary">Program Terpilih</CardTitle>
                  <Button
                    className="h-full w-6 p-1 hover:cursor-pointer"
                    onClick={() => handleInputChange("package", "")}
                    variant="outline"
                    type="button"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </CardHeader>
                <CardContent>
                  <h4 className="font-semibold text-lg mb-2">{selectedPackage.name}</h4>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      Durasi: {selectedPackage.duration}
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
                      Rp {selectedPackage.price.toLocaleString("id-ID")}
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
