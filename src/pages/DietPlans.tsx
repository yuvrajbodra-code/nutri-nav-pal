import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, ChevronDown, ChevronUp, Flame, Clock } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useUserData } from "@/contexts/UserDataContext";
import { generateDietPlan, Meal } from "@/data/meals";

function DayCard({ day, meals, dayIndex }: { day: number; meals: Meal[]; dayIndex: number }) {
  const [expanded, setExpanded] = useState(false);
  const totalCals = meals.reduce((s, m) => s + m.calories, 0);
  const totalProtein = meals.reduce((s, m) => s + m.protein, 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: dayIndex * 0.03 }}
      className="rounded-xl border border-border bg-card overflow-hidden"
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between p-4 hover:bg-muted/30 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <span className="text-sm font-bold text-primary">{day}</span>
          </div>
          <div className="text-left">
            <p className="font-heading font-semibold text-card-foreground">Day {day}</p>
            <p className="text-xs text-muted-foreground">{meals.length} meals · {totalCals} kcal · {totalProtein}g protein</p>
          </div>
        </div>
        {expanded ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
      </button>

      {expanded && (
        <div className="border-t border-border px-4 pb-4 space-y-3 pt-3">
          {meals.map((meal, i) => (
            <div key={i} className="flex items-start justify-between p-3 rounded-lg bg-muted/30">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="outline" className="text-[10px] capitalize">{meal.type}</Badge>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="h-3 w-3" />{meal.prepTime}
                  </span>
                </div>
                <p className="text-sm font-medium text-card-foreground">{meal.name}</p>
                <div className="flex gap-2 mt-1">
                  {meal.tags.slice(0, 3).map(t => (
                    <span key={t} className="text-[10px] px-1.5 py-0.5 rounded bg-secondary text-secondary-foreground">{t}</span>
                  ))}
                </div>
              </div>
              <div className="text-right shrink-0 ml-3">
                <p className="text-sm font-semibold text-card-foreground flex items-center gap-1">
                  <Flame className="h-3 w-3 text-destructive" />{meal.calories}
                </p>
                <p className="text-[10px] text-muted-foreground">P:{meal.protein}g C:{meal.carbs}g F:{meal.fat}g</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}

export default function DietPlans() {
  const { profile } = useUserData();
  const conditions = profile.conditions.map(c => {
    if (c.name.includes("Diabetes")) return "Diabetes";
    if (c.name.includes("CKD")) return "CKD";
    if (c.name.includes("Hypertension") || c.name.includes("Heart")) return "Hypertension";
    if (c.name.includes("Obesity")) return "Obesity";
    return c.name;
  });

  const plan7 = generateDietPlan(7, conditions);
  const plan13 = generateDietPlan(13, conditions);
  const plan30 = generateDietPlan(30, conditions);

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="flex items-center gap-2 mb-1">
          <Calendar className="h-5 w-5 text-primary" />
          <h1 className="text-2xl md:text-3xl font-bold font-heading text-foreground">Diet Plans</h1>
        </div>
        <p className="text-muted-foreground">
          {conditions.length > 0
            ? `Personalized plans based on your conditions: ${conditions.join(", ")}.`
            : "Complete your health profile to get condition-specific plans."}
        </p>
      </motion.div>

      <Tabs defaultValue="7">
        <TabsList className="bg-muted">
          <TabsTrigger value="7">7-Day Plan</TabsTrigger>
          <TabsTrigger value="13">13-Day Plan</TabsTrigger>
          <TabsTrigger value="30">30-Day Plan</TabsTrigger>
        </TabsList>

        {[
          { value: "7", plan: plan7 },
          { value: "13", plan: plan13 },
          { value: "30", plan: plan30 },
        ].map(({ value, plan }) => (
          <TabsContent key={value} value={value}>
            <div className="space-y-3 mt-4">
              {plan.map((meals, i) => (
                <DayCard key={i} day={i + 1} meals={meals} dayIndex={i} />
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
