import AddressOptions from "../../components/AddressOptions";
import { MarkerPin01, ChevronRight } from "@untitled-ui/icons-react";
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
        <div className='flex gap-x-[10px] items-center py-2 w-full'>
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
        <PaymentMethods onChange={value => formik.setFieldValue('payment_method', value)} value={formik.values.payment_method} error={formik.errors.payment_method} />

        <SfButton size="lg" className="w-full mt-4" style={{backgroundColor:"black"}} onClick={formik.handleSubmit}>
          ชำระเงิน
        </SfButton>
      </form>
    </>
  )
}