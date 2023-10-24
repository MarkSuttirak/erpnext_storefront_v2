import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect, Fragment, createContext } from 'react'
import { useFrappeAuth, useFrappeGetDoc, useFrappeGetDocCount } from 'frappe-react-sdk';
import { User02 } from '@untitled-ui/icons-react';
import { bothMenus, pointsMenus } from '../Menus';

export default function DesktopSidebar(){
  const [storeType, setStoreType] = useState('point & reward')
  const location = useLocation();
  const { currentUser, updateCurrentUser } = useFrappeAuth();

  const { data, isLoading, error } = useFrappeGetDoc('User', currentUser, {
    filters: ['name', 'full_name', 'user_image']
  })

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
        {storeType === 'both' && (
          <>
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
          </>
        )}
        {storeType === 'point & reward' && (
          <>
            {pointsMenus.map((d) => (
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
          </>
        )}
      </aside>
    </div>
  )
}