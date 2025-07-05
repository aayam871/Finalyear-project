import React from "react";

const Privacy = () => {
  return (
    <main className="max-w-4xl mx-auto p-8 font-sans text-gray-900">
      <header className="mb-8">
        <h1 className="text-4xl font-extrabold text-orange-600 tracking-wide">
          Privacy Policy
        </h1>
        <p className="mt-3 text-lg text-gray-700 max-w-prose">
          Your privacy matters to us. This policy outlines how we collect, use,
          and protect your personal information when you use our services.
        </p>
      </header>

      <section className="space-y-8 text-gray-800 leading-relaxed text-base">
        <article>
          <h2 className="text-2xl font-semibold mb-3">
            Information We Collect
          </h2>
          <p>
            We collect information you provide directly, such as your name,
            email, and payment details, as well as data automatically collected
            through cookies and analytics tools.
          </p>
        </article>

        <article>
          <h2 className="text-2xl font-semibold mb-3">Use of Information</h2>
          <p>
            Your information is used to provide and improve our services,
            process payments, communicate updates, and ensure security.
          </p>
        </article>

        <article>
          <h2 className="text-2xl font-semibold mb-3">Data Sharing</h2>
          <p>
            We do not sell your personal data. We may share information with
            trusted service providers strictly for business operations and legal
            compliance.
          </p>
        </article>

        <article>
          <h2 className="text-2xl font-semibold mb-3">Data Security</h2>
          <p>
            We implement robust security measures to protect your data from
            unauthorized access, disclosure, or alteration.
          </p>
        </article>

        <article>
          <h2 className="text-2xl font-semibold mb-3">Your Rights</h2>
          <p>
            You have the right to access, correct, or delete your personal data.
            Contact us anytime to exercise these rights.
          </p>
        </article>

        <article>
          <h2 className="text-2xl font-semibold mb-3">Policy Updates</h2>
          <p>
            We may update this privacy policy periodically. Changes will be
            posted on this page with the date of revision.
          </p>
        </article>
      </section>
    </main>
  );
};

export default Privacy;
