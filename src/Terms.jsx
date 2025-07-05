import React from "react";

const Terms = () => {
  return (
    <main className="max-w-4xl mx-auto p-8 font-sans text-gray-900">
      <header className="mb-8">
        <h1 className="text-4xl font-extrabold text-orange-600 tracking-wide">
          Terms & Conditions
        </h1>
        <p className="mt-3 text-lg text-gray-700 max-w-prose">
          Please read these terms and conditions carefully before using our website or
          services. By accessing or using our platform, you agree to be bound by these terms.
        </p>
      </header>

      <section className="space-y-8 text-gray-800 leading-relaxed text-base">
        <article>
          <h2 className="text-2xl font-semibold mb-3">Use of Website</h2>
          <p>
            You agree to use our website and services only for lawful purposes and in
            accordance with these terms. Unauthorized use or violation of laws may result
            in suspension or termination of your access.
          </p>
        </article>

        <article>
          <h2 className="text-2xl font-semibold mb-3">Intellectual Property</h2>
          <p>
            All content, trademarks, and intellectual property displayed on this website
            are owned by us or licensed to us. You may not use, reproduce, or distribute
            any materials without explicit permission.
          </p>
        </article>

        <article>
          <h2 className="text-2xl font-semibold mb-3">Limitation of Liability</h2>
          <p>
            We are not liable for any damages arising from the use or inability to use our
            website or services, including indirect, incidental, or consequential damages.
          </p>
        </article>

        <article>
          <h2 className="text-2xl font-semibold mb-3">Changes to Terms</h2>
          <p>
            We reserve the right to update or modify these terms at any time. Continued use
            of our services after changes constitutes acceptance of the new terms.
          </p>
        </article>

        <article>
          <h2 className="text-2xl font-semibold mb-3">Governing Law</h2>
          <p>
            These terms are governed by the laws of Nepal. Any disputes arising shall be
            subject to the exclusive jurisdiction of Nepali courts.
          </p>
        </article>
      </section>
    </main>
  );
};

export default Terms;
