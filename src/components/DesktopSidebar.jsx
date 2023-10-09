import { Link } from 'react-router-dom'
import { useState, useEffect, Fragment } from 'react'
import { useFrappeAuth, useFrappeGetDoc, useFrappeGetDocCount } from 'frappe-react-sdk';
import { useUser } from '../hooks/useUser';
import { File06, ImageIndentLeft, User02 } from '@untitled-ui/icons-react';

const DesktopSidebar = () => {
  const [bronzeLevel, setBronzeLevel] = useState(false);
  const [silverLevel, setSilverLevel] = useState(true);

  const { user } = useUser()

  const [openLogout, setOpenLogout] = useState(false);

  const { currentUser, updateCurrentUser } = useFrappeAuth();

  const { data, isLoading, error } = useFrappeGetDoc('User', currentUser, {
    filters: ['name', 'full_name', 'user_image']
  })

  const myAccount = [
    {
      title:'โปรไฟล์ของฉัน',
      link:'#'
    },
    {
      title:'การชำระเงิน',
      link:'#'
    },
    {
      title:'ที่อยู่ในการจัดส่ง',
      link:'#'
    },
    {
      title:'สินค้าที่ดูล่าสุด',
      link:'#'
    }
  ]

  const myOrder = [
    {
      title:'ประวัติการสั่งซื้อ',
      link:'#'
    },
  ]

  const myPoint = [
    {
      title:'ID ของฉัน',
      link:'#'
    },
    {
      title:'แลกคะแนน',
      link:'#'
    },
    {
      title:'ระดับสมาชิก',
      link:'#'
    },
    {
      title:'ประวัติการใช้คะแนน',
      link:'#'
    }
  ]

  const help = [
    {
      title:'หน้าร้านของเรา',
      link:'#'
    },
    {
      title:'วิธีเก็บคะแนน',
      link:'#'
    },
    {
      title:'วิธีแลกของรางวัล',
      link:'#'
    },
    {
      title:'เงื่อนไขระดับของสมาชิก',
      link:'#'
    },
    {
      title:'คำถามที่พบบ่อย',
      link:'#'
    }
  ]

  const additional = [
    {
      title:'ประเทศและภาษา',
      link:'#'
    },
    {
      title:'ข้อกำหนดและเงื่อนไข',
      link:'#'
    },
    {
      title:'นโยบายความเป็นส่วนตัว',
      link:'#'
    },
    {
      title:'ความยินยอมในการเปิดเผยข้อมูล',
      link:'#'
    }
  ]

  return (
    <div className='flex flex-col w-[400px] hidden lg:block'>
      <header className="pb-5">
        {data && (
          <div className='flex items-center'>
            <img src={data.user_image} width="64" className='rounded-[99px]'/>
            <div className='ml-3 flex flex-col'>
              <h2 className='text-[#333333] text-sm'>สวัสดี</h2>
              <span className='font-bold'>{data.full_name}</span>
            </div>
          </div>
        )}
        {isLoading || error && (
          <div className='flex items-center'>
            <svg className="h-[64px] w-[64px] bg-white text-gray-300 rounded-[99px]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <div className='ml-3 flex flex-col'>
              <span className='font-bold'>Loading...</span>
            </div>
          </div>
        )}
      </header>
      <aside className='mt-5'>
        <button className='flex items-center gap-x-[10px]'>
          <User02 />
          บัญชีของฉัน
        </button>
        <div className='flex flex-col gap-y-3 mt-3'>
          {myAccount.map((m) => 
            <button className='flex items-center gap-x-[10px] text-[#858585]'>
              <User02 className='invisible'/>
              {m.title}
            </button>
          )}
        </div>
        <button className='flex items-center gap-x-[10px] mt-3'>
          <File06 />
          คำสั่งซื้อของฉัน
        </button>
        <div className='flex flex-col gap-y-3 mt-3'>
          {myOrder.map((m) => 
            <button className='flex items-center gap-x-[10px] text-[#858585]'>
              <User02 className='invisible'/>
              {m.title}
            </button>
          )}
        </div>
        <button className='flex items-center gap-x-[10px] mt-3'>
          <User02 />
          คะแนนของฉัน
        </button>
        <div className='flex flex-col gap-y-3 mt-3'>
          {myPoint.map((m) => 
            <button className='flex items-center gap-x-[10px] text-[#858585]'>
              <User02 className='invisible'/>
              {m.title}
            </button>
          )}
        </div>
        <button className='flex items-center gap-x-[10px] mt-3'>
          <User02 />
          คูปองของฉัน
        </button>
        <button className='flex items-center gap-x-[10px] mt-3'>
          <User02 />
          ติดต่อเรา
        </button>
        <button className='flex items-center gap-x-[10px] mt-3'>
          <User02 />
          ช่วยเหลือ
        </button>
        <div className='flex flex-col gap-y-3 mt-3'>
          {help.map((m) => 
            <button className='flex items-center gap-x-[10px] text-[#858585]'>
              <User02 className='invisible'/>
              {m.title}
            </button>
          )}
        </div>
        <button className='flex items-center gap-x-[10px] mt-3'>
          <ImageIndentLeft />
          เพิ่มเติม
        </button>
        <div className='flex flex-col gap-y-3 mt-3'>
          {additional.map((m) => 
            <button className='flex items-center gap-x-[10px] text-[#858585]'>
              <User02 className='invisible'/>
              {m.title}
            </button>
          )}
        </div>
      </aside>
    </div>
  )
}

export default DesktopSidebar