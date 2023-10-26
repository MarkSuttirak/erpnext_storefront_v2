import { Truck01 } from '@untitled-ui/icons-react';
import ninjavan from '../img/ninjavan.png'
import thailandpost from '../img/thailandpost.png'

const shippingOptions = [
  {
    label: 'จัดส่งด่วน EMS',
    value: 'จัดส่งด่วน-EMS',
    desc: '1-2 วันทำการ',
    logo: <img src={ninjavan} alt='ninjavan' />,
    price: '฿ 59.00'
  },
  {
    label: 'จัดส่งปกติ',
    value: 'จัดส่งปกติ',
    desc: '3-4 วันทำการ',
    logo: <img src={thailandpost} alt='thailandpost' />,
    price: '& 35.00'
  }
];

export default function ShippingOptions({
  onChange,
  value,
  error
}) {
  return (
    <fieldset className="w-full">
      <legend className="header-title flex gap-x-[7px] items-center">
        <Truck01 />
        เลือกการขนส่ง
      </legend>
      <div className="flex flex-col gap-y-5 items-stretch mt-5 lg:mt-[30px]">
        {shippingOptions.map(({ label, value: nameVal, logo, desc, price }) => (
          <label key={nameVal} className="relative" onClick={() => onChange(nameVal)}>
            <div className={`h-full flex items-start justify-between p-4 gap-x-3 cursor-pointer rounded-md border ${value == nameVal ? "border-[#111111]" : "border-[#E3E3E3]"}`}>
              <div className='flex gap-x-4 items-center'>
                {logo}
                <div>
                  <h2 className="text-[#333333] font-bold">{label}</h2>
                  <p className="text-[#8A8A8A] text-sm mt-[6px]">{desc}</p>
                </div>
              </div>
              <p className='text-sm price'>{price}</p>
            </div>
          </label>
        ))}
      </div>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </fieldset>
  );
}