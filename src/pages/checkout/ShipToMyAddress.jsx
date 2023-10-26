import AddressOptions from "../../components/AddressOptions";
import { MarkerPin01, ChevronRight, Ticket02, Ticket01 } from "@untitled-ui/icons-react";
import PaymentMethods from "../../components/PaymentMethods";
import { useFormik } from 'formik';
import { useState, useEffect, useMemo } from 'react';
import { useCart } from '../../hooks/useCart';
import { useFrappeGetCall, useFrappePostCall } from 'frappe-react-sdk';
import { orderSchema } from '../../components/forms/orderSchema';
import { useNavigate } from 'react-router-dom';
import { useProducts } from '../../hooks/useProducts'
import { useUser } from '../../hooks/useUser';
import { SfButton } from "@storefront-ui/react";
import Divider from "../../components/Divider";
import { useMediaQuery } from "react-responsive";
import TaxInvoiceRequest from "../../components/TaxInvoiceRequest";
import ShippingOptions from "../../components/ShippingOptions";
import CouponModal from "../../components/modals/CouponModal";

export default function ShipToMyAddress(){
  const { user } = useUser()
  const { cart, cartCount, getTotal, resetCart } = useCart();
  const navigate = useNavigate();
  const [acknowledged, setAcknowledged] = useState(false)

  const [isOpen, setIsOpen] = useState(false)

  const { isDesktop } = useMediaQuery({ minWidth: 1024 })

  const { getByItemCode } = useProducts()

  const { call, isCompleted, result, error } = useFrappePostCall('headless_e_commerce.api.place_order');

  const cartContents = useMemo(() => {
    return Object.entries(cart).reduce((acc, [item_code]) => {
      const product = getByItemCode(item_code);
      if (product?.item_group === 'Gift' || product?.item_group === 'Gift and Cards') {
        return {
          ...acc,
          hasGiftItem: true,
        }
      }
      return {
        ...acc,
        hasNormalItem: true,
      }
    }, {
      hasNormalItem: false,
      hasGiftItem: false,
    })
  }, [cart, getByItemCode])

  const formik = useFormik({
    initialValues: {
      cartContents,
      billing_address: '',
      shipping_address: '',
      use_different_shipping: false,
      loyalty_points: '',
      items: cart,
      payment_method: 'bank-transfer',
      coupon_code: ''
    },
    validationSchema: orderSchema,
    validateOnChange: false,
    onSubmit: call
  });

  useEffect(() => {
    formik.setFieldValue('items', Object.entries(cart).map(([item_code, qty]) => ({ item_code, qty })))
    formik.setFieldValue('cartContents', cartContents)
  }, [cartCount, cartContents])

  useEffect(() => {
    if (isCompleted) {
      if (result?.message?.name) {
        resetCart();
        navigate(`/thankyou?order_id=${result.message.name}&amount=${result.message.grand_total}`)
      }
    }
    if (error) {
      setErrorAlert(JSON.parse(JSON.parse(error?._server_messages)[0]).message);
    }
  }, [isCompleted, error])

  return (
    <>
      <Divider size={isDesktop ? 40 : 30} color="#F2F2F2"/>
      <form className="flex gap-4 flex-wrap text-neutral-900">
        <div className='header-title flex gap-x-[7px] items-center'>
          <MarkerPin01 />
          ที่อยู่ในการจัดส่ง
        </div>
        <AddressOptions
          onChange={(value) => {
            formik.setFieldValue('billing_address', value);
          }}
          onClick={(e) => e.preventDefault()}
          value={formik.values.billing_address}
          error={formik.errors.billing_address}
        />
        <TaxInvoiceRequest />
        <ShippingOptions onChange={value => formik.setFieldValue('payment_method', value)} value={formik.values.payment_method} error={formik.errors.payment_method}/>
        
        <Divider size={isDesktop ? 24 : 14} color="#F2F2F2"/>

        <div className="w-full">
          <label htmlFor='coupon-pro' className="header-title flex gap-x-[7px] items-center">
            <Ticket01 />
            โปรโมชั่นและส่วนลด
          </label>
          <div className='flex gap-x-5 mt-4'>
            <input type="text" id="coupon-pro" name="coupon-pro" placeholder="โปรดใส่โค้ดส่วนลด" className="border-b border-b-[#141414] w-full outline-none" autoComplete="off" onClick={(e) => e.target.focus()}/>
            <button className='border-[2px] border-black p-2 rounded-md w-[68px] text-sm'>ใช้โค้ด</button>
          </div>
          <button className='flex gap-x-2 text-[#00B14F] mt-5 text-sm' onClick={(e) => {e.preventDefault();setIsOpen(true)}}>
            <Ticket02 />
            ใช้คูปองที่คุณเก็บไว้
          </button>
        </div>

        <Divider size={isDesktop ? 24 : 14} color="#F2F2F2"/>

        <PaymentMethods onChange={value => formik.setFieldValue('payment_method', value)} value={formik.values.payment_method} error={formik.errors.payment_method} />

        <label htmlFor='acknowledged' className='flex items-start gap-x-[14px] my-6 text-[#8A8A8A] text-sm'>
          <input type='checkbox' name='acknowledged' id='acknowledged' className='product-type-input' onClick={(e) => {e.target.checked ? setAcknowledged(true) : setAcknowledged(false)}}/>
          <span className='product-type-checkbox'/>
          หน้าเพจนี้อันรวมไปถึงเอกสารหรือข้อความต่างๆที่มีความเกี่ยวข้องกับ หน้าเพจนี้ถูกเขียนขึ้นมาเพื่อแจ้งท่านให้ทราบถึงข้อกำหนด
        </label>

        <div className="fixed bottom-0 pb-5 w-full bg-white lg:static lg:p-0 max-w-[520px] lg:max-w-none">
          <SfButton size="lg" className="mt-4 payment-btn" onClick={formik.handleSubmit} style={{backgroundColor:!acknowledged ? "#C5C5C5" : "black",color:"white"}} disabled={!acknowledged}>
            ชำระเงิน
          </SfButton>
        </div>
      </form>

      <CouponModal isOpen={isOpen} setIsOpen={setIsOpen} onChange={value => formik.setFieldValue('coupon_code', value)} value={formik.values.coupon_code} error={formik.errors.coupon_code}/>
    </>
  )
}