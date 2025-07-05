import React from "react";

const Support = () => {
  return (
    <main className="max-w-4xl mx-auto p-8 font-sans text-gray-900">
      <header className="mb-8">
        <h1 className="text-4xl font-extrabold text-orange-600 tracking-wide">
          Customer Support
        </h1>
        <p className="mt-3 text-lg text-gray-700 max-w-prose">
          We are committed to providing you with the best possible assistance. If you have
          any questions, concerns, or require help, our dedicated support team is here to
          assist you promptly and professionally.
        </p>
      </header>

      <section className="space-y-6 text-gray-800 leading-relaxed text-base">
        <article>
          <h2 className="text-2xl font-semibold mb-2">How to Reach Us</h2>
          <p>
            You can contact our support team via:
            <ul className="list-disc list-inside mt-2 ml-6">
              <li>Email: <a href="mailto:madhyaraat@quickbites.com" className="text-orange-500 hover:underline">support@example.com</a></li>
              <li>Phone: <a href="tel:+9779845123456" className="text-orange-500 hover:underline">+977 9845 123 456</a></li>
              <li>Reach upto us anytime. We are available 24 hour</li>
            </ul>
          </p>
        </article>

        <article>
          <h2 className="text-2xl font-semibold mb-2">Frequently Asked Questions (FAQ)</h2>
          <p>
            Before reaching out, you might find answers to common questions on our{' '}
            <a href="/faq" className="text-orange-500 hover:underline">FAQ page</a>.
          </p>
        </article>

        <article>
          <h2 className="text-2xl font-semibold mb-2">Response Time</h2>
          <p>
            Our support team strives to respond to all inquiries within 24 hours on business days.
            For urgent matters, please use the phone support option.
          </p>
        </article>
      </section>
    </main>
  );
};

export default Support;
