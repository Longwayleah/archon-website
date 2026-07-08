/** Protocol clearance welcome offer */
export const welcomeOffer = {
  code: "welcome10",
  codeLabel: "WELCOME10",
  discountPercent: 10,
  eyebrow: "Archon",
  headline: "Protocol Clearance",
  subheadline: "10% off your first order.",
  submitLabel: "Continue",
  dismissLabel: "Not now",
  ageAttestation: "I am 21 or older.",
  researchAttestation:
    "For research and laboratory use only — not for human consumption.",
  certificateTitle: "Protocol Clearance",
  certificateSubtitle: "Access issued",
  certificateStatus: "Verified",
  certificateBenefit: "10% first order",
  checkoutNote: "Use at Square checkout when prompted.",
} as const;

export const welcomeCaptureStorageKey = "archon-welcome-capture";
export const welcomeCaptureSessionKey = "archon-welcome-capture-dismissed";

export type WelcomeCaptureStatus = "signed-up" | "dismissed";

export function readWelcomeCaptureStatus(): WelcomeCaptureStatus | null {
  if (typeof window === "undefined") return null;

  if (localStorage.getItem(welcomeCaptureStorageKey) === "signed-up") {
    return "signed-up";
  }

  if (sessionStorage.getItem(welcomeCaptureSessionKey) === "dismissed") {
    return "dismissed";
  }

  return null;
}

export function writeWelcomeCaptureStatus(status: WelcomeCaptureStatus) {
  if (status === "signed-up") {
    localStorage.setItem(welcomeCaptureStorageKey, "signed-up");
    sessionStorage.removeItem(welcomeCaptureSessionKey);
    return;
  }

  sessionStorage.setItem(welcomeCaptureSessionKey, "dismissed");
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
