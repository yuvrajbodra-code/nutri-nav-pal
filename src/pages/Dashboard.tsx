import { motion } from "framer-motion";
import { Activity, Droplets, Flame, Target, TrendingUp, Apple } from "lucide-react";
import { StatCard } from "@/components/StatCard";
import { NutrientProgress } from "@/components/NutrientProgress";
import { MealCard } from "@/components/MealCard";
import { NutrientWarnings } from "@/components/NutrientWarnings";
import { useUserData } from "@/contexts/UserDataContext";
import { useNavigate } from "react-router-dom";
import {
  PieChart, Pie, Cell, ResponsiveContainer,
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
} from "recharts";

const macroData = [
  { name: "Protein", value: 35, color: "hsl(168, 60%, 38%)" },
  { name: "Carbs", value: 45, color: "hsl(36, 80%, 55%)" },
  { name: "Fat", value: 20, color: "hsl(0, 72%, 55%)" },
];

const weeklyCalories = [
  { day: "Mon", calories: 1850, target: 2000 },
  { day: "Tue", calories: 1920, target: 2000 },
  { day: "Wed", calories: 2050, target: 2000 },
  { day: "Thu", calories: 1780, target: 2000 },
  { day: "Fri", calories: 1950, target: 2000 },
  { day: "Sat", calories: 2100, target: 2000 },
  { day: "Sun", calories: 1890, target: 2000 },
];

const todayMeals = [
  { name: "Oatmeal with Berries & Walnuts", type: "breakfast" as const, calories: 380, protein: 14, carbs: 52, fat: 12, prepTime: "10 min", tags: ["High Fiber", "Low GI", "Heart Healthy"] },
  { name: "Grilled Chicken Quinoa Bowl", type: "lunch" as const, calories: 520, protein: 42, carbs: 48, fat: 14, prepTime: "25 min", tags: ["High Protein", "Low Sodium", "CKD Safe"] },
  { name: "Baked Salmon with Steamed Veggies", type: "dinner" as const, calories: 480, protein: 38, carbs: 22, fat: 18, prepTime: "30 min", tags: ["Omega-3", "Anti-Inflammatory", "Diabetic Friendly"] },
];

export default function Dashboard() {
  const { profile, isProfileComplete } = useUserData();
  const navigate = useNavigate();
  const firstName = profile.name ? profile.name.split(" ")[0] : "there";

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1 className="text-2xl md:text-3xl font-bold font-heading text-foreground">
          Good Morning, {firstName} 👋
        </h1>
        <p className="text-muted-foreground mt-1">
          {isProfileComplete
            ? "Here's your personalized nutrition overview for today."
            : <span>Complete your <button onClick={() => navigate("/health-profile")} className="text-primary underline underline-offset-2">health profile</button> to get personalized recommendations.</span>
          }
        </p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Calories Today" value="1,380" subtitle={`of ${profile.calorieTarget.toLocaleString()} kcal`} icon={Flame} variant="primary" trend={{ value: -5, label: "vs yesterday" }} />
        <StatCard title="Water Intake" value={`6 / ${profile.waterGoal}`} subtitle="glasses" icon={Droplets} variant="accent" />
        <StatCard title="Protein Goal" value="94g" subtitle={`of ${profile.proteinTarget}g target`} icon={Target} variant="success" trend={{ value: 12, label: "this week" }} />
        <StatCard title="Health Score" value="87" subtitle="out of 100" icon={Activity} variant="warning" trend={{ value: 3, label: "improvement" }} />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Weekly calories */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2 rounded-xl border border-border bg-card p-5"
        >
          <h3 className="font-heading font-semibold text-card-foreground mb-4">Weekly Calorie Intake</h3>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={weeklyCalories}>
              <defs>
                <linearGradient id="calorieGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(168, 60%, 38%)" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="hsl(168, 60%, 38%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="day" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
              <YAxis tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  color: "hsl(var(--card-foreground))",
                }}
              />
              <Area type="monotone" dataKey="target" stroke="hsl(var(--muted-foreground))" strokeDasharray="5 5" fill="none" />
              <Area type="monotone" dataKey="calories" stroke="hsl(168, 60%, 38%)" fill="url(#calorieGrad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Macro pie */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-xl border border-border bg-card p-5"
        >
          <h3 className="font-heading font-semibold text-card-foreground mb-4">Macro Split</h3>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={macroData} cx="50%" cy="50%" innerRadius={50} outerRadius={75} dataKey="value" stroke="none">
                {macroData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  color: "hsl(var(--card-foreground))",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-4 mt-2">
            {macroData.map((m) => (
              <div key={m.name} className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: m.color }} />
                <span className="text-xs text-muted-foreground">{m.name} {m.value}%</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Warnings & Notifications */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="rounded-xl border border-border bg-card p-5"
      >
        <h3 className="font-heading font-semibold text-card-foreground mb-4">⚠️ Health Alerts & Notifications</h3>
        <NutrientWarnings />
      </motion.div>

      {/* Nutrient tracking */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="rounded-xl border border-border bg-card p-5"
      >
        <h3 className="font-heading font-semibold text-card-foreground mb-4">Daily Nutrient Progress</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <NutrientProgress label="Sodium" current={1200} target={1500} unit="mg" color="hsl(36, 80%, 55%)" />
          <NutrientProgress label="Potassium" current={2800} target={3500} unit="mg" color="hsl(168, 60%, 38%)" />
          <NutrientProgress label="Fiber" current={22} target={30} unit="g" color="hsl(145, 60%, 42%)" />
          <NutrientProgress label="Sugar" current={28} target={25} unit="g" color="hsl(0, 72%, 55%)" />
        </div>
      </motion.div>

      {/* Today's Meals */}
      <div>
        <h3 className="font-heading font-semibold text-foreground mb-4">Today's Meal Plan</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {todayMeals.map((meal) => (
            <MealCard key={meal.name} {...meal} />
          ))}
        </div>
      </div>
    </div>
  );
}
