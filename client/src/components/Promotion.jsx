import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { ArrowDown, ChevronDown } from 'lucide-react';

const Promotion = () => {
    const [eToH, seteToH] = useState(false)
    const [translate, settranslate] = useState('English')
    
    const handleLanguageChange = (lang) => {
        settranslate(lang)
        seteToH(false) // Close dropdown after selection
    }
    
    const handleBlur = () => {
        setTimeout(() => {
            seteToH(false)
        }, 250)
    }
    
  return (
    <>
    <div className='top bg-black flex justify-center  w-full sticky top-0 z-50 px-5 py-2'>
      <div className='main w-full flex justify-center'>
        <p className='text-stone-100'>
            Hallowin sale For up to 50% off! Use Code "HALLOWIN50"
            <NavLink to="/product" className='underline ml-2 transition-transform inline-block font-semibold hover:scale-110 text-white'>
              Shop Now
            </NavLink>
        </p>
      </div>
      <div className='relative mr-14'>
        <button  
         onBlur={handleBlur}
         onClick={()=> seteToH(!eToH)}
        className='text-white min-w-20
        font-medium hover:drop-shadow-[0_0_2px_rgba(255,255,255,0.8)] flex items-center  gap-1 transition-all'>
            {translate} <span>  <ChevronDown size={15} className='' /></span>
        </button>
            {eToH && (
              <div className='absolute top-8 right-0 bg-white text-black rounded-md shadow-md z-10'>
                <ul>
                  <li className='px-4 py-2 hover:bg-gray-100 cursor-pointer' onClick={() => handleLanguageChange('English')}>English</li>
                  <li className='px-4 py-2 hover:bg-gray-100 cursor-pointer' onClick={() => handleLanguageChange('Hindi')}>Hindi</li>
                  <li className='px-4 py-2 hover:bg-gray-100 cursor-pointer' onClick={() => handleLanguageChange('Spanish')}>Spanish</li>
                </ul>
              </div>
            )}
      </div>
    </div>
    </>
  )
}

export default Promotion
