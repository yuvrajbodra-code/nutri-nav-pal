import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HeartPulse, Shield, AlertTriangle, CheckCircle2, User, Ruler, Weight, Droplets, Plus, X, Pencil, Save, ThumbsUp, ThumbsDown, Utensils } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useUserData, UserCondition } from "@/contexts/UserDataContext";
import { useToast } from "@/hooks/use-toast";

const conditionOptions = [
  "Type 2 Diabetes", "Type 1 Diabetes", "Stage 3 CKD", "Stage 4 CKD",
  "Hypertension", "Obesity", "Heart Disease", "Celiac Disease",
  "IBS", "GERD", "Anemia", "Hypothyroidism",
];

const allergyOptions = [
  "Tree Nuts", "Peanuts", "Shellfish", "Fish", "Eggs", "Milk/Dairy",
  "Wheat/Gluten", "Soy", "Sesame", "Corn", "Sulfites",
];

const preferenceOptions = [
  "Mediterranean-style", "Vegetarian", "Vegan", "Pescatarian",
  "No red meat", "Prefer whole grains", "Low-carb", "Keto",
  "Paleo", "DASH diet", "Halal", "Kosher", "Organic only",
];

const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const genders = ["Male", "Female", "Other"];

export default function HealthProfile() {
  const { profile, updateProfile } = useUserData();
  const { toast } = useToast();
  const [editing, setEditing] = useState(!profile.name);
  const [newLike, setNewLike] = useState("");
  const [newDislike, setNewDislike] = useState("");
  const [newCustomAllergy, setNewCustomAllergy] = useState("");

  const handleSave = () => {
    if (!profile.name || !profile.age || !profile.gender) {
      toast({ title: "Missing info", description: "Please fill in at least your name, age, and gender.", variant: "destructive" });
      return;
    }
    setEditing(false);
    toast({ title: "Profile saved!", description: "Your health profile has been updated." });
  };

  const toggleCondition = (name: string) => {
    const exists = profile.conditions.find((c) => c.name === name);
    if (exists) {
      updateProfile({ conditions: profile.conditions.filter((c) => c.name !== name) });
    } else {
      updateProfile({ conditions: [...profile.conditions, { name, status: "new" }] });
    }
  };

  const toggleAllergy = (name: string) => {
    if (profile.allergies.includes(name)) {
      updateProfile({ allergies: profile.allergies.filter((a) => a !== name) });
    } else {
      updateProfile({ allergies: [...profile.allergies, name] });
    }
  };

  const togglePreference = (name: string) => {
    if (profile.dietaryPreferences.includes(name)) {
      updateProfile({ dietaryPreferences: profile.dietaryPreferences.filter((p) => p !== name) });
    } else {
      updateProfile({ dietaryPreferences: [...profile.dietaryPreferences, name] });
    }
  };

  const addLike = () => {
    const item = newLike.trim();
    if (item && !profile.foodLikes.includes(item)) {
      updateProfile({ foodLikes: [...profile.foodLikes, item] });
      setNewLike("");
    }
  };

  const addDislike = () => {
    const item = newDislike.trim();
    if (item && !profile.foodDislikes.includes(item)) {
      updateProfile({ foodDislikes: [...profile.foodDislikes, item] });
      setNewDislike("");
    }
  };

  const addCustomAllergy = () => {
    const item = newCustomAllergy.trim();
    if (item && !profile.allergies.includes(item)) {
      updateProfile({ allergies: [...profile.allergies, item] });
      setNewCustomAllergy("");
    }
  };

  const conditionIcon = (name: string) => {
    if (name.includes("Diabetes")) return Shield;
    if (name.includes("CKD")) return AlertTriangle;
    if (name.includes("Hypertension") || name.includes("Heart")) return HeartPulse;
    return Shield;
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold font-heading text-foreground">Health Profile</h1>
          <p className="text-muted-foreground mt-1">
            {profile.name ? "Your medical data drives personalized nutrition recommendations." : "Set up your profile to get personalized meal plans."}
          </p>
        </div>
        <Button
          variant={editing ? "default" : "outline"}
          size="sm"
          onClick={editing ? handleSave : () => setEditing(true)}
          className="gap-2"
        >
          {editing ? <><Save className="h-4 w-4" /> Save Profile</> : <><Pencil className="h-4 w-4" /> Edit</>}
        </Button>
      </motion.div>

      {/* Personal Info */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-border bg-card p-5">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-12 w-12 rounded-full gradient-primary flex items-center justify-center">
            <User className="h-6 w-6 text-primary-foreground" />
          </div>
          <h2 className="font-heading font-bold text-lg text-card-foreground">Personal Information</h2>
        </div>

        {editing ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="name">Full Name *</Label>
              <Input id="name" value={profile.name} onChange={(e) => updateProfile({ name: e.target.value })} placeholder="Enter your name" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="age">Age *</Label>
              <Input id="age" type="number" value={profile.age || ""} onChange={(e) => updateProfile({ age: parseInt(e.target.value) || 0 })} placeholder="e.g. 45" />
            </div>
            <div className="space-y-1.5">
              <Label>Gender *</Label>
              <Select value={profile.gender} onValueChange={(v) => updateProfile({ gender: v })}>
                <SelectTrigger><SelectValue placeholder="Select gender" /></SelectTrigger>
                <SelectContent>
                  {genders.map((g) => <SelectItem key={g} value={g}>{g}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="height">Height</Label>
              <Input id="height" value={profile.height} onChange={(e) => updateProfile({ height: e.target.value })} placeholder={'e.g. 5\'6" or 168 cm'} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="weight">Weight</Label>
              <Input id="weight" value={profile.weight} onChange={(e) => updateProfile({ weight: e.target.value })} placeholder="e.g. 172 lbs or 78 kg" />
            </div>
            <div className="space-y-1.5">
              <Label>Blood Type</Label>
              <Select value={profile.bloodType} onValueChange={(v) => updateProfile({ bloodType: v })}>
                <SelectTrigger><SelectValue placeholder="Select blood type" /></SelectTrigger>
                <SelectContent>
                  {bloodTypes.map((b) => <SelectItem key={b} value={b}>{b}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { icon: User, label: "Name", value: profile.name || "Not set" },
              { icon: Ruler, label: "Height", value: profile.height || "Not set" },
              { icon: Weight, label: "Weight", value: profile.weight || "Not set" },
              { icon: Droplets, label: "Blood Type", value: profile.bloodType || "Not set" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2 p-3 rounded-lg bg-muted/50">
                <item.icon className="h-4 w-4 text-primary shrink-0" />
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{item.label}</p>
                  <p className="text-sm font-semibold text-card-foreground">{item.value}</p>
                </div>
              </div>
            ))}
            <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/50">
              <User className="h-4 w-4 text-primary shrink-0" />
              <div>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Age / Gender</p>
                <p className="text-sm font-semibold text-card-foreground">{profile.age || "?"} · {profile.gender || "Not set"}</p>
              </div>
            </div>
          </div>
        )}
      </motion.div>

      {/* Nutrition Targets */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="rounded-xl border border-border bg-card p-5">
        <h3 className="font-heading font-semibold text-card-foreground mb-4">Daily Nutrition Targets</h3>
        {editing ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { key: "calorieTarget" as const, label: "Calories (kcal)", val: profile.calorieTarget },
              { key: "proteinTarget" as const, label: "Protein (g)", val: profile.proteinTarget },
              { key: "carbTarget" as const, label: "Carbs (g)", val: profile.carbTarget },
              { key: "fatTarget" as const, label: "Fat (g)", val: profile.fatTarget },
              { key: "sodiumLimit" as const, label: "Sodium (mg)", val: profile.sodiumLimit },
              { key: "waterGoal" as const, label: "Water (glasses)", val: profile.waterGoal },
            ].map((t) => (
              <div key={t.key} className="space-y-1.5">
                <Label className="text-xs">{t.label}</Label>
                <Input type="number" value={t.val} onChange={(e) => updateProfile({ [t.key]: parseInt(e.target.value) || 0 })} />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
            {[
              { label: "Calories", value: `${profile.calorieTarget} kcal` },
              { label: "Protein", value: `${profile.proteinTarget}g` },
              { label: "Carbs", value: `${profile.carbTarget}g` },
              { label: "Fat", value: `${profile.fatTarget}g` },
              { label: "Sodium", value: `${profile.sodiumLimit}mg` },
              { label: "Water", value: `${profile.waterGoal} glasses` },
            ].map((t) => (
              <div key={t.label} className="text-center p-3 rounded-lg bg-muted/50">
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{t.label}</p>
                <p className="text-sm font-bold text-card-foreground">{t.value}</p>
              </div>
            ))}
          </div>
        )}
      </motion.div>

      {/* Medical Conditions */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <Card>
          <CardHeader>
            <CardTitle className="font-heading flex items-center gap-2">
              <HeartPulse className="h-5 w-5 text-primary" /> Medical Conditions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {conditionOptions.map((c) => {
                const active = profile.conditions.some((pc) => pc.name === c);
                return (
                  <Badge
                    key={c}
                    variant={active ? "default" : "outline"}
                    className={`cursor-pointer transition-all ${active ? "bg-primary text-primary-foreground" : "hover:bg-secondary"}`}
                    onClick={editing ? () => toggleCondition(c) : undefined}
                  >
                    {active && <CheckCircle2 className="h-3 w-3 mr-1" />}
                    {c}
                  </Badge>
                );
              })}
            </div>
            {profile.conditions.length > 0 && (
              <p className="text-xs text-muted-foreground mt-3">
                {profile.conditions.length} condition{profile.conditions.length > 1 ? "s" : ""} selected — meal plans will be adjusted accordingly.
              </p>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Allergies */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
        <Card>
          <CardHeader>
            <CardTitle className="font-heading flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-destructive" /> Allergies & Intolerances
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex flex-wrap gap-2">
              {allergyOptions.map((a) => {
                const active = profile.allergies.includes(a);
                return (
                  <Badge
                    key={a}
                    variant={active ? "destructive" : "outline"}
                    className={`cursor-pointer transition-all ${!active ? "hover:bg-secondary" : ""}`}
                    onClick={editing ? () => toggleAllergy(a) : undefined}
                  >
                    {active && <X className="h-3 w-3 mr-1" />}
                    {a}
                  </Badge>
                );
              })}
            </div>
            {editing && (
              <div className="flex gap-2 max-w-sm">
                <Input placeholder="Add custom allergy..." value={newCustomAllergy} onChange={(e) => setNewCustomAllergy(e.target.value)} onKeyDown={(e) => e.key === "Enter" && addCustomAllergy()} />
                <Button size="sm" variant="outline" onClick={addCustomAllergy}><Plus className="h-4 w-4" /></Button>
              </div>
            )}
            {/* Show custom ones */}
            {profile.allergies.filter((a) => !allergyOptions.includes(a)).length > 0 && (
              <div className="flex flex-wrap gap-2 pt-1">
                {profile.allergies.filter((a) => !allergyOptions.includes(a)).map((a) => (
                  <Badge key={a} variant="destructive" className="cursor-pointer" onClick={editing ? () => toggleAllergy(a) : undefined}>
                    {editing && <X className="h-3 w-3 mr-1" />}{a}
                  </Badge>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Dietary Preferences */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <Card>
          <CardHeader>
            <CardTitle className="font-heading flex items-center gap-2">
              <Utensils className="h-5 w-5 text-primary" /> Dietary Preferences
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {preferenceOptions.map((p) => {
                const active = profile.dietaryPreferences.includes(p);
                return (
                  <Badge
                    key={p}
                    variant={active ? "secondary" : "outline"}
                    className={`cursor-pointer transition-all ${active ? "ring-2 ring-primary/30" : "hover:bg-secondary"}`}
                    onClick={editing ? () => togglePreference(p) : undefined}
                  >
                    {active && <CheckCircle2 className="h-3 w-3 mr-1" />}
                    {p}
                  </Badge>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Food Likes & Dislikes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="font-heading flex items-center gap-2 text-base">
                <ThumbsUp className="h-5 w-5 text-success" /> Foods I Like
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex flex-wrap gap-2">
                <AnimatePresence>
                  {profile.foodLikes.map((f) => (
                    <motion.div key={f} initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                      <Badge variant="outline" className="gap-1 border-success/30 text-success">
                        {f}
                        {editing && (
                          <X className="h-3 w-3 cursor-pointer ml-1" onClick={() => updateProfile({ foodLikes: profile.foodLikes.filter((l) => l !== f) })} />
                        )}
                      </Badge>
                    </motion.div>
                  ))}
                </AnimatePresence>
                {profile.foodLikes.length === 0 && <p className="text-sm text-muted-foreground">No favorites added yet.</p>}
              </div>
              {editing && (
                <div className="flex gap-2">
                  <Input placeholder="e.g. Salmon, Quinoa, Avocado..." value={newLike} onChange={(e) => setNewLike(e.target.value)} onKeyDown={(e) => e.key === "Enter" && addLike()} />
                  <Button size="sm" variant="outline" onClick={addLike}><Plus className="h-4 w-4" /></Button>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="font-heading flex items-center gap-2 text-base">
                <ThumbsDown className="h-5 w-5 text-destructive" /> Foods I Dislike
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex flex-wrap gap-2">
                <AnimatePresence>
                  {profile.foodDislikes.map((f) => (
                    <motion.div key={f} initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                      <Badge variant="outline" className="gap-1 border-destructive/30 text-destructive">
                        {f}
                        {editing && (
                          <X className="h-3 w-3 cursor-pointer ml-1" onClick={() => updateProfile({ foodDislikes: profile.foodDislikes.filter((d) => d !== f) })} />
                        )}
                      </Badge>
                    </motion.div>
                  ))}
                </AnimatePresence>
                {profile.foodDislikes.length === 0 && <p className="text-sm text-muted-foreground">No dislikes added yet.</p>}
              </div>
              {editing && (
                <div className="flex gap-2">
                  <Input placeholder="e.g. Liver, Tofu, Cilantro..." value={newDislike} onChange={(e) => setNewDislike(e.target.value)} onKeyDown={(e) => e.key === "Enter" && addDislike()} />
                  <Button size="sm" variant="outline" onClick={addDislike}><Plus className="h-4 w-4" /></Button>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
