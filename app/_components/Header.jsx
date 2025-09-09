import { Button } from '@/components/ui/button'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

function Header() {
  return (
    <div  >
     <div className="flex  min-h-screen   items-center justify-center  bg-gray-100 p-4">
     <div className='absolute left-1/10'>
      <Image src="/jobsecure.jpg" width={650} height={700} alt='picture' 
       className='hidden md:flex rounded-2xl' />
     </div>
     <div className='hidden md:flex absolute top-155 left-1/10 flex-col'>
        
     <h1 className="   text-2xl font-bold m-2"> Looking For a Job or Internship </h1>
     <h1 className='text-2xl font-bold '> Or Looking To Hire Experience employees And Interns  Click on Expore </h1>
     </div>

     <div className='absolute top-1/3
       right-1/4'>
        <Image src="/logo.png" width={120} height={120} alt='logo'
       className='hidden md:flex  h-[120px] object-cover rounded-full ' />
     </div>
    <div className="md:justify-center top-1/2  right-1/5 ">
     <h1 className="text-6xl absolute top-1/2  right-1/5  font-bold text-gray-800">AI - HirePro</h1>

     <h3 className="text-2xl absolute top-115 right-1/4 "> Hiring Platform</h3>

    </div>
   
<Link href="/GetStarted" >  <Button variant="default" className='px-40 py-8 absolute top-135 right-1/6 "> Hiring Platform</h3>
'>Explore Further</Button></Link>
  </div>

    </div>
  )
}

export default Header
