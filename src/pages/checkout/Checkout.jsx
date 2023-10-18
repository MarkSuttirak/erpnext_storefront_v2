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
import banks from '../../img/banks.svg'
import visaIcon from '../../img/visa-icon.svg'
import { useUser } from '../../hooks/useUser';

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

  const [checkoutPage, setCheckoutPage] = useState(true)
  const [selectShippingAddress, setSelectShippingAddress] = useState(false)
  const [selectPayment, setSelectPayment] = useState(false)
  const [addCard, setAddCard] = useState(false);

  const [delivery, setDelivery] = useState(59)
  const [discount, setDiscount] = useState(99)

  const [currentPage, setCurrentPage] = useState('checkout')

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

  const switchToShippingAddress = () => {
    setCheckoutPage(false);
    setSelectShippingAddress(true)
  }

  return (
  <>
    {currentPage === 'checkout' && (
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
      <div className='flex flex-col lg:gap-x-6 lg:flex-row justify-center lg:mt-[92px] desktop-sec lg:py-10 box-content'>
        <form className="p-4 lg:p-0 flex gap-4 flex-wrap text-neutral-900">
          <button className='flex justify-between items-center py-2 w-full' onClick={(e) => {e.preventDefault();switchToShippingAddress();}}>
            <div className='flex gap-x-[10px]'>
              <MarkerPin01 />
              ที่อยู่ในการจัดส่ง
            </div>
            <div>
              <ChevronRight />
            </div>
          </button>
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
        <div className='p-4 lg:p-0 lg:w-[480px]'>
          <div className="flex justify-between items-end py-4 lg:hidden">
            <p className="typography-headline-4 font-bold typography-headline-3 gap-x-2 flex">
              <ShoppingBag01 />
              Order Summary
            </p>
            <p className="typography-text-base font-medium">(Items: {cartCount})</p>
          </div>
          <div className="rounded-md lg:border lg:border-[#E3E3E3] lg:px-8 lg:py-6 lg:flex lg:flex-col-reverse">
            <ul role="list" className="divide-y divide-gray-200">
              {
                Object.entries(cart).map(([itemCode, qty]) => {
                  const product = getByItemCode(itemCode)
                  return (
                    <li key={itemCode} className="flex gap-y-6">
                      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                        <img src={`${import.meta.env.VITE_ERP_URL}${product?.website_image}`} alt="Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt." className="h-full w-full object-cover object-center" />
                      </div>

                      <div className="ml-4 flex flex-1 flex-col">
                        <div>
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <h3>
                              <a href="#">{product?.item_name}</a>
                            </h3>
                            <p className="ml-4">{product?.formatted_price}</p>
                          </div>
                          <p className="mt-1 text-sm text-gray-500">{product?.item_group}</p>
                        </div>
                      </div>
                    </li>
                  )
                })
              }
            </ul>
              <div className="py-4 lg:pt-0 lg:pb-5 mt-3 lg:mt-0 border-t lg:border-b lg:border-t-0 lg:mb-5 border-neutral-200">
                <h2 className='text-black font-bold text-[15px] mb-[18px]'>รายละเอียดการชำระเงิน</h2>
                <div className="flex flex-col gap-y-4 justify-between typography-text-base">
                  <div className="flex justify-between items-center text-[#424242]">
                    <h2 className='font-bold'>ยอดรวม</h2>
                    <p>฿ {getTotal()}</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <h2 className='font-bold'>โค้ดส่วนลด</h2>
                    <p>-฿ {discount}</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <h2 className='font-bold'>ค่าจัดส่ง</h2>
                    <p>-฿ {delivery}</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <h2 className='font-bold'>ทั้งหมด</h2>
                    <p>฿ {total}</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <h2>Points ที่คุณจะได้รับ</h2>
                    <p>Points 149</p>
                  </div>
                </div>
                {/* <SfInput
                  placeholder='Enter loyalty points to redeem'
                  slotSuffix={<strong className='w-16'>of {user?.loyalty_points}</strong>}
                  maxLength={user?.loyalty_points?.toString().length}
                  name="loyalty_points"
                  value={formik.values.loyalty_points}
                  onChange={formik.handleChange}
                /> */}
                <SfButton size="lg" className="w-full lg:hidden mt-4" style={{backgroundColor:"black"}} onClick={formik.handleSubmit}>
                  ชำระเงิน
                </SfButton>
              </div>
            </div>
            <div className="absolute top-0 right-0 mx-2 mt-2 sm:mr-6">
              {positiveAlert && (
                <div
                  role="alert"
                  className="flex items-start md:items-center shadow-md max-w-[600px] bg-positive-100 pr-2 pl-4 mb-2 ring-1 ring-positive-200 typography-text-sm md:typography-text-base py-1 rounded-md"
                >
                  <SfIconCheckCircle className="mr-2 my-2 text-positive-700" />
                  <p className="py-2 mr-2">Your promo code has been added.</p>
                  <button
                    type="button"
                    className="p-1.5 md:p-2 ml-auto rounded-md text-positive-700 hover:bg-positive-200 active:bg-positive-300 hover:text-positive-800 active:text-positive-900"
                    aria-label="Close positive alert"
                    onClick={() => setPositiveAlert(false)}
                  >
                    <SfIconClose className="hidden md:block" />
                    <SfIconClose size="sm" className="md:hidden block" />
                  </button>
                </div>
              )}
              {informationAlert && (
                <div
                  role="alert"
                  className="flex items-start md:items-center shadow-md max-w-[600px] bg-positive-100 pr-2 pl-4 mb-2 ring-1 ring-positive-200 typography-text-sm md:typography-text-base py-1 rounded-md"
                >
                  <SfIconCheckCircle className="mr-2 my-2 text-positive-700" />
                  <p className="py-2 mr-2">Your promo code has been removed.</p>
                  <button
                    type="button"
                    className="p-1.5 md:p-2 ml-auto rounded-md text-positive-700 hover:bg-positive-200 active:bg-positive-300 hover:text-positive-800 active:text-positive-900"
                    aria-label="Close positive alert"
                    onClick={() => setInformationAlert(false)}
                  >
                    <SfIconClose className="hidden md:block" />
                    <SfIconClose size="sm" className="md:hidden block" />
                  </button>
                </div>
              )}
              {errorAlert && (
                <div
                  role="alert"
                  className="flex items-start md:items-center max-w-[600px] shadow-md bg-negative-100 pr-2 pl-4 ring-1 ring-negative-300 typography-text-sm md:typography-text-base py-1 rounded-md"
                >
                  <p className="py-2 mr-2">This promo code is not valid.</p>
                  <button
                    type="button"
                    className="p-1.5 md:p-2 ml-auto rounded-md text-negative-700 hover:bg-negative-200 active:bg-negative-300 hover:text-negative-800 active:text-negative-900"
                    aria-label="Close error alert"
                    onClick={() => setErrorAlert(false)}
                  >
                    <SfIconClose className="hidden md:block" />
                    <SfIconClose size="sm" className="md:hidden block" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </>
    )}
    </>
  );
}

export default Checkout

function AddressOptions({
  value,
  onChange,
  error
}) {
  const { data } = useFrappeGetCall('headless_e_commerce.api.get_addresses', null, `addresses-0`)

  console.log(data?.message[0])

  return (
    <>
      <div className="flex flex-col w-full gap-4 lg:gap-6">
        {data?.message?.map(({ name: nameVal, address_title, address_line2 = null, city, state, country }) => (
          <label key={nameVal} className="relative w-full" onClick={(e) => {
            e.preventDefault();
            onChange(nameVal)
          }}>
            <div className={`cursor-pointer rounded-md -outline-offset-2 ${value == nameVal ? "border border-black" : "border border-transparent"}`}>
              <AddressCard title={address_title} addressLine2={address_line2} city={city} state={state === "Select One" ? null : state} country={country} />
            </div>
          </label>
        ))}
      </div>
      {
        error && <p className="text-negative-600">Please select an address</p>
      }
    </>
  );
}