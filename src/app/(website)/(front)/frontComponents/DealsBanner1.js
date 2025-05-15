import { baseUrl, fetcher } from '@/Http/helper'
import Link from 'next/link';
import React from 'react'
import useSWR from 'swr'

function DealsBanner1() {

const {data, error, isLoading } = useSWR(`/api/front/deal-banner2`, fetcher);
const bannerData = data?.data;
if(!bannerData){
    return <></>
}
  return (
    <div className="rts--offer-area-start rts-section-gap_tb">
        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                  <Link href={bannerData.url}>
                  <img src={`${baseUrl}${bannerData.photo}`} />
                </Link>
                </div>
            </div>
        </div>
    </div>
  )
}

export default DealsBanner1