import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MealCard } from "@/components/MealCard";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Filter, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";

const conditions = ["All", "Diabetes", "CKD", "Hypertension", "Obesity"];

const meals = [
  { name: "Greek Yogurt Parfait", type: "breakfast" as const, calories: 290, protein: 18, carbs: 38, fat: 8, prepTime: "5 min", tags: ["Low GI", "Probiotic", "Diabetic Friendly"], condition: "Diabetes" },
  { name: "Egg White Veggie Omelette", type: "breakfast" as const, calories: 220, protein: 24, carbs: 8, fat: 10, prepTime: "12 min", tags: ["High Protein", "Low Carb", "Heart Healthy"], condition: "Hypertension" },
  { name: "Lentil & Spinach Soup", type: "lunch" as const, calories: 340, protein: 22, carbs: 42, fat: 6, prepTime: "30 min", tags: ["High Fiber", "Low Sodium", "CKD Safe"], condition: "CKD" },
  { name: "Turkey Lettuce Wraps", type: "lunch" as const, calories: 310, protein: 32, carbs: 12, fat: 14, prepTime: "15 min", tags: ["Low Carb", "High Protein", "Weight Loss"], condition: "Obesity" },
  { name: "Herb-Crusted Cod with Asparagus", type: "dinner" as const, calories: 380, protein: 36, carbs: 14, fat: 18, prepTime: "25 min", tags: ["Omega-3", "Low Sodium", "CKD Safe"], condition: "CKD" },
  { name: "Chicken Stir-Fry with Brown Rice", type: "dinner" as const, calories: 450, protein: 38, carbs: 48, fat: 10, prepTime: "20 min", tags: ["Balanced", "Low GI", "Diabetic Friendly"], condition: "Diabetes" },
  { name: "Zucchini Noodles with Marinara", type: "dinner" as const, calories: 280, protein: 12, carbs: 22, fat: 16, prepTime: "18 min", tags: ["Low Calorie", "Low Carb", "Weight Loss"], condition: "Obesity" },
  { name: "DASH Diet Salmon Bowl", type: "lunch" as const, calories: 420, protein: 34, carbs: 38, fat: 14, prepTime: "22 min", tags: ["DASH", "Heart Healthy", "Anti-Inflammatory"], condition: "Hypertension" },
  { name: "Almond Butter Apple Slices", type: "snack" as const, calories: 180, protein: 6, carbs: 22, fat: 10, prepTime: "3 min", tags: ["Low GI", "Fiber Rich", "Diabetic Friendly"], condition: "Diabetes" },
  { name: "Cucumber Hummus Bites", type: "snack" as const, calories: 120, protein: 4, carbs: 14, fat: 6, prepTime: "5 min", tags: ["Low Sodium", "Low Calorie", "Heart Healthy"], condition: "Hypertension" },
];

export default function MealPlans() {
  const [search, setSearch] = useState("");
  const [activeCondition, setActiveCondition] = useState("All");

  const filtered = meals.filter((m) => {
    const matchSearch = m.name.toLowerCase().includes(search.toLowerCase());
    const matchCondition = activeCondition === "All" || m.condition === activeCondition;
    return matchSearch && matchCondition;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="flex items-center gap-2 mb-1">
          <Sparkles className="h-5 w-5 text-primary" />
          <h1 className="text-2xl md:text-3xl font-bold font-heading text-foreground">AI Meal Plans</h1>
        </div>
        <p className="text-muted-foreground">Personalized meal recommendations tailored to your health conditions.</p>
      </motion.div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search meals..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {conditions.map((c) => (
            <Badge
              key={c}
              variant={activeCondition === c ? "default" : "outline"}
              className={activeCondition === c ? "bg-primary text-primary-foreground cursor-pointer" : "cursor-pointer hover:bg-secondary"}
              onClick={() => setActiveCondition(c)}
            >
              {c}
            </Badge>
          ))}
        </div>
      </div>

      {/* Meal type tabs */}
      <Tabs defaultValue="all">
        <TabsList className="bg-muted">
          <TabsTrigger value="all">All Meals</TabsTrigger>
          <TabsTrigger value="breakfast">Breakfast</TabsTrigger>
          <TabsTrigger value="lunch">Lunch</TabsTrigger>
          <TabsTrigger value="dinner">Dinner</TabsTrigger>
          <TabsTrigger value="snack">Snacks</TabsTrigger>
        </TabsList>

        {["all", "breakfast", "lunch", "dinner", "snack"].map((tab) => (
          <TabsContent key={tab} value={tab}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
              <AnimatePresence>
                {filtered
                  .filter((m) => tab === "all" || m.type === tab)
                  .map((meal) => (
                    <MealCard key={meal.name} {...meal} />
                  ))}
              </AnimatePresence>
            </div>
            {filtered.filter((m) => tab === "all" || m.type === tab).length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                <p>No meals found matching your criteria.</p>
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
