"use client"

import { Disclosure, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/24/outline'

export function FaqSection() {
  const faqs = [
    {
      question: "What is this FAQ section for?",
      answer: "This FAQ section is where you can address common questions your potential customers might have about your product or service. Use this space to clarify your offering, address objections, and provide valuable information."
    },
    {
      question: "How should I structure my FAQ questions?",
      answer: "Structure your FAQ questions based on what your customers typically ask. Start with basic questions about your product/service, then move to more specific ones about features, pricing, support, etc. Keep questions clear and concise."
    },
    {
      question: "How many FAQs should I include?",
      answer: "Include 5-8 of the most common questions. Too few won't address customer concerns, while too many might overwhelm visitors. Focus on quality over quantity, and make sure each FAQ provides genuine value."
    },
    {
      question: "What tone should I use in my answers?",
      answer: "Use a conversational, helpful tone that matches your brand voice. Avoid technical jargon unless your audience is technical. Be concise but thorough, and always focus on how your product or service solves the customer's problem."
    },
    {
      question: "Should I include links in my FAQ answers?",
      answer: "Yes, when appropriate. If an answer requires more detailed explanation, link to relevant pages on your site. This improves user experience and can help with SEO by creating internal links to important pages."
    },
    {
      question: "How can I make my FAQ section more effective?",
      answer: "Regularly update your FAQs based on new questions from customers. Consider adding a search function for larger FAQ sections, and organize questions by category if you have many. Always test the usability of your FAQ section with real users."
    },
  ];

  return (
    <section id="faq" className="py-24 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800/50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl text-gray-900 dark:text-white">
            Frequently Asked Questions Section
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            This section helps address common questions and concerns your potential customers might have. A good FAQ section can improve conversion rates by removing obstacles to purchase.
          </p>
        </div>
        
        <div className="mx-auto max-w-3xl space-y-4">
          {faqs.map((faq, index) => (
            <Disclosure as="div" key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
              {({ open }) => (
                <>
                  <Disclosure.Button className="flex w-full justify-between items-center px-6 py-5 text-left">
                    <span className="text-lg font-semibold text-text-primary">
                      {faq.question}
                    </span>
                    <ChevronDownIcon
                      className={`${
                        open ? 'rotate-180 transform' : ''
                      } h-5 w-5 text-primary-purple transition-transform duration-200`}
                    />
                  </Disclosure.Button>
                  <Transition
                    show={open}
                    enter="transition duration-200 ease-out"
                    enterFrom="transform scale-95 opacity-0"
                    enterTo="transform scale-100 opacity-100"
                    leave="transition duration-150 ease-out"
                    leaveFrom="transform scale-100 opacity-100"
                    leaveTo="transform scale-95 opacity-0"
                  >
                    <Disclosure.Panel className="px-6 pb-5 pt-2">
                      <p className="text-text-secondary">
                        {faq.answer}
                      </p>
                    </Disclosure.Panel>
                  </Transition>
                </>
              )}
            </Disclosure>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-text-secondary mb-6">
            Add a call-to-action here for visitors who still have questions.
          </p>
          <a 
            href="#contact" 
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-purple hover:bg-primary-purple/90 transition-colors duration-200"
          >
            Contact Button
          </a>
        </div>
      </div>
    </section>
  );
}
