import { getQuery } from '@/app/action/faq'
import AdminQuery from '@/components/AdminQuery';
import React from 'react'

async function page() {
  const data = await getQuery();
  console.log(data);
  return (
    <div>
      <AdminQuery data={data} />
    </div>
  )
}

export default page