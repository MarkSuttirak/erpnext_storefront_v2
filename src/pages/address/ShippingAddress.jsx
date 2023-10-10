import { ArrowLeft, MarkerPin01, AlertTriangle, FileCheck02, XClose } from '@untitled-ui/icons-react'
import { Link } from 'react-router-dom'
import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import TitleHeader from '../../components/TitleHeader'
import { useFrappeDeleteDoc, useFrappeDocumentEventListener, useFrappeGetDocList, useFrappeCreateDoc } from 'frappe-react-sdk'
import NavHeader from '../../components/NavHeader'
import DesktopSidebar from '../../components/DesktopSidebar'
import { useFormik } from 'formik'
import chevronDropdown from '../../img/chevron-right.svg'

const ShippingAddress = () => {
  const [openAdd, setOpenAdd] = useState(false)
  const [openUpdate, setOpenUpdate] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const [openSuccess, setOpenSuccess] = useState(false)
  const [modified, setModified] = useState(true);
  const [rowNum, setRowNum] = useState(0)

  const { data, loading, error, mutate } = useFrappeGetDocList('Shipping Address', {
    fields: ['name', 'first_name', 'surname', 'address', 'province', 'district', 'postal_code', 'phone_number']
  })

  const [isSaving, setIsSaving] = useState(false)

  const { createDoc } = useFrappeCreateDoc()

  const formik = useFormik({
    initialValues: {
      first_name:'',
      surname:'',
      address:'',
      province:'',
      district:'',
      postal_code:'',
      phone_number:''
    },
    onSubmit: (data) => {
      createDoc('Shipping Address', data)
    }
  })

  const formikUpdate = useFormik({
    initialValues: {
      first_name:data?.first_name,
      surname:data?.surname,
      address:data?.address,
      province:data?.province,
      district:data?.district,
      postal_code:data?.postal_code,
      phone_number:data?.phone_number
    },
    onSubmit: (data) => {
      updateDoc('Shipping Address', id, data)
    }
  })

  const { deleteDoc } = useFrappeDeleteDoc()

  const handleDeleteInfo = () => {
    deleteDoc('Shipping Address', data && data[rowNum].name)
    .then(() => mutate())
    setOpenDelete(false)
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

      {/* header for desktop version */}
      <div className='hidden lg:block'>
        <NavHeader />
      </div>

      {/* main page for desktop version */}
      <main className='px-5 pt-10 mt-[92px] max-w-[1200px] mx-auto hidden lg:flex'>
        <DesktopSidebar />
        <section className='p-5 lg:flex flex-col gap-y-3 lg:gap-y-5 mt-[53px] hidden w-full'>
          <div className='flex items-center justify-between'>
            <h2 className='text-[#333333] text-[22px] font-bold'>โปรไฟล์ของฉัน</h2>
            <button onClick={() => setOpenAdd(true)} className='bg-[#F4F4F4] lg:bg-white lg:border lg:border-[#333333] p-5 rounded-[7px] lg:py-3'>
              <div className='flex gap-x-[7px] justify-center'>
                <MarkerPin01 />
                เพิ่มที่อยู่ใหม่
              </div>
            </button>
          </div>
          {(data ?? []).map((d, index) => 
            <AddressInfo index={index} name={`${d.first_name} ${d.surname}`} address={`${d.address} ${d.district} ${d.province} ${d.postal_code}`}/>
          )}
          <AddressInfo index={0} name={`Max Schmidt`} address={`Frankfurt am Main, Deutschland`}/>
        </section>
      </main>

      {/* main page for mobile version */}
      <main className='p-5 flex flex-col gap-y-[12px] mt-[53px] lg:hidden'>
        {(data ?? []).map((d, index) => 
          <AddressInfo index={index} name={`${d.first_name} ${d.surname}`} address={`${d.address} ${d.district} ${d.province} ${d.postal_code}`}/>
        )}
        <AddressInfo index={0} name={`Max Schmidt`} address={`Frankfurt am Main, Deutschland`}/>
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
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 py-4 lg:px-8 lg:py-6 text-left shadow-xl transition-all w-full lg:w-fit max-w-[600px]">
                  <div className='flex items-center justify-between mb-8'>
                    <h2 className='text-[#333333] text-[20px] font-bold'>เพิ่มที่อยู่ใหม่</h2>
                    <XClose onClick={() => setOpenAdd(false)}/>
                  </div>
                  {!isSaving ? (
                    <form className='flex flex-col gap-y-3' onSubmit={formik.handleSubmit}>
                      <div className='lg:flex lg:gap-x-3'>
                        <div className='flex flex-col w-full'>
                          <label htmlFor='first_name'>ชื่อผู้รับ</label>
                          <input className='border border-[#E3E3E3] rounded-[8px] outline-none py-2 px-3 mt-[11px]' id='first_name' name='first_name' type='text' value={formik.values.first_name} onChange={formik.handleChange}/>
                        </div>

                        <div className='flex flex-col w-full'>
                          <label htmlFor='surname'>นามสกุล</label>
                          <input className='border border-[#E3E3E3] rounded-[8px] outline-none py-2 px-3 mt-[11px]' id='surname' name='surname' type='text' value={formik.values.surname} onChange={formik.handleChange}/>
                        </div>
                      </div>

                      <div className='flex flex-col w-full'>
                        <label htmlFor='address'>ที่อยู่ (ห้องเลขที่, ตึก, ถนน)</label>
                        <input className='border border-[#E3E3E3] rounded-[8px] outline-none py-2 px-3 mt-[11px]' id='address' name='address' type='text' value={formik.values.address} onChange={formik.handleChange}/>
                      </div>

                      <div className='lg:flex lg:gap-x-3'>
                        <div className='flex flex-col w-full'>
                          <label htmlFor='province'>จังหวัด</label>
                          <select className='border border-[#E3E3E3] rounded-[8px] outline-none py-2 pl-3 pr-10 mt-[11px] appearance-none' defaultValue='กรุงเทพมหานคร' value={formik.values.province} onChange={formik.handleChange} id='province' name='province' style={{backgroundImage:"url(" + chevronDropdown + ")",backgroundPosition:"right 0.5rem center",backgroundRepeat:"no-repeat"}}>
                            <option value='กรุงเทพมหานคร'>กรุงเทพมหานคร</option>
                            <option value='สมุทรปราการ'>สมุทรปราการ</option>
                            <option value='สมุทรสาคร'>สมุทรสาคร</option>
                            <option value='ปทุมธานี'>ปทุมธานี</option>
                          </select>
                        </div>

                        <div className='flex flex-col w-full'>
                          <label htmlFor='district'>เมือง / เขต</label>
                          <select className='border border-[#E3E3E3] rounded-[8px] outline-none py-2 pl-3 pr-10 mt-[11px] appearance-none' id='district' name='district' defaultValue='สวนหลวง' value={formik.values.district} onChange={formik.handleChange} style={{backgroundImage:"url(" + chevronDropdown + ")",backgroundPosition:"right 0.5rem center",backgroundRepeat:"no-repeat"}}>
                            <option value='สวนหลวง'>สวนหลวง</option>
                            <option value='บางกะปิ'>บางกะปิ</option>
                            <option value='บางนา'>บางนา</option>
                            <option value='ห้วยขวาง'>ห้วยขวาง</option>
                          </select>
                        </div>
                      </div>

                      <div className='lg:flex lg:gap-x-3'>
                        <div className='flex flex-col w-full'>
                          <label htmlFor='postal_code'>รหัสไปรษณีย์</label>
                          <input className='border border-[#E3E3E3] rounded-[8px] outline-none py-2 px-3 mt-[11px]' id='postal_code' name='postal_code' value={formik.values.postal_code} onChange={formik.handleChange} type='text'/>
                        </div>

                        <div className='flex flex-col w-full'>
                          <label htmlFor='phone_number'>เบอร์โทรศัพท์</label>
                          <input className='border border-[#E3E3E3] rounded-[8px] outline-none py-2 px-3 mt-[11px]' id='phone_number' name='phone_number' value={formik.values.phone_number} onChange={formik.handleChange} type='tel'/>
                        </div>
                      </div>
            
                      <footer className="pt-5 w-full lg:flex lg:w-[400px] lg:mx-auto lg:gap-x-3">
                        <button onClick={(e) => {e.preventDefault();setOpenAdd(false)}} className={`block w-1/2 text-black rounded-[9px] p-3 text-center w-full bg-white border border-black`}>ยกเลิก</button>
                        <button type='submit' onClick={() => setOpenSuccess(true)} className={`block w-1/2 text-white rounded-[9px] p-3 text-center w-full ${!modified ? "bg-[#C5C5C5] border border-[#C5C5C5]" : "bg-[#111111] border border-[#111111]"}`} disabled={!modified}>บันทึกที่อยู่</button>
                      </footer>
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
                    <h2 className='text-[#333333] text-[20px] font-bold'>แก้ไขที่อยู่การจัดส่ง: {data && data[rowNum].name}</h2>
                    <XClose onClick={() => setOpenAdd(false)}/>
                  </div>
                  {!isSaving ? (
                    <form className='flex flex-col gap-y-3' onSubmit={formikUpdate.handleSubmit}>
                      <div className='lg:flex lg:gap-x-3'>
                        <div className='flex flex-col w-full'>
                          <label htmlFor='first_name'>ชื่อผู้รับ</label>
                          <input className='border border-[#E3E3E3] rounded-[8px] outline-none py-2 px-3 mt-[11px]' id='first_name' name='first_name' type='text' value={formikUpdate.values.first_name} onChange={formikUpdate.handleChange}/>
                        </div>

                        <div className='flex flex-col w-full'>
                          <label htmlFor='surname'>นามสกุล</label>
                          <input className='border border-[#E3E3E3] rounded-[8px] outline-none py-2 px-3 mt-[11px]' id='surname' name='surname' type='text' value={formikUpdate.values.surname} onChange={formikUpdate.handleChange}/>
                        </div>
                      </div>

                      <div className='flex flex-col w-full'>
                        <label htmlFor='address'>ที่อยู่ (ห้องเลขที่, ตึก, ถนน)</label>
                        <input className='border border-[#E3E3E3] rounded-[8px] outline-none py-2 px-3 mt-[11px]' id='address' name='address' type='text' value={formikUpdate.values.address} onChange={formikUpdate.handleChange}/>
                      </div>

                      <div className='lg:flex lg:gap-x-3'>
                        <div className='flex flex-col w-full'>
                          <label htmlFor='province'>จังหวัด</label>
                          <select className='border border-[#E3E3E3] rounded-[8px] outline-none py-2 pl-3 pr-10 mt-[11px] appearance-none' defaultValue='กรุงเทพมหานคร' value={formikUpdate.values.province} onChange={formikUpdate.handleChange} id='province' name='province' style={{backgroundImage:"url(" + chevronDropdown + ")",backgroundPosition:"right 0.5rem center",backgroundRepeat:"no-repeat"}}>
                            <option value='กรุงเทพมหานคร'>กรุงเทพมหานคร</option>
                            <option value='สมุทรปราการ'>สมุทรปราการ</option>
                            <option value='สมุทรสาคร'>สมุทรสาคร</option>
                            <option value='ปทุมธานี'>ปทุมธานี</option>
                          </select>
                        </div>

                        <div className='flex flex-col w-full'>
                          <label htmlFor='district'>เมือง / เขต</label>
                          <select className='border border-[#E3E3E3] rounded-[8px] outline-none py-2 pl-3 pr-10 mt-[11px] appearance-none' id='district' name='district' defaultValue='สวนหลวง' value={formikUpdate.values.district} onChange={formikUpdate.handleChange} style={{backgroundImage:"url(" + chevronDropdown + ")",backgroundPosition:"right 0.5rem center",backgroundRepeat:"no-repeat"}}>
                            <option value='สวนหลวง'>สวนหลวง</option>
                            <option value='บางกะปิ'>บางกะปิ</option>
                            <option value='บางนา'>บางนา</option>
                            <option value='ห้วยขวาง'>ห้วยขวาง</option>
                          </select>
                        </div>
                      </div>

                      <div className='lg:flex lg:gap-x-3'>
                        <div className='flex flex-col w-full'>
                          <label htmlFor='postal_code'>รหัสไปรษณีย์</label>
                          <input className='border border-[#E3E3E3] rounded-[8px] outline-none py-2 px-3 mt-[11px]' id='postal_code' name='postal_code' value={formikUpdate.values.postal_code} onChange={formikUpdate.handleChange} type='text'/>
                        </div>

                        <div className='flex flex-col w-full'>
                          <label htmlFor='phone_number'>เบอร์โทรศัพท์</label>
                          <input className='border border-[#E3E3E3] rounded-[8px] outline-none py-2 px-3 mt-[11px]' id='phone_number' name='phone_number' value={formikUpdate.values.phone_number} onChange={formikUpdate.handleChange} type='tel'/>
                        </div>
                      </div>
            
                      <footer className="pt-5 w-full lg:flex lg:w-[400px] lg:mx-auto lg:gap-x-3">
                        <button onClick={(e) => {e.preventDefault();setOpenAdd(false)}} className={`block w-1/2 text-black rounded-[9px] p-3 text-center w-full bg-white border border-black`}>ยกเลิก</button>
                        <button type='submit' onClick={() => setOpenSuccess(true)} className={`block w-1/2 text-white rounded-[9px] p-3 text-center w-full ${!modified ? "bg-[#C5C5C5] border border-[#C5C5C5]" : "bg-[#111111] border border-[#111111]"}`} disabled={!modified}>บันทึกที่อยู่</button>
                      </footer>
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