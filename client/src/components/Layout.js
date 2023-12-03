import React, { useState } from 'react'
import SideBar from './SideBar'
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import {FaRegUserCircle} from 'react-icons/fa'
//Props is recieving the children
function Layout(props) {
  //Create a state
  //USE state is tru as initally the bar should be visible
  const [showSideBar, setshowSideBar] = useState(true)
  return (
    //Here the classname is just for proper code behaviour display  = flex by default row
    <div className='layout flex w-full h-full'>
      {/* this one is for side bar */}
      <div className='sidebar'>
        <SideBar showSideBar={showSideBar} />
      </div>
      {/* this one is for body bar */}
      <div className='w-full h-full'>
        {/* This is for header */}
        <div className='header bg-primary h-20 w-full flex items-center justify-between'>
          <HiOutlineMenuAlt1
            onClick={()=>setshowSideBar(!showSideBar)}
            color='#ededed'
            size={40}
            className='cursor-pointer' />
            <div className='mr-10 text-gray-100 flex items-center space-x-1 text-xl'>
            <FaRegUserCircle />
              <span>
                {JSON.parse(localStorage.getItem('users-pro')).name.toUpperCase()}
              </span>
            </div>
        </div>
        {/* This  is for content */}
        <div className='content max-h-[85vh] overflow-y-auto'>
          {props.children}
        </div>

      </div>

    </div>
  )
}

export default Layout