import { createServerSupabaseClient } from "@/lib/supabase";
import { jsonError, jsonSuccess } from "@/lib/api-response";
import type { LeadFormData, ProjectType } from "@/lib/types";
import {
  formatIndianPhone,
  isValidGmail,
  isValidIndianPhone,
  validationMessages,
} from "@/lib/validation";

const VALID_PROJECT_TYPES: ProjectType[] = [
  "Residential",
  "Commercial",
  "Hospitality",
  "Renovation",
  "Full Interior",
  "Consultation",
];

export async function POST(request: Request) {
  try {
    const body: LeadFormData = await request.json();

    if (!body.client_name?.trim() || body.client_name.trim().length < 2) {
      return jsonError("Please enter your full name.", 400);
    }

    if (!body.email?.trim() || !isValidGmail(body.email)) {
      return jsonError(validationMessages.gmail, 400);
    }

    if (!body.phone_number?.trim() || !isValidIndianPhone(body.phone_number)) {
      return jsonError(validationMessages.phone, 400);
    }

    if (!VALID_PROJECT_TYPES.includes(body.project_type)) {
      return jsonError("Invalid project type.", 400);
    }

    const supabase = createServerSupabaseClient();

    const { data, error } = await supabase
      .from("leads")
      .insert({
        client_name: body.client_name.trim(),
        email: body.email.trim().toLowerCase(),
        project_type: body.project_type,
        phone_number: formatIndianPhone(body.phone_number.trim()),
        message: body.message?.trim() || null,
        status: "new",
      })
      .select("id")
      .single();

    if (error) {
      console.error("Supabase insert error:", error);

      if (error.code === "23514") {
        return jsonError(
          "Invalid form data. Please check your Gmail ID and phone number.",
          400
        );
      }

      return jsonError("Failed to save inquiry. Please try again.", 500);
    }

    return jsonSuccess({ leadId: data.id }, 201);
  } catch (err) {
    console.error("Lead API error:", err);

    if (
      err instanceof Error &&
      err.message.includes("Missing Supabase environment variables")
    ) {
      return jsonError(
        "Server is not configured. Please contact the site administrator.",
        503
      );
    }

    return jsonError("Internal server error.", 500);
  }
}
