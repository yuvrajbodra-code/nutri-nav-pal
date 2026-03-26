import { AlertTriangle, Bell, CheckCircle2 } from "lucide-react";
import { useUserData } from "@/contexts/UserDataContext";
import { motion, AnimatePresence } from "framer-motion";

interface WarningItem {
  type: "danger" | "warning" | "ok";
  nutrient: string;
  message: string;
}

export function NutrientWarnings() {
  const { profile } = useUserData();

  // Simulated current intake — in a real app this comes from food logging
  const currentIntake = {
    calories: 1380,
    protein: 94,
    carbs: 185,
    fat: 52,
    sodium: 1200,
    sugar: 28,
  };

  const warnings: WarningItem[] = [];

  // Calorie check
  if (currentIntake.calories > profile.calorieTarget) {
    warnings.push({ type: "danger", nutrient: "Calories", message: `You've exceeded your daily calorie limit (${currentIntake.calories}/${profile.calorieTarget} kcal).` });
  } else if (currentIntake.calories > profile.calorieTarget * 0.9) {
    warnings.push({ type: "warning", nutrient: "Calories", message: `Approaching your calorie limit (${currentIntake.calories}/${profile.calorieTarget} kcal).` });
  }

  // Sodium check
  if (currentIntake.sodium > profile.sodiumLimit) {
    warnings.push({ type: "danger", nutrient: "Sodium", message: `Sodium intake exceeded! (${currentIntake.sodium}/${profile.sodiumLimit} mg). Risky for hypertension/CKD.` });
  } else if (currentIntake.sodium > profile.sodiumLimit * 0.85) {
    warnings.push({ type: "warning", nutrient: "Sodium", message: `Sodium intake is nearing your limit (${currentIntake.sodium}/${profile.sodiumLimit} mg).` });
  }

  // Protein check (for CKD patients — too much protein is harmful)
  const hasCKD = profile.conditions.some(c => c.name.includes("CKD"));
  if (hasCKD && currentIntake.protein > profile.proteinTarget) {
    warnings.push({ type: "danger", nutrient: "Protein", message: `Protein intake too high for CKD (${currentIntake.protein}/${profile.proteinTarget}g). Excess protein strains kidneys.` });
  }

  // Sugar check for diabetes
  const hasDiabetes = profile.conditions.some(c => c.name.includes("Diabetes"));
  if (hasDiabetes && currentIntake.sugar > 25) {
    warnings.push({ type: "danger", nutrient: "Sugar", message: `Sugar intake too high for diabetes management (${currentIntake.sugar}g). Keep below 25g.` });
  }

  // Fat check for obesity
  const hasObesity = profile.conditions.some(c => c.name.includes("Obesity"));
  if (hasObesity && currentIntake.fat > profile.fatTarget) {
    warnings.push({ type: "warning", nutrient: "Fat", message: `Fat intake exceeded your daily target (${currentIntake.fat}/${profile.fatTarget}g).` });
  }

  // Carb check for diabetes
  if (hasDiabetes && currentIntake.carbs > profile.carbTarget) {
    warnings.push({ type: "warning", nutrient: "Carbs", message: `Carb intake is over target (${currentIntake.carbs}/${profile.carbTarget}g). Monitor blood sugar.` });
  }

  if (warnings.length === 0) {
    warnings.push({ type: "ok", nutrient: "All Clear", message: "All nutrient levels are within your safe limits. Keep it up!" });
  }

  return (
    <div className="space-y-2">
      <AnimatePresence>
        {warnings.map((w, i) => (
          <motion.div
            key={w.nutrient}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className={`flex items-start gap-3 p-3 rounded-lg border ${
              w.type === "danger"
                ? "border-destructive/30 bg-destructive/5"
                : w.type === "warning"
                ? "border-warning/30 bg-warning/5"
                : "border-success/30 bg-success/5"
            }`}
          >
            {w.type === "danger" ? (
              <AlertTriangle className="h-4 w-4 text-destructive shrink-0 mt-0.5" />
            ) : w.type === "warning" ? (
              <Bell className="h-4 w-4 text-warning shrink-0 mt-0.5" />
            ) : (
              <CheckCircle2 className="h-4 w-4 text-success shrink-0 mt-0.5" />
            )}
            <div>
              <p className={`text-sm font-semibold ${
                w.type === "danger" ? "text-destructive" : w.type === "warning" ? "text-accent" : "text-success"
              }`}>
                {w.nutrient}
              </p>
              <p className="text-xs text-muted-foreground">{w.message}</p>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
