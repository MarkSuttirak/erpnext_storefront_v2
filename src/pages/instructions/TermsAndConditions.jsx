import React from 'react'
import FooterMenu from "../../components/FooterMenu"
import TitleHeader from '../../components/TitleHeader';
import { useFrappeGetDoc } from 'frappe-react-sdk';

export default function TermsAndConditions() {
  const { data } = useFrappeGetDoc('Terms and Conditions Document', {
    fields: ['description']
  })
  return (
    <>
      <TitleHeader link={'/my-account'} title={'ข้อกำหนดและเงื่อนไข'} /> 
      {data && (
        <div className="px-[20px] pt-9 mb-[120px] mt-[53px]">
          <div className='mt-2 info-desc' dangerouslySetInnerHTML={{__html:data.description}}/>
        </div>
      )}
      <FooterMenu active={3} />
    </>
  )
}