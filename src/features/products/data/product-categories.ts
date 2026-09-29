import { SITE_MEDIA } from "@/config/site-media";

import type { ProductCategory } from "../types/product-category.types";

/**
 * Wholesale category taxonomy for the public site.
 *
 * TODO: Replace with the Rust API category endpoint when available. Slugs must
 * match the backend so `/products?category=<slug>` filters server-side.
 */
export const PRODUCT_CATEGORIES: readonly ProductCategory[] = [
  {
    slug: "machinery",
    name: "Machinery",
    description: "Production, processing, and packaging machines",
    image: SITE_MEDIA.categories.machinery,
  },
  {
    slug: "electronics",
    name: "Electronics",
    description: "Consumer and commercial electronics",
    image: SITE_MEDIA.categories.electronics,
  },
  {
    slug: "industrial-equipment",
    name: "Industrial Equipment",
    description: "Tools, fabrication, and plant equipment",
    image: SITE_MEDIA.categories.industrialEquipment,
  },
  {
    slug: "furniture",
    name: "Furniture",
    description: "Home, office, and hospitality furniture",
    image: SITE_MEDIA.categories.furniture,
  },
  {
    slug: "clothing",
    name: "Clothing",
    description: "Apparel and textiles in volume",
    image: SITE_MEDIA.categories.clothing,
  },
  {
    slug: "vehicles",
    name: "Vehicles",
    description: "Passenger and commercial vehicles",
    image: SITE_MEDIA.categories.vehicles,
  },
  {
    slug: "shoes",
    name: "Shoes",
    description: "Footwear for retail and wholesale",
    image: SITE_MEDIA.categories.shoes,
  },
  {
    slug: "raw-materials",
    name: "Raw Materials",
    description: "Metals, polymers, and inputs for manufacturing",
    image: SITE_MEDIA.categories.rawMaterials,
  },
];
