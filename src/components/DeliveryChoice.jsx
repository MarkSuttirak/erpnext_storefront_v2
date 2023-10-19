const deliveryChoice = [
  {
    label: 'จัดส่งไปยังที่อยู่ของฉัน',
    desc: 'รอรับสินค้าถึงหน้าบ้านรวดเร็วทันใจ',
    value: 'ship-to-my-address',
  },
  {
    label: 'ไปรับที่หน้าร้าน หรือ ที่สาขา',
    desc: 'รับสินค้าของคุณได้ฟรีที่จุดบริการ',
    value: 'ship-to-branch',
  }
];

export default function DeliveryChoice({
  onChange,
  value,
  error
}) {
  return (
    <fieldset className="w-full">
      <legend className="header-title">เลือกวิธีการรับสินค้า</legend>
      <div className="flex flex-col gap-y-5 items-stretch mt-5 lg:mt-[30px]">
        {deliveryChoice.map(({ label, value: nameVal, logo, desc }) => (
          <label key={nameVal} className="relative" onClick={() => onChange(nameVal)}>
            <div className={`h-full flex items-center p-4 gap-x-3 cursor-pointer rounded-md border ${value == nameVal ? "border-[#111111]" : "border-[#E3E3E3]"}`}>
              <h2>{label}</h2>
              <p>{desc}</p>
            </div>
          </label>
        ))}
      </div>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </fieldset>
  );
}