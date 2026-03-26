import { motion } from "framer-motion";
import { Clock, Flame, Utensils } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface MealCardProps {
  name: string;
  type: "breakfast" | "lunch" | "dinner" | "snack";
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  prepTime: string;
  tags: string[];
  image?: string;
}

const typeColors = {
  breakfast: "bg-accent/10 text-accent-foreground border-accent/30",
  lunch: "bg-primary/10 text-primary border-primary/30",
  dinner: "bg-info/10 text-info border-info/30",
  snack: "bg-success/10 text-success border-success/30",
};

export function MealCard({ name, type, calories, protein, carbs, fat, prepTime, tags }: MealCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl border border-border bg-card p-5 hover:shadow-md transition-all group cursor-pointer"
    >
      <div className="flex items-start justify-between mb-3">
        <Badge variant="outline" className={typeColors[type]}>
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </Badge>
        <div className="flex items-center gap-1 text-muted-foreground">
          <Clock className="h-3.5 w-3.5" />
          <span className="text-xs">{prepTime}</span>
        </div>
      </div>

      <h3 className="font-heading font-semibold text-card-foreground mb-3 group-hover:text-primary transition-colors">
        {name}
      </h3>

      <div className="grid grid-cols-4 gap-2 mb-3">
        <div className="text-center p-2 rounded-lg bg-muted/50">
          <Flame className="h-3.5 w-3.5 mx-auto mb-1 text-destructive" />
          <p className="text-xs font-semibold text-card-foreground">{calories}</p>
          <p className="text-[10px] text-muted-foreground">kcal</p>
        </div>
        <div className="text-center p-2 rounded-lg bg-muted/50">
          <p className="text-xs font-semibold text-primary">{protein}g</p>
          <p className="text-[10px] text-muted-foreground">Protein</p>
        </div>
        <div className="text-center p-2 rounded-lg bg-muted/50">
          <p className="text-xs font-semibold text-accent">{carbs}g</p>
          <p className="text-[10px] text-muted-foreground">Carbs</p>
        </div>
        <div className="text-center p-2 rounded-lg bg-muted/50">
          <p className="text-xs font-semibold text-destructive">{fat}g</p>
          <p className="text-[10px] text-muted-foreground">Fat</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {tags.map((tag) => (
          <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground">
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
