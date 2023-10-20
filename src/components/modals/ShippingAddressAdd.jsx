import { ArrowLeft, MarkerPin01, AlertTriangle, FileCheck02, XClose } from '@untitled-ui/icons-react'
import { Link } from 'react-router-dom'
import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import TitleHeader from '../TitleHeader'
import { useFrappePostCall } from 'frappe-react-sdk'
import { useFormik } from 'formik'
import { addressSchema } from '../forms/addressFormSchema';
import AddressForm from '../forms/AddressForm'
import SavingModal from './SavingModal'

const districts = ['สวนหลวง','บางกะปิ','สาทร','ลาดกระบัง','บางนา','พระโขนง','วัฒนา','ห้วยขวาง','พระนคร'];
const provinces = ['กรุงเทพมหานคร','ปทุมธานี','สมุทรปราการ']

export default function AddShippingAddress({openAdd, setOpenAdd}){
  const [isSaving, setIsSaving] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false);

  const saveData = () => {
    setOpenAdd(false);
    setIsSaving(true);
  }

  const completeSave = () => {
    setIsSaving(true);
    setIsCompleted(true);
    setTimeout(() => {
      setIsSaving(false)
    }, 2000)
    setTimeout(() => {
      setIsCompleted(false)
    }, 3000)
  }
  
  return (
    <>
      <Transition.Root show={openAdd} as={Fragment}>
        <Dialog as="div" className="relative z-[999]" onClose={setOpenAdd}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-8 py-6 text-left shadow-xl transition-all w-full max-w-[600px]">
                  <div className='flex items-center justify-between mb-8'>
                    <h2 className='text-[#333333] text-[20px] font-bold'>เพิ่มที่อยู่ใหม่</h2>
                    <XClose onClick={() => setOpenAdd(false)}/>
                  </div>
                  <AddressForm onSuccess={completeSave} onSave={saveData} data={{
                    address_title: "",
                    address_line1: "",
                    address_line2: "",
                    city: provinces[0],
                    state: districts[0],
                    country: "Thailand",
                    pincode: "",
                    phone:"",
                    is_primary_address: 0,
                    is_shipping_address: 1,
                  }}/>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>

      <SavingModal isSaving={isSaving} setIsSaving={setIsSaving} isCompleted={isCompleted} setIsCompleted={setIsCompleted}/>
    </>
  )
}