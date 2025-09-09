
'use client';

import React from 'react'
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { LayoutDashboard,  Users, Calendar, Share2 } from "lucide-react";
import clsx from 'clsx';


function CompanySidebar() {

    const pathname = usePathname();
  return (
    <div>
      <div className='mt-20'>
      <div className='flex justify-center'>

      <aside className="w-20 flex flex-col gap-8 items-center py-6 space-y-6">
      <Link href="/CompanyDashboard" aria-label="Dashboard">
        <LayoutDashboard
          className={clsx(
            'w-6 h-6 transition-colors',
            pathname === '/CompanyDashboard' ? 'text-black' : 'text-gray-400 hover:text-black '
          )}
        />
      </Link>
      <Link href="/shares" aria-label="Share">
        <Share2
          className={clsx(
            'w-6 h-6 transition-colors',
            pathname === '/shares' ? 'text-black' : 'text-gray-400  hover:text-black'
          )}
        />
      </Link>
      <Link href="/candidates" aria-label="Team">
        <Users
          className={clsx(
            'w-6 h-6 transition-colors',
            pathname === '/candidates' ? 'text-black' : 'text-gray-400  hover:text-black'
          )}
        />
      </Link>

      <Link href="/calendar" aria-label="Calendar">
        <Calendar
          className={clsx(
            'w-6 h-6 transition-colors',
            pathname === '/calendar' ? 'text-black' : 'text-gray-400  hover:text-black'
          )}
        />
      </Link>
    </aside>
      </div>
      
    
    </div>
    </div>
  )
}

export default CompanySidebar
