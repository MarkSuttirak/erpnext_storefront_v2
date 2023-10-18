import { useState, useEffect, useMemo } from 'react';
import { SfCheckbox, SfButton, SfIconCheckCircle, SfIconClose, SfLink, SfInput } from '@storefront-ui/react';
import { useCart } from '../../hooks/useCart';
import PaymentMethods from '../../components/PaymentMethods';
import AddressCard from '../../components/AddressCard';
import { useFrappeGetCall, useFrappePostCall } from 'frappe-react-sdk';
import { useFormik } from 'formik';
import { orderSchema } from '../../components/forms/orderSchema';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MarkerPin01, ChevronRight, HelpCircle } from '@untitled-ui/icons-react';
import { useProducts } from '../../hooks/useProducts'
import { ShoppingBag01 } from '@untitled-ui/icons-react';
import { useUser } from '../../hooks/useUser';
import ShipToMyAddress from './ShipToMyAddress';
import CheckoutDetails from '../../components/CheckoutDetails';

const Checkout = () => {
  const { user } = useUser()
  const { cart, cartCount, getTotal, resetCart } = useCart();
  const navigate = useNavigate();

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

  const [delivery, setDelivery] = useState(59)
  const [discount, setDiscount] = useState(99)

  const total = getTotal() + delivery - discount

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

  const [informationAlert, setInformationAlert] = useState(false);
  const [positiveAlert, setPositiveAlert] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);

  return (
    <>
      <header className='p-[14px] border-b border-b-[#F2F2F2] flex gap-x-[7px] text-md font-bold bg-white lg:hidden'>
        <button onClick={() => location.href = "/"} type="button">
          <ArrowLeft />
        </button>
        ทั้งหมด ฿ {getTotal()}
      </header>
      <header className='bg-black text-white text-center py-[10px] lg:hidden'>
        กดรับของขวัญฟรี 🎁
      </header>
      <div className='flex flex-col lg:gap-x-6 lg:flex-row justify-center lg:mt-[92px] desktop-sec lg:py-10 px-5'>
        <ShipToMyAddress />
        <CheckoutDetails />
      </div>
    </>
  );
}

export default Checkout