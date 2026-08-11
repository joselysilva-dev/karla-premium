import { createHash } from "node:crypto";
import { getSupabaseClient } from "../lib/supabase.js";

const PROFILE_FIELDS = "id, full_name, email, phone, birth_date, gender, height_cm, weight_kg, goal, restrictions, injuries, experience_level, role, created_at, updated_at";
const UPDATABLE_FIELDS = ["full_name", "phone", "birth_date", "gender", "height_cm", "weight_kg", "goal", "restrictions", "injuries", "experience_level"];
const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export function createMeControllers(getClient = getSupabaseClient) {
  return {
    async getMe(req, res, next) {
      try {
        const { data, error } = await getClient().from("profiles")
          .select(PROFILE_FIELDS).eq("id", req.user.id).single();
        if (error) throw error;
        res.json(data);
      } catch (error) { next(error); }
    },

    async updateMe(req, res, next) {
      try {
        if (Object.hasOwn(req.body || {}, "role")) {
          return res.status(400).json({ error: "O campo role não pode ser alterado." });
        }
        const updates = Object.fromEntries(
          Object.entries(req.body || {}).filter(([key]) => UPDATABLE_FIELDS.includes(key))
        );
        if (!Object.keys(updates).length && typeof req.body?.email !== "string") {
          return res.status(400).json({ error: "Nenhum campo válido informado." });
        }
        for (const field of ["full_name", "phone", "gender", "goal", "restrictions", "injuries", "experience_level"]) {
          if (typeof updates[field] === "string") updates[field] = updates[field].trim() || null;
        }

        const supabase = getClient();
        if (typeof req.body.email === "string" && req.body.email.trim() !== req.user.email) {
          const email = req.body.email.trim().toLowerCase();
          const { error } = await supabase.auth.admin.updateUserById(req.user.id, { email });
          if (error) throw error;
          updates.email = email;
        }
        const { data, error } = await supabase.from("profiles").update(updates)
          .eq("id", req.user.id).select(PROFILE_FIELDS).single();
        if (error) throw error;
        res.json(data);
      } catch (error) { next(error); }
    },

    async claimVisitor(req, res, next) {
      try {
        const visitorId = req.body?.visitorId;
        if (typeof visitorId !== "string" || !UUID_PATTERN.test(visitorId)) {
          return res.status(400).json({ error: "visitorId inválido." });
        }
        const visitorHash = createHash("sha256").update(visitorId).digest("hex");
        const { data, error } = await getClient().rpc("claim_visitor_client", {
          target_user_id: req.user.id,
          target_visitor_hash: visitorHash,
        });
        if (error) throw error;
        res.json({ success: true, clientId: data });
      } catch (error) { next(error); }
    },
  };
}

export const { getMe, updateMe, claimVisitor } = createMeControllers();
