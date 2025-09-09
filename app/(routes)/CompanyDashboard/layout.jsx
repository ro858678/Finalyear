import React from 'react'
import CompanySidebar from './_components/companysidebar';



export const metadata = {
 title: 'AI-HirePro ',
 description: 'Efficiently screen and rank candidates with AI',
};

function  CompanyDashboardlayout({children}) {
  return (
    <div>
        <div> 
        <div className=' fixed  md:block  hidden md:w-30 min-h-screen bg-gray-200 text-gray-800"'>
            <CompanySidebar/>
        </div>

        <div className='md:ml-30'>

      {children}
        </div>
    </div>   
    </div>
  )
}

export default CompanyDashboardlayout
