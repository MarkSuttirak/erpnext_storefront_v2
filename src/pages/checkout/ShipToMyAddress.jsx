import AddressOptions from "../../components/AddressOptions";
import { MarkerPin01, ChevronRight } from "@untitled-ui/icons-react";
import PaymentMethods from "../../components/PaymentMethods";
import { useFormik } from 'formik';
import { useState, useEffect, useMemo } from 'react';
import { useCart } from '../../hooks/useCart';
import PaymentMethods from '../../components/PaymentMethods';
import { useFrappeGetCall, useFrappePostCall } from 'frappe-react-sdk';
import { orderSchema } from '../../components/forms/orderSchema';
import { useNavigate } from 'react-router-dom';
import { useProducts } from '../../hooks/useProducts'
import { useUser } from '../../hooks/useUser';

const ShipToMyAddress = ({onSubmit}) => {
  const { user } = useUser()
  const { cart, cartCount, getTotal, resetCart } = useCart();
  const navigate = useNavigate();

  const { getByItemCode } = useProducts()

  const { call, isCompleted, result, error } = useFrappePostCall('headless_e_commerce.api.place_order');

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

  return (
    <>
      <form className="p-4 lg:p-0 flex gap-4 flex-wrap text-neutral-900">
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
        <PaymentMethods onChange={value => formik.setFieldValue('payment_method', value)} value={formik.values.payment_method} error={formik.errors.payment_method} />
      </form>
    </>
  )
}

export default ShipToMyAddress