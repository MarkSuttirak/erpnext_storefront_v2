import { useEffect } from 'react';
import { useFormik } from 'formik';
import { useFrappePostCall } from 'frappe-react-sdk';
import { addressSchema } from './addressFormSchema';
import { Switch } from '@headlessui/react'
import { useState } from 'react';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function CreditCardForm({onSuccess = () => {}, onSave = () => {}, data}){
  const [enabled, setEnabled] = useState(false)
  const { call, isCompleted, loading } = useFrappePostCall('headless_e_commerce.api.add_address')

  const formik = useFormik({
    initialValues: data,
    validationSchema: addressSchema,
    validateOnChange: false,
    onSubmit: call
  });

  useEffect(() => {
    if (isCompleted) {
      onSuccess();
      formik.resetForm();
    }
  }, [isCompleted])

  const submitData = (e) => {
    e.preventDefault()
    formik.handleSubmit();
    onSave()
  }

  return (
    <form className='flex flex-col gap-y-3' onSubmit={submitData}>
      <div className='flex flex-col w-full'>
        <label htmlFor='card_number'>หมายเลขบัตร</label>
        <input
          name="card_number"
          id="card_number"
          className="form-input mt-[11px]"
          // onChange={formik.handleChange}
          // value={formik.values.address_title}
          // invalid={formik.errors.address_title}
        />
        {/* {formik.errors.address_title && (
          <strong className="typography-error-sm text-negative-700 font-medium">กรุณากรอกหมายเลขบัตร</strong>
        )} */}
      </div>
      <div className='flex flex-col w-full'>
        <label htmlFor='name'>ชื่อที่แสดงบนบัตร</label>
        <input
          name="name"
          id="name"
          className="form-input mt-[11px]"
          // onChange={formik.handleChange}
          // value={formik.values.address_line1}
          // invalid={formik.errors.address_line1}
        />
        {/* {formik.errors.address_line1 && (
          <strong className="typography-error-sm text-negative-700 font-medium">กรุณากรอกชื่อที่แสดงบนบัตร</strong>
        )} */}
      </div>
      
      <div className='md:flex md:gap-x-3'>
        <div className='flex flex-col w-full'>
          <label htmlFor='expiration_date'>วันหมดอายุ</label>
          <input
            name="expiration_date"
            id="expiration_date"
            className="form-input mt-[11px]"
              // onChange={formik.handleChange}
              // value={formik.values.address_line1}
              // invalid={formik.errors.address_line1}
          />
        </div>
        <div className='flex flex-col w-full'>
          <label htmlFor='phone'>เบอร์โทรศัพท์</label>
          <input
            type='tel'
            name="phone"
            id="phone"
            className="form-input mt-[11px]"
              // onChange={formik.handleChange}
              // value={formik.values.address_line1}
              // invalid={formik.errors.address_line1}
          />
        </div>
      </div>

      <div className='lg:flex lg:gap-x-3'>
        <div className='flex w-full justify-between items-center'>
          <label htmlFor='phone'>ตั้งเป็นค่าเริ่มต้น</label>
          <Switch
            checked={enabled}
            onChange={setEnabled}
            className={classNames(
              enabled ? 'bg-[#00B14F]' : 'bg-gray-200',
              'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out2'
            )}
          >
            <span
              aria-hidden="true"
              className={classNames(
                enabled ? 'translate-x-5' : 'translate-x-0',
                'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
              )}
            />
          </Switch>
        </div>
      </div>
      <div className="w-full flex gap-4 mt-4 justify-center">
        <button type='submit' className={`block mt-[14px] w-1/2 text-white rounded-[9px] p-3 text-center w-full bg-[#111111] border border-[#111111] lg:max-w-[200px]`}>ยืนยันข้อมูล</button>
      </div>
    </form>
  )
}