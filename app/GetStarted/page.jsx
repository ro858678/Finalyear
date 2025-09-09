'use client'

import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { LoginLink, RegisterLink } from '@kinde-oss/kinde-auth-nextjs'
import { usePathname } from "next/navigation";
import Link from "next/link";
function GetStarted() {

   const pathname = usePathname();


  const links = [
    { name: "Home", href: "/GetStarted" },
    { name: "Contact Us", href: "/contacts" },
    { name: "About Us", href: "/aboutus" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
 <section className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
      <div className="px-4 py-2 flex items-center justify-between">
        <Image
          src="/logo.png"
          width={60}
          height={60}
          alt="Logo"
          className="hover:cursor-pointer"
        />

        <ul className="hidden md:flex gap-10 font-medium text-base">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`transition-all duration-300 ${
                  pathname === link.href
                    ? "text-blue-600 font-semibold"
                    : "hover:text-slate-500"
                }`}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex gap-2">
          <LoginLink postLoginRedirectURL="/app-redirect">
            <Button variant="ghost">Login</Button>
          </LoginLink>
          <RegisterLink postLoginRedirectURL="/app-redirect">
            <Button>Get Started</Button>
          </RegisterLink>
        </div>
      </div>
    </section>

    
    
      
      {/* How It Works */} <div className="font-sans">
      {/* Hero Section */}
      <section className="relative h-screen w-full bg-cover bg-center flex items-center justify-center" style={{ backgroundImage: "url('/saulo-mohana-wNz7_5EvUWU-unsplash.jpg')" }}>
        <div className="bg-black/60 absolute inset-0" />
        <div className="relative z-10 text-center text-white px-6 max-w-2xl">
          <h1 className="text-5xl font-bold mb-6">Welcome to HirePro</h1>
          <p className="text-lg mb-6">Get your resume screened instantly and land your dream job or internship faster.</p>
          <button className="bg-white text-black px-8 py-3 rounded-lg text-lg hover:bg-gray-300 transition">Get Started</button>
        </div>
      </section>

   {/* How It Works */}
<section className="py-20 px-6 bg-white text-center">
  <h2 className="text-3xl font-semibold mb-12">How It Works</h2>
  <div className="grid md:grid-cols-3 gap-10">
    {/* Card 1 */}
    <div className="h-[400px] shadow-md rounded-xl bg-gray-50 overflow-hidden flex flex-col">
      {/* Image takes about 60% */}
      <div className="h-1/2 flex items-center justify-center bg-white">
        <Image
          src="/alesia-kazantceva-VWcPlbHglYc-unsplash.jpg"
          width={500}
          height={500}
          alt="Upload Resume"
          className="object-contain"
        />
      </div>
      {/* Text takes the rest */}
      <div className="flex-1 flex flex-col justify-center p-4">
        <h3 className="text-xl font-semibold">1. Upload Resume</h3>
        <p className="mt-2 text-gray-600">
          Easily upload your resume and let AI analyze it.
        </p>
      </div>
    </div>

    {/* Card 2 */}
    <div className="h-[400px] shadow-md rounded-xl bg-gray-50 overflow-hidden flex flex-col">
      <div className="h-1/2 flex items-center justify-center bg-white">
        <Image
          src="/christina-wocintechchat-com-LQ1t-8Ms5PY-unsplash.jpg"
          width={500}
          height={500}
          alt="AI Screening"
          className="object-contain"
        />
      </div>
      <div className="flex-1 flex flex-col justify-center p-4">
        <h3 className="text-xl font-semibold">2. AI Screening</h3>
        <p className="mt-2 text-gray-600">
          Our AI ranks your resume based on job requirements.
        </p>
      </div>
    </div>

    {/* Card 3 */}
    <div className="h-[400px] shadow-md rounded-xl bg-gray-50 overflow-hidden flex flex-col">
      <div className="h-1/2 flex items-center justify-center bg-white">
        <Image
          src="/eric-prouzet-B3UFXwcVbc4-unsplash.jpg"
          width={500}
          height={500}
          alt="Instant Feedback"
          className="object-contain"
        />
      </div>
      <div className="flex-1 flex flex-col justify-center p-4">
        <h3 className="text-xl font-semibold">3. Get Instant Feedback</h3>
        <p className="mt-2 text-gray-600">
          Receive actionable insights to improve your resume.
        </p>
      </div>
    </div>
  </div>
</section>



     {/* Features Section */}
<section className="py-20 px-6 bg-gray-50 text-center">
  <h2 className="text-3xl font-semibold mb-12">Why Choose Us?</h2>
  <div className="grid md:grid-cols-3 gap-10">
    {/* Card 1 */}
    <div className="h-[380px] border rounded-xl bg-white shadow-sm flex flex-col overflow-hidden">
      <div className="h-1/2 flex items-center justify-center bg-white">
        <Image
          src="/role.jpg"
          width={500}
          height={500}
          alt="AI Power"
          className="object-contain"
        />
      </div>
      <div className="flex-1 flex flex-col justify-center p-4">
        <h3 className="text-xl font-semibold">AI-Powered Screening</h3>
        <p className="mt-2 text-gray-600">
          Advanced AI evaluates resumes with high accuracy.
        </p>
      </div>
    </div>

    {/* Card 2 */}
    <div className="h-[380px] border rounded-xl bg-white shadow-sm flex flex-col overflow-hidden">
      <div className="h-1/2 flex items-center justify-center bg-white">
        <Image
          src="/saulo-mohana-wNz7_5EvUWU-unsplash.jpg"
          width={500}
          height={500}
          alt="Feedback"
          className="object-contain"
        />
      </div>
      <div className="flex-1 flex flex-col justify-center p-4">
        <h3 className="text-xl font-semibold">Instant Feedback</h3>
        <p className="mt-2 text-gray-600">
          Get suggestions to optimize your resume in real time.
        </p>
      </div>
    </div>

    {/* Card 3 */}
    <div className="h-[380px] border rounded-xl bg-white shadow-sm flex flex-col overflow-hidden">
      <div className="h-1/2 flex items-center justify-center bg-white">
        <Image
          src="/tim-mossholder-GOMhuCj-O9w-unsplash.jpg"
          width={500}
          height={500}
          alt="Dashboard"
          className="object-contain"
        />
      </div>
      <div className="flex-1 flex flex-col justify-center p-4">
        <h3 className="text-xl font-semibold">Recruiter Dashboard</h3>
        <p className="mt-2 text-gray-600">
          Manage candidates efficiently with our intuitive dashboard.
        </p>
      </div>
    </div>
  </div>
</section>


      {/* Testimonials */}
      <section className="py-20 px-6 bg-white text-center">
        <h2 className="text-3xl font-semibold mb-12">What Users Say</h2>
        <div className="grid md:grid-cols-2 gap-10">
          <div className="p-6 shadow-lg rounded-xl bg-gray-50">
            <p className="italic">“This platform helped me land my dream internship effortlessly!”</p>
            <h4 className="font-semibold mt-4">- Jane Doe</h4>
          </div>
          <div className="p-6 shadow-lg rounded-xl bg-gray-50">
            <p className="italic">“The AI screening is incredibly accurate and insightful.”</p>
            <h4 className="font-semibold mt-4">- John Smith</h4>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 text-center bg-black text-white">
        <h2 className="text-3xl font-semibold mb-6">Ready to Get Started?</h2>
        <button className="bg-white text-black px-8 py-3 rounded-lg text-lg hover:bg-blue-700 hover:text-white transition">Sign Up Now</button>
      </section>
    </div>
    </div>
  )
}

export default GetStarted
