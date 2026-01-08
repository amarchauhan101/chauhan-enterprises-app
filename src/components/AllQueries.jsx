'use server'
import React from 'react'
import Faq from './Faq'
import { getQuery } from '@/app/action/faq'

async function AllQueries() {
    const data = await getQuery();
    console.log("data", data);
  return (
    <Faq  data={data}/>
  )
}

export default AllQueries