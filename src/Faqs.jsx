import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
  {
    question: "How do I place an order?",
    answer:
      "Go to the Menu section, select your favorite dishes, and click 'Add to Cart.' Then proceed to checkout.",
  },
  {
    question: "Do you offer home delivery?",
    answer:
      "Yes! We provide fast and fresh food delivery right to your doorstep within our delivery area.",
  },
  {
    question: "What are your delivery hours?",
    answer: "We deliver every day 24 Hour Service",
  },
  
  {
    question: "How can I pay for my order?",
    answer:
      "We accept Cash on Delivery and online payments (Khalti, eSewa) – Coming soon!",
  },
  {
    question: "Do you offer dine-in services too?",
    answer:
      "Currently, we focus on online delivery only. Dine-in is not available.",
  },
  {
    question: "Do you provide catering or bulk orders?",
    answer:
      "Yes! For bulk orders or events, please contact us at our phone number or email.",
  },
  {
    question: "Where are you located?",
    answer:
      "We're based in [Your City, Nepal]. You can find our full address in the Contact section.",
  },
  {
    question: "Is my personal information safe?",
    answer:
      "Absolutely. We never share your data with third parties. Your privacy and security are our top priorities.",
  },
];

const Faqs = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="px-6 py-12 md:px-20 bg-white">
      <h2 className="text-3xl md:text-4xl font-extrabold mb-8 text-center text-orange-500 font-serif">
        Frequently Asked Questions
      </h2>

      <div className="space-y-5">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-orange-50 border border-orange-200 p-5 rounded-lg shadow-sm transition-all duration-300"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="flex justify-between items-center w-full text-left text-lg md:text-xl font-semibold text-orange-900"
            >
              <span>{faq.question}</span>
              {openIndex === index ? (
                <ChevronUp className="text-orange-600" />
              ) : (
                <ChevronDown className="text-orange-600" />
              )}
            </button>

            {openIndex === index && (
              <p className="mt-3 text-gray-700 text-base md:text-lg font-medium">
                {faq.answer}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Faqs;
