import React from 'react'
import AdminHeader from './AdminHeader'
import DashBoardOverView from './DashBoardOverView'

function AdminDashBoard({ Allorders, user }) {

  return (
    <div className='bg-zinc-600 w-full'>
      {/* <AdminHeader/> */}
      <DashBoardOverView Allorders={Allorders} user={user} />
    </div>
  )
}

export default AdminDashBoard