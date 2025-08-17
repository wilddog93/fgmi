import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface MidtransResponse {
  actions: { method: string; name: string; url: string }[];
  currency: string;
  expiry_time: string;
  fraud_status: string;
  gross_amount: string;
  merchant_id: string;
  order_id: string;
  payment_type: string;
  qr_string: string;
  status_code: string;
  status_message: string;
  transaction_id: string;
  transaction_status: string;
  transaction_time: string;
}

export interface FormRegistrationData {
  email: string;
  phone: string;
  fullName: string;
  segmentasi: string;
  instansi: string;
  interest: string[];
  package: string;
  tokenPayment: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  recordPayment?: MidtransResponse;
}

interface UseFormRegistrationStore {
  step: number;
  dataForm: FormRegistrationData;
  setStep: (step: number) => void;
  setDataForm: (data: Partial<FormRegistrationData>) => void;
  reset: () => void;
}

const initialDataForm: FormRegistrationData = {
  email: "",
  phone: "",
  fullName: "",
  segmentasi: "",
  instansi: "",
  interest: [],
  package: "",
  tokenPayment: "",
  recordPayment: undefined,
};

export const useRegistrationForm = create(
  persist<UseFormRegistrationStore>(
    (set, get) => ({
      step: 1,
      dataForm: { ...initialDataForm },
      setStep: (step) => {
        set({ step });
      },
      setDataForm: (data) => {
        set((state) => ({
          dataForm: {
            ...state.dataForm,
            ...data,
          },
        }));
      },
      reset: () => {
        set({
          step: 1,
          dataForm: { ...initialDataForm },
        });
      },
    }),
    {
      name: "member-registration",
    }
  )
);
