'use client'

import { LogoutLink } from '@kinde-oss/kinde-auth-nextjs'
import React from 'react'
import Header from './_components/Header'
import DashboardCalendar from './_components/DashboardCalendar'
import CandidateTasks from './_components/CandidateTasks'
import CandidateDirectory from './_components/CandidateDirectory'
import CandidateInsights from './_components/CandidateInsights'
import TeamSection from './_components/TeamSection'


function Dashboard() {
  return (
    <div className=' py-6 ' >
    <div className="flex-1 pt-10 space-y-6">
      <Header/>
    </div>

    <div className='grid grid-cols-3  ml-8 mt-8 gap-6'>
      <DashboardCalendar />
      <CandidateTasks/>
    </div>
    <div className='grid grid-cols-3 gap-6 mt-6 ml-8'>
      <CandidateDirectory/>
      <CandidateInsights/>
      <TeamSection/>    
    </div>




    </div>
  )
}

export default Dashboard
