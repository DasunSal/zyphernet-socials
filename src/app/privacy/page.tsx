import React from 'react';
import Link from 'next/link';

const PrivacyPolicyPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 max-w-4xl 2xl:max-w-5xl">
        <div className="bg-white/5 backdrop-blur-sm rounded-xl shadow-2xl p-4 sm:p-6 lg:p-8 border border-white/10 hover:border-white/20 transition-all duration-300">
          {/* Header Section */}
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
  <h1 className="text-xl sm:text-2xl lg:text-3xl 2xl:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-yellow-500 mb-4 sm:mb-6 tracking-wider">
   Privacy Policy
  </h1>
</div>

          {/* Main Content */}
          <div className="bg-black/80 rounded-xl p-4 sm:p-6 lg:p-8 mt-6 sm:mt-8 space-y-6 sm:space-y-8 backdrop-blur-md border border-white/10 hover:border-white/20 transition-all duration-300">
            <section className="text-base sm:text-lg lg:text-xl leading-relaxed text-gray-200">
              <p className="mb-6 sm:mb-8">
                At Zyphernet, we take your privacy seriously. This Privacy Policy outlines how we collect, use, and protect your personal information.
              </p>

              <div className="bg-white/5 rounded-lg p-4 sm:p-6 mb-6 sm:mb-8 border-l-4 border-yellow-400">
                <p className="italic text-gray-300 text-base sm:text-lg">
                &quot;By using Zyphernet, you consent to the collection and use of your personal information as described in this policy.&quot;
                </p>
              </div>

              <h3 className="text-yellow-400 text-lg sm:text-xl font-bold mb-2 sm:mb-3">1. Information We Collect</h3>
              <p className="text-base sm:text-lg mb-6 sm:mb-8">
                We collect personal information such as your name, email address, and usage data. This helps us improve your experience on Zyphernet.
              </p>

              <h3 className="text-yellow-400 text-lg sm:text-xl font-bold mb-2 sm:mb-3">2. How We Use Your Information</h3>
              <p className="text-base sm:text-lg mb-6 sm:mb-8">
                We use your information to provide and improve our services, send notifications, and communicate with you about updates or changes to our platform.
              </p>

              <h3 className="text-yellow-400 text-lg sm:text-xl font-bold mb-2 sm:mb-3">3. Data Security</h3>
              <p className="text-base sm:text-lg mb-6 sm:mb-8">
                We take reasonable measures to protect your data. However, no method of transmission over the internet is 100% secure.
              </p>

              <h3 className="text-yellow-400 text-lg sm:text-xl font-bold mb-2 sm:mb-3">4. Third-Party Sharing</h3>
              <p className="text-base sm:text-lg mb-6 sm:mb-8">
                We do not share your personal data with third parties unless required by law or for operational purposes such as hosting and analytics services.
              </p>

              <h3 className="text-yellow-400 text-lg sm:text-xl font-bold mb-2 sm:mb-3">5. Contact Us</h3>
              <p className="text-base sm:text-lg mb-6 sm:mb-8">
                If you have any questions about our Privacy Policy, please contact us at <Link href="mailto:support@zyphernet.com" className="text-yellow-400">support@zyphernet.com</Link>.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
