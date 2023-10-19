import AddressCard from "./AddressCard";
import { useFrappeGetCall } from "frappe-react-sdk";
import EditShippingAddress from "./modals/ShippingAddressEdit";
import { useState } from "react";

export default function AddressOptions({
  value,
  onChange,
  error
}) {
  const { data } = useFrappeGetCall('headless_e_commerce.api.get_addresses', null, `addresses-0`)
  const [openUpdate, setOpenUpdate] = useState(false)

  return (
    <>
      <div className="flex flex-col w-full gap-4 lg:gap-6">
        {data?.message?.map(({ name: nameVal, address_title, address_line2 = null, city, state, country }) => (
          <div className="relative">
            <label key={nameVal} className="relative w-full" onClick={(e) => {
              e.preventDefault();
              onChange(nameVal)
            }}>
              <div className={`cursor-pointer rounded-md -outline-offset-2 ${value == nameVal ? "border border-black" : "border border-transparent"}`}>
                <AddressCard title={address_title} addressLine2={address_line2} city={city} state={state === "Select One" ? null : state} country={country} />
              </div>
            </label>
            <div className="absolute top-[22px] right-[18px] flex gap-x-5">
              <button className="font-bold text-sm text-[#333333]" onClick={(e) => {
                e.preventDefault();
                setOpenUpdate(true);
              }}>แก้ไข</button>
              <button className="font-bold text-sm text-[#333333]">ลบ</button>
            </div>
          </div>
        ))}
      </div>
      {
        error && <p className="text-negative-600">Please select an address</p>
      }

      <EditShippingAddress setOpenUpdate={setOpenUpdate} openUpdate={openUpdate}/>
    </>
  );
}