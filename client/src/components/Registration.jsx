import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
//check about valid email
// const isValidEmail = (form.email) = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(form.email);
const Login = ({ onSignUpSuccess = null }) => {
  const navigate = useNavigate()
  const [form, setForm] = useState({name:'' , credential: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch('http://localhost:5000/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name:form.name.trim(),
          email: form.credential.trim().toLowerCase(),  // Map credential to email
          password: form.password
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.message || 'Login failed')
        return
      }

      if (data.token) {
        localStorage.setItem('token', data.token)
        localStorage.setItem('user', JSON.stringify(data.user))
      }

      if (onSignUpSuccess) {
        onSignUpSuccess(data.user)
      }
      
      navigate('/product')
    } catch (error) {
      console.error('Error logging in:', error)
      setError('An error occurred. Please try again.')
    } finally {
      setLoading(false)
      setForm({ credential: '', password: '' })
      
    }
  }

  return (
    <div className='md:grid md:grid-cols-2 md:min-h-[70vh] my-10'>
      <div className='right hidden md:block h-full overflow-hidden'>
        <img 
          src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bG9naW58ZW58MHx8MHx8fDA%3D&w=1000&q=80" 
          alt="login image" 
          className='object-cover h-full w-full'
        />
      </div>
      <div className='flex items-center justify-center w-full'>
        <div className='flex flex-col md:w-1/2 items-start'>
          <div className='mb-8'>
            <h2 className='text-3xl font-semibold mb-2'>Sign in to Exclusive</h2>
            <p className='font-light'>Access to premium content awaits you.</p>     
          </div>
          <form className='flex flex-col my-4 gap-4 w-full' onSubmit={handleSubmit}>
            <input
              name='name'
              type="text"
              value={form.name}
              onChange={handleChange}
              className='border-solid border-gray-700 border-b-2 outline-none rounded-sm px-2 py-1'
              placeholder='Enter Your Name'
            />
            <input
              name='credential'
              type="email"
              value={form.credential}
              onChange={handleChange}
              className='border-solid border-gray-700 border-b-2 outline-none rounded-sm px-2 py-1'
              placeholder='Email or Phone Number'
            />
            <input
              name='password'
              value={form.password}
              type="password"
              onChange={handleChange}
              className='outline-none border-solid border-gray-700 border-b-2 rounded-sm px-2 py-1'
              placeholder='Password'
            />
            {error && <p className='text-red-500 text-sm'>{error}</p>}
            <div className='flex w-full mt-3 items-center'>
              <button 
                type='submit'
                className='bg-orange-400 w-full text-white disabled:bg-gray-300 px-7 py-2' 
                disabled={!(form.name && form.credential && form.password) || loading}
              >
                {loading ? 'Loading...' : 'SignUp'}
              </button>
             
            </div>
          </form>

        </div>
      </div>
    </div>
  )
}

export default Login
