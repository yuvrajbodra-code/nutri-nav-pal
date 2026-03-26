import { cn } from "@/lib/utils";

interface NutrientProgressProps {
  label: string;
  current: number;
  target: number;
  unit: string;
  color: string;
}

export function NutrientProgress({ label, current, target, unit, color }: NutrientProgressProps) {
  const pct = Math.min((current / target) * 100, 100);
  const isOver = current > target;

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-card-foreground">{label}</span>
        <span className={cn("text-sm", isOver ? "text-destructive font-medium" : "text-muted-foreground")}>
          {current} / {target} {unit}
        </span>
      </div>
      <div className="h-2 rounded-full bg-muted overflow-hidden">
        <div
          className={cn("h-full rounded-full transition-all duration-500", isOver ? "bg-destructive" : "")}
          style={{
            width: `${pct}%`,
            backgroundColor: isOver ? undefined : color,
          }}
        />
      </div>
    </div>
  );
}
