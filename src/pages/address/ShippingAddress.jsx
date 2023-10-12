import { ArrowLeft, MarkerPin01, AlertTriangle, FileCheck02, XClose } from '@untitled-ui/icons-react'
import { Link } from 'react-router-dom'
import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import TitleHeader from '../../components/TitleHeader'
import { useFrappeDeleteDoc, useFrappeDocumentEventListener, useFrappeGetDocList, useFrappeCreateDoc, useFrappeGetCall, useFrappePostCall, useFrappeDeleteCall, useFrappePutCall } from 'frappe-react-sdk'
import NavHeader from '../../components/NavHeader'
import DesktopSidebar from '../../components/desktop/DesktopSidebar'
import { useFormik } from 'formik'
import chevronDropdown from '../../img/chevron-right.svg'
import AddressForm from '../../components/forms/AddressForm'
import { addressSchema } from '../../components/forms/addressFormSchema';

const districts = ['สวนหลวง','บางกะปิ','สาทร','ลาดกระบัง','บางนา','พระโขนง','วัฒนา','ห้วยขวาง','พระนคร'];
const provinces = ['กรุงเทพมหานคร','ปทุมธานี','สมุทรปราการ']

const ShippingAddress = () => {
  const [openAdd, setOpenAdd] = useState(false)
  const [openUpdate, setOpenUpdate] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const [openSuccess, setOpenSuccess] = useState(false)
  const [modified, setModified] = useState(true);
  const [rowNum, setRowNum] = useState(0)

  const { data:dataShipping } = useFrappeGetCall('headless_e_commerce.api.get_addresses', null, `addresses-0`)
  const { call, isCompleted } = useFrappePostCall('headless_e_commerce.api.add_address')
  const { call:callDelete } = useFrappeDeleteCall('headless_e_commerce.api.get_addresses')

  const { data } = useFrappeGetDocList('Address', {
    fields: ['name', 'address_title', 'address_line1', 'address_line2', 'city', 'state', 'country', 'pincode', 'phone']
  })

  const [isSaving, setIsSaving] = useState(false)

  const formik = useFormik({
    initialValues: {
      address_line1: "",
      address_line2: "",
      city: "",
      state: "",
      country: "",
      pincode: "",
      is_primary_address: 1,
      is_shipping_address: 0,
    },
    validationSchema: addressSchema,
    validateOnChange: false,
    onSubmit: call
  });

  const formikUpdate = useFormik({
    initialValues: {
      address_line1: dataShipping?.message[rowNum].address_line1,
      address_line2: dataShipping?.message[rowNum].address_line2,
      city: dataShipping?.message[rowNum].city,
      state: dataShipping?.message[rowNum].state,
      country: dataShipping?.message[rowNum].country,
      pincode: dataShipping?.message[rowNum].pincode,
      is_primary_address: 1,
      is_shipping_address: 0,
    },
    onSubmit: (data) => {
      updateDoc('Shipping Address', id, data)
    }
  })

  const handleDeleteInfo = () => {
    callDelete()
  }

  useFrappeDocumentEventListener((d) => {
    if (d.doctype === 'Shipping Address'){
      mutate()
    }
  })

  const AddressInfo = ({name, address, index}) => {
    return (
      <div className='bg-[#F4F4F4] lg:bg-white lg:border lg:border-[#E3E3E3] p-5 rounded-[7px] h-[126px]'>
        <div className='flex justify-between'>
          {name}
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
        <div className='text-[#8A8A8A] mt-[6px] text-[13px]'>{address}</div>
      </div>
    )
  }

  return (
    <>
      {/* header for mobile version */}
      <div className='lg:hidden'>
        <TitleHeader title="ที่อยู่ของคุณ" link="/my-account" />
      </div>

      {/* main page for desktop version */}
      <main className='px-5 pt-10 mt-[92px] max-w-[1200px] mx-auto box-content hidden lg:flex'>
        <DesktopSidebar />
        <section className='p-5 lg:flex flex-col gap-y-3 lg:gap-y-5 hidden w-full'>
          <div className='flex items-center justify-between'>
            <h2 className='header-title'>ที่อยู่ของฉัน</h2>
            <button onClick={() => setOpenAdd(true)} className='bg-[#F4F4F4] lg:bg-white lg:border lg:border-[#333333] p-5 rounded-[7px] lg:py-3'>
              <div className='flex gap-x-[7px] justify-center'>
                <MarkerPin01 />
                เพิ่มที่อยู่ใหม่
              </div>
            </button>
          </div>
          {(dataShipping?.message ?? []).map((d, index) => 
            <AddressInfo index={index} name={`${d.address_title}`} address={`${d.address_line1} ${d.address_line2} ${d.city} ${d.country}`}/>
          )}
        </section>
      </main>

      {/* main page for mobile version */}
      <main className='p-5 flex flex-col gap-y-[12px] mt-[53px] lg:hidden'>
        {(dataShipping?.message ?? []).map((d, index) => 
          <AddressInfo index={index} name={`${d.address_title}`} address={`${d.address_line1} ${d.address_line2} ${d.city} ${d.country}`}/>
        )}
        <button onClick={() => setOpenAdd(true)} className='bg-[#F4F4F4] p-5 rounded-[7px]'>
          <div className='flex gap-x-[7px] justify-center'>
            <MarkerPin01 />
            เพิ่มที่อยู่ใหม่
          </div>
        </button>
      </main>

      <Transition.Root show={openDelete} as={Fragment}>
        <Dialog as="div" className="relative z-[999]" onClose={setOpenDelete}>
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
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#EC5454]">
                      <AlertTriangle color="white"/>
                    </div>
                    <div className="mt-3 text-center sm:mt-5">
                      <Dialog.Title as="h3" className="text-lg font-bold leading-6 text-[#333333]">
                        คุณต้องการ 'ลบ'<br/>ที่อยู่การจัดส่ง ใช่หรือไม่
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-xs text-[#8A8A8A]">
                          หากคุณกดยืนยันในการลบ<br/>ข้อมูลที่อยู่ของคุณจะถูกลบออกไป
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 grid grid-flow-row-dense grid-cols-2 gap-3">
                    <button
                      type="button"
                      className='w-full bg-white border border-[#111111] text-[#111111] rounded-[9px] p-3 text-center'
                      onClick={() => setOpenDelete(false)}
                    >
                      ยกเลิกการลบ
                    </button>
                    <button
                      type="button"
                      className='w-full bg-[#111111] border border-[#111111] text-white rounded-[9px] p-3 text-center'
                      onClick={handleDeleteInfo}
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
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 py-4 lg:px-8 lg:py-6 text-left shadow-xl transition-all w-full max-w-[600px]">
                  <div className='flex items-center justify-between mb-8'>
                    <h2 className='text-[#333333] text-[20px] font-bold'>เพิ่มที่อยู่ใหม่</h2>
                    <XClose onClick={() => setOpenAdd(false)}/>
                  </div>
                  {!isSaving ? (
                    <AddressForm onSuccess={() => setOpenAdd(false)}/>
                  ) : (
                    <>
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
                        <Link
                          to="/shipping-address"
                          type="button"
                          className='w-full bg-[#111111] border border-[#111111] text-white rounded-[9px] p-3 text-center'
                        >
                          ตกลง
                        </Link>
                      </div>
                    </>
                  )}
                  
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>

      <Transition.Root show={openUpdate} as={Fragment}>
        <Dialog as="div" className="relative z-[999]" onClose={setOpenUpdate}>
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
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 py-4 lg:px-8 lg:py-6 text-left shadow-xl transition-all w-full lg:w-fit max-w-[600px]">
                  <div className='flex items-center justify-between mb-8'>
                    <h2 className='text-[#333333] text-[20px] font-bold'>แก้ไขที่อยู่การจัดส่ง</h2>
                    <XClose onClick={() => setOpenUpdate(false)}/>
                  </div>
                  {!isSaving ? (
                    <form className='flex flex-col gap-y-3' onSubmit={formikUpdate.handleSubmit}>
                      <div className='flex flex-col w-full'>
                        <label htmlFor='address_title'>ชื่อ-นามสกุล</label>
                        <input
                          name="address_title"
                          id="address_title"
                          className="form-input mt-[11px]"
                          onChange={formikUpdate.handleChange}
                          value={formikUpdate.values.address_title}
                          invalid={formikUpdate.errors.address_title}
                        />
                        {formikUpdate.errors.address_title && (
                          <strong className="typography-error-sm text-negative-700 font-medium">กรุณากรอกชื่อผู้รับ</strong>
                        )}
                      </div>
                      <div className='flex flex-col w-full'>
                        <label htmlFor='address_line1'>ที่อยู่ (ห้องเลขที่, ตึก, ถนน)</label>
                        <input
                          name="address_line1"
                          id="address_line1"
                          className="form-input mt-[11px]"
                          onChange={formikUpdate.handleChange}
                          value={formikUpdate.values.address_line1}
                          invalid={formikUpdate.errors.address_line1}
                        />
                        {formikUpdate.errors.address_line1 && (
                          <strong className="typography-error-sm text-negative-700 font-medium">Please provide a street name</strong>
                        )}
                      </div>
                      
                      <div className='lg:flex lg:gap-x-3'>
                        <div className='flex flex-col w-full'>
                          <label htmlFor='state'>จังหวัด</label>
                          <select name="state" id='state' placeholder="-- Select --" className='form-input mt-[11px] appearance-none' style={{backgroundImage:"url(" + chevronDropdown + ")",backgroundPosition:"right 0.5rem center",backgroundRepeat:"no-repeat"}} onChange={formikUpdate.handleChange} value={formikUpdate.values.state} invalid={formikUpdate.errors.state}>
                            {provinces.map((province) => (
                              <option key={province} value={province}>{province}</option>
                            ))}
                          </select>
                          {formik.errors.state && (
                            <strong className="typography-error-sm text-negative-700 font-medium">{formik.errors.state}</strong>
                          )}
                        </div>
                        <div className='flex flex-col w-full'>
                          <label htmlFor='city'>เมือง / เขต</label>
                          <select name="city" id='city' className='form-input mt-[11px] appearance-none' placeholder="-- Select --" style={{backgroundImage:"url(" + chevronDropdown + ")",backgroundPosition:"right 0.5rem center",backgroundRepeat:"no-repeat"}} onChange={formikUpdate.handleChange} value={formikUpdate.values.city}>
                            {districts.map((district) => (
                              <option key={district} value={district}>{district}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                
                      <div className='lg:flex lg:gap-x-3'>
                        <div className='flex flex-col w-full'>
                          <label htmlFor='pincode'>รหัสไปรษณีย์</label>
                          <input name="pincode" id='pincode' className='form-input mt-[11px]' placeholder="eg. 12345" onChange={formikUpdate.handleChange} value={formikUpdate.values.pincode} />
                        </div>
                        <div className='flex flex-col w-full'>
                          <label htmlFor='phone'>เบอร์โทรศัพท์</label>
                          <input className='form-input mt-[11px]' id='phone' name='phone' value={formikUpdate.values.phone} onChange={formikUpdate.handleChange} type='tel'/>
                        </div>
                      </div>
                      <div className="w-full flex gap-4 mt-4 justify-center">
                        <button type='submit' className={`block mt-[14px] w-1/2 text-white rounded-[9px] p-3 text-center w-full bg-[#111111] border border-[#111111] lg:max-w-[200px]`}>บันทึกที่อยู่</button>
                      </div>
                    </form>
                  ) : (
                    <>
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
                        <Link
                          to="/shipping-address"
                          type="button"
                          className='w-full bg-[#111111] border border-[#111111] text-white rounded-[9px] p-3 text-center'
                        >
                          ตกลง
                        </Link>
                      </div>
                    </>
                  )}
                  
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  )
}

export default ShippingAddress