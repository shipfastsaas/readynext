export default function AuthenticationPage() {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <h1>Authentication</h1>
      
      <p className="lead">
        NextReady provides a robust authentication system built on Next-Auth, supporting multiple authentication methods including credentials, Google OAuth, and more.
      </p>

      <div className="my-8 p-6 bg-gray-50 dark:bg-gray-900 rounded-xl">
        <h2 className="mt-0">On this page</h2>
        <ul>
          <li><a href="#overview">Overview</a></li>
          <li><a href="#configuration">Configuration</a></li>
          <li><a href="#providers">Authentication Providers</a></li>
          <li><a href="#session-management">Session Management</a></li>
          <li><a href="#protected-routes">Protected Routes</a></li>
          <li><a href="#user-registration">User Registration</a></li>
          <li><a href="#admin-authentication">Admin Authentication</a></li>
          <li><a href="#custom-authentication">Custom Authentication Logic</a></li>
        </ul>
      </div>

      <section id="overview">
        <h2>Overview</h2>
        <p>
          NextReady uses Next-Auth (NextAuth.js) for authentication, providing a secure, flexible, and easy-to-use authentication system. 
          Next-Auth supports multiple authentication providers and handles sessions, JWT tokens, and database integration.
        </p>
        
        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg my-4">
          <h4 className="text-blue-800 dark:text-blue-200 mt-0 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            Key Features
          </h4>
          <ul className="mb-0">
            <li>Multiple authentication providers (Credentials, Google, etc.)</li>
            <li>MongoDB integration for user data storage</li>
            <li>JWT-based session management</li>
            <li>Role-based access control</li>
            <li>Protected routes and API endpoints</li>
            <li>Custom sign-in and sign-up pages</li>
          </ul>
        </div>
      </section>

      <section id="configuration">
        <h2>Configuration</h2>
        <p>
          NextReady's authentication system is configured in the <code>src/lib/auth-config.ts</code> file. This file sets up NextAuth.js with the necessary providers, callbacks, and database adapter.
        </p>
        
        <h3>Basic Configuration</h3>
        <pre><code className="language-typescript">{`// src/lib/auth-config.ts
import { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from "./mongodb-client"
import dbConnect from "./mongodb"
import User from "@/models/User"
import bcrypt from "bcryptjs"

export const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }
        
        await dbConnect()
        
        const user = await User.findOne({ email: credentials.email })
        
        if (!user || !user.password) {
          return null
        }
        
        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        )
        
        if (!isPasswordValid) {
          return null
        }
        
        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          image: user.image,
          role: user.role
        }
      }
    })
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role
        session.user.id = token.id
      }
      return session
    }
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  secret: process.env.NEXTAUTH_SECRET,
}`}</code></pre>
        
        <h3>Environment Variables</h3>
        <p>
          To configure authentication, you need to set the following environment variables in your <code>.env.local</code> file:
        </p>
        <pre><code className="language-bash">{`# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret`}</code></pre>
        
        <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg my-4">
          <h4 className="text-yellow-800 dark:text-yellow-200 mt-0 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            Dependency Conflict Note
          </h4>
          <p className="mb-0">
            NextReady has a known dependency conflict between <code>next-auth</code>, <code>@auth/core</code> and <code>@auth/mongodb-adapter</code>. To resolve this, make sure to add a <code>.npmrc</code> file with <code>legacy-peer-deps=true</code> to your project.
          </p>
        </div>
      </section>

      <section id="providers">
        <h2>Authentication Providers</h2>
        <p>
          NextReady supports multiple authentication providers through Next-Auth. By default, it includes:
        </p>
        
        <h3>Credentials Provider</h3>
        <p>
          The Credentials provider allows users to log in with an email and password. This is configured in the <code>auth-config.ts</code> file:
        </p>
        <pre><code className="language-typescript">{`CredentialsProvider({
  name: "credentials",
  credentials: {
    email: { label: "Email", type: "email" },
    password: { label: "Password", type: "password" }
  },
  async authorize(credentials) {
    // Authentication logic
  }
})`}</code></pre>
        
        <h3>Google Provider</h3>
        <p>
          The Google provider allows users to log in with their Google account. To set up Google authentication:
        </p>
        <ol>
          <li>Create a project in the <a href="https://console.cloud.google.com/" target="_blank" rel="noopener noreferrer">Google Cloud Console</a></li>
          <li>Set up OAuth consent screen</li>
          <li>Create OAuth 2.0 credentials</li>
          <li>Add the client ID and client secret to your environment variables</li>
        </ol>
        <pre><code className="language-typescript">{`GoogleProvider({
  clientId: process.env.GOOGLE_CLIENT_ID!,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
})`}</code></pre>
        
        <h3>Adding Additional Providers</h3>
        <p>
          You can easily add more authentication providers by installing the necessary packages and adding them to the <code>providers</code> array in <code>auth-config.ts</code>:
        </p>
        <pre><code className="language-typescript">{`// Example: Adding GitHub provider
import GitHubProvider from "next-auth/providers/github"

// Add to providers array
GitHubProvider({
  clientId: process.env.GITHUB_ID!,
  clientSecret: process.env.GITHUB_SECRET!,
})`}</code></pre>
      </section>

      <section id="session-management">
        <h2>Session Management</h2>
        <p>
          NextReady uses JWT-based session management. Sessions are stored in cookies and can be accessed on both the client and server side.
        </p>
        
        <h3>Client-Side Session Access</h3>
        <p>
          You can access the session on the client side using the <code>useSession</code> hook:
        </p>
        <pre><code className="language-typescript">{`// Client component
'use client'

import { useSession } from "next-auth/react"

export default function ProfileButton() {
  const { data: session, status } = useSession()
  
  if (status === "loading") {
    return <div>Loading...</div>
  }
  
  if (status === "unauthenticated") {
    return <button>Sign In</button>
  }
  
  return (
    <div>
      <p>Welcome, {session?.user?.name}</p>
      <button>View Profile</button>
    </div>
  )
}`}</code></pre>
        
        <h3>Server-Side Session Access</h3>
        <p>
          You can access the session on the server side using the <code>getServerSession</code> function:
        </p>
        <pre><code className="language-typescript">{`// Server component or API route
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth-config"

export async function getData() {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    // Handle unauthenticated user
    return { error: "Not authenticated" }
  }
  
  // Access user information
  const userId = session.user.id
  
  // Fetch user-specific data
  // ...
  
  return { userData: "..." }
}`}</code></pre>
      </section>

      <section id="protected-routes">
        <h2>Protected Routes</h2>
        <p>
          NextReady includes middleware to protect routes that require authentication.
        </p>
        
        <h3>Client-Side Protection</h3>
        <p>
          You can protect client-side routes using the <code>useSession</code> hook and redirecting unauthenticated users:
        </p>
        <pre><code className="language-typescript">{`// Client component
'use client'

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function ProtectedPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin?callbackUrl=/protected-page")
    }
  }, [status, router])
  
  if (status === "loading") {
    return <div>Loading...</div>
  }
  
  if (!session) {
    return null
  }
  
  return (
    <div>
      <h1>Protected Content</h1>
      <p>This page is only visible to authenticated users.</p>
    </div>
  )
}`}</code></pre>
        
        <h3>Server-Side Protection</h3>
        <p>
          You can protect server-side routes by checking the session and redirecting if necessary:
        </p>
        <pre><code className="language-typescript">{`// Server component
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth-config"
import { redirect } from "next/navigation"

export default async function ProtectedServerPage() {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    redirect("/auth/signin?callbackUrl=/protected-page")
  }
  
  return (
    <div>
      <h1>Protected Server Content</h1>
      <p>This page is only visible to authenticated users.</p>
    </div>
  )
}`}</code></pre>
        
        <h3>Role-Based Access Control</h3>
        <p>
          NextReady supports role-based access control. You can check the user's role to determine if they have access to certain features:
        </p>
        <pre><code className="language-typescript">{`// Check if user is an admin
if (session?.user?.role === "admin") {
  // Show admin features
} else {
  // Show regular user features or redirect
  redirect("/dashboard")
}`}</code></pre>
      </section>

      <section id="user-registration">
        <h2>User Registration</h2>
        <p>
          NextReady includes a custom registration system that works alongside Next-Auth.
        </p>
        
        <h3>Registration API</h3>
        <p>
          The registration API is located at <code>/api/auth/signup</code> and handles creating new user accounts:
        </p>
        <pre><code className="language-typescript">{`// src/app/api/auth/signup/route.ts
import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import dbConnect from "@/lib/mongodb"
import User from "@/models/User"

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json()
    
    // Validate input
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }
    
    await dbConnect()
    
    // Check if user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 409 }
      )
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)
    
    // Create new user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "user",
    })
    
    // Remove password from response
    const user = {
      id: newUser._id.toString(),
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
    }
    
    return NextResponse.json(user, { status: 201 })
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}`}</code></pre>
        
        <h3>Registration Form</h3>
        <p>
          NextReady includes a registration form component that submits to the registration API:
        </p>
        <pre><code className="language-typescript">{`// Client component
'use client'

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function SignUpForm() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    
    try {
      // Register user
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      })
      
      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Registration failed")
      }
      
      // Sign in after successful registration
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      })
      
      if (result?.error) {
        throw new Error(result.error || "Sign in failed")
      }
      
      // Redirect to dashboard
      router.push("/dashboard")
    } catch (error: any) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }
  
  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-500 rounded-lg">
          {error}
        </div>
      )}
      
      <div className="mb-4">
        <label htmlFor="name" className="block mb-2 text-sm font-medium">
          Name
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg"
          required
        />
      </div>
      
      <div className="mb-4">
        <label htmlFor="email" className="block mb-2 text-sm font-medium">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg"
          required
        />
      </div>
      
      <div className="mb-6">
        <label htmlFor="password" className="block mb-2 text-sm font-medium">
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg"
          required
          minLength={8}
        />
      </div>
      
      <button
        type="submit"
        disabled={loading}
        className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Creating Account..." : "Sign Up"}
      </button>
    </form>
  )
}`}</code></pre>
      </section>

      <section id="admin-authentication">
        <h2>Admin Authentication</h2>
        <p>
          NextReady includes an admin authentication system that restricts access to administrative features.
        </p>
        
        <h3>Admin Middleware</h3>
        <p>
          You can create middleware to protect admin routes:
        </p>
        <pre><code className="language-typescript">{`// src/middleware.ts
import { NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"
import type { NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  // Check for admin routes
  if (request.nextUrl.pathname.startsWith("/admin")) {
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    })
    
    // Check if user is authenticated and has admin role
    if (!token || token.role !== "admin") {
      return NextResponse.redirect(new URL("/auth/signin", request.url))
    }
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"],
}`}</code></pre>
        
        <h3>Admin API Protection</h3>
        <p>
          You can protect admin API routes by checking the user's role:
        </p>
        <pre><code className="language-typescript">{`// src/app/api/admin/route.ts
import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth-config"

export async function GET(request: Request) {
  const session = await getServerSession(authOptions)
  
  // Check if user is authenticated and has admin role
  if (!session || session.user.role !== "admin") {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    )
  }
  
  // Admin-only logic here
  
  return NextResponse.json({ data: "Admin data" })
}`}</code></pre>
      </section>

      <section id="custom-authentication">
        <h2>Custom Authentication Logic</h2>
        <p>
          You can extend NextReady's authentication system with custom logic to meet your specific requirements.
        </p>
        
        <h3>Custom Callbacks</h3>
        <p>
          You can customize Next-Auth's behavior by modifying the callbacks in <code>auth-config.ts</code>:
        </p>
        <pre><code className="language-typescript">{`callbacks: {
  async signIn({ user, account, profile }) {
    // Custom sign-in logic
    // Return true to allow sign in, false to deny
    return true
  },
  async redirect({ url, baseUrl }) {
    // Custom redirect logic
    return url.startsWith(baseUrl) ? url : baseUrl
  },
  async jwt({ token, user, account }) {
    // Add custom properties to JWT token
    if (user) {
      token.customProperty = user.customProperty
    }
    return token
  },
  async session({ session, token }) {
    // Add custom properties to session
    if (session.user) {
      session.user.customProperty = token.customProperty
    }
    return session
  }
}`}</code></pre>
        
        <h3>Custom Pages</h3>
        <p>
          You can customize the authentication pages by specifying them in the <code>pages</code> option:
        </p>
        <pre><code className="language-typescript">{`pages: {
  signIn: "/auth/signin",
  signOut: "/auth/signout",
  error: "/auth/error",
  verifyRequest: "/auth/verify-request",
  newUser: "/auth/new-user"
}`}</code></pre>
        
        <h3>Custom Events</h3>
        <p>
          You can listen for authentication events using the <code>next-auth/react</code> event listeners:
        </p>
        <pre><code className="language-typescript">{`// Client component
'use client'

import { useEffect } from "react"
import { signIn, signOut, useSession } from "next-auth/react"

export default function AuthEvents() {
  const { data: session } = useSession()
  
  useEffect(() => {
    const handleSignIn = (message: any) => {
      console.log("User signed in", message)
      // Custom logic after sign in
    }
    
    const handleSignOut = (message: any) => {
      console.log("User signed out", message)
      // Custom logic after sign out
    }
    
    // Add event listeners
    window.addEventListener("signIn", handleSignIn)
    window.addEventListener("signOut", handleSignOut)
    
    // Clean up
    return () => {
      window.removeEventListener("signIn", handleSignIn)
      window.removeEventListener("signOut", handleSignOut)
    }
  }, [])
  
  return (
    <div>
      {session ? (
        <button onClick={() => signOut()}>Sign Out</button>
      ) : (
        <button onClick={() => signIn()}>Sign In</button>
      )}
    </div>
  )
}`}</code></pre>
      </section>

      <div className="mt-8 rounded-xl bg-gray-50 dark:bg-gray-900 p-6">
        <h2 className="mt-0">Next Steps</h2>
        <p>
          Now that you understand how authentication works in NextReady, you might want to explore:
        </p>
        <div className="flex flex-wrap gap-4">
          <a
            href="/docs/organizations"
            className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Organizations
          </a>
          <a
            href="/docs/api"
            className="inline-flex items-center rounded-lg border border-gray-300 dark:border-gray-700 px-4 py-2 text-sm font-semibold hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            API Routes
          </a>
        </div>
      </div>
    </div>
  )
}
