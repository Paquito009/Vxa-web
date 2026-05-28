"use client";

import { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";
import FadeIn from "./FadeIn";
import { scrollToSection } from "@/lib/scroll";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

const SUGGESTIONS = [
  "I'm looking for a 3-bed in Cape Town under R3M",
  "Do you have any apartments in Sea Point?",
  "What are your viewing hours?",
];

const MAX_MESSAGES = 10;

function formatTime() {
  return new Date().toLocaleTimeString("en-ZA", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function ChatDemo() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi there! 👋 I'm the VXA Property Assistant. Are you looking to buy or rent in Cape Town, Johannesburg, or somewhere else? I'd love to help you find the right property.",
      timestamp: formatTime(),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [limitReached, setLimitReached] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const userMessageCount = messages.filter((m) => m.role === "user").length;

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || loading || limitReached) return;

    if (userMessageCount >= MAX_MESSAGES) {
      setLimitReached(true);
      return;
    }

    setError("");
    const userMsg: Message = {
      role: "user",
      content: trimmed,
      timestamp: formatTime(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const history = [...messages, userMsg].map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error ?? "Request failed");
      }

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.message,
          timestamp: formatTime(),
        },
      ]);

      if (userMessageCount + 1 >= MAX_MESSAGES) {
        setLimitReached(true);
      }
    } catch {
      setError("Something went wrong. Try again in a moment.");
      setMessages((prev) => prev.slice(0, -1));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="demo" className="px-4 py-24 md:px-8">
      <div className="mx-auto max-w-3xl">
        <FadeIn>
          <div className="mb-12 text-center">
            <h2 className="section-title mb-4">
              This Is What Your Leads Experience at 11pm on a Friday
            </h2>
            <p className="text-text-secondary">
              Type a message as if you were a potential buyer. The AI responds
              exactly as it would on your agency&apos;s WhatsApp — in real time.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={100}>
          <div className="overflow-hidden rounded-2xl border border-[var(--border-light)] bg-[#0B141A] shadow-2xl">
            <div className="flex items-center gap-3 border-b border-[#1F2C34] bg-[#1F2C34] px-4 py-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-primary text-sm font-bold text-white">
                VXA
              </div>
              <div>
                <p className="font-semibold text-white text-sm">
                  VXA – Property Assistant
                </p>
                <p className="flex items-center gap-1 text-xs text-[#8696A0]">
                  <span className="h-2 w-2 rounded-full bg-[#25D366]" />
                  Online
                </p>
              </div>
            </div>

            <div className="flex h-[420px] flex-col gap-3 overflow-y-auto p-4 md:h-[480px]">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-lg px-3 py-2 text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-[#005C4B] text-white rounded-tr-none"
                        : "bg-[#1F2C34] text-[#E9EDEF] rounded-tl-none"
                    }`}
                  >
                    <p>{msg.content}</p>
                    <p
                      className={`mt-1 text-right text-[10px] ${
                        msg.role === "user" ? "text-[#99BEB3]" : "text-[#8696A0]"
                      }`}
                    >
                      {msg.timestamp}
                    </p>
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex justify-start">
                  <div className="flex gap-1 rounded-lg bg-[#1F2C34] px-4 py-3">
                    {[0, 1, 2].map((i) => (
                      <span
                        key={i}
                        className="h-2 w-2 rounded-full bg-[#8696A0] animate-typing-bounce"
                        style={{ animationDelay: `${i * 0.2}s` }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {limitReached && (
                <div className="rounded-lg border border-accent-primary/30 bg-accent-primary/10 p-4 text-center text-sm text-text-secondary">
                  Impressed? This is what your leads would experience.{" "}
                  <button
                    onClick={() => scrollToSection("contact")}
                    className="font-semibold text-accent-primary hover:underline"
                  >
                    Book a call →
                  </button>
                </div>
              )}

              <div ref={bottomRef} />
            </div>

            {error && (
              <p className="px-4 pb-2 text-center text-sm text-red-400">{error}</p>
            )}

            <div className="border-t border-[#1F2C34] p-3">
              <div className="mb-2 flex flex-wrap gap-2">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => sendMessage(s)}
                    disabled={loading || limitReached}
                    className="rounded-full border border-[#2A3942] bg-[#1F2C34] px-3 py-1 text-xs text-[#8696A0] transition-colors hover:border-accent-primary/50 hover:text-white disabled:opacity-50"
                  >
                    {s}
                  </button>
                ))}
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  sendMessage(input);
                }}
                className="flex gap-2"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type a message..."
                  disabled={loading || limitReached}
                  className="flex-1 rounded-full bg-[#1F2C34] px-4 py-2.5 text-sm text-white placeholder-[#8696A0] outline-none focus:ring-1 focus:ring-accent-primary/50 disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || loading || limitReached}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-primary text-white transition-opacity hover:opacity-90 disabled:opacity-40"
                  aria-label="Send message"
                >
                  <Send size={18} />
                </button>
              </form>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
