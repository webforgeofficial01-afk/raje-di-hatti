import { useEffect } from "react";

const SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: "Raje Di Hatti",
  description:
    "Authentic Punjabi food in Sant Nagar Burari, Delhi. Best Chole Bhature, Amritsari Kulcha, Dal Makhani. Order on Zomato, Swiggy. Catering available.",
  url: "https://rajedi hatti.icp",
  telephone: "+919599233307",
  address: {
    "@type": "PostalAddress",
    streetAddress:
      "Main 100 Futa Road, Opp Redwood Public School, Near Labour Chowk",
    addressLocality: "Sant Nagar Burari",
    addressRegion: "Delhi",
    postalCode: "110084",
    addressCountry: "IN",
  },
  openingHours: "Mo-Su 07:00-19:00",
  servesCuisine: "Punjabi",
  priceRange: "₹₹",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    reviewCount: "500",
  },
  hasMap:
    "https://www.google.com/maps/search/Raje+Di+Hatti+Sant+Nagar+Burari+Delhi",
  menu: "https://www.zomato.com/ncr/raje-di-hatti-burari-new-delhi/order",
  sameAs: ["https://www.zomato.com/ncr/raje-di-hatti-burari-new-delhi/order"],
};

const OG = {
  title: "Raje Di Hatti | Best Punjabi Food in Burari, Delhi",
  description:
    "Order authentic Punjabi food from Raje Di Hatti in Sant Nagar Burari, Delhi. Best Chole Bhature, Amritsari Kulcha, Dal Makhani. Order on Zomato, Swiggy. Catering available.",
  type: "restaurant.restaurant",
  locale: "en_IN",
  siteName: "Raje Di Hatti",
};

function setMeta(
  name: string,
  content: string,
  attr: "name" | "property" = "name",
) {
  let el = document.querySelector<HTMLMetaElement>(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setLink(rel: string, href: string) {
  let el = document.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

function injectSchema() {
  const id = "rdh-schema-ld";
  let el = document.getElementById(id) as HTMLScriptElement | null;
  if (!el) {
    el = document.createElement("script");
    el.id = id;
    el.type = "application/ld+json";
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(SCHEMA);
}

export default function SEOMeta() {
  useEffect(() => {
    // Title
    document.title = OG.title;

    // Standard meta
    setMeta("description", OG.description);
    setMeta(
      "keywords",
      "Raje Di Hatti, Punjabi food Burari, Chole Bhature Delhi, Amritsari Kulcha, Dal Makhani, restaurant near Burari, food delivery Sant Nagar, catering Delhi",
    );
    setMeta("robots", "index, follow");
    setMeta("viewport", "width=device-width, initial-scale=1");

    // Open Graph
    setMeta("og:title", OG.title, "property");
    setMeta("og:description", OG.description, "property");
    setMeta("og:type", OG.type, "property");
    setMeta("og:locale", OG.locale, "property");
    setMeta("og:site_name", OG.siteName, "property");
    setMeta("og:url", window.location.href, "property");

    // Twitter Card
    setMeta("twitter:card", "summary_large_image", "name");
    setMeta("twitter:title", OG.title, "name");
    setMeta("twitter:description", OG.description, "name");

    // Canonical
    setLink("canonical", window.location.origin + window.location.pathname);

    // JSON-LD Schema
    injectSchema();
  }, []);

  return null;
}
