import { ArrowLeft, MarkerPin01, FileCheck02, XClose } from '@untitled-ui/icons-react'
import { Link } from 'react-router-dom'
import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import TitleHeader from '../../components/TitleHeader'
import { useFrappeDeleteDoc, useFrappeDocumentEventListener, useFrappeGetDocList, useFrappeCreateDoc, useFrappeGetCall, useFrappePostCall, useFrappeDeleteCall, useFrappePutCall } from 'frappe-react-sdk'
import NavHeader from '../../components/NavHeader'
import DesktopSidebar from '../../components/desktop/DesktopSidebar'
import AddShippingAddress from '../../components/modals/ShippingAddressAdd'
import EditShippingAddress from '../../components/modals/ShippingAddressEdit'
import DeleteShippingAddress from '../../components/modals/ShippingAddressDelete'

const districts = ['สวนหลวง','บางกะปิ','สาทร','ลาดกระบัง','บางนา','พระโขนง','วัฒนา','ห้วยขวาง','พระนคร'];
const provinces = ['กรุงเทพมหานคร','ปทุมธานี','สมุทรปราการ']

export default function ShippingAddress(){
  const [openAdd, setOpenAdd] = useState(false)
  const [openUpdate, setOpenUpdate] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const [openSuccess, setOpenSuccess] = useState(false)
  const [modified, setModified] = useState(true);
  const [rowNum, setRowNum] = useState(0)

  const { data:dataShipping } = useFrappeGetCall('headless_e_commerce.api.get_addresses', null, `addresses-0`)

  console.log(dataShipping)
  const { call, isCompleted } = useFrappePostCall('headless_e_commerce.api.add_address')
  const { call:callDelete } = useFrappeDeleteCall('headless_e_commerce.api.get_addresses')

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
      <main className='px-5 pt-10 mt-[92px] desktop-sec hidden lg:flex'>
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
            <AddressInfo key={index} name={`${d.address_title}`} address={`${d.address_line1} ${d.address_line2} ${d.city} ${d.country}`}/>
          )}
        </section>
      </main>

      {/* main page for mobile version */}
      <main className='p-5 flex flex-col gap-y-[12px] mt-[53px] lg:hidden'>
        {(dataShipping?.message ?? []).map((d, index) => 
          <AddressInfo key={index} name={`${d.address_title}`} address={`${d.address_line1} ${d.address_line2} ${d.city} ${d.country}`}/>
        )}
        <button onClick={() => setOpenAdd(true)} className='bg-[#F4F4F4] p-5 rounded-[7px]'>
          <div className='flex gap-x-[7px] justify-center'>
            <MarkerPin01 />
            เพิ่มที่อยู่ใหม่
          </div>
        </button>
      </main>

      <AddShippingAddress setOpenAdd={setOpenAdd} openAdd={openAdd}/>
      <EditShippingAddress setOpenUpdate={setOpenUpdate} openUpdate={openUpdate}/>
      <DeleteShippingAddress setOpenDelete={setOpenDelete} openDelete={openDelete}/>
    </>
  )
}