import type { TravelPackage } from "@/components/admin-travel/types";

// High-definition curated Sri Lankan place imagery matching specific destinations and themes
export const SRI_LANKA_DESTINATION_IMAGES = {
  sigiriya:
    "https://images.unsplash.com/photo-1588598198321-9735fd52455b?w=1200&auto=format&fit=crop&q=80", // Sigiriya Rock Fortress
  kandy:
    "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=1200&auto=format&fit=crop&q=80", // Temple of the Sacred Tooth & Kandy Lake
  galle:
    "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=1200&auto=format&fit=crop&q=80", // Galle Dutch Fort & Lighthouse
  ella:
    "https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?w=1200&auto=format&fit=crop&q=80", // Ella Nine Arch Bridge
  nuwaraEliya:
    "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1200&auto=format&fit=crop&q=80", // Ceylon Tea Hills & Plantations
  beachBentota:
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&auto=format&fit=crop&q=80", // Golden Tropical Beaches & Palms
  beachMirissa:
    "https://images.unsplash.com/photo-1559827291-72ee739d0d9a?w=1200&auto=format&fit=crop&q=80", // Mirissa Coconut Tree Hill & Bay
  yalaSafari:
    "https://images.unsplash.com/photo-1581852017103-68accd55096a?w=1200&auto=format&fit=crop&q=80", // Yala Wildlife Elephant Safari
  colombo:
    "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=1200&auto=format&fit=crop&q=80", // Colombo City Skyline & Coast
  hortonPlains:
    "https://images.unsplash.com/photo-1546708973-b339540b5162?w=1200&auto=format&fit=crop&q=80", // Horton Plains & Highland Panorama
};

export const OUTBOUND_DESTINATION_IMAGES = {
  dubai:
    "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200&auto=format&fit=crop&q=80", // Dubai Skyline & Marina
  maldives:
    "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=1200&auto=format&fit=crop&q=80", // Maldives Overwater Villas & Lagoon
  singapore:
    "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=1200&auto=format&fit=crop&q=80", // Singapore Marina Bay Sands
  thailand:
    "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=1200&auto=format&fit=crop&q=80", // Tropical Island
};

/**
 * Resolves the most relevant image for a travel package.
 * Prioritizes admin-uploaded package images, and falls back to a destination-matched image.
 */
export function getPackageCoverImage(pkg: Partial<TravelPackage>): string {
  // 1. Always prioritize Admin-uploaded cover image or first image
  if (pkg.coverImage && typeof pkg.coverImage === "string" && pkg.coverImage.trim() !== "") {
    return pkg.coverImage;
  }
  if (pkg.images && pkg.images.length > 0 && typeof pkg.images[0] === "string" && pkg.images[0].trim() !== "") {
    return pkg.images[0];
  }

  // 2. Fallback matching for Inbound (Sri Lanka) packages
  if (pkg.travelType === "Inbound" || !pkg.travelType) {
    const text = `${pkg.name || ""} ${pkg.destination || ""} ${pkg.shortDescription || ""} ${pkg.highlights?.join(" ") || ""}`.toLowerCase();

    // Wildlife / Safari
    if (text.includes("yala") || text.includes("safari") || text.includes("wildlife") || text.includes("udawalawe") || text.includes("minneriya")) {
      return SRI_LANKA_DESTINATION_IMAGES.yalaSafari;
    }

    // Hill Country / Ella / Train / Tea
    if (text.includes("ella") || text.includes("nine arch") || text.includes("train") || text.includes("bridge") || text.includes("little adam")) {
      return SRI_LANKA_DESTINATION_IMAGES.ella;
    }

    if (text.includes("nuwara eliya") || text.includes("tea") || text.includes("horton") || text.includes("highland") || text.includes("haputale")) {
      return SRI_LANKA_DESTINATION_IMAGES.nuwaraEliya;
    }

    // Beaches / Coastal / Honeymoon / Marine
    if (text.includes("mirissa") || text.includes("whale") || text.includes("tangalle") || text.includes("honeymoon") || text.includes("romantic")) {
      return SRI_LANKA_DESTINATION_IMAGES.beachMirissa;
    }

    if (text.includes("bentota") || text.includes("coast") || text.includes("beach") || text.includes("sea") || text.includes("ocean") || text.includes("unawatuna")) {
      return SRI_LANKA_DESTINATION_IMAGES.beachBentota;
    }

    // Galle Fort
    if (text.includes("galle") || text.includes("fort") || text.includes("lighthouse")) {
      return SRI_LANKA_DESTINATION_IMAGES.galle;
    }

    // Kandy
    if (text.includes("kandy") || text.includes("tooth") || text.includes("peradeniya") || text.includes("temple")) {
      return SRI_LANKA_DESTINATION_IMAGES.kandy;
    }

    // Sigiriya / Cultural Triangle
    if (text.includes("sigiriya") || text.includes("dambulla") || text.includes("anuradhapura") || text.includes("polonnaruwa") || text.includes("heritage") || text.includes("cultural")) {
      return SRI_LANKA_DESTINATION_IMAGES.sigiriya;
    }

    // Colombo
    if (text.includes("colombo")) {
      return SRI_LANKA_DESTINATION_IMAGES.colombo;
    }

    // Default authentic Sri Lanka flagship image
    return SRI_LANKA_DESTINATION_IMAGES.sigiriya;
  }

  // 3. Fallback matching for Outbound packages
  const outboundText = `${pkg.name || ""} ${pkg.destination || ""} ${pkg.country || ""}`.toLowerCase();
  if (outboundText.includes("maldives") || outboundText.includes("male") || outboundText.includes("atoll")) {
    return OUTBOUND_DESTINATION_IMAGES.maldives;
  }
  if (outboundText.includes("singapore")) {
    return OUTBOUND_DESTINATION_IMAGES.singapore;
  }
  return OUTBOUND_DESTINATION_IMAGES.dubai;
}
