export default function SetupPage() {
  return (
    <article className="prose prose-slate dark:prose-invert max-w-none">
      <h1>Setting Up NextReady</h1>
      
      <p className="lead">
        This guide will walk you through the process of setting up your NextReady SaaS starter kit after cloning it from GitHub.
      </p>

      <div className="my-8 p-6 bg-gray-50 dark:bg-gray-900 rounded-xl">
        <h2 className="mt-0">On this page</h2>
        <ul>
          <li><a href="#prerequisites">Prerequisites</a></li>
          <li><a href="#project-setup">Project Setup</a></li>
          <li><a href="#environment-variables">Environment Variables</a></li>
          <li><a href="#mongodb-setup">MongoDB Setup</a></li>
          <li><a href="#authentication-setup">Authentication Setup</a></li>
          <li><a href="#stripe-setup">Stripe Setup</a></li>
          <li><a href="#email-setup">Email Setup</a></li>
          <li><a href="#internationalization">Internationalization Setup</a></li>
          <li><a href="#running-the-project">Running the Project</a></li>
          <li><a href="#deployment">Deployment</a></li>
        </ul>
      </div>

      <section id="prerequisites">
        <h2>Prerequisites</h2>
        <p>
          Before you begin setting up NextReady, ensure you have the following installed on your machine:
        </p>
        <ul>
          <li><strong>Node.js</strong> (v18 or higher) - <a href="https://nodejs.org/en/" target="_blank" rel="noopener noreferrer">Download</a></li>
          <li><strong>npm</strong>, <strong>yarn</strong>, or <strong>pnpm</strong> - <a href="https://yarnpkg.com/getting-started/install" target="_blank" rel="noopener noreferrer">Install Yarn</a> or <a href="https://pnpm.io/installation" target="_blank" rel="noopener noreferrer">Install pnpm</a></li>
          <li><strong>Git</strong> - <a href="https://git-scm.com/downloads" target="_blank" rel="noopener noreferrer">Download</a></li>
        </ul>
        <p>
          You'll also need accounts with the following services:
        </p>
        <ul>
          <li><strong>MongoDB Atlas</strong> - <a href="https://www.mongodb.com/cloud/atlas/register" target="_blank" rel="noopener noreferrer">Sign up</a> (for database)</li>
          <li><strong>Stripe</strong> - <a href="https://dashboard.stripe.com/register" target="_blank" rel="noopener noreferrer">Sign up</a> (for payment processing)</li>
          <li><strong>Resend</strong> - <a href="https://resend.com/signup" target="_blank" rel="noopener noreferrer">Sign up</a> (for email services)</li>
          <li><strong>Google Cloud Platform</strong> - <a href="https://console.cloud.google.com/" target="_blank" rel="noopener noreferrer">Sign up</a> (for Google authentication)</li>
        </ul>
      </section>

      <section id="project-setup">
        <h2>Project Setup</h2>
        
        <h3>Clone the Repository</h3>
        <p>
          First, clone the NextReady repository from GitHub to your local machine:
        </p>
        <pre><code className="language-bash">git clone https://github.com/your-username/nextready.git
cd nextready</code></pre>
        
        <h3>Install Dependencies</h3>
        <p>
          Install all the required dependencies using npm, yarn, or pnpm:
        </p>
        <pre><code className="language-bash"># Using npm
npm install

# Using yarn
yarn install

# Using pnpm
pnpm install</code></pre>

        <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg my-4">
          <h4 className="text-yellow-800 dark:text-yellow-200 mt-0 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            Dependency Conflicts Resolution
          </h4>
          <p className="mb-0">
            If you encounter dependency conflicts between next-auth, @auth/core, and @auth/mongodb-adapter, create a <code>.npmrc</code> file in the root directory with the following content:
          </p>
          <pre><code className="language-bash">legacy-peer-deps=true</code></pre>
          <p className="mb-0">
            This will help resolve conflicts between these packages during installation and deployment.
          </p>
        </div>
      </section>

      <section id="environment-variables">
        <h2>Environment Variables</h2>
        <p>
          NextReady requires several environment variables to function properly. Create a <code>.env.local</code> file in the root of your project with the following variables:
        </p>
        <pre><code className="language-bash"># App
NEXT_PUBLIC_APP_URL=http://localhost:3000

# MongoDB
MONGODB_URI=your_mongodb_connection_string

# NextAuth
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000

# Google Authentication
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Stripe
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
STRIPE_PRICE_ID=your_stripe_price_id

# Email (Resend)
RESEND_API_KEY=your_resend_api_key</code></pre>

        <h3>Generating a NextAuth Secret</h3>
        <p>
          You can generate a secure random string for your <code>NEXTAUTH_SECRET</code> using this command:
        </p>
        <pre><code className="language-bash">openssl rand -base64 32</code></pre>
      </section>

      <section id="mongodb-setup">
        <h2>MongoDB Setup</h2>
        <p>
          NextReady uses MongoDB directly (without Prisma ORM) for data storage. Follow these steps to set up your MongoDB database:
        </p>
        
        <h3>Create a MongoDB Atlas Cluster</h3>
        <ol>
          <li>Sign in to <a href="https://cloud.mongodb.com" target="_blank" rel="noopener noreferrer">MongoDB Atlas</a></li>
          <li>Create a new project (if you don't have one already)</li>
          <li>Build a new cluster (the free tier is sufficient for development)</li>
          <li>Under "Database Access," create a new database user with read and write privileges</li>
          <li>Under "Network Access," add your IP address or allow access from anywhere for development</li>
          <li>Once your cluster is created, click "Connect" and select "Connect your application"</li>
          <li>Copy the connection string and replace <code>&lt;password&gt;</code> with your database user's password</li>
          <li>Add this connection string as the <code>MONGODB_URI</code> in your <code>.env.local</code> file</li>
        </ol>
        
        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg my-4">
          <h4 className="text-blue-800 dark:text-blue-200 mt-0 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            Database Models
          </h4>
          <p className="mb-0">
            NextReady uses Mongoose for MongoDB object modeling. The models are defined in the <code>src/models</code> directory and include:
          </p>
          <ul className="mb-0">
            <li><code>User.ts</code> - User accounts and authentication</li>
            <li><code>Post.ts</code> - Blog posts</li>
            <li><code>Contact.ts</code> - Contact form submissions</li>
          </ul>
        </div>
      </section>

      <section id="authentication-setup">
        <h2>Authentication Setup</h2>
        <p>
          NextReady uses NextAuth.js for authentication, which supports both credentials (email/password) and Google OAuth.
        </p>
        
        <h3>Setting Up Google Authentication</h3>
        <p>
          To enable Google authentication:
        </p>
        <ol>
          <li>Go to the <a href="https://console.cloud.google.com/" target="_blank" rel="noopener noreferrer">Google Cloud Console</a></li>
          <li>Create a new project or select an existing one</li>
          <li>Navigate to "APIs & Services" &gt; "Credentials"</li>
          <li>Click "Create Credentials" and select "OAuth client ID"</li>
          <li>Configure the consent screen if prompted</li>
          <li>For the application type, select "Web application"</li>
          <li>Add authorized JavaScript origins: <code>http://localhost:3000</code> (for development) and your production URL</li>
          <li>Add authorized redirect URIs: <code>http://localhost:3000/api/auth/callback/google</code> (for development) and <code>https://your-production-domain.com/api/auth/callback/google</code> (for production)</li>
          <li>Click "Create" and note your Client ID and Client Secret</li>
          <li>Add these values to your <code>.env.local</code> file as <code>GOOGLE_CLIENT_ID</code> and <code>GOOGLE_CLIENT_SECRET</code></li>
        </ol>

        <h3>Email/Password Authentication</h3>
        <p>
          Email/password authentication is already configured in the project. Users can register and log in using their email and password. The passwords are securely hashed using bcrypt before being stored in the database.
        </p>
      </section>

      <section id="stripe-setup">
        <h2>Stripe Setup</h2>
        <p>
          NextReady integrates with Stripe for payment processing. Follow these steps to set up Stripe:
        </p>
        
        <h3>Create a Stripe Account</h3>
        <ol>
          <li>Sign up for a <a href="https://dashboard.stripe.com/register" target="_blank" rel="noopener noreferrer">Stripe account</a> if you don't have one</li>
          <li>In the Stripe Dashboard, ensure you're in test mode (toggle in the top-right corner)</li>
          <li>In the Stripe Dashboard, go to &quot;Developers&quot; &gt; &quot;API keys&quot;</li>
          <li>Copy your "Secret key" and "Publishable key"</li>
          <li>Add these to your <code>.env.local</code> file as <code>STRIPE_SECRET_KEY</code> and <code>STRIPE_PUBLISHABLE_KEY</code></li>
        </ol>
        
        <h3>Create a Stripe Product and Price</h3>
        <ol>
          <li>In the Stripe Dashboard, go to &quot;Products&quot; &gt; &quot;Add product&quot;</li>
          <li>Enter product details (name, description, etc.)</li>
          <li>Add pricing information (one-time or recurring)</li>
          <li>Click "Save product"</li>
          <li>Find the Price ID for the product you created (it starts with "price_")</li>
          <li>Add this Price ID to your <code>.env.local</code> file as <code>STRIPE_PRICE_ID</code></li>
        </ol>
        
        <h3>Set Up Stripe Webhooks</h3>
        <p>
          Webhooks allow Stripe to notify your application when events occur, such as successful payments:
        </p>
        <ol>
          <li>In the Stripe Dashboard, go to &quot;Developers&quot; &gt; &quot;Webhooks&quot;</li>
          <li>Click "Add endpoint"</li>
          <li>For local development, you can use a tool like <a href="https://stripe.com/docs/stripe-cli" target="_blank" rel="noopener noreferrer">Stripe CLI</a> to forward webhooks to your local server</li>
          <li>For production, enter your webhook URL: &lt;code&gt;https://your-domain.com/api/webhooks/stripe&lt;/code&gt;</li>
          <li>Select the events to listen for (at minimum: &lt;code&gt;checkout.session.completed&lt;/code&gt;, &lt;code&gt;customer.subscription.created&lt;/code&gt;, &lt;code&gt;customer.subscription.updated&lt;/code&gt;, &lt;code&gt;customer.subscription.deleted&lt;/code&gt;)</li>
          <li>Click "Add endpoint" and copy the signing secret</li>
          <li>Add this to your <code>.env.local</code> file as <code>STRIPE_WEBHOOK_SECRET</code></li>
        </ol>

        <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg my-4">
          <h4 className="text-yellow-800 dark:text-yellow-200 mt-0 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            Important Note
          </h4>
          <p className="mb-0">
            When working with Stripe webhooks, ensure that the payment status checks are looking for &lt;code&gt;succeeded&lt;/code&gt; status (not &lt;code&gt;completed&lt;/code&gt;) to avoid payment processing issues.
          </p>
        </div>
      </section>

      <section id="email-setup">
        <h2>Email Setup</h2>
        <p>
          NextReady uses Resend for sending transactional emails. Follow these steps to set up email functionality:
        </p>
        
        <h3>Create a Resend Account</h3>
        <ol>
          <li>Sign up for a <a href="https://resend.com/signup" target="_blank" rel="noopener noreferrer">Resend account</a></li>
          <li>Verify your domain or use the provided sandbox domain for testing</li>
          <li>Create an API key in the Resend dashboard</li>
          <li>Add this API key to your <code>.env.local</code> file as <code>RESEND_API_KEY</code></li>
        </ol>
        
        <p>
          Email templates are located in the <code>src/services/email-service.ts</code> file. You can customize these templates to match your branding.
        </p>
      </section>

      <section id="internationalization">
        <h2>Internationalization Setup</h2>
        <p>
          NextReady supports multiple languages using next-intl. The supported languages are:
        </p>
        <ul>
          <li>English (en)</li>
          <li>French (fr)</li>
          <li>Spanish (es)</li>
          <li>German (de)</li>
        </ul>
        
        <h3>Language Configuration</h3>
        <p>
          The internationalization is already set up in the project. The routing structure uses subpaths (/en, /fr, etc.) to differentiate between language versions of the site.
        </p>
        
        <p>
          Translation files are located in the <code>messages</code> directory at the root of the project. Each language has its own subdirectory with JSON files containing the translations.
        </p>
      </section>

      <section id="running-the-project">
        <h2>Running the Project</h2>
        <p>
          Once you've set up all the required environment variables and configurations, you can start the development server:
        </p>
        <pre><code className="language-bash"># Using npm
npm run dev

# Using yarn
yarn dev

# Using pnpm
pnpm dev</code></pre>
        
        <p>
          Your NextReady application should now be running at <a href="http://localhost:3000" target="_blank" rel="noopener noreferrer">http://localhost:3000</a>.
        </p>
        
        <h3>Creating an Admin User</h3>
        <p>
          To access the admin dashboard, you'll need to create an admin user:
        </p>
        <ol>
          <li>Register a new user through the sign-up page</li>
          <li>Access your MongoDB database (through MongoDB Atlas or another tool)</li>
          <li>Find the user document in the "users" collection</li>
          <li>Add a <code>role</code> field with the value <code>&quot;admin&quot;</code> to the user document</li>
        </ol>
        <p>
          Once the user's role is set to "admin", you'll be able to access the admin dashboard and manage blog posts, contacts, and other features.
        </p>
      </section>

      <section id="deployment">
        <h2>Deployment</h2>
        <p>
          NextReady can be deployed to various platforms. Here's how to deploy to Vercel, which is recommended for Next.js applications:
        </p>
        
        <h3>Deploying to Vercel</h3>
        <ol>
          <li>Push your project to a Git repository (GitHub, GitLab, or Bitbucket)</li>
          <li>Sign up for a <a href="https://vercel.com/signup" target="_blank" rel="noopener noreferrer">Vercel account</a></li>
          <li>Click "New Project" and import your repository</li>
          <li>Configure your project settings (you can leave most as default)</li>
          <li>Add all your environment variables from <code>.env.local</code> to the Vercel project settings</li>
          <li>Update <code>NEXTAUTH_URL</code> and <code>NEXT_PUBLIC_APP_URL</code> to your production URL</li>
          <li>Click "Deploy"</li>
        </ol>
        
        <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg my-4">
          <h4 className="text-yellow-800 dark:text-yellow-200 mt-0 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            Deployment Troubleshooting
          </h4>
          <p className="mb-0">
            If you encounter dependency conflicts during deployment on Vercel, add a <code>.npmrc</code> file with <code>legacy-peer-deps=true</code> to your project root. This helps resolve conflicts between next-auth, @auth/core, and @auth/mongodb-adapter.
          </p>
        </div>
        
        <h3>After Deployment</h3>
        <p>
          After deploying your application:
        </p>
        <ol>
          <li>Update your Google OAuth redirect URIs to include your production URL</li>
          <li>Update your Stripe webhook endpoint to your production webhook URL</li>
          <li>Test the authentication, payment, and internationalization features in the production environment</li>
        </ol>
      </section>

      <div className="mt-8 rounded-xl bg-gray-50 dark:bg-gray-900 p-6">
        <h2 className="mt-0">Need Help?</h2>
        <p>
          If you encounter any issues during setup or have questions, check out our other documentation pages or reach out for support.
        </p>
        <div className="flex flex-wrap gap-4">
          <a
            href="/docs"
            className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Documentation Home
          </a>
          <a
            href="/docs/core-features"
            className="inline-flex items-center rounded-lg border border-gray-300 dark:border-gray-700 px-4 py-2 text-sm font-semibold hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            Core Features
          </a>
        </div>
      </div>
    </article>
  )
}
