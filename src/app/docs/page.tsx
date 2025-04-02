export default function DocsPage() {
  return (
    <article className="prose prose-slate dark:prose-invert max-w-none">
      <h1>NextReady Documentation</h1>
      
      <p className="lead">
        Welcome to the NextReady documentation. Discover our complete Next.js-based SaaS starter kit
        and launch your product faster.
      </p>

      {/* Table of contents */}
      <div className="my-8 p-6 bg-gray-50 dark:bg-gray-900 rounded-xl">
        <h2 className="mt-0">On this page</h2>
        <ul className="columns-1 md:columns-2 gap-x-10">
          <li><a href="#introduction">Introduction</a></li>
          <li><a href="#marketing-site">Marketing Site</a></li>
          <li><a href="#authentication">Authentication</a></li>
          <li><a href="#dashboard">Dashboard</a></li>
          <li><a href="#blog-management">Blog Management</a></li>
          <li><a href="#contact-management">Contact Management</a></li>
          <li><a href="#payments">Payments</a></li>
          <li><a href="#profile">User Profile</a></li>
          <li><a href="#internationalization">Internationalization</a></li>
          <li><a href="#core-features">Core Features</a></li>
        </ul>
      </div>

      {/* Introduction */}
      <section id="introduction">
        <h2>What is NextReady?</h2>
        <p>
          NextReady is a complete SaaS starter kit that helps you build scalable, production-ready web applications faster. 
          It integrates the essential features you need to create a modern SaaS and provides a solid foundation for developing large-scale applications.
        </p>
        <p>
          Whether you're building a SaaS application, a coaching site, an e-commerce platform, or any other type of web project, NextReady provides all the tools you need to succeed.
        </p>

        <h3>Configuration and Customization</h3>
        <p>
          NextReady is highly configurable and customizable. You have complete control over every aspect of the application and the ability to style each part of the user interface according to your specific needs.
        </p>
      </section>

      {/* Marketing Site */}
      <section id="marketing-site" className="mt-12">
        <h2>Marketing Site</h2>
        <p>
          The marketing site is the showcase for your product. NextReady includes all the essential sections to effectively present your SaaS and convert visitors into customers.
        </p>

        <div className="mt-8 space-y-12">
          {/* Hero Section */}
          <div className="rounded-xl border border-gray-200 dark:border-gray-800 p-6">
            <h3 className="mt-0">Hero Section</h3>
            <p>
              The hero section is the first impression visitors will have of your site. It presents your main value proposition and encourages users to sign up.
            </p>
            <div className="mt-4 border rounded-xl overflow-hidden">
              <img 
                src="/features-docs/hero-section.png" 
                alt="Hero Section" 
                className="w-full h-auto"
              />
            </div>
          </div>

          {/* Features Section */}
          <div className="rounded-xl border border-gray-200 dark:border-gray-800 p-6">
            <h3 className="mt-0">Features Section</h3>
            <p>
              Showcase your product's key features with visually appealing cards and concise descriptions.
            </p>
            <div className="mt-4 border rounded-xl overflow-hidden">
              <img 
                src="/features-docs/features-section.png" 
                alt="Features Section" 
                className="w-full h-auto"
              />
            </div>
          </div>

          {/* Pricing Section */}
          <div className="rounded-xl border border-gray-200 dark:border-gray-800 p-6">
            <h3 className="mt-0">Pricing Section</h3>
            <p>
              Display your different offerings with a clear pricing grid and calls to action for each price level.
            </p>
            <div className="mt-4 border rounded-xl overflow-hidden">
              <img 
                src="/features-docs/pricing-section.png" 
                alt="Pricing Section" 
                className="w-full h-auto"
              />
            </div>
          </div>

          {/* FAQ Section */}
          <div className="rounded-xl border border-gray-200 dark:border-gray-800 p-6">
            <h3 className="mt-0">FAQ Section</h3>
            <p>
              Answer frequently asked questions from your potential customers to address objections and facilitate the purchase decision.
            </p>
            <div className="mt-4 border rounded-xl overflow-hidden">
              <img 
                src="/features-docs/faq-section.png" 
                alt="FAQ Section" 
                className="w-full h-auto"
              />
            </div>
          </div>

          {/* Contact Page */}
          <div className="rounded-xl border border-gray-200 dark:border-gray-800 p-6">
            <h3 className="mt-0">Contact Page</h3>
            <p>
              Allow your visitors to easily contact you through an intuitive and secure contact form.
            </p>
            <div className="mt-4 border rounded-xl overflow-hidden">
              <img 
                src="/features-docs/contact-page.png" 
                alt="Contact Page" 
                className="w-full h-auto"
              />
            </div>
          </div>

          {/* CTA Section */}
          <div className="rounded-xl border border-gray-200 dark:border-gray-800 p-6">
            <h3 className="mt-0">CTA Section</h3>
            <p>
              Encourage your visitors to take action with a compelling call-to-action section at the bottom of the page.
            </p>
            <div className="mt-4 border rounded-xl overflow-hidden">
              <img 
                src="/features-docs/cta-section.png" 
                alt="CTA Section" 
                className="w-full h-auto"
              />
            </div>
          </div>

          {/* Navigation Elements */}
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-xl border border-gray-200 dark:border-gray-800 p-6">
              <h3 className="mt-0">Header</h3>
              <p>
                A responsive header with navigation, language switching, and action buttons.
              </p>
              <div className="mt-4 border rounded-xl overflow-hidden">
                <img 
                  src="/features-docs/header.png" 
                  alt="Header" 
                  className="w-full h-auto"
                />
              </div>
            </div>

            <div className="rounded-xl border border-gray-200 dark:border-gray-800 p-6">
              <h3 className="mt-0">Footer</h3>
              <p>
                A comprehensive footer with useful links, legal information, and language selector.
              </p>
              <div className="mt-4 border rounded-xl overflow-hidden">
                <img 
                  src="/features-docs/footer.png" 
                  alt="Footer" 
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Authentication */}
      <section id="authentication" className="mt-12">
        <h2>Authentication</h2>
        <p>
          NextReady includes a complete authentication system based on Next-Auth, with support for multiple providers and session management.
        </p>

        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          <div className="rounded-xl border border-gray-200 dark:border-gray-800 p-6">
            <h3 className="mt-0">Sign In</h3>
            <p>
              Secure login page for existing users.
            </p>
            <div className="mt-4 border rounded-xl overflow-hidden">
              <img 
                src="/features-docs/signin.png" 
                alt="Sign In Page" 
                className="w-full h-auto"
              />
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 dark:border-gray-800 p-6">
            <h3 className="mt-0">Sign Up</h3>
            <p>
              Registration form for new users with validation.
            </p>
            <div className="mt-4 border rounded-xl overflow-hidden">
              <img 
                src="/features-docs/signup.png" 
                alt="Sign Up Page" 
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard */}
      <section id="dashboard" className="mt-12">
        <h2>Dashboard</h2>
        <p>
          The admin dashboard allows you to manage all aspects of your application from a centralized interface.
        </p>

        <div className="mt-8 space-y-6">
          <div className="rounded-xl border border-gray-200 dark:border-gray-800 p-6">
            <h3 className="mt-0">Dashboard Overview</h3>
            <p>
              Main dashboard interface with statistics and quick access to features.
            </p>
            <div className="mt-4 border rounded-xl overflow-hidden">
              <img 
                src="/features-docs/dashbord-page.jpeg" 
                alt="Dashboard" 
                className="w-full h-auto"
              />
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 dark:border-gray-800 p-6">
            <h3 className="mt-0">Connections Management</h3>
            <p>
              Track and manage user connections to your platform.
            </p>
            <div className="mt-4 border rounded-xl overflow-hidden">
              <img 
                src="/features-docs/connexion-dasshboard.png" 
                alt="Connections Management" 
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Blog Management */}
      <section id="blog-management" className="mt-12">
        <h2>Blog Management</h2>
        <p>
          NextReady includes a complete blog system for publishing and managing content.
        </p>

        <div className="mt-8 space-y-6">
          <div className="rounded-xl border border-gray-200 dark:border-gray-800 p-6">
            <h3 className="mt-0">Blog Page</h3>
            <p>
              Display your blog posts with an attractive layout and intuitive navigation.
            </p>
            <div className="mt-4 border rounded-xl overflow-hidden">
              <img 
                src="/features-docs/blog-page.png" 
                alt="Blog Page" 
                className="w-full h-auto"
              />
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 dark:border-gray-800 p-6">
            <h3 className="mt-0">Blog Administration</h3>
            <p>
              Manage your blog posts from the admin dashboard.
            </p>
            <div className="mt-4 border rounded-xl overflow-hidden">
              <img 
                src="/features-docs/blog-dashboard.jpeg" 
                alt="Blog Administration" 
                className="w-full h-auto"
              />
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 dark:border-gray-800 p-6">
            <h3 className="mt-0">Post Creation</h3>
            <p>
              Intuitive form for creating and editing blog posts.
            </p>
            <div className="mt-4 border rounded-xl overflow-hidden">
              <img 
                src="/features-docs/dashboard-new-post-form.png" 
                alt="Post Creation" 
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Management */}
      <section id="contact-management" className="mt-12">
        <h2>Contact Management</h2>
        <p>
          Receive and manage messages sent through your site's contact form.
        </p>

        <div className="mt-8">
          <div className="rounded-xl border border-gray-200 dark:border-gray-800 p-6">
            <h3 className="mt-0">Contact Messages</h3>
            <p>
              Interface for viewing and responding to received messages.
            </p>
            <div className="mt-4 border rounded-xl overflow-hidden">
              <img 
                src="/features-docs/message-contact-dashbaord.jpeg" 
                alt="Contact Messages" 
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Payments */}
      <section id="payments" className="mt-12">
        <h2>Payments</h2>
        <p>
          NextReady integrates Stripe to securely manage payments and subscriptions.
        </p>

        <div className="mt-8">
          <div className="rounded-xl border border-gray-200 dark:border-gray-800 p-6">
            <h3 className="mt-0">Payments Dashboard</h3>
            <p>
              Track and manage your customers' payments and subscriptions.
            </p>
            <div className="mt-4 border rounded-xl overflow-hidden">
              <img 
                src="/features-docs/payments-dashboard.jpeg" 
                alt="Payments Dashboard" 
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Profile */}
      <section id="profile" className="mt-12">
        <h2>User Profile</h2>
        <p>
          Allow your users to manage their personal information and preferences.
        </p>

        <div className="mt-8">
          <div className="rounded-xl border border-gray-200 dark:border-gray-800 p-6">
            <h3 className="mt-0">Profile Page</h3>
            <p>
              User interface for modifying profile information and settings.
            </p>
            <div className="mt-4 border rounded-xl overflow-hidden">
              <img 
                src="/features-docs/profile-section.png" 
                alt="Profile Page" 
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Internationalization */}
      <section id="internationalization" className="mt-12">
        <h2>Internationalization</h2>
        <p>
          NextReady supports complete internationalization with next-intl, allowing you to translate your application into multiple languages.
        </p>
        <div className="mt-4">
          <h3>Supported Languages</h3>
          <ul>
            <li>English (en)</li>
            <li>French (fr)</li>
            <li>Spanish (es)</li>
            <li>German (de)</li>
          </ul>
          <p>
            The routing structure uses subpaths (/en, /fr, etc.) to differentiate between language versions of the site.
          </p>
        </div>
      </section>

      {/* Core Features */}
      <section id="core-features" className="mt-12">
        <h2>Core Features</h2>
        <ul>
          <li>Next.js 14 with App Router</li>
          <li>Authentication with Next-Auth (including Google authentication)</li>
          <li>MongoDB database</li>
          <li>Payments with Stripe</li>
          <li>Beautiful UI with Tailwind CSS</li>
          <li>Dark Mode Support</li>
          <li>TypeScript Support</li>
          <li>API Routes</li>
          <li>Internationalization with next-intl</li>
          <li>Complete blog system</li>
          <li>Contact management</li>
          <li>Admin dashboard</li>
        </ul>
      </section>

      <div className="mt-12 rounded-xl bg-background-secondary p-6">
        <h2 className="mt-0">Need Help?</h2>
        <p>
          Can't find what you're looking for? Join our Discord community for help and discussions.
        </p>
        <a
          href="#"
          className="inline-flex items-center rounded-lg bg-primary-dark px-4 py-2 text-sm font-semibold text-white hover:bg-primary-dark/90"
        >
          Join Discord Community
        </a>
      </div>
    </article>
  )
}
