// import React from 'react'
// import { footerBottomItems } from '../../constants'

// const FooterBottom = () => {
//   return (
//     <div className='w-full bg-footerBottom py-8'>
//       <div className='max-w-5xl mx-auto'>
//         <div className='w-full grid grid-cols-7 gap-3 place-content-center text-gray-400'>
//           {footerBottomItems.map((item) => (
//             <div className='group cursor-pointer' key={item._id}>
//               <h3 className='w-24 font-semibold text-[12px] group-hover:underline text-[#DDD] Leading-3 mb-[2px];'>{item.title}</h3>
//               <p className='w-24 tracking-tight text-[12px] text-[#999] group-hover:underline leading-3'>{item.description}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   )
// }

// export default FooterBottom

import React from 'react'
import { footerBottomItems } from '../../constants'

const FooterBottom = () => {
  return (
    <div className='w-full bg-footerBottom py-8'>
      <div className='max-w-5xl mx-auto'>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-3 text-gray-400'>
          {footerBottomItems.map((item) => (
            <div className='group cursor-pointer' key={item._id}>
              <h3 className='font-semibold text-sm sm:text-base lg:text-sm xl:text-base text-[12px] sm:text-[14px] xl:text-[12px] group-hover:underline text-[#DDD] Leading-3 mb-[2px];'>{item.title}</h3>
              <p className='tracking-tight text-[12px] sm:text-sm lg:text-[12px] xl:text-sm text-[#999] group-hover:underline leading-3'>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default FooterBottom
