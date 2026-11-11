/**
 * Partner inquiry form logic (M6-S03). Pure functions, no imports: unit-tested with node:test.
 * The form posts JSON to <API base>/api/partner-inquiries (PetPrep API; contract in
 * docs of pet-prep). Nothing here logs form data.
 */
export const partnerTypes = ["series", "sponsored_content", "insurer", "directory", "shelter", "other"] as const;
export type PartnerInquiryType = (typeof partnerTypes)[number];

export type PartnerForm = {
  company: string;
  contact_name: string;
  email: string;
  type: string;
  message: string;
  website: string; // honeypot
  consent: boolean;
};

export type PartnerPayload = {
  company: string;
  contact_name: string;
  email: string;
  type: PartnerInquiryType;
  message: string;
  website: string;
  locale: "sl" | "en";
};

export type FieldError = "company" | "contact_name" | "email" | "type" | "message" | "consent";

export const DEFAULT_API_BASE = "https://api.petprep.si";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
export const LIMITS = { company: 190, contact_name: 120, email: 254, message: 4000 } as const;

export function apiBase(env: string | undefined): string {
  const v = (env ?? "").trim().replace(/\/+$/, "");
  return v || DEFAULT_API_BASE;
}

export function endpoint(env: string | undefined): string {
  return `${apiBase(env)}/api/partner-inquiries`;
}

export function isPartnerType(v: string): v is PartnerInquiryType {
  return (partnerTypes as readonly string[]).includes(v);
}

/** Client-side checks (the server validates again). Returns the fields that need attention. */
export function validate(f: PartnerForm): FieldError[] {
  const out: FieldError[] = [];
  if (!f.company.trim() || f.company.trim().length > LIMITS.company) out.push("company");
  if (!f.contact_name.trim() || f.contact_name.trim().length > LIMITS.contact_name) out.push("contact_name");
  const email = f.email.trim();
  if (email.length > LIMITS.email || !EMAIL_RE.test(email)) out.push("email");
  if (!isPartnerType(f.type)) out.push("type");
  if (!f.message.trim() || f.message.trim().length > LIMITS.message) out.push("message");
  if (!f.consent) out.push("consent");
  return out;
}

export function buildPayload(f: PartnerForm, locale: "sl" | "en"): PartnerPayload {
  return {
    company: f.company.trim(),
    contact_name: f.contact_name.trim(),
    email: f.email.trim(),
    type: isPartnerType(f.type) ? f.type : "other",
    message: f.message.trim(),
    website: f.website,
    locale,
  };
}

export type Outcome =
  | { kind: "done" }
  | { kind: "invalid"; fields: FieldError[] }
  | { kind: "rate_limited" }
  | { kind: "fallback" };

const serverFields: Record<string, FieldError> = { company: "company", contact_name: "contact_name", email: "email", type: "type", message: "message" };

/** Maps an HTTP status (or a network failure: status 0) and the parsed body to what the UI shows. */
export function classify(status: number, body: unknown): Outcome {
  if (status === 201 || status === 200) return { kind: "done" };
  if (status === 422) {
    const errors = (body as { errors?: Record<string, unknown> } | null)?.errors;
    const fields = errors && typeof errors === "object" ? Object.keys(errors).map((k) => serverFields[k]).filter((x): x is FieldError => !!x) : [];
    return { kind: "invalid", fields };
  }
  if (status === 429) return { kind: "rate_limited" };
  // 404 (API not deployed yet), 503 (disabled), 5xx, network error (0): fall back to e-mail.
  return { kind: "fallback" };
}
