import React, { useEffect } from 'react'
import { useState } from 'react'
const Login = () => {
const [Form, setForm] = useState({credential:'', password:""})
const data = (e) => {
setForm({ ...Form, [e.target.name]: e.target.value })
}
const handlesSubmit =() => {
  setForm({credential:'', password:""});
}

useEffect(() => {
console.log(Form)
}, [Form])


  return (
    <div className='md:grid md:grid-cols-2 md:min-h-[70vh] my-10'>
      <div className='right hidden md:block h-full overflow-hidden'>
        <img 
          src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bG9naW58ZW58MHx8MHx8fDA%3D&w=1000&q=80" 
          alt="login image" 
          className='object-cover h-full w-full'
        />
      </div>
      <div className='flex items-center justify-center w-full '>
        <div className='flex flex-col md:w-1/2 items-start'>
            <div className='mb-8'>
        <h2 className='text-3xl font-semibold mb-2'>Log in to Exclusive</h2>
        <p className='font-light'>Access to premium content awaits you.</p>     
            </div>
        <form className='flex flex-col my-4 gap-4 w-full'
          onSubmit={handlesSubmit}>
          <input
            name='credential'
            type="email"
            value={Form.credential}
            onChange={(e)=>data(e)}
            className='border-solid border-gray-700 border-b-2 outline-none  rounded-sm px-2 py-1'
            placeholder='Email or Phone Number'
          />
          <input
            name='password'
            value={Form.password}
            type="password"
            onChange={(e)=>data(e)}
            className='outline-none border-solid border-gray-700 border-b-2  rounded-sm px-2 py-1'
            placeholder='Password'
          />
          <div className='flex justify-between mt-3 items-center'>
          <button  className='bg-orange-400 w-fit text-white  disabled:bg-gray-300 px-7 py-2' disabled={!(Form.credential && Form.password)}>
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
