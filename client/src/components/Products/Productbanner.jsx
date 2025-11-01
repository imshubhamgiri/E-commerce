import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const Productbanner= (newdata) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  return (
        <div className='relative w-full h-full flex items-center justify-center bg-linear-to-r from-purple-900 via-black to-black overflow-hidden'>
            <div className="flex flex-col md:flex-row h-full">
              {/* Text and CTA Section (Left) */}
              <div className="flex-1 p-6 sm:p-10 lg:p-16 flex flex-col justify-center text-white z-10">
                <h2 className="text-xl flex gap-3 sm:text-2xl md:text-3xl lg:text-5xl shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#08f,0_0_15px_#08f,0_0_30px_#08f]
                 transition-all font-extrabold mb-2 leading-tight">
                 <img width={46} src="/apple.png" alt=""  className='invert-100' /> Iphone 17 Series
                </h2>
                <p className="text-xl sm:text-5xl md:text-xl lg:text-xl font-bold mb-6 sm:mb-8 leading-none">
                  Explore our exclusive collection of premium products. Limited time offer!
                  Get UpTo 50% Off
                </p>
                <Link
                  to='/product'
                  className="flex items-center text-lg font-semibold w-fit pb-1 border-b-2 border-white hover:scale-110 hover:text-gray-300 transition duration-200"
                >
                  Shop Now
                  <ChevronRight className="w-5 h-5 ml-1" />
                </Link>
              </div>

              {/* Image Section (Right) */}
              <div className="relative flex-1 flex justify-center   overflow-hidden items-center p-4 md:p-0">
                {/* Mockup for the dark, glossy iPhone image */}

                <img
                  src='/iphone-removebg-preview.png'
                  alt='Product Image'
                  width={390}
                  className="hover:scale-165 object-fill transform scale-125 md:scale-150 transition-transform duration-500 ease-in-out"
                  // Subtle purple glow effect
                  onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/400x350/1C1C1E/FFFFFF?text=Product+Image" }}
                />
              </div>
            </div>

            {/* Carousel Controls and Indicators (Bottom Center) */}
            {/* <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {newdata.map((_, index) => (
          <button
            key={index}
            aria-label={`Go to slide ${index + 1}`}
            onClick={() => setCurrentSlideIndex(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              index === currentSlideIndex ? 'bg-white w-5' : 'bg-gray-500'
            }`}
          />
        ))}
      </div> */}
    </div>
  )
}

export default Productbanner
