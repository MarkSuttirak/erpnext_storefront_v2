import { Fragment, useEffect, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useFrappeGetDoc, useFrappeGetDocList } from 'frappe-react-sdk'
import { XClose, ArrowRight, ArrowLeft, Check } from '@untitled-ui/icons-react'
import brandLogo from '../../img/logo.svg'

export default function CouponModal({isOpen, setIsOpen, value, onChange, error}) {
  const { data:couponLists, isLoading } = useFrappeGetDocList('Coupon Code', {
    fields: ['name', 'coupon_name', 'used', 'valid_upto', 'coupon_code', 'description', 'coupon_type', 'coupon_image'],
    filters: [['used', '=', '0']]
  })

  const [showCoupon, setShowCoupon] = useState(false)
  const [coupon, setCoupon] = useState('');
  const [showDesc, setShowDesc] = useState(false)

  const { data:couponDetail, mutate } = useFrappeGetDoc('Coupon Code', coupon, {
    fields: ['name', 'coupon_name', 'used', 'valid_upto', 'coupon_code', 'description', 'coupon_type', 'coupon_image', 'condition']
  })

  useEffect(() => {
    if (isOpen === false){
      setTimeout(() => setShowCoupon(false), 500)
    }
  }, [showCoupon])

  const handleShowCoupon = (c) => {
    setShowCoupon(true);
    setCoupon(c);
    setTimeout(() => mutate(), 1)
  }

  const CouponSheetDetail = ({proTitle, code, desc, condition}) => {
    return (
      <div className='relative rounded-[12px]' style={{boxShadow:"0px 2px 11px rgba(0, 0, 0, 0.16)"}}>
        <div className='p-6 flex justify-between'>
          <img src={brandLogo} />
          <h2 className='text-md text-[#333333] font-bold'>โค้ด: {code}</h2>
        </div>
        {!showDesc ? (
          <>
            <div className='flex flex-col align-between mb-6 px-6'>
              <div className='flex flex-col'>
                <h2 className='text-[21px] font-bold mb-[15px] text-left'>{proTitle}</h2>
                <div className='text-[#424242] text-xs font-medium px-6 text-left' dangerouslySetInnerHTML={{__html:desc}}/>
              </div>

              <button className='flex items-center gap-x-[5px] text-sm text-[#424242] justify-center mt-20' onClick={() => setShowDesc(true)}>ข้อตกลงและเงื่อนไขอื่นๆ <ArrowRight viewBox='0 0 24 24' width='18'/></button>
            </div>
          </>
        ) : (
          <>
            <div className='text-[#424242] text-xs font-medium text-left px-6' dangerouslySetInnerHTML={{__html:condition}}/>

            <div className='flex items-center gap-x-[14px] px-8 py-[18px] justify-center'>
              <button className='flex items-center gap-x-[5px] text-sm text-[#424242] justify-center mt-20' onClick={() => setShowDesc(false)}><ArrowLeft viewBox='0 0 24 24' width='18'/> กลับไปยังโค้ด</button>
            </div>
          </>
        )}
      </div>
    )
  }

  const CouponSheet = ({proTitle, date, link, desc, onClick}) => {
    return (
      <div className='flex relative border border-[#E3E3E3] rounded-lg w-full h-full'>
        <div className='flex flex-col align-between p-5 w-full'>
          <div className='flex justify-between items-center'>
            <div className='inline-flex flex-col text-start mb-6'>
              <h2 className='text-md text-[#333333] font-bold'>{proTitle}</h2>
              <div className='text-xs text-[#424242] mt-[15px]' dangerouslySetInnerHTML={{__html:desc}}/>
            </div>
            <div className={`w-6 h-6 rounded-full border flex items-center justify-center ${value == nameVal ? 'bg-[#111111] border-[#111111]' : 'bg-white border-[#E3E3E3]'}`}>
              <Check color="#FFFFFF" viewBox='0 0 24 24' width='20' height='20'/>
            </div>
          </div>
          <div className='flex justify-between'>
            <p className='text-[#989898] text-xs'>ใช้ได้ถึง {date}</p>
            <button className={`text-xs font-bold text-[#00B14F]`} onClick={onClick}>ดูรายละเอียด</button>
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
                    {showCoupon ? (
                      <>
                        <div className='flex justify-between items-center'>
                          <h2 className='header-title'>ข้อมูลคูปอง</h2>
                          <XClose onClick={() => setShowCoupon(false)}/>
                        </div>
                        <CouponSheetDetail proTitle={couponDetail?.coupon_name} desc={couponDetail?.description} code={couponDetail?.coupon_code} condition={couponDetail?.condition}/>
                      </>
                    ) : (
                      <>
                        <div className='flex justify-between items-center'>
                          <h2 className='header-title'>โค้ดส่วนลด</h2>
                          <XClose onClick={() => setIsOpen(false)}/>
                        </div>
                        {(couponLists ?? []).map(({name: nameVal, coupon_name, valid_upto, coupon_type, description}) => 
                          <label key={nameVal} className="relative w-full" onClick={(e) => {
                            e.preventDefault();
                            onChange(nameVal)
                          }}>
                            <div className={`cursor-pointer rounded-md -outline-offset-2 ${value == nameVal ? "border border-black" : "border border-transparent"}`}>
                              <CouponSheet key={nameVal} proTitle={coupon_name} date={valid_upto} type={coupon_type} onClick={() => handleShowCoupon(nameVal)} desc={description} />
                            </div>
                          </label>
                        )}
                      </>
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