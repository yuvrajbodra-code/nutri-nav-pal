import { motion } from "framer-motion";
import { HeartPulse, Shield, AlertTriangle, CheckCircle2, User, Ruler, Weight, Droplets } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";

const conditions = [
  { name: "Type 2 Diabetes", status: "managed", icon: Shield, restrictions: ["Low glycemic index foods", "Limited refined sugars", "Controlled carbohydrate portions"] },
  { name: "Stage 3 CKD", status: "monitoring", icon: AlertTriangle, restrictions: ["Low sodium (<1500mg)", "Moderate protein", "Limited potassium & phosphorus"] },
  { name: "Hypertension", status: "managed", icon: HeartPulse, restrictions: ["DASH diet compliant", "Low sodium", "Rich in potassium-safe foods"] },
];

const allergies = ["Tree Nuts", "Shellfish"];
const preferences = ["Mediterranean-style", "No red meat", "Prefer whole grains"];

const vitals = [
  { label: "Blood Glucose (Fasting)", value: "112 mg/dL", target: "80-130 mg/dL", pct: 72, status: "normal" },
  { label: "Blood Pressure", value: "128/82 mmHg", target: "<130/80 mmHg", pct: 85, status: "borderline" },
  { label: "eGFR", value: "48 mL/min", target: ">60 mL/min", pct: 60, status: "low" },
  { label: "HbA1c", value: "6.8%", target: "<7%", pct: 90, status: "normal" },
];

export default function HealthProfile() {
  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1 className="text-2xl md:text-3xl font-bold font-heading text-foreground">Health Profile</h1>
        <p className="text-muted-foreground mt-1">Your medical data drives personalized nutrition recommendations.</p>
      </motion.div>

      {/* Patient info */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-border bg-card p-5">
        <div className="flex items-center gap-4 mb-4">
          <div className="h-14 w-14 rounded-full gradient-primary flex items-center justify-center">
            <User className="h-7 w-7 text-primary-foreground" />
          </div>
          <div>
            <h2 className="font-heading font-bold text-lg text-card-foreground">Sarah Mitchell</h2>
            <p className="text-sm text-muted-foreground">Age 58 · Female · Patient ID: NTR-2847</p>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { icon: Ruler, label: "Height", value: "5'6\" (168 cm)" },
            { icon: Weight, label: "Weight", value: "172 lbs (78 kg)" },
            { icon: User, label: "BMI", value: "27.8" },
            { icon: Droplets, label: "Blood Type", value: "A+" },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-2 p-3 rounded-lg bg-muted/50">
              <item.icon className="h-4 w-4 text-primary shrink-0" />
              <div>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{item.label}</p>
                <p className="text-sm font-semibold text-card-foreground">{item.value}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Conditions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {conditions.map((c, i) => (
          <motion.div key={c.name} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <c.icon className="h-5 w-5 text-primary" />
                  <Badge variant="outline" className={c.status === "managed" ? "border-success/30 text-success" : "border-warning/30 text-warning"}>
                    {c.status === "managed" ? <CheckCircle2 className="h-3 w-3 mr-1" /> : <AlertTriangle className="h-3 w-3 mr-1" />}
                    {c.status.charAt(0).toUpperCase() + c.status.slice(1)}
                  </Badge>
                </div>
                <CardTitle className="text-base font-heading">{c.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground mb-2 font-medium uppercase tracking-wider">Dietary Restrictions</p>
                <ul className="space-y-1.5">
                  {c.restrictions.map((r) => (
                    <li key={r} className="text-sm text-card-foreground flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                      {r}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Vitals */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="rounded-xl border border-border bg-card p-5">
        <h3 className="font-heading font-semibold text-card-foreground mb-4">Latest Lab Results</h3>
        <div className="space-y-4">
          {vitals.map((v) => (
            <div key={v.label} className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-card-foreground">{v.label}</span>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold text-card-foreground">{v.value}</span>
                  <span className="text-xs text-muted-foreground">Target: {v.target}</span>
                </div>
              </div>
              <Progress value={v.pct} className="h-2" />
            </div>
          ))}
        </div>
      </motion.div>

      {/* Allergies & preferences */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="rounded-xl border border-border bg-card p-5">
          <h3 className="font-heading font-semibold text-card-foreground mb-3">Allergies & Intolerances</h3>
          <div className="flex flex-wrap gap-2">
            {allergies.map((a) => (
              <Badge key={a} variant="destructive">{a}</Badge>
            ))}
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="rounded-xl border border-border bg-card p-5">
          <h3 className="font-heading font-semibold text-card-foreground mb-3">Dietary Preferences</h3>
          <div className="flex flex-wrap gap-2">
            {preferences.map((p) => (
              <Badge key={p} variant="secondary">{p}</Badge>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
