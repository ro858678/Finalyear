// app/contact/page.js (or wherever you need it)
'use client';

import ContactForm from "./_compenents/ContactForm";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function ContactPage() {
  const pathname = usePathname();

  const links = [
    { name: "Home", href: "/GetStarted" },
    { name: "Contact Us", href: "/contacts" },
    { name: "About Us", href: "/aboutus" },
  ];

  return (
    <div>
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

        {/* Contact Section */}
        <section className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 pt-20">
          {/* Left: Contact Info */}
          <div>
            <h2 className="text-4xl font-bold mb-4">Contact Us</h2>
            
             <p className="text-gray-600 mb-8">
                 Have questions about our AI-Powered Resume Screener or need help getting
                 started? Our team is here to assist you. Fill out the form or use our contact
                information below to reach us.
             

            </p>

            <div className="space-y-6 text-gray-700">
              <div>
                <h3 className="font-semibold">📍 Address</h3>
                <p>
                  Dept. of Computer Science (KNUST) <br />
                  Main Campus <br />
                  PMB, University Post Office, Kumasi, Ghana <br />
                  Ghana Post: GPS AK-448-4944
                </p>
              </div>

              <div>
                <h3 className="font-semibold">📞 Phone</h3>
                <p>(+233) 55 597 6014</p>
              </div>

              <div>
                <h3 className="font-semibold">📧 Email</h3>
                <p>ro858678@gmail.com</p>
              </div>

              <div>
                <h3 className="font-semibold">⏰ Hours</h3>
                <p>
                  Monday - Friday: 9am - 6pm <br />
                  Saturday: 10am - 4pm <br />
                  Sunday: Closed
                </p>
              </div>
            </div>
          </div>

          {/* Right: Your existing ContactForm */}
          <div className="bg-white p-8 rounded-xl shadow-md">
            <ContactForm />
          </div>
        </section>
      </main>
    </div>
  );
}

