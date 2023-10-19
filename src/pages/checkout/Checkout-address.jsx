import { useState } from "react";
import AddressForm from "../../components/forms/AddressForm";

export default function CheckoutAddress({setCurrentPage}){
  const [modified, setModified] = useState(false)

  const handleClickBack = () => {
    setCurrentPage('checkout')
  }

  return (
    <>
      <header className='p-[14px] border-b border-b-[#F2F2F2] flex gap-x-[7px] text-md font-bold bg-white'>
        <button onClick={handleClickBack} type="button">
          <ArrowLeft />
        </button>
        ใส่ที่อยู่ในการจัดส่ง
      </header>
      <main className='p-5 pb-[100px]'>
        <AddressForm />
      </main>
      <footer className="p-5 fixed bottom-0 w-full">
        <button onClick={() => setOpenSuccess(true)} className={`block mt-[14px] w-1/2 text-white rounded-[9px] p-3 text-center w-full ${!modified ? "bg-[#C5C5C5] border border-[#C5C5C5]" : "bg-[#111111] border border-[#111111]"}`} disabled={!modified}>บันทึกที่อยู่</button>
      </footer>
    </>
  )
}