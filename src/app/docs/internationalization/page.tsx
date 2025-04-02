"use client";

export default function InternationalizationPage() {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <h1>Internationalization</h1>
      
      <p className="lead">
        NextReady includes a complete internationalization (i18n) system powered by next-intl, supporting multiple languages out of the box.
      </p>

      <div className="my-8 p-6 bg-gray-50 dark:bg-gray-900 rounded-xl">
        <h2 className="mt-0">On this page</h2>
        <ul>
          <li><a href="#overview">Overview</a></li>
          <li><a href="#supported-languages">Supported Languages</a></li>
          <li><a href="#routing">Internationalized Routing</a></li>
          <li><a href="#translations">Managing Translations</a></li>
          <li><a href="#components">Translation Components</a></li>
          <li><a href="#date-number">Date and Number Formatting</a></li>
          <li><a href="#language-switcher">Language Switcher</a></li>
          <li><a href="#seo">SEO Considerations</a></li>
        </ul>
      </div>

      <section id="overview">
        <h2>Overview</h2>
        <p>
          NextReady uses next-intl to provide a comprehensive internationalization solution for your SaaS application. 
          The system is built to support multiple languages with minimal configuration, allowing you to reach a global audience.
        </p>
        
        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg my-4">
          <h4 className="text-blue-800 dark:text-blue-200 mt-0 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            Key Features
          </h4>
          <ul className="mb-0">
            <li>Support for English, French, Spanish, and German out of the box</li>
            <li>Locale-based routing with subpaths (/en, /fr, etc.)</li>
            <li>Type-safe translations with TypeScript</li>
            <li>Server and client components support</li>
            <li>Date, time, and number formatting based on locale</li>
            <li>Easy-to-use language switcher</li>
            <li>SEO-friendly with proper language metadata</li>
          </ul>
        </div>
      </section>

      <section id="supported-languages">
        <h2>Supported Languages</h2>
        <p>
          NextReady supports the following languages out of the box:
        </p>
        
        <table className="w-full">
          <thead>
            <tr>
              <th>Language</th>
              <th>Locale Code</th>
              <th>URL Path</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>English</td>
              <td><code>en</code></td>
              <td><code>/en/...</code></td>
            </tr>
            <tr>
              <td>French</td>
              <td><code>fr</code></td>
              <td><code>/fr/...</code></td>
            </tr>
            <tr>
              <td>Spanish</td>
              <td><code>es</code></td>
              <td><code>/es/...</code></td>
            </tr>
            <tr>
              <td>German</td>
              <td><code>de</code></td>
              <td><code>/de/...</code></td>
            </tr>
          </tbody>
        </table>
        
        <h3>Adding More Languages</h3>
        <p>
          You can easily add more languages by updating the configuration files in <code>src/i18n.ts</code> and adding new translation files.
        </p>
      </section>

      <section id="routing">
        <h2>Internationalized Routing</h2>
        <p>
          NextReady uses Next.js App Router with internationalized routing based on URL subpaths.
        </p>
        
        <h3>Routing Configuration</h3>
        <p>
          The routing configuration is set up in the middleware.ts file to handle locale detection and routing.
        </p>
        
        <h3>App Directory Structure</h3>
        <p>
          The app directory structure follows the Next.js App Router conventions with the locale parameter:
        </p>
        
        <h3>Locale Parameter</h3>
        <p>
          Each page component receives the locale parameter through the Next.js App Router.
        </p>
      </section>

      <section id="translations">
        <h2>Managing Translations</h2>
        <p>
          Translations are stored in JSON files organized by language and namespace.
        </p>
        
        <h3>Translation Files</h3>
        <p>
          Translation files are located in the <code>messages</code> directory, with one file per language (en.json, fr.json, etc.).
        </p>
        
        <h3>Translation Structure</h3>
        <p>
          Each translation file contains namespaced translations organized by feature or component.
        </p>
      </section>

      <section id="components">
        <h2>Translation Components</h2>
        <p>
          NextReady provides several components to help with translations in both server and client components.
        </p>
        
        <h3>Server Components</h3>
        <p>
          In server components, you can use the <code>useTranslations</code> hook from next-intl.
        </p>
        
        <h3>Client Components</h3>
        <p>
          For client components, you need to use the <code>NextIntlClientProvider</code> to provide translations.
        </p>
      </section>

      <section id="date-number">
        <h2>Date and Number Formatting</h2>
        <p>
          next-intl provides utilities for formatting dates, times, and numbers according to the current locale.
        </p>
        
        <h3>Date Formatting</h3>
        <p>
          Use the <code>useFormatter</code> hook to format dates according to the current locale.
        </p>
        
        <h3>Number Formatting</h3>
        <p>
          The same <code>useFormatter</code> hook can be used to format numbers, currencies, and percentages.
        </p>
      </section>

      <section id="language-switcher">
        <h2>Language Switcher</h2>
        <p>
          NextReady includes a language switcher component that allows users to change their preferred language.
        </p>
        
        <h3>Implementation</h3>
        <p>
          The language switcher is implemented as a dropdown menu that updates the URL to reflect the selected language.
        </p>
        
        <h3>Using the Language Switcher</h3>
        <p>
          Add the language switcher to your layout or navigation component for easy access.
        </p>
      </section>

      <section id="seo">
        <h2>SEO Considerations</h2>
        <p>
          Proper SEO for multilingual sites requires additional metadata and configuration.
        </p>
        
        <h3>Language Metadata</h3>
        <p>
          Set the <code>lang</code> attribute on the <code>html</code> element to indicate the page language.
        </p>
        
        <h3>Alternate Language Links</h3>
        <p>
          Add alternate language links in the document head for better SEO.
        </p>
        
        <h3>Translated Metadata</h3>
        <p>
          Provide translated metadata for each page to improve search engine visibility in different languages.
        </p>
      </section>

      <div className="mt-8 rounded-xl bg-gray-50 dark:bg-gray-900 p-6">
        <h2 className="mt-0">Next Steps</h2>
        <p>
          Now that you understand how internationalization works in NextReady, you can:
        </p>
        <ul>
          <li>Add more languages to your application</li>
          <li>Customize the translation files for your specific needs</li>
          <li>Implement language detection based on user preferences</li>
          <li>Optimize your SEO for multilingual content</li>
        </ul>
      </div>
    </div>
  );
}
