"use client";
import React, { useState, useRef, useEffect } from "react";
import { X, MessageSquare, Minus, Bot } from "lucide-react";

import { Card } from "@/src/components/ui/Card";
import { Button } from "@/src/components/ui/Button";
import { Avatar } from "@/src/components/ui/Avatar";
import { Input } from "@/src/components/ui/Input";
import { Skeleton } from "@/src/components/ui/Skeleton";
import { generateCoachResponse } from "../action/chatbot.action";

interface Message {
  id: number;
  sender: "user" | "bot";
  text: string;
  time: string;
}

export const FQCoachWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "bot",
      text: "Halo! FQ Coach siap bantu. Mau tanya soal latihan, quest, atau achievement hari ini?",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
  ]);

  const SUGGESTIONS = ["Latihan hari ini", "Quest aktif", "Recovery tips"];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen, isTyping]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    const currentTime = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    setMessages((prev) => [
      ...prev,
      { id: Date.now(), sender: "user", text, time: currentTime },
    ]);
    setInputValue("");
    setIsTyping(true);

    const aiResponse = await generateCoachResponse(text);

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now() + 1,
        sender: "bot",
        text: aiResponse.text,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ]);

    setIsTyping(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {isOpen && (
        <Card className="w-[350px] h-[500px] mb-4 flex flex-col overflow-hidden border border-border shadow-2xl p-0 bg-surface">
          {/* HEADER */}
          <div className="bg-elevated p-3 border-b border-border flex justify-between items-center shrink-0">
            <div className="flex items-center gap-3">
              <Avatar
                fallback={<Bot size={18} className="text-primary" />}
                className="w-8 h-8 rounded border border-border bg-background"
              />
              <div>
                <h3 className="text-text font-bold text-xs uppercase tracking-widest">
                  FQ COACH
                </h3>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse"></div>
                  <span className="text-primary text-[9px] font-mono tracking-wider">
                    ONLINE - AI COACH
                  </span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setIsOpen(false)}
                className="text-muted hover:text-text transition"
              >
                <Minus size={14} />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 bg-background">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col max-w-[85%] ${msg.sender === "user" ? "self-end" : "self-start"}`}
              >
                <span
                  className={`text-[9px] font-mono mb-1 text-muted ${msg.sender === "user" ? "text-right" : "text-left"}`}
                >
                  {msg.sender === "user" ? "KAMU" : "FQ COACH"}
                </span>
                <div
                  className={`p-3 rounded-md text-sm leading-relaxed ${
                    msg.sender === "user"
                      ? "bg-surface border border-primary/50 text-text rounded-tr-none"
                      : "bg-elevated border border-border text-text rounded-tl-none"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="self-start flex flex-col gap-1 max-w-[70%] w-full">
                <span className="text-[9px] font-mono text-muted text-left">
                  FQ COACH NGETIK...
                </span>
                <Skeleton className="h-10 w-full rounded-md rounded-tl-none bg-border" />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-3 border-t border-border bg-surface overflow-x-auto whitespace-nowrap flex gap-2 shrink-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {SUGGESTIONS.map((sug, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(sug)}
                className="text-[10px] uppercase font-mono tracking-wider py-1.5 px-3 rounded-full border border-border bg-background text-muted hover:text-text hover:border-primary/50 hover:bg-primary/10 transition-all shrink-0"
              >
                {sug}
              </button>
            ))}
          </div>

          {/* INPUT AREA */}
          <div className="p-3 bg-elevated flex w-full gap-3 items-center shrink-0 border-t border-border">
            <div className="flex-1">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" && handleSendMessage(inputValue)
                }
                placeholder="Tanya FQ Coach..."
                className="w-full text-sm bg-background border-border text-text placeholder:text-muted focus-visible:ring-primary/50 m-0"
              />
            </div>

            <Button
              size="lg"
              onClick={() => handleSendMessage(inputValue)}
              className="w-12 h-10 shrink-0 flex items-center justify-center p-0 bg-primary text-background hover:bg-primary-hover transition-colors"
            >
              ➤
            </Button>
          </div>
        </Card>
      )}

      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full shadow-lg hover:scale-105 transition-transform flex items-center justify-center bg-primary text-background hover:bg-primary-hover p-0"
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </Button>
    </div>
  );
};
