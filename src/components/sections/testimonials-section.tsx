"use client"

import Image from 'next/image'
import { FaStar, FaPlay } from 'react-icons/fa'

interface Testimonial {
  content: string
  hasVideo?: boolean
  author: {
    name: string
    role: string
    company?: string
    image: string
  }
}

const testimonials: Testimonial[] = [
  {
    content: "This is where you should place a strong testimonial from a satisfied customer. Include specific results they achieved using your product or service.",
    author: {
      name: "Customer Name 1",
      role: "Professional Title",
      image: "/testimonials/cameron.jpg"
    }
  },
  {
    content: "Add a testimonial that addresses common objections or concerns your potential customers might have. Show how your solution solved a specific problem.",
    author: {
      name: "Customer Name 2",
      role: "Professional Title",
      image: "/testimonials/video-thumbnail.jpg"
    }
  },
  {
    content: "Include a testimonial that highlights a unique feature or benefit of your product. Make sure to use the customer's authentic voice and specific details.",
    author: {
      name: "Customer Name 3",
      role: "Professional Title",
      image: "/testimonials/tobias.jpg"
    }
  },
  {
    content: "This testimonial should focus on the results or transformation your customer experienced. Quantify the benefits whenever possible (e.g., time saved, revenue increased).",
    author: {
      name: "Customer Name 4",
      role: "Professional Title",
      image: "/testimonials/prokop.jpg"
    }
  },
  {
    content: "Use this space for a testimonial that addresses how easy your product was to implement or how responsive your customer support team is.",
    author: {
      name: "Customer Name 5",
      role: "Professional Title",
      image: "/testimonials/prageeth.jpg"
    }
  },
  {
    content: "This final testimonial should reinforce your unique value proposition and why customers choose your solution over competitors.",
    author: {
      name: "Customer Name 6",
      role: "Professional Title",
      image: "/testimonials/lee.jpg"
    }
  },
]

function StarRating() {
  return (
    <div className="flex space-x-1 text-yellow-400 mb-3">
      <FaStar />
      <FaStar />
      <FaStar />
      <FaStar />
      <FaStar />
    </div>
  )
}

function VideoButton() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <button className="rounded-full bg-gray-800/70 dark:bg-white/10 p-3 text-white backdrop-blur-sm hover:bg-gray-800/90 dark:hover:bg-white/20 transition-all">
        <FaPlay className="h-6 w-6" />
      </button>
    </div>
  )
}

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-24 bg-gray-50 dark:bg-gray-800/50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center mb-20">
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl text-gray-900 dark:text-white">
            Customer Testimonials Section
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            This section is for displaying testimonials from your satisfied customers. Add real quotes and photos to build trust with potential clients.
          </p>
        </div>

        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="flex flex-col justify-between rounded-3xl bg-white dark:bg-gray-800 p-8 shadow-lg ring-1 ring-gray-900/10 dark:ring-gray-700 h-full"
            >
              <div>
                <div className="flex gap-x-3">
                  <img src={testimonial.author.image} alt="" className="h-12 w-12 rounded-full bg-gray-50" />
                  <div>
                    <h3 className="text-lg font-semibold leading-6 text-gray-900 dark:text-white">
                      {testimonial.author.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.author.role}</p>
                  </div>
                </div>
                <blockquote className="mt-6 text-base leading-relaxed text-gray-700 dark:text-gray-300">
                  {testimonial.content}
                </blockquote>
              </div>
              <div className="mt-8 flex items-center text-primary-purple">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
