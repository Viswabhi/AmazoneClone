import React from 'react'
import KeyboardArrowRightIcon from "@mui/icons-material/keyboardArrowRight";
const SideNav = ({title,one,two,three}) => {
  return (
    <div className='py-3 border-b-[1px] border-b-gray-300 '>
       <div >
                <h3 className='text-lg font-titleFont font-semibold mb-1 px-6 text-black'>{title}</h3>
                <ul>
                  <li className='flex items-center justify-between hover:bg-zinc-200 px-6 py-2 cursor-pointer text-black'
            
                  >{one} <span><KeyboardArrowRightIcon/></span></li>  
                  <li className='flex items-center justify-between hover:bg-zinc-200 px-6 py-2 cursor-pointer text-black'
            
            >{two} <span><KeyboardArrowRightIcon/></span></li>  
            <li className='flex items-center justify-between hover:bg-zinc-200 px-6 py-2 cursor-pointer text-black'
            
            >{three}<span><KeyboardArrowRightIcon/></span></li>  
                </ul>
               </div>
    </div>
  )
}

export default SideNav
