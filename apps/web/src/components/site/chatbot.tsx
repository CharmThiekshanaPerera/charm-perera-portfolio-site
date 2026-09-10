"use client";

import { useEffect, useRef, useState } from "react";
import { Bot, Send, Volume2, VolumeX, X } from "lucide-react";
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

/** How long the "typing..." bubble shows before the real reply lands. */
const TYPING_DELAY_MS = 550;

/** Shown once per browser, a few seconds in, if the visitor hasn't opened the chat yet. */
const NUDGE_DELAY_MS = 6000;
const NUDGE_DISMISSED_KEY = "charm-chatbot-nudge-dismissed";

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

/** Three bouncing dots, styled like a native "typing..." indicator. */
function TypingIndicator() {
  return (
    <div className="flex w-fit items-center gap-1 rounded-2xl bg-muted px-4 py-3">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground/60"
          style={{ animationDelay: `${i * 0.15}s` }}
        />
      ))}
      <span className="sr-only">Assistant is typing</span>
    </div>
  );
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: "greeting", text: GREETING, sender: "bot" },
  ]);
  const [input, setInput] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [showNudge, setShowNudge] = useState(false);

  const endRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen, isTyping]);

  // Focus the input as soon as the panel opens, so a keyboard user can type
  // immediately instead of having to tab into it.
  useEffect(() => {
    if (isOpen) {
      const id = window.setTimeout(() => inputRef.current?.focus(), 50);
      return () => window.clearTimeout(id);
    }
  }, [isOpen]);

  // Close on Escape, and stop any speech that is still playing.
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Click anywhere outside the panel (and its trigger) to close it, matching
  // how every other dismissible panel on the web behaves.
  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (panelRef.current?.contains(target)) return;
      if (triggerRef.current?.contains(target)) return;
      setIsOpen(false);
    };

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [isOpen]);

  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // One-time nudge bubble, a few seconds after the page settles, to draw
  // attention to the assistant for a first-time visitor. Never shows again
  // once dismissed or once the visitor has opened the chat themselves.
  useEffect(() => {
    let dismissed = false;
    try {
      dismissed = window.localStorage.getItem(NUDGE_DISMISSED_KEY) === "1";
    } catch {
      // Storage can throw in private-browsing contexts; just skip the nudge.
      dismissed = true;
    }
    if (dismissed) return;

    const id = window.setTimeout(() => setShowNudge(true), NUDGE_DELAY_MS);
    return () => window.clearTimeout(id);
  }, []);

  function dismissNudge() {
    setShowNudge(false);
    try {
      window.localStorage.setItem(NUDGE_DISMISSED_KEY, "1");
    } catch {
      // Nothing to fall back to -- a repeat nudge next visit is harmless.
    }
  }

  function openChat() {
    dismissNudge();
    setIsOpen((open) => !open);
  }

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
    if (!trimmed || isTyping) return;

    const userMessage: ChatMessage = {
      id: `u-${Date.now()}`,
      text: trimmed,
      sender: "user",
    };

    setMessages((previous) => [...previous, userMessage]);
    setInput("");
    setIsTyping(true);

    // A brief pause before the reply reads as a real response being composed,
    // rather than a canned string appearing instantly.
    window.setTimeout(() => {
      const botMessage: ChatMessage = {
        id: `b-${Date.now()}`,
        text: findBestAnswer(trimmed),
        sender: "bot",
      };
      setMessages((previous) => [...previous, botMessage]);
      setIsTyping(false);
    }, TYPING_DELAY_MS);
  }

  return (
    <>
      <div className="fixed bottom-24 right-6 z-40">
        {showNudge && !isOpen ? (
          <div className="absolute bottom-full right-0 mb-3 w-56 animate-fade-in rounded-2xl border border-border bg-card p-3 text-sm shadow-elegant">
            <button
              type="button"
              onClick={dismissNudge}
              aria-label="Dismiss"
              className="absolute right-2 top-2 rounded-full p-0.5 text-muted-foreground hover:text-foreground"
            >
              <X className="h-3.5 w-3.5" />
            </button>
            <p className="pr-4 text-foreground/90">
              Got a question? Ask my assistant &mdash; instant answers, no waiting.
            </p>
            <div
              className="absolute -bottom-1.5 right-6 h-3 w-3 rotate-45 border-b border-r border-border bg-card"
              aria-hidden="true"
            />
          </div>
        ) : null}

        <button
          ref={triggerRef}
          type="button"
          onClick={openChat}
          aria-expanded={isOpen}
          aria-controls="chatbot-panel"
          aria-label={isOpen ? "Close assistant" : "Open assistant"}
          className="relative rounded-full bg-primary p-4 text-primary-foreground shadow-2xl transition-transform hover:scale-110"
        >
          {isOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <>
              <Bot className="h-6 w-6" />
              <span className="absolute right-0.5 top-0.5 flex h-3 w-3" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-3 w-3 rounded-full border-2 border-primary bg-emerald-400" />
              </span>
            </>
          )}
        </button>
      </div>

      {isOpen ? (
        <div
          id="chatbot-panel"
          ref={panelRef}
          role="dialog"
          aria-label="Assistant"
          className="fixed bottom-44 right-6 z-40 flex h-[min(28rem,70vh)] w-[calc(100vw-3rem)] max-w-sm flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-elegant"
        >
          <header className="flex items-center justify-between border-b border-border p-4">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Bot className="h-5 w-5" />
              </span>
              <div>
                <p className="font-semibold">Ask about my work</p>
                <p className="text-xs text-muted-foreground">Instant answers, no waiting</p>
              </div>
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
            {isTyping ? <TypingIndicator /> : null}
            <div ref={endRef} />
          </div>

          <div className="flex flex-wrap gap-2 border-t border-border px-4 py-3">
            {quickOptions.map((option) => (
              <button
                key={option.label}
                type="button"
                onClick={() => send(option.query)}
                disabled={isTyping}
                className="rounded-full border border-border px-3 py-1 text-xs transition-colors hover:border-primary hover:text-primary disabled:pointer-events-none disabled:opacity-50"
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
              ref={inputRef}
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask a question..."
              aria-label="Your question"
              disabled={isTyping}
              className="h-9"
            />
            <Button type="submit" size="icon" aria-label="Send" disabled={isTyping || !input.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      ) : null}
    </>
  );
}
