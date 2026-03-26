export interface Meal {
  name: string;
  type: "breakfast" | "lunch" | "dinner" | "snack";
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  prepTime: string;
  tags: string[];
  condition: string;
  ingredients?: string[];
}

export const allMeals: Meal[] = [
  // === BREAKFAST ===
  { name: "Greek Yogurt Parfait", type: "breakfast", calories: 290, protein: 18, carbs: 38, fat: 8, prepTime: "5 min", tags: ["Low GI", "Probiotic", "Diabetic Friendly"], condition: "Diabetes" },
  { name: "Egg White Veggie Omelette", type: "breakfast", calories: 220, protein: 24, carbs: 8, fat: 10, prepTime: "12 min", tags: ["High Protein", "Low Carb", "Heart Healthy"], condition: "Hypertension" },
  { name: "Oatmeal with Berries & Walnuts", type: "breakfast", calories: 380, protein: 14, carbs: 52, fat: 12, prepTime: "10 min", tags: ["High Fiber", "Low GI", "Heart Healthy"], condition: "Diabetes" },
  { name: "Avocado Toast with Poached Egg", type: "breakfast", calories: 340, protein: 16, carbs: 28, fat: 18, prepTime: "8 min", tags: ["Healthy Fats", "High Protein"], condition: "All" },
  { name: "Chia Seed Pudding", type: "breakfast", calories: 260, protein: 10, carbs: 30, fat: 12, prepTime: "5 min", tags: ["Omega-3", "Low GI", "Diabetic Friendly"], condition: "Diabetes" },
  { name: "Whole Wheat Banana Pancakes", type: "breakfast", calories: 310, protein: 12, carbs: 44, fat: 10, prepTime: "15 min", tags: ["Whole Grain", "Low Sodium"], condition: "Hypertension" },
  { name: "Spinach & Mushroom Scramble", type: "breakfast", calories: 200, protein: 18, carbs: 6, fat: 12, prepTime: "10 min", tags: ["Low Carb", "High Protein", "CKD Safe"], condition: "CKD" },
  { name: "Smoothie Bowl (Berry Blend)", type: "breakfast", calories: 280, protein: 12, carbs: 42, fat: 8, prepTime: "7 min", tags: ["Antioxidant", "Low Fat", "Weight Loss"], condition: "Obesity" },
  { name: "Cottage Cheese with Pineapple", type: "breakfast", calories: 230, protein: 20, carbs: 24, fat: 6, prepTime: "3 min", tags: ["High Protein", "Low Fat", "CKD Safe"], condition: "CKD" },
  { name: "Veggie Breakfast Burrito", type: "breakfast", calories: 350, protein: 16, carbs: 38, fat: 14, prepTime: "12 min", tags: ["Balanced", "Vegetarian"], condition: "All" },
  { name: "Steel Cut Oats with Cinnamon", type: "breakfast", calories: 310, protein: 10, carbs: 54, fat: 6, prepTime: "20 min", tags: ["Low GI", "High Fiber", "Diabetic Friendly"], condition: "Diabetes" },
  { name: "Smoked Salmon on Rye Toast", type: "breakfast", calories: 290, protein: 22, carbs: 26, fat: 10, prepTime: "5 min", tags: ["Omega-3", "High Protein", "Heart Healthy"], condition: "Hypertension" },
  { name: "Tofu Scramble with Turmeric", type: "breakfast", calories: 240, protein: 18, carbs: 12, fat: 14, prepTime: "12 min", tags: ["Vegan", "Anti-Inflammatory"], condition: "All" },
  { name: "Low-Fat Granola with Almond Milk", type: "breakfast", calories: 250, protein: 8, carbs: 40, fat: 8, prepTime: "3 min", tags: ["Low Fat", "Weight Loss"], condition: "Obesity" },
  { name: "Overnight Oats with Flaxseed", type: "breakfast", calories: 300, protein: 12, carbs: 46, fat: 8, prepTime: "5 min", tags: ["High Fiber", "Omega-3", "Diabetic Friendly"], condition: "Diabetes" },

  // === LUNCH ===
  { name: "Lentil & Spinach Soup", type: "lunch", calories: 340, protein: 22, carbs: 42, fat: 6, prepTime: "30 min", tags: ["High Fiber", "Low Sodium", "CKD Safe"], condition: "CKD" },
  { name: "Turkey Lettuce Wraps", type: "lunch", calories: 310, protein: 32, carbs: 12, fat: 14, prepTime: "15 min", tags: ["Low Carb", "High Protein", "Weight Loss"], condition: "Obesity" },
  { name: "DASH Diet Salmon Bowl", type: "lunch", calories: 420, protein: 34, carbs: 38, fat: 14, prepTime: "22 min", tags: ["DASH", "Heart Healthy", "Anti-Inflammatory"], condition: "Hypertension" },
  { name: "Grilled Chicken Quinoa Bowl", type: "lunch", calories: 520, protein: 42, carbs: 48, fat: 14, prepTime: "25 min", tags: ["High Protein", "Low Sodium", "CKD Safe"], condition: "CKD" },
  { name: "Mediterranean Chickpea Salad", type: "lunch", calories: 380, protein: 16, carbs: 46, fat: 14, prepTime: "10 min", tags: ["High Fiber", "Heart Healthy", "Vegetarian"], condition: "Hypertension" },
  { name: "Tuna Salad Stuffed Peppers", type: "lunch", calories: 300, protein: 28, carbs: 14, fat: 16, prepTime: "12 min", tags: ["High Protein", "Low Carb", "Weight Loss"], condition: "Obesity" },
  { name: "Black Bean & Sweet Potato Bowl", type: "lunch", calories: 410, protein: 18, carbs: 62, fat: 8, prepTime: "20 min", tags: ["High Fiber", "Vegan", "Low GI"], condition: "Diabetes" },
  { name: "Shrimp & Avocado Salad", type: "lunch", calories: 350, protein: 30, carbs: 12, fat: 20, prepTime: "15 min", tags: ["Low Carb", "Omega-3", "Heart Healthy"], condition: "Hypertension" },
  { name: "Cauliflower Rice Chicken Bowl", type: "lunch", calories: 320, protein: 34, carbs: 14, fat: 14, prepTime: "18 min", tags: ["Low Carb", "High Protein", "Weight Loss"], condition: "Obesity" },
  { name: "Minestrone Soup (Low Sodium)", type: "lunch", calories: 280, protein: 12, carbs: 38, fat: 8, prepTime: "25 min", tags: ["Low Sodium", "High Fiber", "CKD Safe"], condition: "CKD" },
  { name: "Grilled Veggie Wrap", type: "lunch", calories: 360, protein: 14, carbs: 42, fat: 16, prepTime: "15 min", tags: ["Vegetarian", "Balanced"], condition: "All" },
  { name: "Egg Salad on Whole Wheat", type: "lunch", calories: 340, protein: 20, carbs: 30, fat: 16, prepTime: "10 min", tags: ["High Protein", "Balanced"], condition: "All" },
  { name: "Thai Peanut Chicken Salad", type: "lunch", calories: 400, protein: 32, carbs: 28, fat: 18, prepTime: "18 min", tags: ["High Protein", "Balanced"], condition: "All" },
  { name: "Edamame & Brown Rice Bowl", type: "lunch", calories: 380, protein: 20, carbs: 52, fat: 10, prepTime: "15 min", tags: ["Vegan", "Low GI", "Diabetic Friendly"], condition: "Diabetes" },
  { name: "Sardine & White Bean Salad", type: "lunch", calories: 330, protein: 26, carbs: 28, fat: 12, prepTime: "8 min", tags: ["Omega-3", "High Protein", "Heart Healthy"], condition: "Hypertension" },
  { name: "Stuffed Bell Peppers (Ground Turkey)", type: "lunch", calories: 370, protein: 28, carbs: 30, fat: 14, prepTime: "30 min", tags: ["High Protein", "Low Fat", "Balanced"], condition: "All" },
  { name: "Waldorf Chicken Salad", type: "lunch", calories: 340, protein: 26, carbs: 22, fat: 16, prepTime: "12 min", tags: ["Low GI", "Balanced"], condition: "All" },

  // === DINNER ===
  { name: "Herb-Crusted Cod with Asparagus", type: "dinner", calories: 380, protein: 36, carbs: 14, fat: 18, prepTime: "25 min", tags: ["Omega-3", "Low Sodium", "CKD Safe"], condition: "CKD" },
  { name: "Chicken Stir-Fry with Brown Rice", type: "dinner", calories: 450, protein: 38, carbs: 48, fat: 10, prepTime: "20 min", tags: ["Balanced", "Low GI", "Diabetic Friendly"], condition: "Diabetes" },
  { name: "Zucchini Noodles with Marinara", type: "dinner", calories: 280, protein: 12, carbs: 22, fat: 16, prepTime: "18 min", tags: ["Low Calorie", "Low Carb", "Weight Loss"], condition: "Obesity" },
  { name: "Baked Salmon with Steamed Veggies", type: "dinner", calories: 480, protein: 38, carbs: 22, fat: 18, prepTime: "30 min", tags: ["Omega-3", "Anti-Inflammatory", "Diabetic Friendly"], condition: "Diabetes" },
  { name: "Grilled Turkey Burger (Lettuce Bun)", type: "dinner", calories: 350, protein: 36, carbs: 10, fat: 18, prepTime: "20 min", tags: ["Low Carb", "High Protein", "Weight Loss"], condition: "Obesity" },
  { name: "Lemon Garlic Tilapia", type: "dinner", calories: 320, protein: 34, carbs: 12, fat: 14, prepTime: "22 min", tags: ["Low Sodium", "CKD Safe", "Low Fat"], condition: "CKD" },
  { name: "Vegetable Curry (Low Sodium)", type: "dinner", calories: 380, protein: 14, carbs: 48, fat: 14, prepTime: "30 min", tags: ["Low Sodium", "Vegetarian", "Anti-Inflammatory"], condition: "Hypertension" },
  { name: "Lean Beef & Broccoli Stir-Fry", type: "dinner", calories: 420, protein: 38, carbs: 24, fat: 18, prepTime: "18 min", tags: ["High Protein", "Iron Rich", "Balanced"], condition: "All" },
  { name: "Stuffed Portobello Mushrooms", type: "dinner", calories: 300, protein: 16, carbs: 22, fat: 16, prepTime: "25 min", tags: ["Low Calorie", "Vegetarian", "Weight Loss"], condition: "Obesity" },
  { name: "Chicken Fajita Bowl", type: "dinner", calories: 440, protein: 36, carbs: 38, fat: 14, prepTime: "20 min", tags: ["High Protein", "Balanced"], condition: "All" },
  { name: "Seared Tuna with Sesame Seeds", type: "dinner", calories: 360, protein: 40, carbs: 10, fat: 16, prepTime: "15 min", tags: ["Omega-3", "High Protein", "Heart Healthy"], condition: "Hypertension" },
  { name: "Eggplant Parmesan (Light)", type: "dinner", calories: 340, protein: 18, carbs: 30, fat: 16, prepTime: "30 min", tags: ["Vegetarian", "Low Sodium"], condition: "Hypertension" },
  { name: "Shrimp Scampi with Zoodles", type: "dinner", calories: 310, protein: 30, carbs: 12, fat: 16, prepTime: "18 min", tags: ["Low Carb", "Low Calorie", "Weight Loss"], condition: "Obesity" },
  { name: "Roasted Chicken Thighs with Squash", type: "dinner", calories: 460, protein: 36, carbs: 28, fat: 22, prepTime: "35 min", tags: ["Balanced", "Whole Food"], condition: "All" },
  { name: "Tofu Steak with Ginger Glaze", type: "dinner", calories: 290, protein: 20, carbs: 24, fat: 12, prepTime: "20 min", tags: ["Vegan", "Low Sodium", "CKD Safe"], condition: "CKD" },
  { name: "Pan-Seared Duck Breast (Lean)", type: "dinner", calories: 400, protein: 34, carbs: 14, fat: 22, prepTime: "25 min", tags: ["High Protein", "Iron Rich"], condition: "All" },
  { name: "Pesto Chicken with Roasted Tomatoes", type: "dinner", calories: 420, protein: 36, carbs: 18, fat: 22, prepTime: "25 min", tags: ["Mediterranean", "Balanced"], condition: "All" },
  { name: "Coconut Curry Shrimp", type: "dinner", calories: 380, protein: 28, carbs: 22, fat: 20, prepTime: "22 min", tags: ["Anti-Inflammatory", "Low Carb"], condition: "All" },
  { name: "Grilled Lamb Chops with Mint", type: "dinner", calories: 440, protein: 38, carbs: 8, fat: 28, prepTime: "20 min", tags: ["High Protein", "Low Carb"], condition: "All" },
  { name: "Baked Halibut with Lemon Dill", type: "dinner", calories: 340, protein: 36, carbs: 10, fat: 16, prepTime: "25 min", tags: ["Omega-3", "Low Sodium", "CKD Safe"], condition: "CKD" },

  // === SNACKS ===
  { name: "Almond Butter Apple Slices", type: "snack", calories: 180, protein: 6, carbs: 22, fat: 10, prepTime: "3 min", tags: ["Low GI", "Fiber Rich", "Diabetic Friendly"], condition: "Diabetes" },
  { name: "Cucumber Hummus Bites", type: "snack", calories: 120, protein: 4, carbs: 14, fat: 6, prepTime: "5 min", tags: ["Low Sodium", "Low Calorie", "Heart Healthy"], condition: "Hypertension" },
  { name: "Mixed Nuts (Unsalted)", type: "snack", calories: 170, protein: 6, carbs: 8, fat: 14, prepTime: "1 min", tags: ["Healthy Fats", "Low Carb"], condition: "All" },
  { name: "Celery Sticks with Cream Cheese", type: "snack", calories: 90, protein: 3, carbs: 4, fat: 8, prepTime: "3 min", tags: ["Low Calorie", "Low Carb", "Weight Loss"], condition: "Obesity" },
  { name: "Boiled Egg with Salt-Free Seasoning", type: "snack", calories: 80, protein: 6, carbs: 1, fat: 5, prepTime: "10 min", tags: ["High Protein", "Low Carb", "CKD Safe"], condition: "CKD" },
  { name: "Greek Yogurt with Honey Drizzle", type: "snack", calories: 150, protein: 12, carbs: 18, fat: 4, prepTime: "2 min", tags: ["Probiotic", "High Protein"], condition: "All" },
  { name: "Carrot & Red Pepper Sticks", type: "snack", calories: 60, protein: 2, carbs: 12, fat: 1, prepTime: "3 min", tags: ["Low Calorie", "Vitamin A", "Weight Loss"], condition: "Obesity" },
  { name: "Edamame (Steamed, Unsalted)", type: "snack", calories: 130, protein: 12, carbs: 10, fat: 6, prepTime: "5 min", tags: ["High Protein", "Low Sodium", "Heart Healthy"], condition: "Hypertension" },
  { name: "Rice Cakes with Avocado", type: "snack", calories: 160, protein: 4, carbs: 20, fat: 8, prepTime: "3 min", tags: ["Low Sodium", "CKD Safe"], condition: "CKD" },
  { name: "Dark Chocolate Square (85%)", type: "snack", calories: 100, protein: 2, carbs: 8, fat: 8, prepTime: "1 min", tags: ["Antioxidant", "Low GI", "Diabetic Friendly"], condition: "Diabetes" },
  { name: "Frozen Banana Bites", type: "snack", calories: 110, protein: 2, carbs: 24, fat: 1, prepTime: "5 min", tags: ["Low Fat", "Natural Sugar"], condition: "All" },
  { name: "Roasted Chickpeas", type: "snack", calories: 140, protein: 8, carbs: 20, fat: 4, prepTime: "25 min", tags: ["High Fiber", "High Protein", "Weight Loss"], condition: "Obesity" },
  { name: "Kale Chips (Baked)", type: "snack", calories: 70, protein: 4, carbs: 8, fat: 3, prepTime: "15 min", tags: ["Low Calorie", "Vitamin K", "Weight Loss"], condition: "Obesity" },
  { name: "Trail Mix (No Sugar Added)", type: "snack", calories: 190, protein: 6, carbs: 18, fat: 12, prepTime: "1 min", tags: ["Energy Boost", "Balanced"], condition: "All" },
  { name: "Guacamole with Veggie Chips", type: "snack", calories: 180, protein: 4, carbs: 16, fat: 12, prepTime: "8 min", tags: ["Healthy Fats", "Low Sodium", "Heart Healthy"], condition: "Hypertension" },
];

// Generate diet plans from the meals database
export function generateDietPlan(days: number, conditions: string[]): Meal[][] {
  const relevant = conditions.length > 0
    ? allMeals.filter(m => m.condition === "All" || conditions.includes(m.condition))
    : allMeals;

  const breakfasts = relevant.filter(m => m.type === "breakfast");
  const lunches = relevant.filter(m => m.type === "lunch");
  const dinners = relevant.filter(m => m.type === "dinner");
  const snacks = relevant.filter(m => m.type === "snack");

  const plan: Meal[][] = [];
  for (let i = 0; i < days; i++) {
    plan.push([
      breakfasts[i % breakfasts.length],
      snacks[i % snacks.length],
      lunches[i % lunches.length],
      snacks[(i + 1) % snacks.length],
      dinners[i % dinners.length],
    ]);
  }
  return plan;
}
