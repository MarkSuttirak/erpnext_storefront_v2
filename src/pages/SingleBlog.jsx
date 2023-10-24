import React, { useState } from 'react'
import TitleHeader from '../components/TitleHeader'
import { useFrappeGetDoc } from 'frappe-react-sdk';
import { useParams } from 'react-router-dom';
import { Calendar } from '@untitled-ui/icons-react';
import Breadcrumbs from '../components/Breadcrumbs';

export default function SingleBlog() {
  const { id } = useParams();

  const { data, isLoading, error } = useFrappeGetDoc('Blog Post', id, {
    fields: ['name','title','content','meta_image','published_on','blog_category','blogger']
  })

  return (
    <>
      <TitleHeader link={'/'} title={'รายละเอียด'} />
      <main className='main-margintop desktop-sec lg:py-10'>
        <Breadcrumbs pages={[{
          href:'/blog',
          name:'บทความ'
        }, {
          href:'',
          name:id
        }]}/>
        <img className={`w-full aspect-video object-cover lg:rounded-lg`} src={`${import.meta.env.VITE_ERP_URL}${data?.meta_image}`} alt="" />

        <section className='px-5 py-6 lg:px-0'>
          <h2 className='text-base lg:text-[26px] text-[#111111] font-bold'>{data?.title}</h2>
          <div className='flex items-center gap-x-3 mt-[18px] mb-3 text-xs lg:text-lg'>
            <div className='h-5 w-5 bg-[#646464] rounded-full'/>
            {data?.blogger}
          </div>
          <div className='flex items-center gap-x-3'>
            <Calendar color='#8A8A8A'/>
            <p className='text-xs text-[#8A8A8A] lg:text-lg'>เขียนเมื่อ {data?.published_on}</p>
          </div>

          <div className='mt-[30px]'>
            <h4 className='header-title'>รายละเอียด</h4>
            <div className="pt-2">
              <div className='info-desc ml-5' dangerouslySetInnerHTML={{__html:data?.content}}/>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}