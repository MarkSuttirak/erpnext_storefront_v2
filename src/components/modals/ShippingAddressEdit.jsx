import { ArrowLeft, MarkerPin01, AlertTriangle, FileCheck02, XClose } from '@untitled-ui/icons-react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Fragment, useEffect, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import chevronDropdown from '../../img/chevron-right.svg'
import TitleHeader from '../../components/TitleHeader'
import { useFrappeGetDoc, useFrappeUpdateDoc, useFrappeGetCall } from 'frappe-react-sdk'
import { useFormik } from 'formik'
import { addressSchema } from '../../components/forms/addressFormSchema';

const districts = ['สวนหลวง','บางกะปิ','สาทร','ลาดกระบัง','บางนา','พระโขนง','วัฒนา','ห้วยขวาง','พระนคร'];
const provinces = ['กรุงเทพมหานคร','ปทุมธานี','สมุทรปราการ']

const EditShippingAddress = ({openUpdate, setOpenUpdate, rowNum}) => {
  const [province, setProvince] = useState('');
  const [modified, setModified] = useState(true);

  const { id } = useParams()

  const { data:dataShipping } = useFrappeGetCall('headless_e_commerce.api.get_addresses', null, `addresses-0`)

  const [isSaving, setIsSaving] = useState(false)

  const formikUpdate = useFormik({
    initialValues: {
      address_line1: dataShipping?.message.address_line1,
      address_line2: dataShipping?.message.address_line2,
      city: dataShipping?.message.city,
      state: dataShipping?.message.state,
      country: dataShipping?.message.country,
      pincode: dataShipping?.message.pincode,
      is_primary_address: 1,
      is_shipping_address: 0,
    },
    // onSubmit: (data) => {
    //   updateDoc('Shipping Address', id, data)
    // }
  })

  const navigate = useNavigate()

  const [openSuccess, setOpenSuccess] = useState(false)
  return (
    <>
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
                          {formikUpdate.errors.state && (
                            <strong className="typography-error-sm text-negative-700 font-medium">{formikUpdate.errors.state}</strong>
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

      <Transition.Root show={openSuccess} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpenSuccess}>
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
                    <Link
                      to="/shipping-address"
                      type="button"
                      className='w-full bg-[#111111] border border-[#111111] text-white rounded-[9px] p-3 text-center'
                    >
                      ตกลง
                    </Link>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  )
}

export default EditShippingAddress