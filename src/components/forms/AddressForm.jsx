import { useEffect } from 'react';
import { useFormik } from 'formik';
import { useFrappePostCall } from 'frappe-react-sdk';
import { addressSchema } from './addressFormSchema';

// Here you should provide a list of countries you want to support
// or use an up-to-date country list like: https://www.npmjs.com/package/country-list
const districts = ['สวนหลวง','บางกะปิ','สาทร','ลาดกระบัง','บางนา','พระโขนง','วัฒนา','ห้วยขวาง','พระนคร'];
const provinces = ['กรุงเทพมหานคร','ปทุมธานี','สมุทรปราการ']

const AddressForm = ({
  onSuccess = () => { },
}) => {

  const { call, isCompleted } = useFrappePostCall('headless_e_commerce.api.add_address')

  const formik = useFormik({
    initialValues: {
      address_title: "",
      address_line1: "",
      address_line2: "",
      city: provinces[0],
      state: districts[0],
      country: "Thailand",
      pincode: "",
      phone:"",
      is_primary_address: 1,
      is_shipping_address: 1,
    },
    validationSchema: addressSchema,
    validateOnChange: false,
    onSubmit: call
  });

  console.log(formik)

  useEffect(() => {
    if (isCompleted) {
      onSuccess();
      formik.resetForm();
    }
  }, [isCompleted])

  return (
    <form className='flex flex-col gap-y-3' onSubmit={formik.handleSubmit}>
      <div className='flex flex-col w-full'>
        <label htmlFor='address_title'>ชื่อ-นามสกุล</label>
        <input
          name="address_title"
          id="address_title"
          className="form-input"
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
          className="form-input"
          onChange={formik.handleChange}
          value={formik.values.address_line1}
          invalid={formik.errors.address_line1}
        />
        {formik.errors.address_line1 && (
          <strong className="typography-error-sm text-negative-700 font-medium">Please provide a street name</strong>
        )}
      </div>
      <div className='flex flex-col w-full'>
        <label htmlFor='state'>จังหวัด</label>
        <select name="state" id='state' placeholder="-- Select --" className='form-input' onChange={formik.handleChange} value={formik.values.state} invalid={formik.errors.state}>
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
        <select name="city" className='form-input' placeholder="-- Select --" onChange={formik.handleChange} value={formik.values.city}>
          {districts.map((district) => (
            <option key={district} value={district}>{district}</option>
          ))}
        </select>
      </div>
      <div className='flex flex-col w-full'>
        <label htmlFor='pincode'>รหัสไปรษณีย์</label>
        <input name="pincode" id='pincode' className='form-input' placeholder="eg. 12345" onChange={formik.handleChange} value={formik.values.pincode} />
      </div>
      <div className='flex flex-col w-full'>
        <label htmlFor='phone'>เบอร์โทรศัพท์</label>
        <input className='form-input' id='phone' name='phone' value={formik.values.phone} onChange={formik.handleChange} type='tel'/>
      </div>
      <div className="w-full flex gap-4 mt-4 md:mt-0 md:justify-end">
        <button type='submit' className={`block mt-[14px] w-1/2 text-white rounded-[9px] p-3 text-center w-full bg-[#111111] border border-[#111111]`}>บันทึกที่อยู่</button>
      </div>
    </form>
  )
}

export default AddressForm;
