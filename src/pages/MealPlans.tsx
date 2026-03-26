import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MealCard } from "@/components/MealCard";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Filter, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";

const conditions = ["All", "Diabetes", "CKD", "Hypertension", "Obesity"];

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MealCard } from "@/components/MealCard";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { allMeals } from "@/data/meals";

const conditions = ["All", "Diabetes", "CKD", "Hypertension", "Obesity"];

export default function MealPlans() {
  const [search, setSearch] = useState("");
  const [activeCondition, setActiveCondition] = useState("All");

  const filtered = allMeals.filter((m) => {
    const matchSearch = m.name.toLowerCase().includes(search.toLowerCase());
    const matchCondition = activeCondition === "All" || m.condition === activeCondition || m.condition === "All";
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
