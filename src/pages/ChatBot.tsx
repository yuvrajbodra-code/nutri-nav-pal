import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Send, Mic, MicOff, User, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUserData } from "@/contexts/UserDataContext";
import { useToast } from "@/hooks/use-toast";
import ReactMarkdown from "react-markdown";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/nutrition-chat`;

export default function ChatBot() {
  const { profile } = useUserData();
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMsg: Message = { role: "user", content: text.trim() };
    const allMessages = [...messages, userMsg];
    setMessages(allMessages);
    setInput("");
    setIsLoading(true);

    let assistantSoFar = "";

    try {
      const resp = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({
          messages: allMessages,
          userProfile: {
            name: profile.name,
            conditions: profile.conditions.map(c => c.name),
            allergies: profile.allergies,
            dietaryPreferences: profile.dietaryPreferences,
            foodLikes: profile.foodLikes,
            foodDislikes: profile.foodDislikes,
            calorieTarget: profile.calorieTarget,
            proteinTarget: profile.proteinTarget,
          },
        }),
      });

      if (resp.status === 429) {
        toast({ title: "Rate limited", description: "Too many requests. Please wait a moment.", variant: "destructive" });
        setIsLoading(false);
        return;
      }
      if (resp.status === 402) {
        toast({ title: "Credits exhausted", description: "Please add funds to continue using AI features.", variant: "destructive" });
        setIsLoading(false);
        return;
      }
      if (!resp.ok || !resp.body) throw new Error("Failed to start stream");

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let textBuffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        textBuffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);
          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") break;

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              assistantSoFar += content;
              setMessages(prev => {
                const last = prev[prev.length - 1];
                if (last?.role === "assistant") {
                  return prev.map((m, i) => i === prev.length - 1 ? { ...m, content: assistantSoFar } : m);
                }
                return [...prev, { role: "assistant", content: assistantSoFar }];
              });
            }
          } catch {
            textBuffer = line + "\n" + textBuffer;
            break;
          }
        }
      }
    } catch (e) {
      console.error(e);
      toast({ title: "Error", description: "Failed to get response. Please try again.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleVoice = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      toast({ title: "Not supported", description: "Speech recognition is not supported in this browser.", variant: "destructive" });
      return;
    }

    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      sendMessage(transcript);
    };
    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);
    recognitionRef.current = recognition;
    recognition.start();
    setIsListening(true);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] max-w-4xl mx-auto">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-4">
        <div className="flex items-center gap-2 mb-1">
          <Bot className="h-5 w-5 text-primary" />
          <h1 className="text-2xl md:text-3xl font-bold font-heading text-foreground">NutriAI Assistant</h1>
        </div>
        <p className="text-muted-foreground">Ask me anything about nutrition, diet plans, or your health conditions.</p>
      </motion.div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto rounded-xl border border-border bg-card p-4 space-y-4 mb-4">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground gap-3">
            <Bot className="h-12 w-12 text-primary/30" />
            <div>
              <p className="font-heading font-semibold text-card-foreground">Hi{profile.name ? `, ${profile.name.split(" ")[0]}` : ""}! 👋</p>
              <p className="text-sm mt-1">I'm your personalized nutrition assistant. Ask me about:</p>
              <div className="flex flex-wrap gap-2 mt-3 justify-center">
                {["What should I eat for dinner?", "Low sodium meal ideas", "CKD-safe snacks", "Help me plan my week"].map(q => (
                  <button
                    key={q}
                    onClick={() => sendMessage(q)}
                    className="text-xs px-3 py-1.5 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        <AnimatePresence>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-3 ${msg.role === "user" ? "justify-end" : ""}`}
            >
              {msg.role === "assistant" && (
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Bot className="h-4 w-4 text-primary" />
                </div>
              )}
              <div className={`max-w-[80%] rounded-xl px-4 py-3 ${
                msg.role === "user"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted/50 text-card-foreground"
              }`}>
                {msg.role === "assistant" ? (
                  <div className="prose prose-sm dark:prose-invert max-w-none text-sm [&>p]:mb-2 [&>ul]:mb-2 [&>ol]:mb-2">
                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                  </div>
                ) : (
                  <p className="text-sm">{msg.content}</p>
                )}
              </div>
              {msg.role === "user" && (
                <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center shrink-0">
                  <User className="h-4 w-4 text-secondary-foreground" />
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {isLoading && messages[messages.length - 1]?.role !== "assistant" && (
          <div className="flex gap-3">
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <Bot className="h-4 w-4 text-primary" />
            </div>
            <div className="bg-muted/50 rounded-xl px-4 py-3">
              <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="flex gap-2">
        <Button
          variant={isListening ? "destructive" : "outline"}
          size="icon"
          onClick={toggleVoice}
          className="shrink-0"
        >
          {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
        </Button>
        <Input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && sendMessage(input)}
          placeholder="Ask about nutrition, meals, or your health..."
          disabled={isLoading}
          className="flex-1"
        />
        <Button onClick={() => sendMessage(input)} disabled={isLoading || !input.trim()} size="icon">
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
