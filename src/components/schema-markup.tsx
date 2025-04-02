export const SchemaMarkup = () => {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "url": "https://shipfaststarter.com",
    "name": "ShipFastStarter - The Best Next.js Boilerplate",
    "description": "Launch your SaaS with the best Next.js template and boilerplate. Complete React SaaS starter kit with authentication, payments, and beautiful UI components to ship faster.",
    "keywords": "best next.js boilerplate, next.js template, saas starter kit, react saas boilerplate, nextjs boilerplate, saas template, next.js 14, global saas solution, build and ship faster",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://shipfaststarter.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "url": "https://shipfaststarter.com",
    "name": "ShipFastStarter",
    "description": "Launch your SaaS with the best Next.js template and boilerplate. Complete React SaaS starter kit with authentication, payments, and beautiful UI components to ship faster.",
    "logo": "https://shipfaststarter.com/logo.png",
    "sameAs": [
      "https://twitter.com/shipfaststarter",
      "https://github.com/shipfaststarter"
    ]
  };

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "The Best Next.js Boilerplate | SaaS Starter Kit Template",
    "description": "Launch your SaaS with the best Next.js template and boilerplate. Complete React SaaS starter kit with authentication, payments, and beautiful UI components to ship faster.",
    "image": "https://shipfaststarter.com/logo.png",
    "category": "Software Development Tools",
    "brand": {
      "@type": "Brand",
      "name": "ShipFastStarter"
    },
    "offers": {
      "@type": "Offer",
      "url": "https://shipfaststarter.com",
      "price": "199",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    },
    "keywords": "best next.js boilerplate, next.js template, saas starter kit, react saas boilerplate, nextjs boilerplate, saas template, next.js 14, global saas solution"
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "The Best Next.js Boilerplate | SaaS Starter Kit Template",
    "applicationCategory": "DeveloperApplication",
    "description": "Launch your SaaS with the best Next.js template and boilerplate. Complete React SaaS starter kit with authentication, payments, and beautiful UI components to ship faster.",
    "operatingSystem": "Any",
    "url": "https://shipfaststarter.com",
    "image": "https://shipfaststarter.com/logo.png",
    "offers": {
      "@type": "Offer",
      "price": "199",
      "priceCurrency": "USD"
    },
    "applicationSubCategory": "Web Development Framework",
    "keywords": "best next.js boilerplate, next.js template, saas starter kit, react saas boilerplate, nextjs boilerplate, saas template, next.js 14",
    "featureList": [
      "Next.js 14",
      "Best React SaaS Boilerplate",
      "Authentication",
      "Payment Integration",
      "Beautiful UI Components",
      "Marketing Pages",
      "TypeScript",
      "TailwindCSS",
      "SEO Optimized",
      "Fast Development"
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
    </>
  );
};
