"use client"

import React, { Fragment, useCallback, useEffect, useState } from "react"
import { Shield, CheckCircle, Award, CreditCard, X, SearchIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { useForm, useWatch } from "react-hook-form"
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

import axios from "axios";
import { MembershipPackage } from "@/lib/types"
import { useDebounce } from "@/lib/hooks/use-debounce"
import { truncateString } from "@/lib/utils/string"

const interestOptions = [
  { id: "Geophysics", name: "Geophysics" },
  { id: "Geology", name: "Geology" },
  { id: "Geochemistry", name: "Geochemistry" },
  { id: "Geotechnical", name: "Geotechnical" },
  { id: "Environmental", name: "Environmental" },
  { id: "Others", name: "Others" }
]

const segmentasiOptions = [
  { id: "STUDENT", name: "Student" },
  { id: "FRESH_GRADUATE", name: "Fresh Graduate" },
  { id: "PROFESSIONAL", name: "Professional" },
]

export default function MemberRegistration() {
  const APIUrl = process.env.NEXT_PUBLIC_API_URL! || 'http://localhost:4001/v1'
  const router = useRouter();
  const { step, dataForm, setStep, setDataForm, reset } = useRegistrationForm();
  const [membershipPackages, setMembershipPackages] = useState<MembershipPackage[]>();

  const axiosInstance = axios.create({
    baseURL: APIUrl,
  });

  const getMembershipPackages = async () => {
    try {
      const { status, data } = await axiosInstance.get('/memberships', {
        headers: {
          'Content-Type': 'application/json',
        },
        params: {
          limit: 10,
          page: 1,
        }
      });
      if(status !== 200) {
        throw new Error('Error fetching membership packages');
      }
      setMembershipPackages(data?.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getMembershipPackages();
  }, []);


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
  const selectedPackage = membershipPackages &&  membershipPackages.find((b) => b.id === dataForm.membershipPackage);

  const isEmail = useWatch({
    name: "email",
    control,
  });

  const [isSearching, setIsSearching] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [userRegistered, setUserRegistered] = useState<any[]>([]);
  const selectedUser = userRegistered?.find((item) => item.email === isEmail);

  const debounceEmail = useDebounce(dataForm.email, 1500);

  const getEmailRegistration = async (search: string) => {
    if(!search) return;
    setIsSearching(true);
    try {
      const { status, data } = await axiosInstance.get(`/payment/check/email-register-member`, {
        headers: {
          'Content-Type': 'application/json',
        },
        params: {
          email: search,
        },
      });
      if(status !== 200) {
        throw new Error('Error fetching email');
      }
      if(!data) {
        return;
      }
      console.log({ data }, 'data-email');
      if(data?.type === "user" || data?.type === "member") {
        const { type, result } = data;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const resMember = result?.map((item: any) => ({
          ...item,
          phone: item?.phone ?? '',
          source: "MEMBER",
          segment: item.segment ?? '',
          institution: item.institution ?? '',
        }));

        if(type === "user") {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const res = result?.map((item: any) => ({
            ...item,
            phone: item.member?.phone ?? '',
            source: !item.member ? "NON-MEMBER" : "MEMBER",
            segment: item.member?.segment ?? '',
            institution: item.member?.institution ?? '',
          }));
          setUserRegistered(res);
        } else {
          setUserRegistered(resMember);
        }
      } else {
        setUserRegistered([]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSearching(false);
    }
  };

  useEffect(() => {
    getEmailRegistration(debounceEmail);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceEmail]);

  const handleInputChange = (field: keyof FormRegistrationData, value: string) => {
    setDataForm({ ...dataForm, [field]: value })
  }

  const handleNextStep = useCallback(() => {
    if (step < 3) {
      setStep(step + 1)
      setDataForm({ 
        ...dataForm, 
        name: watch("name"),
        email: watch("email"),
        phone: watch("phone"),
        segment: watch("segment"),
        institution: watch("institution"),
        interestAreas: watch("interestAreas"),
        studentId: watch("studentId"),
        degree: watch("degree"),
        membershipPackage: watch("membershipPackage"),
      })
    }
  }, [step, dataForm, watch])

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const disabledStep = (step: number): boolean => {
    const isValidStepOne = !watch("email") || !watch("name") || !watch("phone");
    const isValidStepTwo = !isValid;
    if(step === 1) {
      return isValidStepOne ? true : false
    }
    if(step === 2) {
      return isValidStepTwo ? true : false
    }
    return true
  }

  const onSubmitNewPayment = async(data: FormRegistrationData) => {
    if (!selectedPackage) return;
    // console.log({ form: data, programs: selectedPackage }, 'form data');
    setIsProcessing(true);
    try {
      const response = await axiosInstance.post('/payment/checkout/member/snap',
        {
          membershipPackageId: selectedPackage.id,
          name: data.name,
          email: data.email,
          phone: data.phone,
          segment: data.segment,
          studentId: data.studentId,
          degree: data.degree,
          institution: data.institution,
          interestAreas: data.interestAreas,
          method: "QRIS",
        },
      )

      if (response.status !== 200 && response.status !== 201) {
        const text = response.data;
        throw new Error(`API Error: ${text}`);
      }
      const result = await response.data;
      // by snap
      console.log(result, 'result');
      router.replace(`/register/member/payment?order_id=${result?.orderId}&token=${result?.midtrans?.token}&payment_type=snap`);
      setDataForm({ ...data, tokenPayment: result?.midtrans?.token });
      // by gopay coreApi
      // router.replace(`/register/program/payment?order_id=${result?.midtrans?.order_id}&payment_type=gopay`);
      // setDataForm({ ...data, recordPayment: result?.midtrans });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (errors: any) {
      toast.error("Transaksi gagal", {
        duration: 3000,
        position: "top-right",
        description: errors?.response?.data?.message || errors.message || "Terjadi kesalahan saat membuat transaksi",
      });
      // alert("Terjadi kesalahan saat membuat transaksi");
    } finally {
      setIsProcessing(false);
    }
  }

  useEffect(() => {
    if(!selectedUser) return;
    setValue('email', selectedUser?.email || dataForm.email);
    setValue('phone', selectedUser?.phone || dataForm.phone);
    setValue('name', selectedUser?.name || dataForm.name);
    setValue('segment', selectedUser?.segment || dataForm.segment);
    setValue('institution', selectedUser?.institution || dataForm.institution);
  }, [selectedUser]);

  useEffect(() => {
    if(dataForm) {
      formMethods.reset(dataForm);
    }
  }, [dataForm])

  useEffect(() => {
    formMethods.register("membershipPackage", {
      required: {
        value: true,
        message: "Pilih paket keanggotaan",
      },
    })
  }, [])

  const isUser = selectedUser;

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
                  onSubmit={onSubmitNewPayment}
                  // onSubmit={handleCreatQRCode}
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
                        <SmartSelectSingle
                          name="email"
                          button={{
                            label: "Email",
                            props: {
                              className: "w-full",
                            },
                          }}
                          command={{
                            options: userRegistered?.map((item) => ({
                              value: item?.email,
                              label: item?.email,
                            })),
                            addItem:  userRegistered?.length > 0 ? {
                              enable: false,
                              description: "Email sudah terdaftar di sistem",
                            } : {
                              enable: true,
                              description: "Tambah email baru",
                            },
                            onInputSearchChange: (search: string) => {
                              setDataForm({ ...dataForm, email: search });
                            },
                            isLoading: isSearching,
                            textNotFound: "Email tidak ditemukan",
                          }}
                          className="col-span-2"
                          Icon={(props) => <SearchIcon {...props} className={cn('w-4 h-4')} />}
                          textHelper={isUser ? `Email sudah terdaftar di sistem sebagai ${selectedUser?.source?.toLowerCase()}` : ''}
                        />
                        <SmartTextField
                          name="name"
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
                          name="segment"
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
                            }))
                          }}
                          className=""
                        />
                        <SmartTextField
                          name="institution"
                          label="Instansi/Institusi"
                          className="mb-4"
                          fullwidth
                          inputProps={{
                            placeholder: "Masukkan nama instansi/institusi",
                          }}
                        />

                        <SmartTextField
                          name="studentId"
                          label="NIM (Nomor Induk Mahasiswa)"
                          className="mb-4"
                          fullwidth
                          inputProps={{
                            placeholder: "Masukkan Nomor Induk Mahasiswa",
                          }}
                        />

                        <SmartTextField
                          name="degree"
                          label="Program Studi"
                          className="mb-4"
                          fullwidth
                          inputProps={{
                            placeholder: "Masukkan program studi Anda",
                          }}
                        />

                        <SmartMultiSelect
                          name="interestAreas"
                          label="Pilih minat"
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
                  {/* Step 2: Bootcamp Selection */}
                  {step === 2 && (
                    <div className="grid grid-cols-1 gap-2">
                      <h3 className="text-lg font-semibold mb-4 text-primary">Pilih Keanggotaan</h3>
                      <div className="grid gap-4">
                        {membershipPackages && membershipPackages?.length > 0 && membershipPackages.map((item, index) => (
                        console.log({ item }, 'item'),
                          <div
                            key={item.id || index}
                            className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                              dataForm.membershipPackage === item.id
                                ? "border-primary/30 bg-primary text-white"
                                : "border-gray-200 hover:border-primary"
                            }`}
                            onClick={() => handleInputChange("membershipPackage", item.id)}
                          >
                            <div className="flex justify-between items-start">
                              <div className="flex flex-col gap-2">
                                <h4 className="font-semibold text-lg">{item.name}</h4>
                                <div className={cn("text-xs text-muted-foreground", dataForm.membershipPackage === item.id && "text-white")}>{item.description ? truncateString(item.description, 30) : '-'}</div>
                                <div className={cn("flex flex-col md:flex-row items-start md:items-center gap-4 text-xs text-muted-foreground", dataForm.membershipPackage === item.id && "text-white")}> 
                                  <div className="flex items-center gap-1">
                                    <Award className="w-4 h-4" />
                                    {item.description ? item.description : '-'}
                                  </div>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className={cn("text-2xl font-bold text-primary", dataForm.membershipPackage === item.id && "text-white")}>
                                  Rp {item.price.toLocaleString("id-ID") || '0'}
                                </div>
                                <div className={cn("text-sm text-muted-foreground", dataForm.membershipPackage === item.id && "text-white")}>Total biaya</div>
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
                              {dataForm.name}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Email:</span>
                            <span className="font-medium">{dataForm.email}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Keanggotaan:</span>
                            <span className="font-medium">{selectedPackage?.name}</span>
                          </div>
                          <Separator />
                          <div className="flex justify-between text-lg font-semibold">
                            <span>Total Biaya:</span>
                            <span className="text-primary">
                              Rp {selectedPackage?.price.toLocaleString("id-ID") || '0'}
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
                        onClick={handleSubmit(onSubmitNewPayment)}
                        // onClick={handleSubmit(handleCreatQRCode)}
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
                    onClick={() => handleInputChange("membershipPackage", "")}
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
                      {selectedPackage.description ? selectedPackage.description : '-'}
                    </div>
                  </div>
                  <Separator className="my-4" />
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">
                      Rp {selectedPackage.price.toLocaleString("id-ID") || '0'}
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
