import React from 'react';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

const ContactUsPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black">
<ChevronLeft size={32} />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 max-w-4xl 2xl:max-w-5xl">
        <div className="bg-white/5 backdrop-blur-sm rounded-xl shadow-2xl p-4 sm:p-6 lg:p-8 border border-white/10 hover:border-white/20 transition-all duration-300">
          {/* Header Section */}
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h1 className="text-xl sm:text-2xl lg:text-3xl 2xl:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-yellow-500 mb-4 sm:mb-6 tracking-wider">
              Contact Us
            </h1>
          </div>

          {/* Main Content */}
          <div className="bg-black/80 rounded-xl p-4 sm:p-6 lg:p-8 mt-6 sm:mt-8 space-y-6 sm:space-y-8 backdrop-blur-md border border-white/10 hover:border-white/20 transition-all duration-300">
            <section className="text-base sm:text-lg lg:text-xl leading-relaxed text-gray-200">
              <p className="mb-6 sm:mb-8">
                We’d love to hear from you! Whether you have questions, feedback, or suggestions, feel free to reach out to us.
                Our team is here to help and answer any inquiries you might have.
              </p>

              <div className="bg-white/5 rounded-lg p-4 sm:p-6 mb-6 sm:mb-8 border-l-4 border-yellow-400">
                <p className="italic text-gray-300 text-base sm:text-lg">
                &quot;We&apos;re always looking to improve and your thoughts help us get better. Reach out, and we&apos;ll get back to you as soon as we can!&quot;
                </p>
              </div>

              <h3 className="text-yellow-400 text-lg sm:text-xl font-bold mb-2 sm:mb-3">Get In Touch</h3>
              <p className="text-base sm:text-lg mb-6 sm:mb-8">
                If you have any questions, concerns, or just want to say hello, feel free to contact us using the form below, or directly reach out via email.
              </p>

              <h3 className="text-yellow-400 text-lg sm:text-xl font-bold mb-2 sm:mb-3">Email</h3>
              <p className="text-base sm:text-lg mb-6 sm:mb-8">
                You can also email us at <Link href="mailto:support@zyphernet.com" className="text-yellow-400">support@zyphernet.com</Link>.
              </p>

              <h3 className="text-yellow-400 text-lg sm:text-xl font-bold mb-2 sm:mb-3">Follow Us</h3>
              <p className="text-base sm:text-lg mb-6 sm:mb-8">
                Stay connected with us through our social media channels for the latest updates and news.
              </p>

              <div className="flex justify-center gap-8 sm:gap-12">
                <Link href="https://twitter.com" target="_blank" className="text-yellow-400 hover:text-yellow-300">
                  Twitter
                </Link>
                <Link href="https://facebook.com" target="_blank" className="text-yellow-400 hover:text-yellow-300">
                  Facebook
                </Link>
                <Link href="https://instagram.com" target="_blank" className="text-yellow-400 hover:text-yellow-300">
                  Instagram
                </Link>
              </div>

              <h3 className="text-yellow-400 text-lg sm:text-xl font-bold mb-2 sm:mb-3">Address</h3>
              <p className="text-base sm:text-lg mb-6 sm:mb-8">
                Our team is based in the heart of the city. Feel free to stop by if you&apos;re nearby!
              </p>

              <p className="text-base sm:text-lg mb-6 sm:mb-8">
                <strong>Our Address:</strong> 123 Zyphernet St., Tech City, Country.
              </p>

              <div className="text-center space-y-4 sm:space-y-6">
                <p className="text-xl sm:text-2xl font-light">
                  We look forward to hearing from you soon! 😄
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUsPage;
