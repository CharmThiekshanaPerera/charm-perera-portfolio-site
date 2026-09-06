"use client";

import { useEffect, useRef, useState } from "react";
import { MessageCircle, Send, Volume2, VolumeX, X } from "lucide-react";
import { Button } from "@charm/ui/button";
import { Input } from "@charm/ui/input";
import { toast } from "@charm/ui/sonner";
import { cn } from "@charm/ui/cn";
import { chatbotFaqs, quickOptions, type Faq } from "@/lib/chatbot-faqs";

type ChatMessage = {
  id: string;
  text: string;
  sender: "user" | "bot";
};

const GREETING =
  "Hi! I'm Charm's assistant. I can answer questions about his services, experience, projects, and availability. How can I help you today?";

/** Scores each FAQ by how many of its keywords appear in the input. */
function findBestAnswer(userInput: string): string {
  const input = userInput.toLowerCase();

  if (/^(hi|hello|hey|good morning|good afternoon|good evening)/.test(input)) {
    return "Hello! I'm here to help you learn about Charm's services and experience. You can ask about his work, skills, projects, availability or pricing.";
  }

  if (/thank|thanks|appreciate/.test(input)) {
    return "You're welcome! Feel free to ask if you have any other questions, or head to the contact page to get in touch directly.";
  }

  let best: { faq: Faq | null; score: number } = { faq: null, score: 0 };

  for (const faq of chatbotFaqs) {
    let score = 0;
    for (const keyword of faq.keywords) {
      if (input.includes(keyword.toLowerCase())) score += 1;
    }
    if (score > best.score) best = { faq, score };
  }

  if (best.faq && best.score > 0) return best.faq.answer;

  return [
    "I'm not sure about that one. Here's what I can help with:",
    "",
    "• Services & pricing",
    "• Experience & skills",
    "• Projects & portfolio",
    "• Availability for hire",
    "• Contact information",
    "• Technologies & tools",
    "",
    "Try one of the quick options below.",
  ].join("\n");
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: "greeting", text: GREETING, sender: "bot" },
  ]);
  const [input, setInput] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);

  const endRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  // Close on Escape, and stop any speech that is still playing.
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  function speak(text: string) {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      toast.error("Text-to-speech is not supported in this browser.");
      return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  }

  function stopSpeaking() {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
  }

  function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed) return;

    const userMessage: ChatMessage = {
      id: `u-${Date.now()}`,
      text: trimmed,
      sender: "user",
    };

    const botMessage: ChatMessage = {
      id: `b-${Date.now()}`,
      text: findBestAnswer(trimmed),
      sender: "bot",
    };

    setMessages((previous) => [...previous, userMessage, botMessage]);
    setInput("");
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        aria-controls="chatbot-panel"
        aria-label={isOpen ? "Close assistant" : "Open assistant"}
        className="fixed bottom-24 right-6 z-40 rounded-full bg-primary p-4 text-primary-foreground shadow-2xl transition-transform hover:scale-110"
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>

      {isOpen ? (
        <div
          id="chatbot-panel"
          ref={panelRef}
          role="dialog"
          aria-label="Assistant"
          className="fixed bottom-44 right-6 z-40 flex h-[28rem] w-[calc(100vw-3rem)] max-w-sm flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-elegant"
        >
          <header className="flex items-center justify-between border-b border-border p-4">
            <div>
              <p className="font-semibold">Ask about my work</p>
              <p className="text-xs text-muted-foreground">Instant answers, no waiting</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => (isSpeaking ? stopSpeaking() : speak(messages[messages.length - 1]?.text ?? ""))}
              aria-label={isSpeaking ? "Stop reading aloud" : "Read last answer aloud"}
            >
              {isSpeaking ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </Button>
          </header>

          <div className="flex-1 space-y-3 overflow-y-auto p-4" aria-live="polite">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-2 text-sm leading-relaxed",
                  message.sender === "user"
                    ? "ml-auto bg-primary text-primary-foreground"
                    : "bg-muted text-foreground",
                )}
              >
                {message.text}
              </div>
            ))}
            <div ref={endRef} />
          </div>

          <div className="flex flex-wrap gap-2 border-t border-border px-4 py-3">
            {quickOptions.map((option) => (
              <button
                key={option.label}
                type="button"
                onClick={() => send(option.query)}
                className="rounded-full border border-border px-3 py-1 text-xs transition-colors hover:border-primary hover:text-primary"
              >
                {option.label}
              </button>
            ))}
          </div>

          <form
            onSubmit={(event) => {
              event.preventDefault();
              send(input);
            }}
            className="flex items-center gap-2 border-t border-border p-3"
          >
            <Input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask a question..."
              aria-label="Your question"
              className="h-9"
            />
            <Button type="submit" size="icon" aria-label="Send">
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      ) : null}
    </>
  );
}
