/** Protocol clearance welcome offer */
export const welcomeOffer = {
  code: "welcome10",
  codeLabel: "WELCOME10",
  discountPercent: 10,
  eyebrow: "Archon",
  headline: "Protocol Clearance",
  subheadline: "10% off your first order.",
  submitLabel: "Continue",
  ageAttestation: "I am 21 or older.",
  researchAttestation:
    "For research and laboratory use only — not for human consumption.",
  marketingOptInAttestation:
    "I'd like to receive emails about new products, offers, and updates.",
  certificateTitle: "Protocol Clearance",
  certificateSubtitle: "Access issued",
  certificateStatus: "Verified",
  certificateBenefit: "10% first order",
  checkoutNote: "Use at Square checkout when prompted.",
} as const;

export const welcomeCaptureStorageKey = "archon-welcome-capture";
export const welcomeEmailStorageKey = "archon-welcome-email";
/** @deprecated Kept so we can clear old "Not now" dismissals when making clearance required. */
export const welcomeCaptureSessionKey = "archon-welcome-capture-dismissed";

export type WelcomeCaptureStatus = "signed-up";

export function readWelcomeEmail(): string | null {
  if (typeof window === "undefined") return null;
  const email = localStorage.getItem(welcomeEmailStorageKey)?.trim().toLowerCase();
  if (!email || !email.includes("@")) return null;
  return email;
}

export function writeWelcomeEmail(email: string) {
  localStorage.setItem(welcomeEmailStorageKey, email.trim().toLowerCase());
}

export function readWelcomeCaptureStatus(): WelcomeCaptureStatus | null {
  if (typeof window === "undefined") return null;

  if (localStorage.getItem(welcomeCaptureStorageKey) === "signed-up") {
    return "signed-up";
  }

  return null;
}

/** Signed up + email on device — required before Square checkout. */
export function hasCompletedWelcome(): boolean {
  return readWelcomeCaptureStatus() === "signed-up" && Boolean(readWelcomeEmail());
}

export function writeWelcomeCaptureStatus(_status: WelcomeCaptureStatus) {
  localStorage.setItem(welcomeCaptureStorageKey, "signed-up");
  sessionStorage.removeItem(welcomeCaptureSessionKey);
}

export function createClearanceId() {
  const now = new Date();
  const date = [
    now.getFullYear(),
    String(now.getMonth() + 1).padStart(2, "0"),
    String(now.getDate()).padStart(2, "0"),
  ].join("");
  const suffix = String(Math.floor(Math.random() * 9000) + 1000);

  return `AC-${date}-${suffix}`;
}

export function formatClearanceDate(date = new Date()) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}
