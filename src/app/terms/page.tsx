import React from 'react';
import Link from 'next/link';

const TermsAndConditionsPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 max-w-4xl 2xl:max-w-5xl">
        <div className="bg-white/5 backdrop-blur-sm rounded-xl shadow-2xl p-4 sm:p-6 lg:p-8 border border-white/10 hover:border-white/20 transition-all duration-300">
          {/* Header Section */}
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
  <h1 className="text-xl sm:text-2xl lg:text-3xl 2xl:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-yellow-500 mb-4 sm:mb-6 tracking-wider">
    Terms and Conditions
  </h1>
</div>


          {/* Main Content */}
          <div className="bg-black/80 rounded-xl p-4 sm:p-6 lg:p-8 mt-6 sm:mt-8 space-y-6 sm:space-y-8 backdrop-blur-md border border-white/10 hover:border-white/20 transition-all duration-300">
            <section className="text-base sm:text-lg lg:text-xl leading-relaxed text-gray-200">
              <p className="mb-6 sm:mb-8">
                Welcome to Zyphernet! These Terms and Conditions outline the rules and regulations for the use of the Zyphernet platform.
              </p>

              <div className="bg-white/5 rounded-lg p-4 sm:p-6 mb-6 sm:mb-8 border-l-4 border-yellow-400">
                <p className="italic text-gray-300 text-base sm:text-lg">
                &quot;By using Zyphernet, you agree to comply with these terms and conditions. Please read them carefully before using our services.&quot;
                </p>
              </div>

              <h3 className="text-yellow-400 text-lg sm:text-xl font-bold mb-2 sm:mb-3">1. User Account</h3>
              <p className="text-base sm:text-lg mb-6 sm:mb-8">
                You must create an account to use Zyphernet. By creating an account, you agree to provide accurate information and to maintain the confidentiality of your login credentials.
              </p>

              <h3 className="text-yellow-400 text-lg sm:text-xl font-bold mb-2 sm:mb-3">2. Content Policy</h3>
              <p className="text-base sm:text-lg mb-6 sm:mb-8">
                You are responsible for the content you post on Zyphernet. We do not tolerate abusive, harmful, or illegal content. Violating this policy can lead to account suspension or termination.
              </p>

              <h3 className="text-yellow-400 text-lg sm:text-xl font-bold mb-2 sm:mb-3">3. Privacy</h3>
              <p className="text-base sm:text-lg mb-6 sm:mb-8">
                We value your privacy. For information on how we collect, use, and protect your data, please refer to our Privacy Policy.
              </p>

              <h3 className="text-yellow-400 text-lg sm:text-xl font-bold mb-2 sm:mb-3">4. Changes to the Terms</h3>
              <p className="text-base sm:text-lg mb-6 sm:mb-8">
                We may update these Terms and Conditions from time to time. It is your responsibility to check for any changes regularly.
              </p>

              <h3 className="text-yellow-400 text-lg sm:text-xl font-bold mb-2 sm:mb-3">5. Contact</h3>
              <p className="text-base sm:text-lg mb-6 sm:mb-8">
                If you have any questions about these Terms and Conditions, please contact us at <Link href="mailto:support@zyphernet.com" className="text-yellow-400">support@zyphernet.com</Link>.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditionsPage;
