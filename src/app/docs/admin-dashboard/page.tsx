export default function AdminDashboardPage() {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <h1>Admin Dashboard</h1>
      
      <p>
        NextReady includes a powerful admin dashboard that allows you to manage your application, 
        monitor user activity, and handle administrative tasks. This guide will walk you through 
        setting up and using the admin dashboard.
      </p>

      <div className="mt-8">
        <h2 id="features">Key Features</h2>
        <ul>
          <li>Secure admin authentication</li>
          <li>User management</li>
          <li>Contact message management</li>
          <li>Blog post administration</li>
          <li>Organization oversight</li>
          <li>Payment and subscription monitoring</li>
        </ul>
      </div>

      <div className="mt-8">
        <h2 id="setup">Setup and Configuration</h2>
        
        <h3>Environment Variables</h3>
        <p>
          The admin dashboard requires setting up environment variables for authentication. 
          Add the following to your <code>.env.local</code> file:
        </p>

        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto">
          <code>
{`# Admin authentication
ADMIN_EMAIL=your-admin-email@example.com
ADMIN_PASSWORD=your-secure-password`}
          </code>
        </pre>
        
        <div className="bg-amber-50 dark:bg-amber-900/30 border-l-4 border-amber-500 p-4 my-4">
          <p className="text-amber-800 dark:text-amber-200">
            <strong>Security Note:</strong> Use a strong, unique password and consider implementing additional security measures for production environments.
          </p>
        </div>
      </div>

      <div className="mt-8">
        <h2 id="access">Accessing the Admin Dashboard</h2>
        
        <p>
          The admin dashboard is accessible at <code>/admin-login</code>. After successful authentication, 
          you will be redirected to the dashboard.
        </p>

        <h3>Authentication Flow</h3>
        <p>
          The admin authentication uses a simple email/password system with secure cookie-based sessions. 
          Here's how it works:
        </p>

        <ol>
          <li>Admin enters credentials on the login page</li>
          <li>Credentials are verified against environment variables</li>
          <li>Upon successful authentication, a secure HTTP-only cookie is set</li>
          <li>This cookie is used to maintain the admin session</li>
        </ol>

        <h3>Authentication Code Example</h3>
        <p>
          The admin authentication is handled by a dedicated API route:
        </p>

        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto">
          <code>
{`// src/app/api/admin-auth/route.ts
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    // Get credentials from request
    const { email, password } = await request.json()

    // Verify against environment variables
    const adminEmail = process.env.ADMIN_EMAIL
    const adminPassword = process.env.ADMIN_PASSWORD

    if (email !== adminEmail || password !== adminPassword) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // Create response with authentication cookie
    const response = NextResponse.json({ 
      success: true,
      message: 'Authentication successful' 
    })

    // Set secure cookie
    response.cookies.set({
      name: 'admin-auth',
      value: 'authenticated',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24, // 1 day
      path: '/',
      sameSite: 'lax',
    })
    
    return response
  } catch (error) {
    return NextResponse.json(
      { error: 'Server error' },
      { status: 500 }
    )
  }
}`}
          </code>
        </pre>
      </div>

      <div className="mt-8">
        <h2 id="middleware">Protecting Admin Routes</h2>
        
        <p>
          To protect admin routes and ensure only authenticated admins can access them, 
          you can implement middleware to check for the admin authentication cookie.
        </p>

        <h3>Middleware Implementation</h3>
        <p>
          Create or update your middleware file to include admin route protection:
        </p>

        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto">
          <code>
{`// src/middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Check if the path starts with /admin (excluding /admin-login)
  if (
    request.nextUrl.pathname.startsWith('/admin') && 
    !request.nextUrl.pathname.startsWith('/admin-login')
  ) {
    // Check for admin authentication cookie
    const adminAuth = request.cookies.get('admin-auth')
    
    if (!adminAuth || adminAuth.value !== 'authenticated') {
      // Redirect to admin login if not authenticated
      return NextResponse.redirect(
        new URL('/admin-login', request.url)
      )
    }
  }
  
  return NextResponse.next()
}`}
          </code>
        </pre>
      </div>

      <div className="mt-8">
        <h2 id="dashboard">Dashboard Components</h2>
        
        <h3>User Management</h3>
        <p>
          The user management section allows you to view, search, and manage user accounts. 
          You can:
        </p>
        <ul>
          <li>View user details and registration dates</li>
          <li>Filter users by various criteria</li>
          <li>Disable or enable user accounts</li>
          <li>Reset user passwords (by generating reset links)</li>
        </ul>

        <h3>Contact Management</h3>
        <p>
          The contact management section displays all messages submitted through your contact form. 
          You can:
        </p>
        <ul>
          <li>View message details including sender information</li>
          <li>Mark messages as read or replied</li>
          <li>Filter messages by status</li>
          <li>Delete messages when no longer needed</li>
        </ul>

        <h3>Blog Administration</h3>
        <p>
          The blog administration section allows you to manage your blog content:
        </p>
        <ul>
          <li>Create, edit, and delete blog posts</li>
          <li>Manage post categories and tags</li>
          <li>Schedule posts for future publication</li>
          <li>View post analytics and engagement metrics</li>
        </ul>
      </div>

      <div className="mt-8">
        <h2 id="customization">Customizing the Admin Dashboard</h2>
        
        <p>
          You can customize the admin dashboard to suit your specific needs:
        </p>

        <h3>Adding New Sections</h3>
        <p>
          To add a new section to the admin dashboard:
        </p>

        <ol>
          <li>Create a new page component in the appropriate directory</li>
          <li>Add the route to the admin navigation component</li>
          <li>Implement the necessary API endpoints for data handling</li>
        </ol>

        <h3>Example: Adding a Settings Section</h3>
        <p>
          Here's how you might add a new settings section to the admin dashboard:
        </p>

        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto">
          <code>
{`// 1. Create the settings page component
// src/app/admin/settings/page.tsx
'use client'

import { useState } from 'react'
import { toast } from 'react-hot-toast'

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState({
    siteName: 'NextReady',
    contactEmail: 'contact@example.com',
    // Add other settings as needed
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    // Implement API call to save settings
    toast.success('Settings saved successfully')
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Site Settings</h1>
      
      <form onSubmit={handleSubmit}>
        {/* Form fields for settings */}
        <div className="mb-4">
          <label className="block mb-2">Site Name</label>
          <input 
            type="text"
            value={settings.siteName}
            onChange={(e) => setSettings({...settings, siteName: e.target.value})}
            className="w-full p-2 border rounded"
          />
        </div>
        
        {/* Add more fields as needed */}
        
        <button 
          type="submit" 
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Save Settings
        </button>
      </form>
    </div>
  )
}`}
          </code>
        </pre>

        <p>
          Then add the new section to your admin navigation:
        </p>

        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto">
          <code>
{`// Update your admin navigation component
const adminNavItems = [
  { name: 'Dashboard', href: '/admin' },
  { name: 'Users', href: '/admin/users' },
  { name: 'Messages', href: '/admin/messages' },
  { name: 'Blog', href: '/admin/blog' },
  { name: 'Settings', href: '/admin/settings' }, // New item
]`}
          </code>
        </pre>
      </div>

      <div className="mt-8">
        <h2 id="security">Security Best Practices</h2>
        
        <p>
          When implementing and using the admin dashboard, follow these security best practices:
        </p>

        <ul>
          <li>Use strong, unique passwords for admin accounts</li>
          <li>Implement rate limiting on the admin login endpoint to prevent brute force attacks</li>
          <li>Consider adding two-factor authentication for additional security</li>
          <li>Regularly audit admin actions with logging</li>
          <li>Implement proper CSRF protection for all admin forms</li>
          <li>Use HTTPS in production to encrypt all traffic</li>
          <li>Regularly update dependencies to patch security vulnerabilities</li>
        </ul>
      </div>

      <div className="mt-8">
        <h2 id="next-steps">Next Steps</h2>
        
        <p>
          After setting up your admin dashboard, consider these next steps:
        </p>

        <ul>
          <li>
            <a href="/docs/contact-management" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
              Implement detailed contact management
            </a>
          </li>
          <li>
            <a href="/docs/dark-mode" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
              Add dark mode support to your admin interface
            </a>
          </li>
          <li>
            <a href="/docs/deployment" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
              Deploy your application with the admin dashboard
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}
