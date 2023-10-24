import promptpay from '../img/promptpay.svg'
import shopeepay from '../img/shopee-pay.svg'
import rabbitlinepay from '../img/rabbit-line-pay.svg'
import truemoney from '../img/truemoney.svg'
import { Check, CreditCard02, Phone01, Scan } from '@untitled-ui/icons-react'

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
  },
  {
    label: 'True Money Wallet',
    value: 'true-money',
    logo: <img src={truemoney} alt='truemoney' />
  },
  {
    label: 'Rabbit Line Pay',
    value: 'rabbitlinepay',
    logo: <img src={rabbitlinepay} alt='rabbit-line-pay' />
  },
  {
    label: 'Shopee Pay',
    value: 'shopeepay',
    logo: <img src={shopeepay} alt='shopeepay' />
  },
  {
    label: 'เครดิตการ์ด',
    value: 'เครดิตการ์ต',
    logo: <CreditCard02 />
  },
  {
    label: 'Bill Payment',
    value: 'bill-payment',
    logo: <Scan />
  },
];

export default function PaymentMethods({onChange, value, error}) {
  return (
    <fieldset className="w-full">
      <legend className="header-title flex gap-x-[7px] items-center">
        <CreditCard02 />
        เลือกช่องทางชำระเงิน
      </legend>
      <div className="flex flex-col gap-y-5 items-stretch mt-5 lg:mt-[30px]">
        {paymentMethods.map(({ label, value: nameVal, logo }) => (
          <label key={nameVal} className="relative" onClick={() => onChange(nameVal)}>
            <div className={`h-full flex items-center p-4 justify-between cursor-pointer rounded-md border ${value == nameVal ? "border-[#111111]" : "border-[#E3E3E3]"}`}>
              <div className='flex gap-x-3'>
                {logo}
                {label}
              </div>
              <div className={`w-6 h-6 rounded-full border flex items-center justify-center ${value == nameVal ? 'bg-[#111111] border-[#111111]' : 'bg-white border-[#E3E3E3]'}`}>
                <Check color="#FFFFFF" viewBox='0 0 24 24' width='20' height='20'/>
              </div>
            </div>
          </label>
        ))}
      </div>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </fieldset>
  );
}