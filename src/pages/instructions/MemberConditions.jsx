import React from 'react'
import FooterMenu from "../../components/FooterMenu"
import TitleHeader from '../../components/TitleHeader';
import { useFrappeGetCall, useFrappeGetDoc, useFrappeGetDocList, useFrappeAuth } from 'frappe-react-sdk';

function MemberConditions() {
    const { currentUser } = useFrappeAuth()

    const { data } = useFrappeGetDoc('Member Conditions', {
      fields: ['description']
    })

    return (
        <>
            <TitleHeader link={'/my-account'} title={'เงื่อนไขระดับของสมาชิก'} />
            {data && (
                <div className="px-[20px] pt-9 mb-[120px] mt-[53px]">
                    <div className='mt-2 info-desc' dangerouslySetInnerHTML={{__html:data.description}}/>
                </div>
            )}
            <FooterMenu active={3} />
        </>
    )
}

export default MemberConditions
