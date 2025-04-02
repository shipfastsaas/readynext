export default function DatabasePage() {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <h1>Database Configuration</h1>
      
      <p className="lead">
        NextReady uses MongoDB as its primary database, providing a flexible and scalable solution for your SaaS application.
      </p>

      <div className="my-8 p-6 bg-gray-50 dark:bg-gray-900 rounded-xl">
        <h2 className="mt-0">On this page</h2>
        <ul>
          <li><a href="#overview">Overview</a></li>
          <li><a href="#connection">Database Connection</a></li>
          <li><a href="#models">Data Models</a></li>
          <li><a href="#queries">Common Database Queries</a></li>
          <li><a href="#customization">Customizing the Database</a></li>
          <li><a href="#best-practices">Best Practices</a></li>
        </ul>
      </div>

      <section id="overview">
        <h2>Overview</h2>
        <p>
          NextReady uses MongoDB directly (without an ORM like Prisma) for data storage, with Mongoose as the modeling tool. 
          This approach provides flexibility while maintaining structure through schemas.
        </p>
        
        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg my-4">
          <h4 className="text-blue-800 dark:text-blue-200 mt-0 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            Key Features
          </h4>
          <ul className="mb-0">
            <li>MongoDB for flexible document storage</li>
            <li>Mongoose for schema validation and modeling</li>
            <li>Connection pooling for optimal performance</li>
            <li>TypeScript interfaces for type safety</li>
          </ul>
        </div>
      </section>

      <section id="connection">
        <h2>Database Connection</h2>
        <p>
          NextReady implements a connection pooling pattern to efficiently manage database connections, 
          especially during development with hot reloading.
        </p>
        
        <h3>Connection Configuration</h3>
        <p>
          The database connection is configured in <code>src/lib/mongodb.ts</code>. This file handles:
        </p>
        <ul>
          <li>Establishing the connection to MongoDB</li>
          <li>Caching the connection to prevent multiple connections during development</li>
          <li>Error handling for connection failures</li>
        </ul>
        
        <h3>Environment Variables</h3>
        <p>
          First, set up your MongoDB connection string in your environment variables:
        </p>
        <pre><code className="language-bash">MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/your-database?retryWrites=true&amp;w=majority</code></pre>
        
        <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg my-4">
          <h4 className="text-yellow-800 dark:text-yellow-200 mt-0 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            Security Note
          </h4>
          <p className="mb-0">
            Never commit your <code>.env.local</code> file to version control. Make sure it&apos;s included in your <code>.gitignore</code> file.
          </p>
        </div>
        
        <h3>Using the Database Connection</h3>
        <p>
          To use the database connection in your code, import the <code>dbConnect</code> function:
        </p>
        <pre><code>{`import dbConnect from "@/lib/mongodb"

async function myDatabaseFunction() {
  // Connect to the database
  await dbConnect()
  
  // Now you can use Mongoose models
  const users = await User.find({})
  // ...
}`}</code></pre>
      </section>

      <section id="models">
        <h2>Data Models</h2>
        <p>
          NextReady uses Mongoose schemas to define the structure of your data. The models are located in the <code>src/models</code> directory.
        </p>
        
        <h3>Core Models</h3>
        <p>
          NextReady comes with the following pre-defined models:
        </p>
        
        <h4>User Model</h4>
        <p>
          The User model (<code>src/models/User.ts</code>) defines the structure for user accounts:
        </p>
        <pre><code>{`// User model fields
{
  name: String,
  email: {
    type: String,
    unique: true,
    required: true
  },
  image: String,
  emailVerified: {
    type: Date,
    default: null
  },
  password: String,
  // Additional fields from OAuth providers are allowed
}`}</code></pre>
        <p>
          The User model includes methods for password hashing and verification, and automatically removes the password field when converting to JSON.
        </p>
        
        <h4>Post Model</h4>
        <p>
          The Post model (<code>src/models/Post.ts</code>) is used for the blog functionality:
        </p>
        <pre><code>{`// Post model fields
{
  title: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },
  content: {
    type: String,
    required: true
  },
  excerpt: String,
  coverImage: String,
  published: {
    type: Boolean,
    default: false
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
}`}</code></pre>
        
        <h4>Contact Model</h4>
        <p>
          The Contact model (<code>src/models/Contact.ts</code>) stores contact form submissions:
        </p>
        <pre><code>{`// Contact model fields
{
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ["new", "read", "replied"],
    default: "new"
  }
}`}</code></pre>
      </section>

      <section id="queries">
        <h2>Common Database Queries</h2>
        <p>
          Here are some common database operations you might need to perform in your NextReady application:
        </p>
        
        <h3>Finding Records</h3>
        <pre><code>{`// Find all users
const users = await User.find({})

// Find a user by email
const user = await User.findOne({ email: "user@example.com" })

// Find a user by ID
const user = await User.findById("user_id_here")

// Find with projection (only return specific fields)
const users = await User.find({}, "name email")

// Find with conditions
const premiumUsers = await User.find({ subscriptionStatus: "active" })

// Find with sorting
const sortedUsers = await User.find({}).sort({ createdAt: -1 }) // Newest first`}</code></pre>
        
        <h3>Creating Records</h3>
        <pre><code>{`// Create a new user
const newUser = new User({
  name: "John Doe",
  email: "john@example.com",
  password: "securepassword"
})
await newUser.save()

// Alternative method
const newUser = await User.create({
  name: "John Doe",
  email: "john@example.com",
  password: "securepassword"
})`}</code></pre>
        
        <h3>Updating Records</h3>
        <pre><code>{`// Update a user by ID
await User.findByIdAndUpdate("user_id_here", { name: "New Name" })

// Update with options (return the updated document)
const updatedUser = await User.findByIdAndUpdate(
  "user_id_here",
  { name: "New Name" },
  { new: true } // Return the updated document
)

// Update multiple records
await User.updateMany(
  { subscriptionStatus: "trial" },
  { $set: { subscriptionStatus: "expired" } }
)`}</code></pre>
        
        <h3>Deleting Records</h3>
        <pre><code>{`// Delete a user by ID
await User.findByIdAndDelete("user_id_here")

// Delete multiple records
await User.deleteMany({ subscriptionStatus: "expired" })`}</code></pre>
        
        <h3>Populating References</h3>
        <pre><code>{`// Find posts and populate author information
const posts = await Post.find({})
  .populate("author", "name email") // Only include name and email fields
  .sort({ createdAt: -1 })`}</code></pre>
      </section>

      <section id="customization">
        <h2>Customizing the Database</h2>
        <p>
          You can easily extend NextReady&apos;s database functionality to fit your specific needs.
        </p>
        
        <h3>Creating a New Model</h3>
        <p>
          To create a new model, add a new file in the <code>src/models</code> directory:
        </p>
        <pre><code>{`// src/models/Product.ts
import mongoose from "mongoose"

export interface IProduct {
  name: string
  description: string
  price: number
  imageUrl?: string
  inStock: boolean
}

const ProductSchema = new mongoose.Schema<IProduct>({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  imageUrl: String,
  inStock: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
})

export default mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema)`}</code></pre>
        
        <h3>Extending Existing Models</h3>
        <p>
          To add fields to an existing model, modify the interface and schema in the model file. For example, to add a role field to the User model:
        </p>
        <pre><code>{`// In src/models/User.ts
export interface IUser {
  email: string
  name: string
  image?: string
  emailVerified?: Date | null
  password?: string
  role?: string // Added role field
}

const UserSchema = new mongoose.Schema<IUser>({
  // Existing fields...
  role: {
    type: String,
    enum: ["user", "admin", "editor"],
    default: "user"
  }
}, {
  timestamps: true,
  strict: false
})`}</code></pre>
        
        <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg my-4">
          <h4 className="text-yellow-800 dark:text-yellow-200 mt-0 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            Schema Modification Warning
          </h4>
          <p className="mb-0">
            When modifying schemas in a production application, be careful about breaking changes. Consider using migration scripts to update existing data.
          </p>
        </div>
      </section>

      <section id="best-practices">
        <h2>Best Practices</h2>
        <p>
          Follow these best practices to get the most out of MongoDB with NextReady:
        </p>
        
        <h3>Performance Optimization</h3>
        <ul>
          <li><strong>Create indexes</strong> for frequently queried fields:
            <pre><code>{`// Add to your schema
UserSchema.index({ email: 1 })
PostSchema.index({ slug: 1 }, { unique: true })
PostSchema.index({ author: 1, createdAt: -1 })`}</code></pre>
          </li>
          <li><strong>Use projection</strong> to limit returned fields when you don&apos;t need the entire document</li>
          <li><strong>Limit batch sizes</strong> when dealing with large collections</li>
        </ul>
        
        <h3>Security Considerations</h3>
        <ul>
          <li>Always validate user input before storing it in the database</li>
          <li>Use environment variables for database credentials</li>
          <li>Set up proper database access controls in MongoDB Atlas</li>
          <li>Implement proper error handling to prevent information leakage</li>
        </ul>
        
        <h3>Data Validation</h3>
        <p>
          Use Mongoose&apos;s built-in validation features to ensure data integrity:
        </p>
        <pre><code>{`const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Product name is required"],
    trim: true,
    maxlength: [100, "Name cannot be more than 100 characters"]
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
    min: [0, "Price must be a positive number"]
  },
  // Other fields...
})`}</code></pre>
      </section>

      <div className="mt-8 rounded-xl bg-gray-50 dark:bg-gray-900 p-6">
        <h2 className="mt-0">Next Steps</h2>
        <p>
          Now that you understand how to work with the database in NextReady, you might want to explore:
        </p>
        <div className="flex flex-wrap gap-4">
          <a
            href="/docs/api"
            className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
          >
            API Routes
          </a>
          <a
            href="/docs/authentication"
            className="inline-flex items-center rounded-lg border border-gray-300 dark:border-gray-700 px-4 py-2 text-sm font-semibold hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            Authentication
          </a>
        </div>
      </div>
    </div>
  )
}
