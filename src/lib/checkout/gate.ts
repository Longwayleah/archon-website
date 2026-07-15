import {
  hasCompletedWelcome,
  readWelcomeEmail,
  writeWelcomeCaptureStatus,
  writeWelcomeEmail,
} from "@/config/welcome";
import { useAppStore } from "@/store/useAppStore";

type PendingGate = {
  resolve: (email: string) => void;
  reject: (error: Error) => void;
};

let pendingGate: PendingGate | null = null;

/**
 * Ensure we have a clearance email on device.
 * Opens Protocol Clearance when missing; resolves once the user finishes.
 */
export function ensureCheckoutEmail(): Promise<string> {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("Checkout gate is client-only"));
  }

  const existing = readWelcomeEmail();
  if (existing && hasCompletedWelcome()) {
    return Promise.resolve(existing);
  }

  return new Promise((resolve, reject) => {
    if (pendingGate) {
      const previous = pendingGate;
      pendingGate = {
        resolve: (email) => {
          previous.resolve(email);
          resolve(email);
        },
        reject: (error) => {
          previous.reject(error);
          reject(error);
        },
      };
    } else {
      pendingGate = { resolve, reject };
    }

    useAppStore.getState().requestWelcomeForCheckout();
  });
}

/** Called when Protocol Clearance finishes (success Continue). */
export function completeCheckoutEmailGate(email: string) {
  const normalized = email.trim().toLowerCase();
  if (!normalized.includes("@")) return;

  writeWelcomeEmail(normalized);
  writeWelcomeCaptureStatus("signed-up");

  const pending = pendingGate;
  pendingGate = null;
  useAppStore.getState().clearWelcomeForCheckout();
  pending?.resolve(normalized);
}

export async function captureCartEmail(input: {
  email: string;
  paymentLinkUrl: string;
  cartLabel?: string;
}) {
  try {
    const response = await fetch("/api/cart-capture", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: input.email,
        payment_link_url: input.paymentLinkUrl,
        cart_label: input.cartLabel,
      }),
    });

    if (!response.ok) {
      const data = (await response.json().catch(() => ({}))) as {
        error?: string;
      };
      console.error("[cart-capture]", data.error ?? response.status);
    }
  } catch (error) {
    console.error("[cart-capture]", error);
  }
}

/**
 * Protocol clearance (if needed) → cart email capture → Square Payment Link.
 * Capture failures do not block checkout.
 */
export async function openGatedCheckout(options: {
  url: string;
  cartLabel?: string;
  mode?: "navigate" | "tab";
}) {
  const email = await ensureCheckoutEmail();
  await captureCartEmail({
    email,
    paymentLinkUrl: options.url,
    cartLabel: options.cartLabel,
  });

  if (options.mode === "tab") {
    window.open(options.url, "_blank", "noopener,noreferrer");
    return;
  }

  window.location.href = options.url;
}
