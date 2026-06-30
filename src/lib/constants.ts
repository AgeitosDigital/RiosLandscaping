export const SITE = {
  name: "Rios Landscaping",
  domain: "rioslandscaping.co",
  phone: "(713) 555-0199",
  email: "info@rioslandscaping.co",
  location: "Houston, TX & Greater Metro Area",
  tagline: "Professional landscaping for Houston homes & businesses",
} as const;

export const SERVICES = [
  {
    id: "lawn-care",
    title: "Lawn Care & Maintenance",
    description:
      "Weekly mowing, edging, fertilization, and weed control to keep your lawn healthy year-round in the Houston climate.",
    icon: "🌿",
  },
  {
    id: "landscape-design",
    title: "Landscape Design",
    description:
      "Custom designs that enhance curb appeal — from native plantings to full yard transformations.",
    icon: "🌳",
  },
  {
    id: "hardscaping",
    title: "Hardscaping",
    description:
      "Patios, walkways, retaining walls, and outdoor living spaces built to last through Texas heat and storms.",
    icon: "🧱",
  },
  {
    id: "irrigation",
    title: "Irrigation Systems",
    description:
      "Smart sprinkler installation, repairs, and seasonal adjustments to conserve water and protect your investment.",
    icon: "💧",
  },
  {
    id: "tree-shrub",
    title: "Tree & Shrub Care",
    description:
      "Trimming, shaping, and removal services to keep your trees and shrubs safe, healthy, and beautiful.",
    icon: "🌲",
  },
  {
    id: "seasonal-cleanup",
    title: "Seasonal Cleanup",
    description:
      "Leaf removal, bed mulching, storm debris cleanup, and spring/fall prep for a polished property.",
    icon: "🍂",
  },
] as const;

export const NAV_LINKS = [
  { href: "#services", label: "Services" },
  { href: "#gallery", label: "Gallery" },
  { href: "#about", label: "About" },
  { href: "#quote", label: "Get a Quote" },
] as const;
