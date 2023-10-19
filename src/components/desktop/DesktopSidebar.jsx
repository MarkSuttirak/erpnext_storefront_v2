import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect, Fragment } from 'react'
import { useFrappeAuth, useFrappeGetDoc, useFrappeGetDocCount } from 'frappe-react-sdk';
import { File06, ImageIndentLeft, User02 } from '@untitled-ui/icons-react';

export default function DesktopSidebar(){
  const location = useLocation();
  const { currentUser, updateCurrentUser } = useFrappeAuth();

  const { data, isLoading, error } = useFrappeGetDoc('User', currentUser, {
    filters: ['name', 'full_name', 'user_image']
  })

  const bothMenus = [
    {
      title:'บัญชีของฉัน',
      link:'#',
      icon:<User02 />,
      submenu: [
        {
          title:'โปรไฟล์ของฉัน',
          link:'/my-account'
        },
        {
          title:'การชำระเงิน',
          link:'/payment'
        },
        {
          title:'ที่อยู่ในการจัดส่ง',
          link:'/shipping-address'
        },
        {
          title:'สินค้าที่ดูล่าสุด',
          link:'/viewed-products'
        }
      ]
    },
    {
      title:'คำสั่งซื้อของฉัน',
      link:'/my-order',
      icon:<File06 />,
      submenu: [
        {
          title:'ประวัติการสั่งซื้อ',
          link:'#'
        }
      ]
    },
    {
      title:'คูปองของฉัน',
      link:'#',
      icon:<User02 />,
      submenu: [
        {
          title:'คูปองทั้งหมด',
          link:'/my-coupon'
        },
        {
          title:'ID ของฉัน',
          link:'/my-id'
        }
      ]
    },
    {
      title:'สะสมแต้ม',
      link:'#',
      icon:<User02 />,
      submenu: [
        {
          title:'เงื่อนไขการรับคะแนน',
          link:'#'
        },
        {
          title:'เงื่อนไขระดับสมาชิก',
          link:'#'
        },
        {
          title:'วิธีการแลกของรางวัล',
          link:'#'
        },
        {
          title:'ประวัติการใช้คะแนน',
          link:'#'
        }
      ]
    }
  ]

  return (
    <div className='flex flex-col w-[400px] hidden lg:block'>
      <header className="pb-5">
        {data && (
          <div className='flex items-center'>
            <img src={`${import.meta.env.VITE_ERP_URL}${data.user_image}`} width="64" className='rounded-[99px]'/>
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
      <aside className='mt-5 flex flex-col gap-y-3'>
        {bothMenus.map((d) => (
          <>
            <Link to={d.link} className='flex items-center gap-x-[10px] font-bold'>
              {d.icon}
              {d.title}
            </Link>
            <div className='flex flex-col gap-y-3'>
              {d.submenu.map((m) => 
                <Link to={m.link} className='flex items-center gap-x-[10px] text-[#858585]'>
                  <User02 className='invisible'/>
                  <span className={`${location.pathname === m.link ? 'text-[#66BC89]' : ''}`}>{m.title}</span>
                </Link>
              )}
            </div>
          </>
        ))}
      </aside>
    </div>
  )
}