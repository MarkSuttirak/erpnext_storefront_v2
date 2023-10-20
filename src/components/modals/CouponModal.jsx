import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useFrappeGetDocList } from 'frappe-react-sdk'
import { XClose } from '@untitled-ui/icons-react'
import { Link } from 'react-router-dom'

export default function CouponModal({isOpen, setIsOpen}) {
  const { data:couponLists, isLoading } = useFrappeGetDocList('Coupon Code', {
    fields: ['name', 'coupon_name', 'used', 'valid_upto', 'coupon_code', 'description', 'coupon_type', 'coupon_image'],
    filters: [['used', '=', '0']]
  })

  const CouponSheet = ({proTitle, date, used, type, link}) => {
    return (
      <div className='flex relative border border-[#E3E3E3] rounded-lg w-full h-full'>
        <div className='flex flex-col align-between p-5 w-full'>
          <div>
            <p className={`px-[10px] py-1 text-[10px] mb-[6px] inline-block rounded-[99px] font-bold ${used === 1 ? 'bg-[#F0F0F0] text-[#8A8A8A]' : 'bg-[#E9F6ED] text-[#00B14F]'}`}>{type}</p>
            <h2 className='text-md text-[#333333] font-bold'>{proTitle}</h2>
          </div>
          <div className='flex justify-between mt-[9px]'>
            <p className='text-[#989898] text-xs'>ใช้ได้ถึง {date}</p>
            <Link to={link} className={`text-xs font-bold ${used === 1 ? "text-[#8A8A8A]" : "text-[#00B14F]"}`}>ดูรายละเอียด</Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='w-full max-w-[1200px] relative flex justify-end'>
      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setIsOpen}>
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
            <div className="flex min-h-full items-end justify-center p-4 text-center items-center">
              <Transition.Child
                as={Fragment}
                enter="transform ease-out duration-300 transition"
                enterFrom="-translate-y-5 opacity-0 lg:translate-x-10 lg:translate-y-0"
                enterTo="translate-y-0 opacity-100"
                leave="transition ease-in duration-100"
                leaveFrom="translate-y-0 opacity-100"
                leaveTo="-translate-y-5 opacity-0 lg:translate-x-10 lg:translate-y-0"
              >
                <Dialog.Panel className="py-6 px-8 max-w-[500px] w-full relative lg:fixed lg:top-[92px] bg-white rounded-[10px] lg:right-0 lg:rounded-t-[0px] z-[499]">

                  <div className='flex flex-col gap-y-[30px]'>
                    <div className='flex justify-between items-center'>
                      <h2 className='header-title'>โค้ดส่วนลด</h2>
                      <XClose onClick={() => setIsOpen(false)}/>
                    </div>
                    {(couponLists ?? []).map((c) => 
                      <CouponSheet key={c.name} proTitle={c.coupon_name} date={c.valid_upto} used={c.used} type={c.coupon_type} link={`/my-coupon-details/${c.name}`}/>
                    )}

                    {isLoading && (
                      <h2>Loading...</h2>
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  )
}