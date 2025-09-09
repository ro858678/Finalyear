

import React from 'react'
import SideNavBar from './_components/SideNavBar'

export const metadata = {
 title: 'AI-HirePro ',
 description: 'Efficiently screen and rank candidates with AI',
};

function DashboardLayout({children}) {
  return (
    <div> 
        <div className=' fixed  md:block  hidden md:w-30 min-h-screen bg-gray-200 text-gray-800"'>
            <SideNavBar/> 
        </div>

        <div className='md:ml-30'>

      {children}
        </div>
    </div>
  )
}

export default DashboardLayout
