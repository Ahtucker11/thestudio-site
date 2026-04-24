import { site } from "./site";

interface MetaProps {
  title: string;
  description: string;
  canonicalPath?: string;
  ogImage?: string;
  noindex?: boolean;
}

export function buildMeta(props: MetaProps) {
  const fullTitle = `${props.title} | ${site.name}`;
  const canonicalUrl = props.canonicalPath
    ? `${site.url}${props.canonicalPath}`
    : site.url;
  const ogImageUrl = props.ogImage
    ? `${site.url}${props.ogImage}`
    : `${site.url}/og-fallback.png`;

  return {
    title: fullTitle,
    description: props.description,
    canonicalUrl,
    ogImageUrl,
    noindex: props.noindex ?? false,
  };
}

export function buildOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: site.url,
    logo: `${site.url}/logo.png`,
    description: site.tagline,
    ...(site.founders.length > 0 && {
      founder: site.founders.map((f) => ({
        "@type": "Person",
        name: f.name,
        jobTitle: f.title,
      })),
    }),
    ...(site.social.linkedin && {
      sameAs: [site.social.linkedin],
    }),
    ...(site.knowsAbout.length > 0 && {
      knowsAbout: site.knowsAbout,
    }),
  };
}

export function buildLocalBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: site.name,
    url: site.url,
    description: site.tagline,
    ...(site.email && { email: site.email }),
    ...(site.phone && { telephone: site.phone }),
    ...(site.address.street && {
      address: {
        "@type": "PostalAddress",
        streetAddress: site.address.street,
        addressLocality: site.address.city,
        addressRegion: site.address.state,
        postalCode: site.address.zip,
      },
    }),
  };
}

export function buildFaqJsonLd(
  items: Array<{ question: string; answer: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
