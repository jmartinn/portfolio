import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET() {
  try {
    const { data, error } = await supabase.storage
      .from("resume")
      .download("main.pdf");

    if (error) {
      throw error;
    }

    const headers = new Headers();
    headers.set("Content-Type", "application/pdf");
    headers.set(
      "Content-Disposition",
      'attachment; filename="juan-pedro-martin-resume.pdf"'
    );

    return new NextResponse(data, {
      status: 200,
      headers,
    });
  } catch (error) {
    console.error("Error fetching resume:", error);
    return NextResponse.redirect(
      new URL("/404", process.env.NEXT_PUBLIC_APP_URL)
    );
  }
}
