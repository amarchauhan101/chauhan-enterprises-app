import Image from 'next/image'
import React from 'react'

function CraftingText() {
  return (
    <div className='relative py-8 sm:py-12 px-4 overflow-hidden '>
      {/* Light Background Image */}
      <div 
        className='absolute inset-0 bg-[url("/craft5.webp")] bg-cover bg-center opacity-50'
        style={{
          filter: 'brightness(1.3) contrast(0.8)',
        }}
      ></div>
      
      {/* Gradient Overlay */}
      <div className='absolute inset-0  from-green-50/80 via-green-100/70 to-green-150/80'></div>
      
      {/* Content */}
      <div className='relative z-10 max-w-6xl mx-auto text-center'>
        <div className='space-y-4 sm:space-y-6'>
          {/* First Line */}
          <div className='flex  sm:flex-row items-center justify-center gap-2 sm:gap-4 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold font-[cursive] text-amber-500'>
            <span className='text-center '>We are crafting amazing</span>
            <div className='relative group flex-shrink-0'>
              <div className='overflow-hidden rounded-full shadow-lg transform group-hover:scale-110 transition-transform duration-300'>
                <Image 
                  width={40} 
                  height={40} 
                  src="/craft1.avif" 
                  alt="crafting" 
                  className='object-cover sm:w-[50px] sm:h-[50px] md:w-[60px] md:h-[60px]' 
                />
              </div>
            </div>
            <span className='text-center'>products that</span>
          </div>

          {/* Second Line */}
          <div className='flex  sm:flex-row items-center justify-center gap-2 sm:gap-4 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold font-[cursive] text-gray-800'>
            <div className='relative group flex-shrink-0 order-2 sm:order-1'>
              <div className='overflow-hidden rounded-full shadow-lg transform group-hover:scale-110 transition-transform duration-300'>
                <Image 
                  width={40} 
                  height={40} 
                  src="/craft2.avif" 
                  alt="crafting" 
                  className='object-cover sm:w-[50px] sm:h-[50px] md:w-[60px] md:h-[60px]' 
                />
              </div>
            </div>
            <span className='text-center order-1 sm:order-2'>delight. Constantly uplifting the</span>
          </div>

          {/* Third Line */}
          <div className='flex  sm:flex-row items-center justify-center gap-2 sm:gap-4 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold font-[cursive] text-slate-500'>
            <span className='text-center'>home & office</span>
            <div className='relative group flex-shrink-0'>
              <div className='overflow-hidden rounded-full shadow-lg transform group-hover:scale-110 transition-transform duration-300'>
                <Image 
                  width={40} 
                  height={40} 
                  src="/craft3.avif" 
                  alt="crafting" 
                  className='object-cover sm:w-[50px] sm:h-[50px] md:w-[60px] md:h-[60px]' 
                />
              </div>
            </div>
            <span className='text-center'>environment</span>
          </div>
        </div>
        
        {/* Decorative element */}
        <div className='mt-6 sm:mt-8 flex justify-center'>
          <div className='w-16 sm:w-24 h-1  from-green-400 to-green-600 rounded-full'></div>
        </div>
      </div>
    </div>
  )
}

export default CraftingText