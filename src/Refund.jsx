import React from "react";

const Refund = () => {
  return (
    <main className="max-w-4xl mx-auto p-8 font-sans text-gray-900">
      <header className="mb-8">
        <h1 className="text-4xl font-extrabold text-orange-600 tracking-wide">
          Return & Refund Policy
        </h1>
        <p className="mt-3 text-lg text-gray-700 max-w-prose">
          Your satisfaction is our priority. Please review our detailed policy
          regarding product returns, refunds, and exchanges.
        </p>
      </header>

      <section className="space-y-8 text-gray-800 leading-relaxed text-base">
        <article>
          <h2 className="text-2xl font-semibold mb-3">Return Eligibility</h2>
          <p>
            Products can be returned within <strong>7 calendar days</strong> of
            delivery, provided they are unused, in their original packaging, and
            accompanied by a valid receipt or proof of purchase.
          </p>
        </article>

        <article>
          <h2 className="text-2xl font-semibold mb-3">
            How to Initiate a Return
          </h2>
          <p>
            To initiate a return, please contact our support team via email or
            phone with your order details. Our team will guide you through the
            process and provide a return authorization number.
          </p>
        </article>

        <article>
          <h2 className="text-2xl font-semibold mb-3">Refund Processing</h2>
          <p>
            Once the returned item is received and inspected, refunds will be
            processed within 5-7 business days. Refunds will be issued to the
            original payment method. Shipping charges are non-refundable.
          </p>
        </article>

        <article>
          <h2 className="text-2xl font-semibold mb-3">Exceptions</h2>
          <p>
            Custom or personalized products, digital goods, and perishable items
            are not eligible for return or refund unless defective.
          </p>
        </article>
      </section>
    </main>
  );
};

export default Refund;
