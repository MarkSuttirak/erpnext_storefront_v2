import AddressOptions from "../../components/AddressOptions";
import { MarkerPin01, ChevronRight, Ticket02 } from "@untitled-ui/icons-react";
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

export default function ShipToMyAddress(){
  const { user } = useUser()
  const { cart, cartCount, getTotal, resetCart } = useCart();
  const navigate = useNavigate();

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
        <div className='header-title flex gap-x-[10px] items-center'>
          <MarkerPin01 className="lg:hidden"/>
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

        <Divider size={isDesktop ? 40 : 30} color="#F2F2F2"/>

        <ShippingOptions onChange={value => formik.setFieldValue('payment_method', value)} value={formik.values.payment_method} error={formik.errors.payment_method}/>
        
        <Divider size={isDesktop ? 40 : 30} color="#F2F2F2"/>

        <div className="w-full">
          <label htmlFor='coupon-pro'>โปรโมชั่นและส่วนลด</label>
          <div className='flex gap-x-5 mt-4'>
            <input type="text" id="coupon-pro" name="coupon-pro" placeholder="โปรดใส่โค้ดส่วนลด" className="border-b border-b-[#141414] w-full outline-none" autoComplete="off" onClick={(e) => e.target.focus()}/>
            <button className='border-[2px] border-black p-2 rounded-md w-[68px] text-sm'>ใช้โค้ด</button>
          </div>
          <button className='flex gap-x-2 text-[#5B6CFF] mt-5 text-sm'>
            <Ticket02 />
            ใช้คูปองที่คุณเก็บไว้
          </button>
        </div>

        <Divider size={isDesktop ? 40 : 30} color="#F2F2F2"/>

        <PaymentMethods onChange={value => formik.setFieldValue('payment_method', value)} value={formik.values.payment_method} error={formik.errors.payment_method} />

        <SfButton size="lg" className="w-full mt-4" style={{backgroundColor:"black"}} onClick={formik.handleSubmit}>
          ชำระเงิน
        </SfButton>
      </form>
    </>
  )
}