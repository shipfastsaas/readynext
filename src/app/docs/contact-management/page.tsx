export default function ContactManagementPage() {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <h1>Contact Management</h1>
      
      <p>
        NextReady includes a comprehensive contact management system that allows your users to send messages 
        and enables you to efficiently manage these communications. This guide explains how to set up and use 
        the contact management features.
      </p>

      <div className="mt-8">
        <h2 id="features">Key Features</h2>
        <ul>
          <li>User-friendly contact form</li>
          <li>MongoDB storage for contact messages</li>
          <li>Admin interface for message management</li>
          <li>Status tracking (new, read, replied)</li>
          <li>Filtering and search capabilities</li>
          <li>Responsive design for all devices</li>
        </ul>
      </div>

      <div className="mt-8">
        <h2 id="data-model">Contact Data Model</h2>
        
        <p>
          The contact system uses a MongoDB schema to store message data:
        </p>

        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto">
          <code>
{`// src/models/Contact.ts
import mongoose from 'mongoose'

const ContactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide your name'],
    maxlength: [100, 'Name cannot be more than 100 characters'],
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    maxlength: [100, 'Email cannot be more than 100 characters'],
  },
  message: {
    type: String,
    required: [true, 'Please provide a message'],
    maxlength: [1000, 'Message cannot be more than 1000 characters'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ['new', 'read', 'replied'],
    default: 'new',
  }
})

export default mongoose.models.Contact || mongoose.model('Contact', ContactSchema)`}
          </code>
        </pre>
      </div>

      <div className="mt-8">
        <h2 id="contact-form">Contact Form Implementation</h2>
        
        <p>
          The contact form is implemented as a React component that submits data to the contact API endpoint:
        </p>

        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto">
          <code>
{`// Contact form component example
'use client'

import { useState, FormEvent } from 'react'
import { toast } from 'react-hot-toast'

export function ContactForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      })

      if (!response.ok) {
        throw new Error('Failed to send message')
      }

      toast.success('Message sent successfully!')
      // Reset form
      setName('')
      setEmail('')
      setMessage('')
    } catch (error) {
      toast.error('Failed to send message. Please try again.')
      console.error('Error sending message:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium">
          Name
        </label>
        <input
          id="name"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
        />
      </div>
      
      <div>
        <label htmlFor="email" className="block text-sm font-medium">
          Email
        </label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
        />
      </div>
      
      <div>
        <label htmlFor="message" className="block text-sm font-medium">
          Message
        </label>
        <textarea
          id="message"
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={4}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
        />
      </div>
      
      <button
        type="submit"
        disabled={isSubmitting}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  )
}`}
          </code>
        </pre>
      </div>

      <div className="mt-8">
        <h2 id="api-routes">API Implementation</h2>
        
        <p>
          The contact system uses Next.js API routes to handle message submission and management:
        </p>

        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto">
          <code>
{`// src/app/api/contact/route.ts
import { NextResponse } from 'next/server'
import dbConnect from '@/lib/dbConnect'
import Contact from '@/models/Contact'

export async function POST(request: Request) {
  try {
    await dbConnect()
    
    const { name, email, message } = await request.json()
    
    // Validate input
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }
    
    // Create new contact message
    const contact = await Contact.create({
      name,
      email,
      message,
      status: 'new'
    })
    
    return NextResponse.json(
      { message: 'Message sent successfully', contact },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error in contact form:', error)
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    )
  }
}

export async function GET(request: Request) {
  try {
    await dbConnect()
    
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const search = searchParams.get('search')
    
    // Build query
    const query: any = {}
    
    if (status) {
      query.status = status
    }
    
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { message: { $regex: search, $options: 'i' } }
      ]
    }
    
    // Fetch contacts with pagination
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const skip = (page - 1) * limit
    
    const contacts = await Contact.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
    
    return NextResponse.json(contacts)
  } catch (error) {
    console.error('Error fetching contacts:', error)
    return NextResponse.json(
      { error: 'Failed to fetch contacts' },
      { status: 500 }
    )
  }
}

export async function PATCH(request: Request) {
  try {
    await dbConnect()
    
    const { id, status } = await request.json()
    
    if (!id || !status) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }
    
    const contact = await Contact.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    )
    
    if (!contact) {
      return NextResponse.json(
        { error: 'Contact not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(contact)
  } catch (error) {
    console.error('Error updating contact:', error)
    return NextResponse.json(
      { error: 'Failed to update contact' },
      { status: 500 }
    )
  }
}`}
          </code>
        </pre>
      </div>

      <div className="mt-8">
        <h2 id="admin-interface">Admin Interface</h2>
        
        <p>
          The admin interface for contact management allows you to view, filter, and respond to messages:
        </p>

        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto">
          <code>
{`// src/components/dashboard/contact-list.tsx (simplified)
'use client'

import { useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'

interface Contact {
  _id: string
  name: string
  email: string
  message: string
  createdAt: string
  status: 'new' | 'read' | 'replied'
}

export function ContactList() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [status, setStatus] = useState<string>('')
  const [search, setSearch] = useState<string>('')
  const [isLoading, setIsLoading] = useState(true)

  // Fetch contacts with filters
  const fetchContacts = async () => {
    setIsLoading(true)
    try {
      const queryParams = new URLSearchParams()
      
      if (status) queryParams.append('status', status)
      if (search) queryParams.append('search', search)
      
      const response = await fetch(\`/api/contact?\${queryParams.toString()}\`)
      if (!response.ok) {
        throw new Error('Failed to fetch contacts')
      }
      const data = await response.json()
      setContacts(data)
    } catch (error) {
      console.error('Error fetching contacts:', error)
      toast.error('Failed to load messages')
    } finally {
      setIsLoading(false)
    }
  }

  // Update message status
  const updateStatus = async (id: string, newStatus: 'new' | 'read' | 'replied') => {
    try {
      const response = await fetch('/api/contact', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus }),
      })

      if (!response.ok) {
        throw new Error('Failed to update status')
      }

      toast.success('Status updated')
      fetchContacts()
    } catch (error) {
      console.error('Error updating status:', error)
      toast.error('Failed to update status')
    }
  }

  // Initial load
  useEffect(() => {
    fetchContacts()
  }, [status, search])

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <h2 className="text-2xl font-bold">Contact Messages</h2>
        
        {/* Filters */}
        <div className="flex flex-wrap gap-2">
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="px-3 py-2 border rounded-md"
          >
            <option value="">All Status</option>
            <option value="new">New</option>
            <option value="read">Read</option>
            <option value="replied">Replied</option>
          </select>
          
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-3 py-2 border rounded-md"
          />
        </div>
      </div>

      {/* Messages list */}
      <div className="space-y-4">
        {isLoading ? (
          <p>Loading messages...</p>
        ) : contacts.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No messages found</p>
          </div>
        ) : (
          contacts.map((contact) => (
            <div
              key={contact._id}
              className={\`border rounded-lg p-4 \${
                contact.status === 'new'
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-200 dark:border-gray-700'
              }\`}
            >
              <div className="flex flex-wrap justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-700 dark:text-gray-200">
                    {contact.name.charAt(0).toUpperCase()}
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900 dark:text-white">{contact.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{contact.email}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(contact.createdAt).toLocaleDateString()}
                  </span>
                  
                  <span className={\`px-2 py-1 text-xs rounded-full \${
                    contact.status === 'new'
                      ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200'
                      : contact.status === 'read'
                      ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-200'
                      : 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200'
                  }\`}>
                    {contact.status}
                  </span>
                  
                  <select
                    value={contact.status}
                    onChange={(e) => updateStatus(contact._id, e.target.value as 'new' | 'read' | 'replied')}
                    className="text-sm border rounded px-2 py-1"
                  >
                    <option value="new">New</option>
                    <option value="read">Read</option>
                    <option value="replied">Replied</option>
                  </select>
                </div>
              </div>
              
              <div className="mt-4">
                <p className="text-gray-600 dark:text-gray-300 whitespace-pre-wrap">{contact.message}</p>
                {contact.status === 'new' && (
                  <div className="mt-2">
                    <button
                      onClick={() => updateStatus(contact._id, 'read')}
                      className="text-sm text-blue-600 dark:text-blue-400"
                    >
                      Mark as read
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}`}
          </code>
        </pre>
      </div>

      <div className="mt-8">
        <h2 id="customization">Customizing the Contact System</h2>
        
        <h3>Adding Fields to the Contact Form</h3>
        <p>
          To add additional fields to the contact form, update both the Contact model and the form component:
        </p>

        <ol>
          <li>Update the Contact schema in <code>src/models/Contact.ts</code></li>
          <li>Add the new fields to the contact form component</li>
          <li>Update the API route to handle the new fields</li>
        </ol>

        <h3>Example: Adding a Subject Field</h3>
        <p>
          Here's how to add a subject field to the contact form:
        </p>

        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto">
          <code>
{`// 1. Update Contact.ts schema
const ContactSchema = new mongoose.Schema({
  // Existing fields
  name: { /* ... */ },
  email: { /* ... */ },
  message: { /* ... */ },
  
  // New subject field
  subject: {
    type: String,
    required: [true, 'Please provide a subject'],
    maxlength: [200, 'Subject cannot be more than 200 characters'],
  },
  
  // Other existing fields
  createdAt: { /* ... */ },
  status: { /* ... */ },
})

// 2. Update the contact form component
function ContactForm() {
  // Existing state
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  // New state
  const [subject, setSubject] = useState('')
  
  // Update handleSubmit to include subject
  async function handleSubmit(e) {
    e.preventDefault()
    // ...
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, subject, message }),
    })
    // ...
  }
  
  return (
    <form onSubmit={handleSubmit}>
      {/* Existing fields */}
      
      {/* New subject field */}
      <div>
        <label htmlFor="subject">Subject</label>
        <input
          id="subject"
          type="text"
          required
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
      </div>
      
      {/* Other existing fields */}
    </form>
  )
}`}
          </code>
        </pre>
      </div>

      <div className="mt-8">
        <h2 id="email-notifications">Adding Email Notifications</h2>
        
        <p>
          To receive email notifications when a new contact message is submitted, 
          you can integrate with an email service like Nodemailer or SendGrid:
        </p>

        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto">
          <code>
{`// 1. Install the required package
// npm install nodemailer

// 2. Create an email utility
// src/lib/email.ts
import nodemailer from 'nodemailer'

export async function sendEmail({ to, subject, html }) {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_SERVER_HOST,
    port: process.env.EMAIL_SERVER_PORT,
    auth: {
      user: process.env.EMAIL_SERVER_USER,
      pass: process.env.EMAIL_SERVER_PASSWORD,
    },
    secure: process.env.NODE_ENV === 'production',
  })

  return transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to,
    subject,
    html,
  })
}

// 3. Update the contact API to send notifications
// In src/app/api/contact/route.ts
import { sendEmail } from '@/lib/email'

export async function POST(request: Request) {
  try {
    // Existing code to create contact
    const contact = await Contact.create({
      name, email, message, status: 'new'
    })
    
    // Send email notification
    await sendEmail({
      to: process.env.ADMIN_EMAIL,
      subject: 'New Contact Form Submission',
      html: \`
        <h1>New Contact Message</h1>
        <p><strong>From:</strong> \${name} (\${email})</p>
        <p><strong>Message:</strong></p>
        <p>\${message}</p>
      \`,
    })
    
    return NextResponse.json(
      { message: 'Message sent successfully', contact },
      { status: 201 }
    )
  } catch (error) {
    // Error handling
  }
}`}
          </code>
        </pre>

        <p>
          Don't forget to add the required environment variables to your <code>.env.local</code> file:
        </p>

        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto">
          <code>
{`# Email configuration
EMAIL_SERVER_HOST=smtp.example.com
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER=your-username
EMAIL_SERVER_PASSWORD=your-password
EMAIL_FROM=noreply@yourapp.com
ADMIN_EMAIL=admin@yourapp.com`}
          </code>
        </pre>
      </div>

      <div className="mt-8">
        <h2 id="best-practices">Best Practices</h2>
        
        <ul>
          <li>
            <strong>Spam Protection:</strong> Implement CAPTCHA or other anti-spam measures to prevent 
            automated submissions.
          </li>
          <li>
            <strong>Rate Limiting:</strong> Add rate limiting to prevent abuse of your contact form.
          </li>
          <li>
            <strong>Data Validation:</strong> Always validate input data on both client and server sides.
          </li>
          <li>
            <strong>Privacy Policy:</strong> Ensure your contact form complies with privacy regulations 
            like GDPR by including appropriate notices.
          </li>
          <li>
            <strong>Accessibility:</strong> Make sure your contact form is accessible to all users, 
            including those using screen readers.
          </li>
        </ul>
      </div>

      <div className="mt-8">
        <h2 id="next-steps">Next Steps</h2>
        
        <p>
          After implementing contact management, consider these next steps:
        </p>

        <ul>
          <li>
            <a href="/docs/seo" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
              Optimize your site for SEO
            </a>
          </li>
          <li>
            <a href="/docs/deployment" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
              Deploy your application
            </a>
          </li>
          <li>
            <a href="/docs/admin-dashboard" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
              Enhance your admin dashboard
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}
