/** Client testimonial. Mirrors the planned CMS testimonial entry. */
export interface Testimonial {
  id: string;
  quote: string;
  /** Person's role and organisation type; names only with written consent. */
  attribution: string;
  context: string;
  /** Development-only marker for placeholder content. Absent in CMS data. */
  isSample?: boolean;
}
