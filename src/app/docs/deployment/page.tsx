export default function DeploymentPage() {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <h1>Deployment Guide</h1>
      
      <p>
        This guide provides detailed instructions for deploying your NextReady application 
        to various hosting platforms. Follow these steps to get your application up and running 
        in a production environment.
      </p>

      <div className="mt-8">
        <h2 id="platforms">Deployment Platforms</h2>
        <p>
          NextReady can be deployed to several platforms, each with its own advantages:
        </p>
        <ul>
          <li>Vercel (recommended)</li>
          <li>Netlify</li>
          <li>AWS Amplify</li>
          <li>Railway</li>
          <li>DigitalOcean App Platform</li>
          <li>Self-hosted options</li>
        </ul>
      </div>

      <div className="mt-8">
        <h2 id="vercel">Deploying to Vercel</h2>
        
        <p>
          Vercel is the recommended platform for deploying Next.js applications, offering the best 
          integration and performance.
        </p>

        <h3>Prerequisites</h3>
        <ul>
          <li>A Vercel account</li>
          <li>Your project code pushed to a Git repository (GitHub, GitLab, or Bitbucket)</li>
          <li>All environment variables ready for configuration</li>
        </ul>

        <h3>Deployment Steps</h3>
        <ol>
          <li>
            <p>Log in to your Vercel account and click "New Project"</p>
          </li>
          <li>
            <p>Import your repository from GitHub, GitLab, or Bitbucket</p>
          </li>
          <li>
            <p>Configure your project settings:</p>
            <ul>
              <li>Framework Preset: Next.js</li>
              <li>Root Directory: <code>./</code> (or your project root)</li>
              <li>Build Command: <code>next build</code></li>
              <li>Output Directory: <code>.next</code></li>
            </ul>
          </li>
          <li>
            <p>Add your environment variables:</p>
            <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto">
              <code>
{`# Required environment variables
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/production-db
NEXTAUTH_URL=https://your-domain.com
NEXTAUTH_SECRET=your-nextauth-secret
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
EMAIL_SERVER_HOST=smtp.example.com
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER=your-email@example.com
EMAIL_SERVER_PASSWORD=your-email-password
EMAIL_FROM=noreply@your-domain.com`}
              </code>
            </pre>
          </li>
          <li>
            <p>Click "Deploy" and wait for the build to complete</p>
          </li>
          <li>
            <p>Once deployed, you can access your application at the provided Vercel URL</p>
          </li>
        </ol>

        <h3>Custom Domain Setup</h3>
        <ol>
          <li>
            <p>In your Vercel project dashboard, go to "Settings" > "Domains"</p>
          </li>
          <li>
            <p>Add your custom domain and follow the instructions to configure DNS settings</p>
          </li>
          <li>
            <p>Vercel will automatically provision an SSL certificate for your domain</p>
          </li>
        </ol>

        <h3>Vercel Webhooks</h3>
        <p>
          For Stripe webhooks, use the following URL format:
        </p>
        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto">
          <code>
{`https://your-domain.com/api/webhooks/stripe`}
          </code>
        </pre>
      </div>

      <div className="mt-8">
        <h2 id="netlify">Deploying to Netlify</h2>
        
        <h3>Prerequisites</h3>
        <ul>
          <li>A Netlify account</li>
          <li>Your project code pushed to a Git repository</li>
        </ul>

        <h3>Deployment Steps</h3>
        <ol>
          <li>
            <p>Log in to your Netlify account and click "New site from Git"</p>
          </li>
          <li>
            <p>Connect to your Git provider and select your repository</p>
          </li>
          <li>
            <p>Configure build settings:</p>
            <ul>
              <li>Build command: <code>next build</code></li>
              <li>Publish directory: <code>.next</code></li>
            </ul>
          </li>
          <li>
            <p>Add your environment variables in the "Advanced build settings" section</p>
          </li>
          <li>
            <p>Click "Deploy site" and wait for the build to complete</p>
          </li>
        </ol>

        <h3>Netlify Configuration File</h3>
        <p>
          Create a <code>netlify.toml</code> file in your project root:
        </p>
        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto">
          <code>
{`[build]
  command = "next build"
  publish = ".next"

[build.environment]
  NEXT_USE_NETLIFY_EDGE = "true"

[[plugins]]
  package = "@netlify/plugin-nextjs"

[[redirects]]
  from = "/*"
  to = "/_ipx:path*"
  status = 200
  force = true
  conditions = {Path = ["/_ipx/**"]}

[[redirects]]
  from = "/*"
  to = "/404"
  status = 404`}
          </code>
        </pre>
      </div>

      <div className="mt-8">
        <h2 id="aws">Deploying to AWS Amplify</h2>
        
        <h3>Prerequisites</h3>
        <ul>
          <li>An AWS account</li>
          <li>Your project code pushed to a Git repository</li>
        </ul>

        <h3>Deployment Steps</h3>
        <ol>
          <li>
            <p>Log in to the AWS Management Console and navigate to AWS Amplify</p>
          </li>
          <li>
            <p>Click "New app" > "Host web app"</p>
          </li>
          <li>
            <p>Connect to your Git provider and select your repository</p>
          </li>
          <li>
            <p>Configure build settings:</p>
            <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto">
              <code>
{`version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm ci
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: .next
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*`}
              </code>
            </pre>
          </li>
          <li>
            <p>Add your environment variables in the "Environment variables" section</p>
          </li>
          <li>
            <p>Click "Save and deploy" and wait for the build to complete</p>
          </li>
        </ol>
      </div>

      <div className="mt-8">
        <h2 id="railway">Deploying to Railway</h2>
        
        <h3>Prerequisites</h3>
        <ul>
          <li>A Railway account</li>
          <li>Your project code pushed to a Git repository</li>
        </ul>

        <h3>Deployment Steps</h3>
        <ol>
          <li>
            <p>Log in to your Railway account and click "New Project"</p>
          </li>
          <li>
            <p>Select "Deploy from GitHub repo"</p>
          </li>
          <li>
            <p>Connect to your GitHub account and select your repository</p>
          </li>
          <li>
            <p>Configure your project settings:</p>
            <ul>
              <li>Root Directory: <code>./</code> (or your project root)</li>
              <li>Build Command: <code>npm run build</code></li>
              <li>Start Command: <code>npm start</code></li>
            </ul>
          </li>
          <li>
            <p>Add your environment variables in the "Variables" tab</p>
          </li>
          <li>
            <p>Railway will automatically deploy your application</p>
          </li>
        </ol>
      </div>

      <div className="mt-8">
        <h2 id="digitalocean">Deploying to DigitalOcean App Platform</h2>
        
        <h3>Prerequisites</h3>
        <ul>
          <li>A DigitalOcean account</li>
          <li>Your project code pushed to a Git repository</li>
        </ul>

        <h3>Deployment Steps</h3>
        <ol>
          <li>
            <p>Log in to your DigitalOcean account and navigate to the App Platform</p>
          </li>
          <li>
            <p>Click "Create App" and connect to your Git provider</p>
          </li>
          <li>
            <p>Select your repository and branch</p>
          </li>
          <li>
            <p>Configure your app settings:</p>
            <ul>
              <li>Type: Web Service</li>
              <li>Build Command: <code>npm run build</code></li>
              <li>Run Command: <code>npm start</code></li>
            </ul>
          </li>
          <li>
            <p>Add your environment variables in the "Environment Variables" section</p>
          </li>
          <li>
            <p>Select your plan and click "Launch App"</p>
          </li>
        </ol>
      </div>

      <div className="mt-8">
        <h2 id="self-hosted">Self-Hosted Deployment</h2>
        
        <h3>Prerequisites</h3>
        <ul>
          <li>A server or VPS (e.g., Ubuntu 20.04+)</li>
          <li>Node.js 18+ installed</li>
          <li>Nginx or another web server</li>
          <li>PM2 or another process manager</li>
        </ul>

        <h3>Deployment Steps</h3>
        <ol>
          <li>
            <p>Clone your repository to the server:</p>
            <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto">
              <code>
{`git clone https://github.com/yourusername/your-repo.git
cd your-repo`}
              </code>
            </pre>
          </li>
          <li>
            <p>Install dependencies and build the application:</p>
            <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto">
              <code>
{`npm ci
npm run build`}
              </code>
            </pre>
          </li>
          <li>
            <p>Create a .env.local file with your environment variables</p>
          </li>
          <li>
            <p>Install PM2 and start your application:</p>
            <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto">
              <code>
{`npm install -g pm2
pm2 start npm --name "nextready" -- start`}
              </code>
            </pre>
          </li>
          <li>
            <p>Configure Nginx as a reverse proxy:</p>
            <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto">
              <code>
{`server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}`}
              </code>
            </pre>
          </li>
          <li>
            <p>Set up SSL with Certbot:</p>
            <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto">
              <code>
{`sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com`}
              </code>
            </pre>
          </li>
        </ol>
      </div>

      <div className="mt-8">
        <h2 id="database">Database Deployment</h2>
        
        <h3>MongoDB Atlas</h3>
        <p>
          For production, we recommend using MongoDB Atlas:
        </p>
        <ol>
          <li>
            <p>Create a MongoDB Atlas account at <a href="https://www.mongodb.com/cloud/atlas" target="_blank" rel="noopener noreferrer">mongodb.com/cloud/atlas</a></p>
          </li>
          <li>
            <p>Create a new cluster (the free tier is sufficient for starting out)</p>
          </li>
          <li>
            <p>Set up a database user with appropriate permissions</p>
          </li>
          <li>
            <p>Configure network access (IP whitelist) or allow access from anywhere for testing</p>
          </li>
          <li>
            <p>Get your connection string and update your environment variables</p>
          </li>
        </ol>
      </div>

      <div className="mt-8">
        <h2 id="post-deployment">Post-Deployment Tasks</h2>
        
        <h3>Stripe Webhook Configuration</h3>
        <p>
          After deployment, update your Stripe webhook endpoint:
        </p>
        <ol>
          <li>
            <p>Go to the Stripe Dashboard > Developers > Webhooks</p>
          </li>
          <li>
            <p>Add an endpoint with your production URL:</p>
            <code>https://your-domain.com/api/webhooks/stripe</code>
          </li>
          <li>
            <p>Select the following events to listen for:</p>
            <ul>
              <li><code>checkout.session.completed</code></li>
              <li><code>customer.subscription.created</code></li>
              <li><code>customer.subscription.updated</code></li>
              <li><code>customer.subscription.deleted</code></li>
              <li><code>invoice.payment_succeeded</code></li>
              <li><code>invoice.payment_failed</code></li>
            </ul>
          </li>
          <li>
            <p>Get the webhook signing secret and update your environment variable</p>
          </li>
        </ol>

        <h3>Google OAuth Configuration</h3>
        <p>
          Update your Google OAuth credentials:
        </p>
        <ol>
          <li>
            <p>Go to the Google Cloud Console > APIs & Services > Credentials</p>
          </li>
          <li>
            <p>Edit your OAuth 2.0 Client ID</p>
          </li>
          <li>
            <p>Add your production domain to the Authorized JavaScript origins:</p>
            <code>https://your-domain.com</code>
          </li>
          <li>
            <p>Add your production redirect URI:</p>
            <code>https://your-domain.com/api/auth/callback/google</code>
          </li>
        </ol>
      </div>

      <div className="mt-8">
        <h2 id="monitoring">Monitoring and Maintenance</h2>
        
        <h3>Uptime Monitoring</h3>
        <p>
          Set up uptime monitoring with a service like UptimeRobot or Pingdom to be alerted if your site goes down.
        </p>

        <h3>Error Tracking</h3>
        <p>
          Implement error tracking with Sentry or a similar service:
        </p>
        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto">
          <code>
{`// Install Sentry
npm install @sentry/nextjs

// Configure Sentry
// sentry.client.config.js
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: 'your-sentry-dsn',
  tracesSampleRate: 0.5,
});

// sentry.server.config.js
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: 'your-sentry-dsn',
  tracesSampleRate: 0.5,
});`}
          </code>
        </pre>

        <h3>Regular Backups</h3>
        <p>
          Ensure your MongoDB database is regularly backed up. MongoDB Atlas provides automated backups.
        </p>

        <h3>Continuous Deployment</h3>
        <p>
          Set up continuous deployment to automatically deploy changes when you push to your main branch.
        </p>
      </div>

      <div className="mt-8">
        <h2 id="troubleshooting">Deployment Troubleshooting</h2>
        
        <h3>Common Issues</h3>
        <ul>
          <li>
            <p><strong>Build Failures:</strong> Check your build logs for errors. Common issues include missing dependencies or environment variables.</p>
          </li>
          <li>
            <p><strong>API Routes Not Working:</strong> Ensure your API routes are properly configured and environment variables are set correctly.</p>
          </li>
          <li>
            <p><strong>Database Connection Issues:</strong> Verify your MongoDB connection string and network access settings.</p>
          </li>
          <li>
            <p><strong>Authentication Problems:</strong> Check your NextAuth.js configuration and OAuth provider settings.</p>
          </li>
          <li>
            <p><strong>Stripe Webhook Errors:</strong> Ensure your webhook endpoint is correctly configured and the signing secret is set.</p>
          </li>
        </ul>

        <h3>Deployment Logs</h3>
        <p>
          Always check your deployment logs for errors:
        </p>
        <ul>
          <li>Vercel: Project Dashboard > Deployments > Select deployment > Logs</li>
          <li>Netlify: Site overview > Deploys > Select deploy > Deploy log</li>
          <li>AWS Amplify: App > Select branch > Deployment details</li>
        </ul>
      </div>

      <div className="mt-8">
        <h2 id="best-practices">Deployment Best Practices</h2>
        
        <ul>
          <li>
            <strong>Use Environment Variables:</strong> Never hardcode sensitive information in your codebase.
          </li>
          <li>
            <strong>Implement CI/CD:</strong> Automate testing and deployment to catch issues early.
          </li>
          <li>
            <strong>Stage Changes:</strong> Deploy to a staging environment before production.
          </li>
          <li>
            <strong>Monitor Performance:</strong> Use tools like Lighthouse to monitor performance.
          </li>
          <li>
            <strong>Regular Updates:</strong> Keep dependencies and packages updated.
          </li>
          <li>
            <strong>Security Headers:</strong> Implement proper security headers for your application.
          </li>
          <li>
            <strong>Rollback Plan:</strong> Have a plan for rolling back deployments if issues arise.
          </li>
        </ul>
      </div>

      <div className="mt-8">
        <h2 id="next-steps">Next Steps</h2>
        
        <p>
          After successfully deploying your application, consider these next steps:
        </p>

        <ul>
          <li>
            <a href="/docs/analytics" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
              Set up analytics to track user behavior
            </a>
          </li>
          <li>
            <a href="/docs/seo" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
              Optimize your site for search engines
            </a>
          </li>
          <li>
            <a href="/docs/production" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
              Review production best practices
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}
