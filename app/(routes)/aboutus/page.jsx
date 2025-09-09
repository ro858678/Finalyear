'use client';

import { usePathname } from "next/navigation";
import Link from "next/link";

export default function AboutPage() {
  const pathname = usePathname();

  const links = [
    { name: "Home", href: "/GetStarted" },
    { name: "Contact Us", href: "/contacts" },
    { name: "About Us", href: "/aboutus" },
  ];

  return (
    <main className="min-h-screen bg-gray-100 px-6 pt-16">
      {/* Navbar */}
      <section className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
        <div className="px-4 py-2 flex items-center justify-between">
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
        </div>
      </section>

      {/* About Us Content */}
      <section className="max-w-5xl mx-auto pt-20 text-center">
        <h1 className="text-4xl font-bold mb-6">About Us</h1>
        <p className="text-gray-600 text-lg mb-12">
          We built this platform to help recruiters and job seekers connect
          faster through the power of AI. Our resume screener uses advanced
          machine learning to evaluate resumes against job requirements,
          providing instant insights and saving valuable time.
        </p>
      </section>

      {/* Mission Section */}
      <section className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 mb-16">
        <div className="bg-white shadow-md rounded-xl p-8">
          <h2 className="text-2xl font-semibold mb-4">🎯 Our Mission</h2>
          <p className="text-gray-700">
            Our mission is to transform hiring by reducing bias, saving time,
            and empowering both recruiters and candidates with actionable
            insights. We believe that technology should make the recruitment
            process fairer and more efficient.
          </p>
        </div>
        <div className="bg-white shadow-md rounded-xl p-8">
          <h2 className="text-2xl font-semibold mb-4">⚡ What We Do</h2>
          <p className="text-gray-700">
            We help recruiters screen hundreds of resumes in minutes and give
            job seekers feedback to improve their chances. With tools for resume
            ranking, instant feedback, and recruiter dashboards, our platform
            makes hiring smarter.
          </p>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="max-w-6xl mx-auto text-center mb-20">
        <h2 className="text-3xl font-semibold mb-8">Why Choose Us?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-gray-50 shadow-sm rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-2">AI-Powered</h3>
            <p className="text-gray-600">
              Advanced algorithms that evaluate resumes with accuracy and speed.
            </p>
          </div>
          <div className="bg-gray-50 shadow-sm rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-2">Fair & Transparent</h3>
            <p className="text-gray-600">
              Our system reduces human bias, ensuring fairer candidate screening.
            </p>
          </div>
          <div className="bg-gray-50 shadow-sm rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-2">User-Friendly</h3>
            <p className="text-gray-600">
              An intuitive dashboard for recruiters and simple feedback tools for
              job seekers.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section (Optional) */}
      <section className="max-w-6xl mx-auto text-center pb-20">
        <h2 className="text-3xl font-semibold mb-6">Meet Our Team</h2>
        <p className="text-gray-600 mb-10">
          We are a passionate group of developers, data scientists, and HR
          professionals dedicated to improving the way hiring works.
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white shadow-md rounded-xl p-6">
            <div className="h-32 w-32 mx-auto rounded-full bg-gray-200 mb-4"></div>
            <h3 className="font-semibold">Richard Ofori</h3>
            <p className="text-gray-600 text-sm">Founder & CEO</p>
          </div>
          <div className="bg-white shadow-md rounded-xl p-6">
            <div className="h-32 w-32 mx-auto rounded-full bg-gray-200 mb-4"></div>
            <h3 className="font-semibold">Diawuo Fiifi</h3>
            <p className="text-gray-600 text-sm">Lead Data Scientist</p>
          </div>
          <div className="bg-white shadow-md rounded-xl p-6">
            <div className="h-32 w-32 mx-auto rounded-full bg-gray-200 mb-4"></div>
            <h3 className="font-semibold">Mickey Symons</h3>
            <p className="text-gray-600 text-sm">Head of Product</p>
          </div>
        </div>
      </section>
    </main>
  );
}
