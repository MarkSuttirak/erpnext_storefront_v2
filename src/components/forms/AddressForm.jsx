import { useEffect } from 'react';
import { useFormik } from 'formik';
import { useFrappePostCall } from 'frappe-react-sdk';
import { addressSchema } from './addressFormSchema';
import chevronDropdown from '../../img/chevron-right.svg'
import { Switch } from '@headlessui/react'
import { useState } from 'react';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

// Here you should provide a list of countries you want to support
// or use an up-to-date country list like: https://www.npmjs.com/package/country-list
const districts = ['สวนหลวง','บางกะปิ','สาทร','ลาดกระบัง','บางนา','พระโขนง','วัฒนา','ห้วยขวาง','พระนคร'];
const provinces = ['กรุงเทพมหานคร','ปทุมธานี','สมุทรปราการ']

export default function AddressForm({onSuccess = () => {}, onSave = () => {}, data}){
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
        <label htmlFor='address_title'>ชื่อ-นามสกุล</label>
        <input
          name="address_title"
          id="address_title"
          className="form-input mt-[11px]"
          onChange={formik.handleChange}
          value={formik.values.address_title}
          invalid={formik.errors.address_title}
        />
        {formik.errors.address_title && (
          <strong className="typography-error-sm text-negative-700 font-medium">กรุณากรอกชื่อผู้รับ</strong>
        )}
      </div>
      <div className='flex flex-col w-full'>
        <label htmlFor='address_line1'>ที่อยู่ (ห้องเลขที่, ตึก, ถนน)</label>
        <input
          name="address_line1"
          id="address_line1"
          className="form-input mt-[11px]"
          onChange={formik.handleChange}
          value={formik.values.address_line1}
          invalid={formik.errors.address_line1}
        />
        {formik.errors.address_line1 && (
          <strong className="typography-error-sm text-negative-700 font-medium">Please provide a street name</strong>
        )}
      </div>
      
      <div className='md:flex md:gap-x-3'>
        <div className='flex flex-col w-full'>
          <label htmlFor='state'>จังหวัด</label>
          <select name="state" id='state' placeholder="-- Select --" className='form-input mt-[11px] appearance-none' style={{backgroundImage:"url(" + chevronDropdown + ")",backgroundPosition:"right 0.5rem center",backgroundRepeat:"no-repeat"}} onChange={formik.handleChange} value={formik.values.state} invalid={formik.errors.state}>
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
          <select name="city" id='city' className='form-input mt-[11px] appearance-none' placeholder="-- Select --" style={{backgroundImage:"url(" + chevronDropdown + ")",backgroundPosition:"right 0.5rem center",backgroundRepeat:"no-repeat"}} onChange={formik.handleChange} value={formik.values.city}>
            {districts.map((district) => (
              <option key={district} value={district}>{district}</option>
            ))}
          </select>
        </div>
      </div>

      <div className='md:flex md:gap-x-3'>
        <div className='flex flex-col w-full'>
          <label htmlFor='pincode'>รหัสไปรษณีย์</label>
          <input name="pincode" id='pincode' className='form-input mt-[11px]' placeholder="eg. 12345" onChange={formik.handleChange} value={formik.values.pincode} />
        </div>
        <div className='flex flex-col w-full'>
          <label htmlFor='phone'>เบอร์โทรศัพท์</label>
          <input className='form-input mt-[11px]' id='phone' name='phone' value={formik.values.phone} onChange={formik.handleChange} type='tel'/>
        </div>
      </div>

      <div className='md:flex md:gap-x-3'>
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
        <button type='submit' className={`block mt-[14px] w-1/2 text-white rounded-[9px] p-3 text-center w-full bg-[#111111] border border-[#111111] lg:max-w-[200px]`}>บันทึกที่อยู่</button>
      </div>
    </form>
  )
}