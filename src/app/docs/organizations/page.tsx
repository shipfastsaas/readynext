export default function OrganizationsPage() {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <h1>Organizations</h1>
      
      <p className="lead">
        NextReady includes a powerful organizations system that allows users to collaborate in teams, share resources, and manage permissions.
      </p>

      <div className="my-8 p-6 bg-gray-50 dark:bg-gray-900 rounded-xl">
        <h2 className="mt-0">On this page</h2>
        <ul>
          <li><a href="#overview">Overview</a></li>
          <li><a href="#data-model">Data Model</a></li>
          <li><a href="#creating-organizations">Creating Organizations</a></li>
          <li><a href="#managing-members">Managing Members</a></li>
          <li><a href="#organization-settings">Organization Settings</a></li>
          <li><a href="#permissions">Permissions System</a></li>
          <li><a href="#customization">Customizing Organizations</a></li>
        </ul>
      </div>

      <section id="overview">
        <h2>Overview</h2>
        <p>
          The organizations feature in NextReady allows users to create and join teams, collaborate on projects, and share resources. 
          Organizations can have multiple members with different roles and permissions, making it ideal for SaaS applications that require team collaboration.
        </p>
        
        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg my-4">
          <h4 className="text-blue-800 dark:text-blue-200 mt-0 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            Key Features
          </h4>
          <ul className="mb-0">
            <li>Multi-tenant architecture</li>
            <li>Role-based access control</li>
            <li>Team member management</li>
            <li>Organization settings and customization</li>
            <li>Shared resources between team members</li>
            <li>Billing at the organization level</li>
          </ul>
        </div>
      </section>

      <section id="data-model">
        <h2>Data Model</h2>
        <p>
          NextReady uses MongoDB to store organization data. The main data models involved in the organizations system are:
        </p>
        
        <h3>Organization Model</h3>
        <pre><code className="language-typescript">{`// src/models/Organization.ts
import mongoose from "mongoose"

const organizationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  logo: {
    type: String,
    default: "",
  },
  description: {
    type: String,
    default: "",
  },
  website: {
    type: String,
    default: "",
  },
  members: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      role: {
        type: String,
        enum: ["owner", "admin", "member"],
        default: "member",
      },
      joinedAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  invitations: [
    {
      email: {
        type: String,
        required: true,
      },
      role: {
        type: String,
        enum: ["admin", "member"],
        default: "member",
      },
      token: {
        type: String,
        required: true,
      },
      expiresAt: {
        type: Date,
        required: true,
      },
    },
  ],
  settings: {
    allowPublicProjects: {
      type: Boolean,
      default: false,
    },
    allowMemberInvites: {
      type: Boolean,
      default: false,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
})

// Add slug generation middleware
organizationSchema.pre("save", function (next) {
  if (this.isNew || this.isModified("name")) {
    this.slug = slugify(this.name, { lower: true })
  }
  next()
})

const Organization = mongoose.models.Organization || mongoose.model("Organization", organizationSchema)

export default Organization`}</code></pre>

        <h3>User Model Integration</h3>
        <pre><code className="language-typescript">{`// Excerpt from src/models/User.ts
import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
  // Other user fields...
  
  // Reference to organizations the user belongs to
  organizations: [
    {
      organizationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Organization",
      },
      role: {
        type: String,
        enum: ["owner", "admin", "member"],
        default: "member",
      },
    },
  ],
  
  // Default organization for the user
  defaultOrganization: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Organization",
  },
})`}</code></pre>
      </section>

      <section id="creating-organizations">
        <h2>Creating Organizations</h2>
        <p>
          NextReady provides API routes for creating and managing organizations. Here's how to create a new organization:
        </p>
        
        <h3>API Route</h3>
        <pre><code className="language-typescript">{`// src/app/api/organizations/route.ts
import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth-config"
import dbConnect from "@/lib/mongodb"
import Organization from "@/models/Organization"
import User from "@/models/User"
import slugify from "slugify"

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    
    const { name, description, website } = await req.json()
    
    if (!name) {
      return NextResponse.json(
        { error: "Organization name is required" },
        { status: 400 }
      )
    }
    
    await dbConnect()
    
    // Find the user
    const user = await User.findOne({ email: session.user.email })
    
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }
    
    // Create a slug from the name
    const slug = slugify(name, { lower: true })
    
    // Check if organization with this slug already exists
    const existingOrg = await Organization.findOne({ slug })
    
    if (existingOrg) {
      return NextResponse.json(
        { error: "An organization with this name already exists" },
        { status: 400 }
      )
    }
    
    // Create the organization
    const organization = await Organization.create({
      name,
      slug,
      description: description || "",
      website: website || "",
      members: [
        {
          userId: user._id,
          role: "owner",
          joinedAt: new Date(),
        },
      ],
    })
    
    // Add organization to user's organizations
    user.organizations.push({
      organizationId: organization._id,
      role: "owner",
    })
    
    // Set as default organization if user doesn't have one
    if (!user.defaultOrganization) {
      user.defaultOrganization = organization._id
    }
    
    await user.save()
    
    return NextResponse.json(organization)
  } catch (error) {
    console.error("Error creating organization:", error)
    return NextResponse.json(
      { error: "Failed to create organization" },
      { status: 500 }
    )
  }
}`}</code></pre>
        
        <h3>Client Component</h3>
        <pre><code className="language-typescript">{`// Client component
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function CreateOrganizationForm() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    website: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    
    try {
      const response = await fetch('/api/organizations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to create organization')
      }
      
      // Redirect to the new organization
      router.push(\`/dashboard/organizations/\${data.slug}\`)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-3 bg-red-100 text-red-700 rounded">{error}</div>
      )}
      
      <div>
        <label htmlFor="name" className="block text-sm font-medium">
          Organization Name *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
        />
      </div>
      
      <div>
        <label htmlFor="description" className="block text-sm font-medium">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={3}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
        />
      </div>
      
      <div>
        <label htmlFor="website" className="block text-sm font-medium">
          Website
        </label>
        <input
          type="url"
          id="website"
          name="website"
          value={formData.website}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
        />
      </div>
      
      <button
        type="submit"
        disabled={loading}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? 'Creating...' : 'Create Organization'}
      </button>
    </form>
  )
}`}</code></pre>
      </section>

      <section id="managing-members">
        <h2>Managing Members</h2>
        <p>
          Organizations can have multiple members with different roles. NextReady provides APIs for inviting members and managing their roles.
        </p>
        
        <h3>Inviting Members</h3>
        <pre><code className="language-typescript">{`// src/app/api/organizations/[slug]/invitations/route.ts
import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth-config"
import dbConnect from "@/lib/mongodb"
import Organization from "@/models/Organization"
import { v4 as uuidv4 } from "uuid"
import { sendEmail } from "@/lib/email"

export async function POST(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    
    const { email, role = "member" } = await req.json()
    
    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      )
    }
    
    await dbConnect()
    
    // Find the organization
    const organization = await Organization.findOne({ slug: params.slug })
    
    if (!organization) {
      return NextResponse.json(
        { error: "Organization not found" },
        { status: 404 }
      )
    }
    
    // Check if the current user is an admin or owner
    const currentMember = organization.members.find(
      (m) => m.userId.toString() === session.user.id
    )
    
    if (!currentMember || !["admin", "owner"].includes(currentMember.role)) {
      return NextResponse.json(
        { error: "You don't have permission to invite members" },
        { status: 403 }
      )
    }
    
    // Check if user is already a member
    const isMember = organization.members.some(
      (m) => m.email === email
    )
    
    if (isMember) {
      return NextResponse.json(
        { error: "User is already a member of this organization" },
        { status: 400 }
      )
    }
    
    // Check if invitation already exists
    const existingInvitation = organization.invitations.find(
      (inv) => inv.email === email
    )
    
    if (existingInvitation) {
      return NextResponse.json(
        { error: "An invitation has already been sent to this email" },
        { status: 400 }
      )
    }
    
    // Create invitation token
    const token = uuidv4()
    const expiresAt = new Date()
    expiresAt.setDate(expiresAt.getDate() + 7) // Expires in 7 days
    
    // Add invitation to organization
    organization.invitations.push({
      email,
      role,
      token,
      expiresAt,
    })
    
    await organization.save()
    
    // Send invitation email
    await sendEmail({
      to: email,
      subject: \`Invitation to join \${organization.name}\`,
      text: \`You've been invited to join \${organization.name} as a \${role}. Click the link to accept: \${process.env.NEXT_PUBLIC_APP_URL}/invitations/\${token}\`,
      html: \`<p>You've been invited to join <strong>\${organization.name}</strong> as a \${role}.</p><p><a href="\${process.env.NEXT_PUBLIC_APP_URL}/invitations/\${token}">Click here to accept</a></p>\`,
    })
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error inviting member:", error)
    return NextResponse.json(
      { error: "Failed to send invitation" },
      { status: 500 }
    )
  }
}`}</code></pre>
        
        <h3>Managing Member Roles</h3>
        <pre><code className="language-typescript">{`// src/app/api/organizations/[slug]/members/[userId]/route.ts
import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth-config"
import dbConnect from "@/lib/mongodb"
import Organization from "@/models/Organization"
import User from "@/models/User"

// Update member role
export async function PATCH(
  req: NextRequest,
  { params }: { params: { slug: string; userId: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    
    const { role } = await req.json()
    
    if (!role || !["admin", "member"].includes(role)) {
      return NextResponse.json(
        { error: "Invalid role" },
        { status: 400 }
      )
    }
    
    await dbConnect()
    
    // Find the organization
    const organization = await Organization.findOne({ slug: params.slug })
    
    if (!organization) {
      return NextResponse.json(
        { error: "Organization not found" },
        { status: 404 }
      )
    }
    
    // Check if the current user is an owner
    const currentMember = organization.members.find(
      (m) => m.userId.toString() === session.user.id
    )
    
    if (!currentMember || currentMember.role !== "owner") {
      return NextResponse.json(
        { error: "Only owners can change member roles" },
        { status: 403 }
      )
    }
    
    // Find the member to update
    const memberIndex = organization.members.findIndex(
      (m) => m.userId.toString() === params.userId
    )
    
    if (memberIndex === -1) {
      return NextResponse.json(
        { error: "Member not found" },
        { status: 404 }
      )
    }
    
    // Cannot change the role of the owner
    if (organization.members[memberIndex].role === "owner") {
      return NextResponse.json(
        { error: "Cannot change the role of the organization owner" },
        { status: 400 }
      )
    }
    
    // Update the role
    organization.members[memberIndex].role = role
    await organization.save()
    
    // Update the user's organizations array
    const user = await User.findById(params.userId)
    
    if (user) {
      const orgIndex = user.organizations.findIndex(
        (org) => org.organizationId.toString() === organization._id.toString()
      )
      
      if (orgIndex !== -1) {
        user.organizations[orgIndex].role = role
        await user.save()
      }
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error updating member role:", error)
    return NextResponse.json(
      { error: "Failed to update member role" },
      { status: 500 }
    )
  }
}

// Remove member from organization
export async function DELETE(
  req: NextRequest,
  { params }: { params: { slug: string; userId: string } }
) {
  // Similar implementation to PATCH but removes the member instead
}`}</code></pre>
      </section>

      <section id="organization-settings">
        <h2>Organization Settings</h2>
        <p>
          Organizations can have various settings that control their behavior and appearance.
        </p>
        
        <h3>Updating Organization Settings</h3>
        <pre><code className="language-typescript">{`// src/app/api/organizations/[slug]/settings/route.ts
import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth-config"
import dbConnect from "@/lib/mongodb"
import Organization from "@/models/Organization"
import slugify from "slugify"

export async function PATCH(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    
    const { name, description, website, logo, settings } = await req.json()
    
    await dbConnect()
    
    // Find the organization
    const organization = await Organization.findOne({ slug: params.slug })
    
    if (!organization) {
      return NextResponse.json(
        { error: "Organization not found" },
        { status: 404 }
      )
    }
    
    // Check if the current user is an admin or owner
    const currentMember = organization.members.find(
      (m) => m.userId.toString() === session.user.id
    )
    
    if (!currentMember || !["admin", "owner"].includes(currentMember.role)) {
      return NextResponse.json(
        { error: "You don't have permission to update organization settings" },
        { status: 403 }
      )
    }
    
    // Update fields
    if (name) {
      organization.name = name
      
      // Only owners can change the slug (derived from name)
      if (currentMember.role === "owner") {
        const newSlug = slugify(name, { lower: true })
        
        // Check if the new slug is already taken
        if (newSlug !== organization.slug) {
          const existingOrg = await Organization.findOne({ slug: newSlug })
          
          if (existingOrg) {
            return NextResponse.json(
              { error: "An organization with this name already exists" },
              { status: 400 }
            )
          }
          
          organization.slug = newSlug
        }
      }
    }
    
    if (description !== undefined) organization.description = description
    if (website !== undefined) organization.website = website
    if (logo !== undefined) organization.logo = logo
    
    // Update settings (only owners can change settings)
    if (settings && currentMember.role === "owner") {
      organization.settings = {
        ...organization.settings,
        ...settings,
      }
    }
    
    organization.updatedAt = new Date()
    await organization.save()
    
    return NextResponse.json(organization)
  } catch (error) {
    console.error("Error updating organization:", error)
    return NextResponse.json(
      { error: "Failed to update organization" },
      { status: 500 }
    )
  }
}`}</code></pre>
      </section>

      <section id="permissions">
        <h2>Permissions System</h2>
        <p>
          NextReady includes a role-based permissions system for organizations. The default roles are:
        </p>
        
        <ul>
          <li><strong>Owner</strong>: Can perform all actions, including deleting the organization</li>
          <li><strong>Admin</strong>: Can manage members and organization settings, but cannot delete the organization</li>
          <li><strong>Member</strong>: Can view and use the organization's resources, but cannot change settings or manage members</li>
        </ul>
        
        <h3>Checking Permissions</h3>
        <pre><code className="language-typescript">{`// Helper function to check permissions
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth-config"
import Organization from "@/models/Organization"

export async function checkOrganizationPermission(
  slug: string,
  requiredRole: "owner" | "admin" | "member" = "member"
) {
  const session = await getServerSession(authOptions)
  
  if (!session?.user) {
    return { allowed: false, error: "Unauthorized" }
  }
  
  // Find the organization
  const organization = await Organization.findOne({ slug })
  
  if (!organization) {
    return { allowed: false, error: "Organization not found" }
  }
  
  // Find the member
  const member = organization.members.find(
    (m) => m.userId.toString() === session.user.id
  )
  
  if (!member) {
    return { allowed: false, error: "You are not a member of this organization" }
  }
  
  // Check role permissions
  const roleHierarchy = { owner: 3, admin: 2, member: 1 }
  
  if (roleHierarchy[member.role] < roleHierarchy[requiredRole]) {
    return {
      allowed: false,
      error: \`This action requires \${requiredRole} permissions\`,
    }
  }
  
  return { allowed: true, organization, member }
}`}</code></pre>
      </section>

      <section id="customization">
        <h2>Customizing Organizations</h2>
        <p>
          You can extend the organizations system to fit your specific needs. Here are some examples:
        </p>
        
        <h3>Adding Custom Fields</h3>
        <pre><code className="language-typescript">{`// Add industry field to Organization schema
const organizationSchema = new mongoose.Schema({
  // Existing fields...
  
  industry: {
    type: String,
    enum: ["technology", "healthcare", "education", "finance", "other"],
    default: "other",
  },
})`}</code></pre>
        
        <h3>Adding Related Features</h3>
        <pre><code className="language-typescript">{`// Example: Adding a projects feature
const organizationSchema = new mongoose.Schema({
  // Existing fields...
  
  projects: [
    {
      name: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        default: "",
      },
      isPublic: {
        type: Boolean,
        default: false,
      },
      createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
})`}</code></pre>
      </section>

      <div className="mt-8 rounded-xl bg-gray-50 dark:bg-gray-900 p-6">
        <h2 className="mt-0">Next Steps</h2>
        <p>
          Now that you understand how organizations work in NextReady, you can:
        </p>
        <ul>
          <li>Create organization management UI components</li>
          <li>Implement organization-specific features</li>
          <li>Set up organization-level billing with Stripe</li>
          <li>Add organization analytics and reporting</li>
        </ul>
      </div>
    </div>
  );
}
