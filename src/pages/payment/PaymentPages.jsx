import { ArrowLeft, MarkerPin01, AlertTriangle, FileCheck02, XClose } from '@untitled-ui/icons-react'
import { Link } from 'react-router-dom'
import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import TitleHeader from '../../components/TitleHeader'
import { useFrappeDeleteDoc, useFrappeDocumentEventListener, useFrappeGetDocList, useFrappeCreateDoc, useFrappeGetCall, useFrappePostCall, useFrappeDeleteCall, useFrappePutCall } from 'frappe-react-sdk'
import NavHeader from '../../components/NavHeader'
import DesktopSidebar from '../../components/desktop/DesktopSidebar'
import { useFormik } from 'formik'
import visaIcon from '../../img/visa-icon.svg'
import AddCreditCard from '../../components/modals/CreditCardAdd'
import EditCreditCard from '../../components/modals/CreditCardEdit'
import DeleteCreditCard from '../../components/modals/CreditCardDelete'

const districts = ['สวนหลวง','บางกะปิ','สาทร','ลาดกระบัง','บางนา','พระโขนง','วัฒนา','ห้วยขวาง','พระนคร'];
const provinces = ['กรุงเทพมหานคร','ปทุมธานี','สมุทรปราการ']

export default function PaymentPages(){
  const [openAdd, setOpenAdd] = useState(false)
  const [openUpdate, setOpenUpdate] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const [openSuccess, setOpenSuccess] = useState(false)
  const [modified, setModified] = useState(true);
  const [rowNum, setRowNum] = useState(0)

  const [isSaving, setIsSaving] = useState(false)

  // const formik = useFormik({
  //   initialValues: {
  //     address_line1: "",
  //     address_line2: "",
  //     city: "",
  //     state: "",
  //     country: "",
  //     pincode: "",
  //     is_primary_address: 1,
  //     is_shipping_address: 0,
  //   },
  //   validationSchema: addressSchema,
  //   validateOnChange: false,
  //   onSubmit: call
  // });

  // const formikUpdate = useFormik({
  //   initialValues: {
  //     address_line1: dataShipping?.message[rowNum].address_line1,
  //     address_line2: dataShipping?.message[rowNum].address_line2,
  //     city: dataShipping?.message[rowNum].city,
  //     state: dataShipping?.message[rowNum].state,
  //     country: dataShipping?.message[rowNum].country,
  //     pincode: dataShipping?.message[rowNum].pincode,
  //     is_primary_address: 1,
  //     is_shipping_address: 0,
  //   },
  //   onSubmit: (data) => {
  //     updateDoc('Shipping Address', id, data)
  //   }
  // })

  useFrappeDocumentEventListener((d) => {
    if (d.doctype === 'Shipping Address'){
      mutate()
    }
  })

  const PaymentInfo = ({name, cardNum, index, icon}) => {
    return (
      <div className='bg-[#F4F4F4] lg:bg-white lg:border lg:border-[#E3E3E3] p-5 rounded-[7px] h-[126px]'>
        <div className='flex justify-between'>
          <div className='flex items-center gap-x-[10px]'>
            <img src={icon} />
            {name}
          </div>
          <div className='flex gap-x-4'>
            <button onClick={() => {
              setRowNum(index);
              setOpenUpdate(true)
            }}>แก้ไข</button>
            <button onClick={() => {
              setOpenDelete(true)
              setRowNum(index)
            }}>ลบ</button>
          </div>
        </div>
        <div className='text-[#8A8A8A] mt-[6px] text-[13px]'>{cardNum}</div>
      </div>
    )
  }

  return (
    <>
      {/* header for mobile version */}
      <div className='lg:hidden'>
        <TitleHeader title="การชำระเงิน" link="/my-account" />
      </div>

      {/* main page for desktop version */}
      <main className='px-5 pt-10 mt-[92px] desktop-sec hidden lg:flex'>
        <DesktopSidebar />
        <section className='p-5 lg:flex flex-col gap-y-3 lg:gap-y-5 hidden w-full'>
          <div className='flex items-center justify-between'>
            <h2 className='header-title'>การชำระเงิน</h2>
            <button onClick={() => setOpenAdd(true)} className='bg-[#F4F4F4] lg:bg-white lg:border lg:border-[#333333] p-5 rounded-[7px] lg:py-3'>
              <div className='flex gap-x-[7px] justify-center'>
                <MarkerPin01 />
                เพิ่มบัตรเครดิตการ์ด
              </div>
            </button>
          </div>
          <PaymentInfo index={0} name={`John Persson`} cardNum={`5689 **** 1234`} icon={visaIcon}/>
        </section>
      </main>

      {/* main page for mobile version */}
      <main className='p-5 flex flex-col gap-y-[12px] mt-[53px] lg:hidden'>
        <PaymentInfo index={0} name={`John Persson`} cardNum={`5689 **** 1234`} icon={visaIcon}/>
        <button onClick={() => setOpenAdd(true)} className='bg-[#F4F4F4] p-5 rounded-[7px]'>
          <div className='flex gap-x-[7px] justify-center'>
            <MarkerPin01 />
            เพิ่มบัตรเครดิตการ์ด
          </div>
        </button>
      </main>

      <Transition.Root show={openSuccess} as={Fragment}>
        <Dialog as="div" className="relative z-[999]" onClose={setOpenSuccess}>
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
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all w-full max-w-md">
                  <div>
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#00B14F]">
                      <FileCheck02 color="white"/>
                    </div>
                    <div className="mt-3 text-center sm:mt-5">
                      <Dialog.Title as="h3" className="text-lg font-bold leading-6 text-[#333333]">
                        บันทึกที่อยู่ เรียบร้อยแล้ว
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-xs text-[#8A8A8A]">
                        คุณได้ทำการบันทึกที่อยู่เรียบร้อยแล้ว<br/> หากต้องการเปลี่ยนแปลงข้อมูลสามารถแก้ไขได้
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6">
                    <button
                      type="button"
                      className='w-full bg-[#111111] border border-[#111111] text-white rounded-[9px] p-3 text-center'
                      onClick={() => setOpenSuccess(false)}
                    >
                      ยืนยันการลบ
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>

      <AddCreditCard openAdd={openAdd} setOpenAdd={setOpenAdd}/>
      <EditCreditCard openUpdate={openUpdate} setOpenUpdate={setOpenUpdate}/>
      <DeleteCreditCard openDelete={openDelete} setOpenDelete={setOpenDelete}/>
    </>
  )
}