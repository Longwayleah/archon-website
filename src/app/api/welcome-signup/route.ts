import { NextResponse } from "next/server";
import {
  handleWelcomeSignup,
  validateWelcomeSignup,
} from "@/lib/email/welcome-signup";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      name?: string;
      email?: string;
      ageConfirmed?: boolean;
      researchUseConfirmed?: boolean;
    };
    const name = body.name ?? "";
    const email = body.email ?? "";
    const ageConfirmed = body.ageConfirmed === true;
    const researchUseConfirmed = body.researchUseConfirmed === true;

    const validation = validateWelcomeSignup({
      name,
      email,
      ageConfirmed,
      researchUseConfirmed,
    });
    if (!validation.ok) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    await handleWelcomeSignup({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      ageConfirmed,
      researchUseConfirmed,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[welcome-signup]", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
