import React from 'react'

const UserProfile = () => {
  return (
    <div className='min-h-screen bg-linear-to-br from-white to-slate-300 py-12 px-4'>
      <div className='max-w-7xl mx-auto'>
        <h2 className='font-bold text-4xl text-center mb-12 text-slate-800'>Welcome to Your Profile</h2>
        
        <div className='flex flex-col lg:flex-row gap-8'>
          {/* Left Sidebar */}
          <div className='lg:w-1/3'>
            <div className='bg-white shadow-md rounded-lg p-8 sticky top-8'>
              <h3 className='font-bold text-2xl text-slate-800 mb-6'>Manage My Account</h3>
              <ul className='flex flex-col gap-3'>
                <li className='p-3 rounded-lg hover:bg-blue-50 text-blue-600 font-semibold cursor-pointer transition border-l-4 border-blue-600 pl-4'>
                  View Order History
                </li>
                <li className='p-3 rounded-lg hover:bg-blue-50 text-blue-600 font-semibold cursor-pointer transition border-l-4 border-transparent pl-4 hover:border-blue-600'>
                  Change Password
                </li>
                <li className='p-3 rounded-lg hover:bg-blue-50 text-blue-600 font-semibold cursor-pointer transition border-l-4 border-transparent pl-4 hover:border-blue-600'>
                  Manage Addresses
                </li>
              </ul>
            </div>
          </div>

          {/* Right Form Section */}
          <div className='lg:w-2/3'>
            <div className='bg-white shadow-md rounded-lg p-10'>
              <p className='text-2xl font-bold text-slate-800 mb-8'>Edit Profile</p>
              <form className='space-y-6'>
                {/* Name Fields */}
                <div className='grid grid-cols-2 gap-6'>
                  <div className='flex flex-col'>
                    <label className='font-semibold text-slate-700 mb-2' htmlFor="firstName">First Name</label>
                    <input type="text" id="firstName" className='border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent' placeholder='Enter First name' />
                  </div>
                  <div className='flex flex-col'>
                    <label className='font-semibold text-slate-700 mb-2' htmlFor="lastName">Last Name</label>    
                    <input type="text" id="lastName" className='border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent' placeholder='Enter Last name' />
                  </div>
                </div>

                {/* Email & Address */}
                <div className='grid grid-cols-2 gap-6'>
                  <div className='flex flex-col'>
                    <label className='font-semibold text-slate-700 mb-2' htmlFor="email">Email</label>
                    <input type="email" id="email" className='border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent' placeholder='Enter Email' />
                  </div>
                  <div className='flex flex-col'>
                    <label className='font-semibold text-slate-700 mb-2' htmlFor="address">Full Address</label>    
                    <input type="text" id="address" className='border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent' placeholder='Enter Full Address' />
                  </div>
                </div>

                {/* Password Changes */}
                <div className='flex flex-col gap-4'>
                  <label className='font-semibold text-slate-700'>Password Changes</label>
                  <input type="password" className='border border-slate-300 bg-slate-50 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white' placeholder='Current Password' />
                  <input type="password" className='border border-slate-300 bg-slate-50 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white' placeholder='New Password' />
                  <input type="password" className='border border-slate-300 bg-slate-50 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white' placeholder='Confirm New Password' />
                </div>

                <button className='w-full mt-8 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-200 shadow-md'>Update Profile</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserProfile
