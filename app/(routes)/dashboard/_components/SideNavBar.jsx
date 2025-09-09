'use client';

import React from 'react'
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { LayoutDashboard,  Users, Calendar, Share2 } from "lucide-react";
import clsx from 'clsx';

function SideNavBar() {

     const pathname = usePathname();
  

  return (
    <div className='mt-20'>
      <div className='flex justify-center'>

      <aside className="w-20 flex flex-col gap-8 items-center py-6 space-y-6">
      <Link href="/dashboard" aria-label="Dashboard">
        <LayoutDashboard
          className={clsx(
            'w-6 h-6 transition-colors',
            pathname === '/dashboard' ? 'text-black' : 'text-gray-400 hover:text-black '
          )}
        />
      </Link>

      <Link href="/share" aria-label="Share">
        <Share2
          className={clsx(
            'w-6 h-6 transition-colors',
            pathname === '/share' ? 'text-black' : 'text-gray-400  hover:text-black'
          )}
        />
      </Link>

      <Link href="/companies" aria-label="Team">
        <Users
          className={clsx(
            'w-6 h-6 transition-colors',
            pathname === '/companies' ? 'text-black' : 'text-gray-400  hover:text-black'
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
  )
}

export default SideNavBar

