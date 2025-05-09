

import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'

const AllAppointments = () => {

  const { aToken, appointments, getAllAppointments, cancelAppointment } = useContext(AdminContext)
  const { calculateAge, slotDateFormat, curency } = useContext(AppContext)
  useEffect(() => {
    if (aToken) {
      getAllAppointments()
    }
  }, [aToken])
  return (
    <div className='w-full max-w-6xl m-5'>
      <p className='mb-3 text-lg font-medium'>All Appointments</p>
      <div className='bg-white border rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll'>
        <div className='hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b'>
          <p className='text-center'>#</p>
          <p className='text-center'>Patient</p>
          <p className='text-center'>Age</p>
          <p className='text-center'>Date & Time</p>
          <p className='text-center'>Doctor</p>
          <p className='text-center'>Fees</p>
          <p className='text-center'>Actions</p>
        </div>

        {appointments.map((item, index) => (
          <div className='grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50' key={index}>
            <p className='max-sm:hidden text-center'>{index + 1}</p>
            <div className='flex items-center gap-2'>
              <img className='w-8 rounded-full' src={item.userData.image} alt="" />
              <p>{item.userData.name}</p>
            </div>
            <p className='max-sm:hidden text-center'>{calculateAge(item.userData.dob)}</p>
            <p className='text-center'>{slotDateFormat(item.slotDate)}, {item.slotTime}</p>
            <div className='flex items-center gap-2'>
              <img className='w-8 rounded-full bg-gray-200' src={item.docData.image} alt="" />
              <p>{item.docData.name}</p>
            </div>
            <p className='text-center'>{curency}{item.amount}</p>
            <div className='flex justify-center'>
              {item.cancelled ?
                <p className='text-red-400 text-xs font-medium'>cancelled</p> :
                <img onClick={() => cancelAppointment(item._id)} className='w-10 cursor-pointer' src={assets.cancel_icon} alt="" />}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AllAppointments