"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import { format } from "date-fns";
import { Bot, RotateCcw, Send, Volume2, VolumeX, X } from "lucide-react";
import { Button } from "@charm/ui/button";
import { Input } from "@charm/ui/input";
import { Textarea } from "@charm/ui/textarea";
import { toast } from "@charm/ui/sonner";
import { cn } from "@charm/ui/cn";
import { Markdown } from "./markdown";
import { chatbotFaqs, followUps, matchSettingsFaq, quickOptions, type Faq } from "@/lib/chatbot-faqs";
import { FALLBACK_CONTEXT, type ChatbotContext } from "@/lib/chatbot-context";

type ChatMessage = {
  id: string;
  text: string;
  sender: "user" | "bot";
  /** Omitted on the hardcoded greeting so SSR and the first client render
   *  agree (Date.now() would differ between the two and trigger a hydration
   *  mismatch warning); stamped on every message added after mount instead. */
  timestamp?: number;
};

const GREETING =
  "Hi! I'm Charm's assistant. I can answer questions about his services, experience, projects, and availability. How can I help you today?";

/** How long the "typing..." bubble shows before the real reply lands. */
const TYPING_DELAY_MS = 550;

/** Shown once per browser, a few seconds in, if the visitor hasn't opened the chat yet. */
const NUDGE_DELAY_MS = 6000;
const NUDGE_DISMISSED_KEY = "charm-chatbot-nudge-dismissed";

/** Same-tab only (sessionStorage, not localStorage) so a reload keeps the
 *  conversation but a brand-new tab always starts fresh. */
const SESSION_KEY = "charm-chatbot-session";

const LEAD_QUERY = "__lead_form__";

type LeadErrors = Partial<Record<"name" | "email" | "message" | "form", string>>;

/** Strips one trailing "s" (but not from "ss") so "testimonials"/"clients"
 *  match a "testimonial"/"client" keyword — a deliberately naive singular,
 *  good enough for this matcher's short English keyword lists. */
function singularize(word: string): string {
  if (word.length > 3 && word.endsWith("s") && !word.endsWith("ss")) return word.slice(0, -1);
  return word;
}

/** Words in the input, lowercased and singularized, for exact single-word
 *  keyword matching. Tokenizing (rather than `.includes()`) is what stops
 *  a short keyword like "ai" or "you" from matching inside an unrelated
 *  word — "available"/"email" for "ai", "your" for "you" — while still
 *  matching real, whole-word mentions and their plurals. */
function tokenize(input: string): Set<string> {
  return new Set(
    input
      .split(/[^a-z0-9]+/)
      .filter(Boolean)
      .map(singularize),
  );
}

/** Multi-word keywords ("machine learning") are checked as a plain
 *  substring; a single word is checked against the tokenized input set. */
function keywordMatches(inputTokens: Set<string>, input: string, keyword: string): boolean {
  if (keyword.includes(" ")) return input.includes(keyword);
  return inputTokens.has(singularize(keyword));
}

/** Scores each FAQ by how many of its keywords appear in the input, then
 * falls back to the admin-editable Site settings FAQ list, then to a
 * generic "I don't know" reply. Pure function of (input, live context) —
 * still no LLM, no network call, no API key: only the *data* is live now. */
function findBestAnswer(
  userInput: string,
  ctx: ChatbotContext,
): { text: string; category: string | null } {
  const input = userInput.toLowerCase();

  if (/^(hi|hello|hey|good morning|good afternoon|good evening)/.test(input)) {
    return {
      text: "Hello! I'm here to help you learn about Charm's services and experience. You can ask about his work, skills, projects, availability or pricing.",
      category: null,
    };
  }

  if (/thank|thanks|appreciate/.test(input)) {
    return {
      text: "You're welcome! Feel free to ask if you have any other questions, or leave your details and Charm will follow up directly.",
      category: null,
    };
  }

  const inputTokens = tokenize(input);
  let best: { faq: Faq | null; score: number } = { faq: null, score: 0 };
  for (const faq of chatbotFaqs) {
    let score = 0;
    for (const keyword of faq.keywords) {
      if (keywordMatches(inputTokens, input, keyword.toLowerCase())) score += 1;
    }
    if (score > best.score) best = { faq, score };
  }

  if (best.faq && best.score > 0) {
    return { text: best.faq.answer(ctx), category: best.faq.category };
  }

  const settingsAnswer = matchSettingsFaq(ctx, userInput);
  if (settingsAnswer) return { text: settingsAnswer, category: null };

  return {
    text: [
      "I'm not sure about that one. Here's what I can help with:",
      "",
      "• Services & pricing",
      "• Experience & skills",
      "• Projects & portfolio",
      "• Availability for hire",
      "• Contact information",
      "• Technologies & tools",
      "",
      "Try one of the quick options below, or leave your details and Charm will follow up personally.",
    ].join("\n"),
    category: "fallback",
  };
}

/** A short "You: ... / Bot: ..." recap of the last few exchanges, sent
 *  alongside a lead so the admin has context without the visitor having to
 *  retype everything they already said. */
function summarizeConversation(messages: ChatMessage[]): string {
  const recent = messages.filter((m) => m.id !== "greeting").slice(-6);
  if (recent.length === 0) return "";
  return recent.map((m) => `${m.sender === "user" ? "You" : "Bot"}: ${m.text}`).join("\n");
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
  const [context, setContext] = useState<ChatbotContext>(FALLBACK_CONTEXT);
  const [lastCategory, setLastCategory] = useState<string | null>(null);
  const [userMessageCount, setUserMessageCount] = useState(0);

  const [showLeadForm, setShowLeadForm] = useState(false);
  const [leadForm, setLeadForm] = useState({ name: "", email: "", message: "" });
  const [leadErrors, setLeadErrors] = useState<LeadErrors>({});
  const [isSubmittingLead, setIsSubmittingLead] = useState(false);
  const [honeypot, setHoneypot] = useState("");

  const endRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const hasFetchedContextRef = useRef(false);
  const skipNextPersistRef = useRef(true);
  const restoredConversationRef = useRef(false);

  useEffect(() => {
    if (isOpen) endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen, isTyping, showLeadForm]);

  // Focus the input as soon as the panel opens, so a keyboard user can type
  // immediately instead of having to tab into it.
  useEffect(() => {
    if (isOpen && !showLeadForm) {
      const id = window.setTimeout(() => inputRef.current?.focus(), 50);
      return () => window.clearTimeout(id);
    }
  }, [isOpen, showLeadForm]);

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

  // Stamp the greeting with a real clock time once we're definitely
  // client-side, using useLayoutEffect so it happens before paint and never
  // flashes a wrong time. Kept separate from the greeting's initial state so
  // the server-rendered and first client-rendered HTML match exactly.
  useLayoutEffect(() => {
    setMessages((previous) =>
      previous.map((m) => (m.id === "greeting" && !m.timestamp ? { ...m, timestamp: Date.now() } : m)),
    );
  }, []);

  // Restore a same-tab conversation (reload, navigation) from sessionStorage.
  useEffect(() => {
    try {
      const raw = window.sessionStorage.getItem(SESSION_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as { isOpen?: boolean; messages?: ChatMessage[] };
      if (Array.isArray(parsed.messages) && parsed.messages.length > 0) {
        setMessages(parsed.messages);
        if (parsed.messages.length > 1) restoredConversationRef.current = true;
      }
      if (typeof parsed.isOpen === "boolean") setIsOpen(parsed.isOpen);
    } catch {
      // Corrupt or inaccessible storage — just start fresh.
    }
  }, []);

  // Persist transcript + open state on every change, skipping the very
  // first run so we don't immediately re-write the value we just restored.
  useEffect(() => {
    if (skipNextPersistRef.current) {
      skipNextPersistRef.current = false;
      return;
    }
    try {
      window.sessionStorage.setItem(SESSION_KEY, JSON.stringify({ isOpen, messages }));
    } catch {
      // Storage can throw in private-browsing contexts; conversation just
      // won't survive a reload, which is a harmless degradation.
    }
  }, [isOpen, messages]);

  // One-time nudge bubble, a few seconds after the page settles, to draw
  // attention to the assistant for a first-time visitor. Never shows again
  // once dismissed, once the visitor has opened the chat themselves, or if a
  // real conversation was just restored from a previous session.
  useEffect(() => {
    if (restoredConversationRef.current) return;

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

  // Lazily load live site data the first time the panel is opened (manually
  // or restored already-open) — never on page load, so visitors who never
  // open the chat cost zero extra requests. The bot answers from
  // FALLBACK_CONTEXT immediately either way; this just upgrades the data.
  useEffect(() => {
    if (!isOpen || hasFetchedContextRef.current) return;
    hasFetchedContextRef.current = true;

    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), 4000);

    fetch("/api/chatbot/context", { signal: controller.signal })
      .then((response) => (response.ok ? (response.json() as Promise<ChatbotContext>) : null))
      .then((data) => {
        if (data) setContext(data);
      })
      .catch(() => {
        // Network failure or timeout — silently keep FALLBACK_CONTEXT.
        // Degraded, never broken: the bot still answers every question.
      })
      .finally(() => window.clearTimeout(timeoutId));

    return () => {
      window.clearTimeout(timeoutId);
      controller.abort();
    };
  }, [isOpen]);

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

  function clearConversation() {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
    setMessages([{ id: "greeting", text: GREETING, sender: "bot", timestamp: Date.now() }]);
    setLastCategory(null);
    setUserMessageCount(0);
    setShowLeadForm(false);
    setLeadErrors({});
    try {
      window.sessionStorage.removeItem(SESSION_KEY);
    } catch {
      // Nothing to do — the in-memory reset above already took effect.
    }
  }

  function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || isTyping) return;

    const userMessage: ChatMessage = {
      id: `u-${Date.now()}`,
      text: trimmed,
      sender: "user",
      timestamp: Date.now(),
    };

    setMessages((previous) => [...previous, userMessage]);
    setInput("");
    setIsTyping(true);
    setUserMessageCount((count) => count + 1);

    // A brief pause before the reply reads as a real response being composed,
    // rather than a canned string appearing instantly.
    window.setTimeout(() => {
      const { text: answerText, category } = findBestAnswer(trimmed, context);
      const botMessage: ChatMessage = {
        id: `b-${Date.now()}`,
        text: answerText,
        sender: "bot",
        timestamp: Date.now(),
      };
      setMessages((previous) => [...previous, botMessage]);
      setIsTyping(false);
      setLastCategory(category);
    }, TYPING_DELAY_MS);
  }

  function openLeadForm() {
    setShowLeadForm(true);
    setLeadErrors({});
  }

  function validateLead(): boolean {
    const errors: LeadErrors = {};
    if (leadForm.name.trim().length < 2) errors.name = "Please enter your name";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(leadForm.email.trim())) {
      errors.email = "Please enter a valid email";
    }
    if (leadForm.message.trim().length < 3) errors.message = "Tell me a little about what you need";
    setLeadErrors(errors);
    return Object.keys(errors).length === 0;
  }

  async function submitLead(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!validateLead() || isSubmittingLead) return;

    setIsSubmittingLead(true);

    const transcript = summarizeConversation(messages);
    const lastQuestion = [...messages].reverse().find((m) => m.sender === "user")?.text ?? "";
    const subject = lastQuestion ? `Chatbot: ${lastQuestion.slice(0, 80)}` : "Chatbot inquiry";
    const composedMessage = [
      leadForm.message.trim(),
      transcript ? `\n\n— Recent conversation —\n${transcript}` : "",
    ].join("");
    const firstName = leadForm.name.trim().split(" ")[0] || "there";

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          kind: "chatbot",
          name: leadForm.name.trim(),
          email: leadForm.email.trim(),
          subject,
          message: composedMessage,
          interestedIn: "Website chatbot",
          website: honeypot,
        }),
      });

      const result = (await response.json()) as {
        ok?: boolean;
        error?: string;
        fieldErrors?: LeadErrors;
      };

      if (!response.ok || !result.ok) {
        setLeadErrors(result.fieldErrors ?? { form: result.error || "Something went wrong. Please try again." });
        return;
      }

      setShowLeadForm(false);
      setLeadForm({ name: "", email: "", message: "" });
      setMessages((previous) => [
        ...previous,
        {
          id: `b-lead-${Date.now()}`,
          text: `Thanks ${firstName}! I've sent that to Charm — he typically replies within 24 hours.`,
          sender: "bot",
          timestamp: Date.now(),
        },
      ]);
    } catch {
      setLeadErrors({ form: "Could not send your details. Please try again or email directly." });
    } finally {
      setIsSubmittingLead(false);
    }
  }

  const chips = (lastCategory && followUps[lastCategory]) || quickOptions;
  const emphasizeLead = lastCategory === "fallback" || userMessageCount >= 3;

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
              {context.avatarUrl ? (
                <span className="relative flex h-9 w-9 flex-shrink-0 overflow-hidden rounded-full bg-primary/10">
                  <Image src={context.avatarUrl} alt={context.fullName} fill sizes="36px" className="object-cover" />
                </span>
              ) : (
                <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Bot className="h-5 w-5" />
                </span>
              )}
              <div>
                <p className="font-semibold">Ask about my work</p>
                <p className="text-xs text-muted-foreground">Instant answers, no waiting</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={clearConversation}
                aria-label="Clear conversation"
                title="Clear conversation"
              >
                <RotateCcw className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() =>
                  isSpeaking ? stopSpeaking() : speak(messages[messages.length - 1]?.text ?? "")
                }
                aria-label={isSpeaking ? "Stop reading aloud" : "Read last answer aloud"}
              >
                {isSpeaking ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </Button>
            </div>
          </header>

          <div className="flex-1 space-y-3 overflow-y-auto p-4" aria-live="polite">
            {messages.map((message) => (
              <div key={message.id} className={cn("max-w-[85%]", message.sender === "user" && "ml-auto")}>
                <div
                  className={cn(
                    "rounded-2xl px-4 py-2 text-sm leading-relaxed",
                    message.sender === "user"
                      ? "whitespace-pre-wrap bg-primary text-primary-foreground"
                      : "bg-muted text-foreground",
                  )}
                >
                  {message.sender === "bot" ? (
                    <Markdown size="sm">{message.text}</Markdown>
                  ) : (
                    message.text
                  )}
                </div>
                {message.timestamp ? (
                  <p
                    className={cn(
                      "mt-1 text-[10px] text-muted-foreground",
                      message.sender === "user" ? "text-right" : "text-left",
                    )}
                  >
                    {format(new Date(message.timestamp), "h:mm a")}
                  </p>
                ) : null}
              </div>
            ))}
            {isTyping ? <TypingIndicator /> : null}
            <div ref={endRef} />
          </div>

          {showLeadForm ? (
            <form onSubmit={submitLead} className="space-y-2 border-t border-border p-3">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold text-foreground/80">Leave your details</p>
                <button
                  type="button"
                  onClick={() => setShowLeadForm(false)}
                  aria-label="Cancel"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>

              <Input
                value={leadForm.name}
                onChange={(event) => setLeadForm((previous) => ({ ...previous, name: event.target.value }))}
                placeholder="Your name"
                aria-label="Your name"
                aria-invalid={Boolean(leadErrors.name)}
                className="h-9"
              />
              {leadErrors.name ? <p className="text-xs text-destructive">{leadErrors.name}</p> : null}

              <Input
                value={leadForm.email}
                onChange={(event) => setLeadForm((previous) => ({ ...previous, email: event.target.value }))}
                placeholder="Your email"
                aria-label="Your email"
                type="email"
                aria-invalid={Boolean(leadErrors.email)}
                className="h-9"
              />
              {leadErrors.email ? <p className="text-xs text-destructive">{leadErrors.email}</p> : null}

              <Textarea
                value={leadForm.message}
                onChange={(event) =>
                  setLeadForm((previous) => ({ ...previous, message: event.target.value }))
                }
                placeholder="What do you need help with?"
                aria-label="Your message"
                aria-invalid={Boolean(leadErrors.message)}
                rows={2}
                className="resize-none text-sm"
              />
              {leadErrors.message ? <p className="text-xs text-destructive">{leadErrors.message}</p> : null}

              {/* Honeypot. Hidden from users and assistive tech; bots fill it in. */}
              <div className="hidden" aria-hidden="true">
                <label htmlFor="chatbot-website">Leave this field empty</label>
                <input
                  id="chatbot-website"
                  value={honeypot}
                  onChange={(event) => setHoneypot(event.target.value)}
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              {leadErrors.form ? <p className="text-xs text-destructive">{leadErrors.form}</p> : null}

              <Button type="submit" size="sm" className="w-full" disabled={isSubmittingLead}>
                {isSubmittingLead ? "Sending..." : "Send my details"}
              </Button>
            </form>
          ) : (
            <>
              <div className="flex flex-wrap gap-2 border-t border-border px-4 py-3">
                {chips.map((option) => (
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
                <button
                  type="button"
                  onClick={openLeadForm}
                  className={cn(
                    "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
                    emphasizeLead
                      ? "border-primary bg-primary/10 text-primary hover:bg-primary/20"
                      : "border-border text-muted-foreground hover:border-primary hover:text-primary",
                  )}
                >
                  💬 Leave your details
                </button>
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
            </>
          )}
        </div>
      ) : null}
    </>
  );
}
