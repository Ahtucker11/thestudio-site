/**
 * Central site configuration — EDIT THIS PER CLIENT.
 * This is the second customization surface after tokens.css.
 */
export const site = {
  name: "Client Name",
  tagline: "Your tagline here",
  url: import.meta.env.PUBLIC_SITE_URL || "https://example.com",
  email: "hello@example.com",
  phone: "",
  address: {
    street: "",
    city: "",
    state: "",
    zip: "",
  },
  social: {
    linkedin: "",
    instagram: "",
    facebook: "",
  },
  booking: {
    calSlug: import.meta.env.PUBLIC_CAL_SLUG || "",
    fallbackUrl: "",
  },
  analytics: {
    gaId: import.meta.env.PUBLIC_GA_ID || "",
  },
  /** Used for Organization JSON-LD */
  founders: [] as Array<{ name: string; title: string }>,
  /** Topics/skills for Organization schema knowsAbout */
  knowsAbout: [] as string[],
};
