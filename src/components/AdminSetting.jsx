import React from 'react'
import Setting from './Setting'

function AdminSetting({ user }) {
  return (
    <div className='h-full'>
        <Setting user={user} />
    </div>
  )
}

export default AdminSetting