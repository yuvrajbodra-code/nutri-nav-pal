import { motion } from "framer-motion";
import { NutrientProgress } from "@/components/NutrientProgress";
import {
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  LineChart, Line, Legend,
} from "recharts";

const macroBreakdown = [
  { name: "Protein", value: 94, color: "hsl(168, 60%, 38%)" },
  { name: "Carbs", value: 185, color: "hsl(36, 80%, 55%)" },
  { name: "Fat", value: 52, color: "hsl(0, 72%, 55%)" },
  { name: "Fiber", value: 22, color: "hsl(145, 60%, 42%)" },
];

const micronutrients = [
  { nutrient: "Vitamin A", actual: 85, target: 100 },
  { nutrient: "Vitamin C", actual: 120, target: 100 },
  { nutrient: "Vitamin D", actual: 60, target: 100 },
  { nutrient: "Calcium", actual: 78, target: 100 },
  { nutrient: "Iron", actual: 92, target: 100 },
  { nutrient: "Zinc", actual: 88, target: 100 },
];

const weeklyNutrients = [
  { day: "Mon", sodium: 1400, potassium: 3200, phosphorus: 800 },
  { day: "Tue", sodium: 1200, potassium: 2900, phosphorus: 750 },
  { day: "Wed", sodium: 1600, potassium: 3400, phosphorus: 900 },
  { day: "Thu", sodium: 1100, potassium: 3100, phosphorus: 780 },
  { day: "Fri", sodium: 1350, potassium: 2800, phosphorus: 820 },
  { day: "Sat", sodium: 1500, potassium: 3000, phosphorus: 860 },
  { day: "Sun", sodium: 1250, potassium: 3300, phosphorus: 770 },
];

const mealDistribution = [
  { meal: "Breakfast", calories: 380, protein: 14, carbs: 52, fat: 12 },
  { meal: "Lunch", calories: 520, protein: 42, carbs: 48, fat: 14 },
  { meal: "Snack", calories: 180, protein: 6, carbs: 22, fat: 10 },
  { meal: "Dinner", calories: 480, protein: 38, carbs: 22, fat: 18 },
];

const tooltipStyle = {
  backgroundColor: "hsl(var(--card))",
  border: "1px solid hsl(var(--border))",
  borderRadius: "8px",
  color: "hsl(var(--card-foreground))",
};

export default function NutrientTracking() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1 className="text-2xl md:text-3xl font-bold font-heading text-foreground">Nutrient Tracking</h1>
        <p className="text-muted-foreground mt-1">Detailed breakdown of your daily and weekly nutrition intake.</p>
      </motion.div>

      {/* Daily progress */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-border bg-card p-5">
        <h3 className="font-heading font-semibold text-card-foreground mb-4">Daily Nutrient Targets</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <NutrientProgress label="Calories" current={1380} target={2000} unit="kcal" color="hsl(168, 60%, 38%)" />
          <NutrientProgress label="Protein" current={94} target={120} unit="g" color="hsl(168, 60%, 38%)" />
          <NutrientProgress label="Carbohydrates" current={185} target={250} unit="g" color="hsl(36, 80%, 55%)" />
          <NutrientProgress label="Fat" current={52} target={65} unit="g" color="hsl(0, 72%, 55%)" />
          <NutrientProgress label="Sodium" current={1200} target={1500} unit="mg" color="hsl(36, 80%, 55%)" />
          <NutrientProgress label="Potassium" current={2800} target={3500} unit="mg" color="hsl(145, 60%, 42%)" />
          <NutrientProgress label="Phosphorus" current={680} target={800} unit="mg" color="hsl(200, 75%, 50%)" />
          <NutrientProgress label="Fiber" current={22} target={30} unit="g" color="hsl(145, 60%, 42%)" />
        </div>
      </motion.div>

      {/* Charts grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Macro pie */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="rounded-xl border border-border bg-card p-5">
          <h3 className="font-heading font-semibold text-card-foreground mb-4">Macronutrient Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={macroBreakdown} cx="50%" cy="50%" outerRadius={90} innerRadius={55} dataKey="value" label={({ name, value }) => `${name}: ${value}g`} labelLine={false}>
                {macroBreakdown.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={tooltipStyle} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-4 mt-2">
            {macroBreakdown.map((m) => (
              <div key={m.name} className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: m.color }} />
                <span className="text-xs text-muted-foreground">{m.name}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Micronutrient radar */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="rounded-xl border border-border bg-card p-5">
          <h3 className="font-heading font-semibold text-card-foreground mb-4">Micronutrient Coverage</h3>
          <ResponsiveContainer width="100%" height={280}>
            <RadarChart data={micronutrients}>
              <PolarGrid stroke="hsl(var(--border))" />
              <PolarAngleAxis dataKey="nutrient" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
              <PolarRadiusAxis tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} />
              <Radar name="Actual" dataKey="actual" stroke="hsl(168, 60%, 38%)" fill="hsl(168, 60%, 38%)" fillOpacity={0.2} />
              <Radar name="Target" dataKey="target" stroke="hsl(var(--muted-foreground))" fill="none" strokeDasharray="5 5" />
              <Tooltip contentStyle={tooltipStyle} />
            </RadarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Weekly minerals line chart */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="rounded-xl border border-border bg-card p-5">
          <h3 className="font-heading font-semibold text-card-foreground mb-4">Weekly Mineral Tracking</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={weeklyNutrients}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="day" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
              <YAxis tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
              <Tooltip contentStyle={tooltipStyle} />
              <Legend />
              <Line type="monotone" dataKey="sodium" stroke="hsl(36, 80%, 55%)" strokeWidth={2} dot={{ r: 3 }} />
              <Line type="monotone" dataKey="potassium" stroke="hsl(168, 60%, 38%)" strokeWidth={2} dot={{ r: 3 }} />
              <Line type="monotone" dataKey="phosphorus" stroke="hsl(200, 75%, 50%)" strokeWidth={2} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Meal calorie distribution bar chart */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="rounded-xl border border-border bg-card p-5">
          <h3 className="font-heading font-semibold text-card-foreground mb-4">Calories by Meal</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={mealDistribution}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="meal" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
              <YAxis tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="protein" stackId="a" fill="hsl(168, 60%, 38%)" radius={[0, 0, 0, 0]} />
              <Bar dataKey="carbs" stackId="a" fill="hsl(36, 80%, 55%)" radius={[0, 0, 0, 0]} />
              <Bar dataKey="fat" stackId="a" fill="hsl(0, 72%, 55%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </div>
  );
}
