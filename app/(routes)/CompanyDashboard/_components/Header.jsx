 'use client';
 
 import React from 'react'
import { ChevronDown, Search } from "lucide-react";
import Image from "next/image";
import { LogoutLink, useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LogOut, User, Users, Phone } from 'lucide-react';
import Link from 'next/link'; 

export default function Header() {
const {user}=useKindeBrowserClient(); 


  return (
  <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start w-full px-4">
  {/* Left side: Heading */}
  <div className="w-full lg:max-w-2xl">
    <h1 className="text-4xl font-bold p-2">Welcome to AI-HirePro!</h1>
    <p className="text-gray-600 text-xl pl-2">Efficiently screen and rank</p>
  </div>

  {/* Right side: Search and Avatar */}
  <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:max-w-2xl mt-4 lg:mt-4 lg:relative right-8">
    <div className=" relative ml-13 w-full ">
      <input
        type="text"
        placeholder="Search for candidates"
        className="lg:relative right-60 pl-10 pr-4 py-5 lg:w-150  sm:w-130  border border-gray-300 "
      />
      <span className=" flex items-center pointer-events-none  absolute inset-y-0 left-3  lg:hidden">
        <Search className="w-5 h-5 text-gray-600 " />
      </span>
    </div>
   <div className='flex items-center '>

    <DropdownMenu className>
       <DropdownMenuTrigger>
    <Image
  src={
    user?.picture ||
    'https://www.gravatar.com/avatar/?d=mp&s=200' // fallback if no user picture
  }
  alt="avatar"
  width={70}
  height={70}
  className="rounded-full lg:absolute top-0 right-6"
/>

       </DropdownMenuTrigger>
        <DropdownMenuContent className="w-64 bg-gray-900 text-white rounded-xl p-4 shadow-lg border border-gray-700">
        {/* Top Profile Info */}
        <div className="flex flex-col items-start mb-4">
          
          <div className="text-sm font-medium">{user?.name}</div>
          <div className="text-xs text-gray-400">{user?.email}</div>
        </div>

        <div className="border-t border-gray-700 mb-2"></div>

        {/* Menu Items */}
       <Link href="/companyprofile" passHref>
       <DropdownMenuItem className="flex items-center gap-2 px-2 py-2 hover:bg-gray-800 rounded cursor-pointer">
        <User className="w-4 h-4" />
           Company Profile
       </DropdownMenuItem>
       </Link>
       <Link href="/contacts" passHref>
        <DropdownMenuItem className="flex items-center gap-2 px-2 py-2 hover:bg-gray-800 rounded cursor-pointer">
          <Phone className="w-4 h-4" />
          Contact
        </DropdownMenuItem>
        </Link>
        <DropdownMenuItem className="flex items-center gap-2 px-2 py-2 hover:bg-gray-800 rounded cursor-pointer">
          <Users className="w-4 h-4" />
          Team
        </DropdownMenuItem>

        <DropdownMenuSeparator className="my-2 border-gray-700" />

        <LogoutLink>
          <DropdownMenuItem className="flex items-center gap-2 px-2 py-2 hover:bg-red-600 rounded cursor-pointer text-red-400">
            <LogOut className="w-4 h-4" />
            Logout
          </DropdownMenuItem>
        </LogoutLink>
      </DropdownMenuContent>
</DropdownMenu>
   </div>
  </div>
</div>


  )
}

