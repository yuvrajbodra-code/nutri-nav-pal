import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { messages, userProfile } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const profileContext = userProfile
      ? `
User Profile:
- Name: ${userProfile.name || "Unknown"}
- Medical Conditions: ${userProfile.conditions?.join(", ") || "None specified"}
- Allergies: ${userProfile.allergies?.join(", ") || "None"}
- Dietary Preferences: ${userProfile.dietaryPreferences?.join(", ") || "None"}
- Foods they like: ${userProfile.foodLikes?.join(", ") || "Not specified"}
- Foods they dislike: ${userProfile.foodDislikes?.join(", ") || "Not specified"}
- Daily Calorie Target: ${userProfile.calorieTarget || 2000} kcal
- Daily Protein Target: ${userProfile.proteinTarget || 120}g
`
      : "";

    const systemPrompt = `You are NutriAI, a friendly and knowledgeable AI nutrition assistant for patients with medical conditions. You provide personalized diet advice, meal suggestions, and nutrition guidance.

IMPORTANT RULES:
- Always consider the user's medical conditions when giving advice
- Never recommend foods the user is allergic to
- Respect their dietary preferences and food dislikes
- For CKD patients: limit potassium, phosphorus, and protein
- For diabetes patients: focus on low GI foods, limit sugar and refined carbs
- For hypertension patients: limit sodium, recommend DASH-style meals
- For obesity: focus on calorie deficit, high protein, high fiber meals
- Always recommend consulting a doctor for major dietary changes
- Be warm, encouraging, and use simple language
- Use markdown formatting for readability (bullet points, bold for important info)
- Keep responses concise but thorough

${profileContext}`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limited" }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Payment required" }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "AI gateway error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("chat error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
