import React from 'react'

const Login = () => {
  return (
    <div className='grid grid-cols-2 h-[70vh] my-10'>
      <div className='right h-full overflow-hidden'>
        <img 
          src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bG9naW58ZW58MHx8MHx8fDA%3D&w=1000&q=80" 
          alt="login image" 
          className='object-cover h-full w-full'
        />
      </div>
      <div className='flex items-center justify-center w-full '>
        <div className='flex flex-col w-1/2 items-start'>
            <div className='mb-8'>
        <h2 className='text-3xl font-semibold mb-2'>Log in to Exclusive</h2>
        <p className='font-light'>Access to premium content awaits you.</p>     
            </div>
        <form className='flex flex-col my-4 gap-4 w-full'>
          <input
            type="email"
            className='border-solid border-gray-700 border-b-2 outline-none  rounded-sm px-2 py-1'
            placeholder='Email or Phone Number'
          />
          <input
            type="password"
            className='outline-none border-solid border-gray-700 border-b-2  rounded-sm px-2 py-1'
            placeholder='Password'
          />
          <div className='flex justify-between mt-3 items-center'>
          <button className='bg-orange-400 w-fit text-white  px-7 py-2'>
            Login
          </button>
          <p className='font-extralight text-red-400'>Forgot password?</p>
          </div>
        </form>
        </div>
      </div>
    </div>
  )
}

export default Login
