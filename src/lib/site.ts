/**
 * Site configuration — The Studio
 */
export const site = {
  name: "The Studio",
  tagline: "A small creative studio in Walnut Hills, Cincinnati.",
  url: import.meta.env.PUBLIC_SITE_URL || "https://thestudiowalnuthills.com",
  email: "hello@thestudiowalnuthills.com",
  phone: "",
  address: {
    street: "705 East McMillan Street, Unit 1",
    city: "Cincinnati",
    state: "OH",
    zip: "45206",
  },
  social: {
    linkedin: "",
    instagram: "",
    facebook: "",
  },
  booking: {
    calSlug: "",
    fallbackUrl: "",
  },
  analytics: {
    gaId: "",
  },
  founders: [] as Array<{ name: string; title: string }>,
  knowsAbout: [] as string[],
};
