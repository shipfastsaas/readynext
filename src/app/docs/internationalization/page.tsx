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
          You can easily add more languages by updating the configuration files:
        </p>
        <pre><code className="language-typescript">{`// src/i18n.ts
export const locales = ['en', 'fr', 'es', 'de', 'it'] // Added Italian

export const defaultLocale = 'en'

// Add translation files for the new language
// messages/it.json`}</code></pre>
      </section>

      <section id="routing">
        <h2>Internationalized Routing</h2>
        <p>
          NextReady uses Next.js App Router with internationalized routing based on URL subpaths.
        </p>
        
        <h3>Routing Configuration</h3>
        <p>
          The routing configuration is set up in the following files:
        </p>
        <pre><code className="language-typescript">{`// src/middleware.ts
import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n';

export default createMiddleware({
  // A list of all locales that are supported
  locales,
  
  // The default locale to use when visiting a non-localized route
  defaultLocale,
  
  // This function is called for every incoming request
  localePrefix: 'always'
});

export const config = {
  // Match all paths except for
  // - API routes
  // - Static files
  // - _next internal paths
  matcher: ['/((?!api|_next|.*\\..*).*)']
};`}</code></pre>
        
        <h3>App Directory Structure</h3>
        <p>
          The app directory structure follows the Next.js App Router conventions with the locale parameter:
        </p>
        <pre><code className="language-bash">{`src/app/
├── [locale]
│   ├── layout.tsx
│   ├── page.tsx
│   ├── about
│   │   └── page.tsx
│   ├── dashboard
│   │   └── page.tsx
│   └── ...
└── ...`}</code></pre>
        
        <h3>Locale Parameter</h3>
        <p>
          Each page component receives the locale parameter:
        </p>
        <pre><code className="language-typescript">{`// src/app/[locale]/page.tsx
import { useTranslations } from 'next-intl';

export default function Home() {
  const t = useTranslations('Home');
  
  return (
    <main>
      <h1>{t('title')}</h1>
      <p>{t('description')}</p>
    </main>
  );
}`}</code></pre>
      </section>

      <section id="translations">
        <h2>Managing Translations</h2>
        <p>
          Translations are stored in JSON files organized by language and namespace.
        </p>
        
        <h3>Translation Files</h3>
        <p>
          Translation files are located in the <code>messages</code> directory:
        </p>
        <pre><code className="language-bash">{`messages/
├── en.json
├── fr.json
├── es.json
├── de.json
└── it.json`}</code></pre>
        
        <h3>Translation Structure</h3>
        <p>
          Each translation file contains namespaced translations:
        </p>
        <pre><code className="language-json">{`// messages/en.json
{
  "Common": {
    "buttons": {
      "submit": "Submit",
      "cancel": "Cancel",
      "save": "Save",
      "delete": "Delete"
    },
    "navigation": {
      "home": "Home",
      "dashboard": "Dashboard",
      "settings": "Settings",
      "profile": "Profile"
    }
  },
  "Home": {
    "title": "Welcome to NextReady",
    "description": "A complete SaaS starter kit for your next project",
    "features": {
      "title": "Features",
      "authentication": "Authentication",
      "payments": "Payments",
      "blog": "Blog System",
      "i18n": "Internationalization"
    },
    "cta": "Get Started"
  },
  "Dashboard": {
    "welcome": "Welcome, {name}",
    "stats": {
      "title": "Your Stats",
      "users": "Users",
      "revenue": "Revenue",
      "growth": "Growth"
    }
  }
}`}</code></pre>
        
        <h3>Translation for Other Languages</h3>
        <p>
          The same structure is used for other languages:
        </p>
        <pre><code className="language-json">{`// messages/fr.json
{
  "Common": {
    "buttons": {
      "submit": "Soumettre",
      "cancel": "Annuler",
      "save": "Enregistrer",
      "delete": "Supprimer"
    },
    "navigation": {
      "home": "Accueil",
      "dashboard": "Tableau de bord",
      "settings": "Paramètres",
      "profile": "Profil"
    }
  },
  "Home": {
    "title": "Bienvenue sur NextReady",
    "description": "Un kit de démarrage SaaS complet pour votre prochain projet",
    "features": {
      "title": "Fonctionnalités",
      "authentication": "Authentification",
      "payments": "Paiements",
      "blog": "Système de blog",
      "i18n": "Internationalisation"
    },
    "cta": "Commencer"
  },
  "Dashboard": {
    "welcome": "Bienvenue, {name}",
    "stats": {
      "title": "Vos statistiques",
      "users": "Utilisateurs",
      "revenue": "Revenus",
      "growth": "Croissance"
    }
  }
}`}</code></pre>
      </section>

      <section id="components">
        <h2>Translation Components</h2>
        <p>
          NextReady provides components and hooks for using translations in your application.
        </p>
        
        <h3>Server Components</h3>
        <p>
          For server components, use the <code>getTranslations</code> function:
        </p>
        <pre><code className="language-typescript">{`// Server Component
import { getTranslations } from 'next-intl/server';

export default async function ServerComponent({ params }: { params: { locale: string } }) {
  const t = await getTranslations({ locale: params.locale, namespace: 'Common' });
  
  return (
    <button className="px-4 py-2 bg-blue-600 text-white rounded">
      {t('buttons.submit')}
    </button>
  );
}`}</code></pre>
        
        <h3>Client Components</h3>
        <p>
          For client components, use the <code>useTranslations</code> hook:
        </p>
        <pre><code className="language-typescript">{`// Client Component
'use client';

import { useTranslations } from 'next-intl';

export default function ClientComponent() {
  const t = useTranslations('Common');
  
  return (
    <button className="px-4 py-2 bg-blue-600 text-white rounded">
      {t('buttons.submit')}
    </button>
  );
}`}</code></pre>
        
        <h3>Dynamic Values</h3>
        <p>
          You can include dynamic values in your translations:
        </p>
        <pre><code className="language-typescript">{`// Using dynamic values
const t = useTranslations('Dashboard');

return (
  <h1>{t('welcome', { name: user.name })}</h1>
);`}</code></pre>
        
        <h3>Pluralization</h3>
        <p>
          next-intl supports pluralization using the ICU message format:
        </p>
        <pre><code className="language-json">{`// messages/en.json
{
  "items": {
    "count": "{count, plural, =0{No items} one{# item} other{# items}}"
  }
}`}</code></pre>

        <pre><code className="language-typescript">{`// Using pluralization
const t = useTranslations('items');
const itemCount = 5;

return (
  <p>{t('count', { count: itemCount })}</p>
  // Renders: "5 items"
);`}</code></pre>
      </section>

      <section id="date-number">
        <h2>Date and Number Formatting</h2>
        <p>
          next-intl provides utilities for formatting dates, times, and numbers based on the current locale.
        </p>
        
        <h3>Date Formatting</h3>
        <pre><code className="language-typescript">{`// Client Component
'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useFormatter, useNow } from 'next-intl';

export default function DateTimeExample() {
  const locale = useLocale();
  const format = useFormatter();
  const now = useNow();
  
  return (
    <div>
      <p>Current locale: {locale}</p>
      
      <h3>Date formatting:</h3>
      <p>
        {format.dateTime(now, {
          dateStyle: 'full'
        })}
      </p>
      
      <h3>Number formatting:</h3>
      <p>
        {format.number(1234567.89, {
          style: 'currency',
          currency: 'EUR'
        })}
      </p>
      
      <h3>Relative time:</h3>
      <p>
        {format.relativeTime(now - 24 * 60 * 60 * 1000)}
      </p>
    </div>
  );
}`}</code></pre>
        
        <h3>Number Formatting</h3>
        <pre><code className="language-typescript">{`// Client Component
'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useFormatter } from 'next-intl';

export default function PriceDisplay({ price }: { price: number }) {
  const locale = useLocale();
  const format = useFormatter();
  
  return (
    <div>
      <p>
        {format.number(price, {
          style: 'currency',
          currency: 'EUR'
        })}
      </p>
      <p>
        {format.number(price, {
          style: 'decimal',
          maximumFractionDigits: 2
        })}
      </p>
      <p>
        {format.number(price, {
          style: 'percent',
          maximumFractionDigits: 1
        })}
      </p>
    </div>
  );
}`}</code></pre>
      </section>

      <section id="language-switcher">
        <h2>Language Switcher</h2>
        <p>
          NextReady includes a language switcher component that allows users to change the language of the application.
        </p>
        
        <h3>Language Switcher Component</h3>
        <pre><code className="language-typescript">{`// src/components/LanguageSwitcher.tsx
'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next-intl/client';
import { useState } from 'react';
import { locales } from '@/i18n';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  
  const handleLocaleChange = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
    setIsOpen(false);
  };
  
  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-1 px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
      >
        <span>{locale.toUpperCase()}</span>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-900 rounded-md shadow-lg z-10">
          <div className="py-1">
            {locales.map((l) => (
              <button
                key={l}
                onClick={() => handleLocaleChange(l)}
                className={`block px-4 py-2 text-sm w-full text-left ${
                  l === locale 
                    ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white' 
                    : 'text-gray-700 dark:text-gray-300'
                } hover:bg-gray-100 dark:hover:bg-gray-800`}
              >
                {l === 'en' && 'English'}
                {l === 'fr' && 'Français'}
                {l === 'es' && 'Español'}
                {l === 'de' && 'Deutsch'}
                {l === 'it' && 'Italiano'}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}`}</code></pre>
        
        <h3>Using the Language Switcher</h3>
        <p>
          Add the language switcher to your layout or navigation component:
        </p>
        <pre><code className="language-typescript">{`// src/components/Navbar.tsx
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import LanguageSwitcher from './LanguageSwitcher';

export default function Navbar() {
  const t = useTranslations('Common.navigation');
  
  return (
    <nav className="bg-white dark:bg-gray-900 shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-xl font-bold">
                NextReady
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link 
                href="/" 
                className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                {t('home')}
              </Link>
              <Link 
                href="/dashboard" 
                className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                {t('dashboard')}
              </Link>
              <Link 
                href="/settings" 
                className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                {t('settings')}
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </nav>
  );
}`}</code></pre>
      </section>

      <section id="seo">
        <h2>SEO Considerations</h2>
        <p>
          NextReady is configured for optimal SEO with internationalized content.
        </p>
        
        <h3>HTML Lang Attribute</h3>
        <p>
          The <code>html</code> element's <code>lang</code> attribute is automatically set based on the current locale:
        </p>
        <pre><code className="language-typescript">{`// src/app/[locale]/layout.tsx
import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { getMessages } from 'next-intl/server';

export default async function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  let messages;
  
  try {
    messages = await getMessages({ locale });
  } catch (error) {
    notFound();
  }
  
  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}`}</code></pre>
        
        <h3>Alternate Language Links</h3>
        <p>
          Add alternate language links in the document head for better SEO:
        </p>
        <pre><code className="language-typescript">{`// src/app/[locale]/layout.tsx
import { headers } from 'next/headers';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

// Add metadata for SEO
export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const messages = await getMessages({ locale });
  
  return {
    title: messages.Home.title,
    description: messages.Home.description,
    alternates: {
      canonical: '/',
      languages: {
        'en': '/en',
        'fr': '/fr',
        'es': '/es',
        'de': '/de',
        'it': '/it',
      },
    },
  };
}`}</code></pre>
        
        <h3>Translated Metadata</h3>
        <p>
          Provide translated metadata for each page:
        </p>
        <pre><code className="language-typescript">{`// src/app/[locale]/page.tsx
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';

// Generate metadata for this specific page
export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'Home' });
  
  return {
    title: t('title'),
    description: t('description'),
  };
}

export default function Home() {
  const t = useTranslations('Home');
  
  return (
    <main>
      <h1>{t('title')}</h1>
      <p>{t('description')}</p>
    </main>
  );
}`}</code></pre>
      </section>

      <div className="mt-8 rounded-xl bg-gray-50 dark:bg-gray-900 p-6">
        <h2 className="mt-0">Next Steps</h2>
        <p>
          Now that you understand how internationalization works in NextReady, you might want to explore:
        </p>
        <div className="flex flex-wrap gap-4">
          <a
            href="/docs/blog"
            className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Blog System
          </a>
          <a
            href="/docs/seo"
            className="inline-flex items-center rounded-lg border border-gray-300 dark:border-gray-700 px-4 py-2 text-sm font-semibold hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            SEO
          </a>
        </div>
      </div>
    </div>
  )
}
