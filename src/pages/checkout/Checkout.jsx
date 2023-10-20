import { useState, useEffect, useMemo } from 'react';
import { useCart } from '../../hooks/useCart';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MarkerPin01, ChevronRight, HelpCircle } from '@untitled-ui/icons-react';
import { useUser } from '../../hooks/useUser';
import ShipToMyAddress from './ShipToMyAddress';
import ShipToBranch from './ShipToBranch';
import CheckoutDetails from '../../components/CheckoutDetails';
import DeliveryChoice from '../../components/DeliveryChoice';

export default function Checkout(){
  const { user } = useUser()
  const { cart, cartCount, getTotal, resetCart } = useCart();
  const navigate = useNavigate();

  const [selectedChoice, setSelectedChoice] = useState('ship-to-my-address')

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
      <div className='flex flex-col lg:gap-x-6 lg:flex-row justify-center lg:mt-[92px] desktop-sec lg:py-10 p-5 lg:mb-0 mb-[84px]'>
        <div>
          <DeliveryChoice onChange={(active) => setSelectedChoice(active)} value={selectedChoice} error={null}/>
          {selectedChoice === 'ship-to-my-address' && (<ShipToMyAddress />)}
          {selectedChoice === 'ship-to-branch' && (<ShipToBranch />)}
        </div>
        <CheckoutDetails />
      </div>
    </>
  );
}