import { siteConfig } from "@/config/site";

export type WelcomeSignupPayload = {
  name: string;
  email: string;
  ageConfirmed: boolean;
  researchUseConfirmed: boolean;
};

export type WelcomeSignupResult =
  | { ok: true }
  | { ok: false; error: string };

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateWelcomeSignup({
  name,
  email,
  ageConfirmed,
  researchUseConfirmed,
}: WelcomeSignupPayload): WelcomeSignupResult {
  const trimmedName = name.trim();
  const trimmedEmail = email.trim().toLowerCase();

  if (!ageConfirmed) {
    return { ok: false, error: "Please confirm you are 21 years of age or older." };
  }

  if (!researchUseConfirmed) {
    return {
      ok: false,
      error: "Please confirm research and laboratory use only.",
    };
  }

  if (trimmedName.length < 2) {
    return { ok: false, error: "Please enter your first name." };
  }

  if (!EMAIL_PATTERN.test(trimmedEmail)) {
    return { ok: false, error: "Please enter a valid email address." };
  }

  return { ok: true };
}

export async function notifyWelcomeSignup({
  name,
  email,
  ageConfirmed,
  researchUseConfirmed,
}: WelcomeSignupPayload): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const notifyEmail =
    process.env.WELCOME_NOTIFY_EMAIL ?? siteConfig.links.email;
  const fromEmail =
    process.env.RESEND_FROM_EMAIL ?? "Archon Peptide <info@archonpeptide.com>";

  if (!apiKey) {
    console.warn(
      "[welcome-signup] RESEND_API_KEY is not set — signup recorded without email notification.",
      { name, email },
    );
    return;
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [notifyEmail],
      reply_to: email,
      subject: `Protocol clearance request — ${name}`,
      html: `
        <h2>New Archon protocol clearance request</h2>
        <p><strong>First name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Age 21+ confirmed:</strong> ${ageConfirmed ? "Yes" : "No"}</p>
        <p><strong>Research use acknowledged:</strong> ${researchUseConfirmed ? "Yes" : "No"}</p>
        <p><strong>Authorization code issued:</strong> welcome10 (10% off)</p>
        <p><em>Submitted from archonpeptide.com</em></p>
      `,
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Resend failed (${response.status}): ${body}`);
  }
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
