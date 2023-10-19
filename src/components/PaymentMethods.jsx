import promptpay from '../img/promptpay.svg'
import { Phone01 } from '@untitled-ui/icons-react'

const paymentMethods = [
  {
    label: 'Bank Transfer',
    value: 'bank-transfer',
    logo: <Phone01 />,
  },
  {
    label: 'QR พร้อมเพย์',
    value: 'qr-promptpay',
    logo: <img src={promptpay} alt='qr-promptpay' />
  }
];

export default function PaymentMethods({
  onChange,
  value,
  error
}) {
  return (
    <fieldset className="w-full">
      <legend className="header-title">เลือกช่องทางชำระเงิน</legend>
      <div className="flex flex-col gap-y-5 items-stretch mt-5 lg:mt-[30px]">
        {paymentMethods.map(({ label, value: nameVal, logo }) => (
          <label key={nameVal} className="relative" onClick={() => onChange(nameVal)}>
            <div className={`h-full flex items-center p-4 gap-x-3 cursor-pointer rounded-md border ${value == nameVal ? "border-[#111111]" : "border-[#E3E3E3]"}`}>
              {logo}
              {label}
            </div>
          </label>
        ))}
      </div>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </fieldset>
  );
}