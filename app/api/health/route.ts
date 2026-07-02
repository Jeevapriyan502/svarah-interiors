import { createServerSupabaseClient } from "@/lib/supabase";
import { jsonError, jsonSuccess } from "@/lib/api-response";

export async function GET() {
  try {
    const supabase = createServerSupabaseClient();
    const { error } = await supabase.from("leads").select("id").limit(1);

    if (error) {
      return jsonError(`Database connection failed: ${error.message}`, 503);
    }

    return jsonSuccess({ status: "ok", database: "connected" });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Health check failed.";
    return jsonError(message, 503);
  }
}
