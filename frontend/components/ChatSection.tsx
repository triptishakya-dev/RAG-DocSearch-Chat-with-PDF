'use client';

import React, { useState } from 'react';
import { Send, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';

export const ChatSection = () => {
  const [messages, setMessages] = useState<{ role: 'user' | 'bot'; text: string }[]>([
    { role: 'bot', text: 'Hello! I am your document assistant. How can I help you today?' },
  ]);
  const [inputValue, setInputValue] = useState('');

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    const newMessages = [
      ...messages,
      { role: 'user' as const, text: inputValue },
      { role: 'bot' as const, text: 'I am processing your request...' }, // Mock response
    ];
    setMessages(newMessages);
    setInputValue('');
  };

  return (
    <section className="flex flex-col h-[85vh] border-r border-slate-200 bg-blue-800">
      <div className="bg-zinc-100/80 backdrop-blur-md p-6 border-b border-zinc-200 flex justify-between items-center shrink-0 h-20">
        <div>
          <h2 className="text-xl font-bold text-zinc-900 flex items-center gap-2 tracking-tight">
             <MessageSquare className="w-5 h-5 text-zinc-600" />
             Chat Assistant
          </h2>
          <p className="text-xs text-zinc-500 mt-1 font-medium">Ask questions about your documents</p>
        </div>
        <Badge className="bg-zinc-200 text-zinc-700 hover:bg-zinc-300 border-none shadow-sm">AI Active</Badge>
      </div>
      
      {/* Chat Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-white">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] rounded-2xl px-5 py-3.5 text-sm leading-relaxed shadow-sm ${
                msg.role === 'user'
                  ? 'bg-zinc-900 text-white rounded-br-none'
                  : 'bg-zinc-50 border border-zinc-200 text-zinc-700 rounded-bl-none'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-slate-200 shrink-0">
        <div className="flex gap-2 items-center">
          <Input 
            placeholder="Type your question..." 
            className="flex-1 border-zinc-200 focus-visible:ring-zinc-900 focus-visible:border-zinc-900 bg-zinc-50"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <Button 
            onClick={handleSendMessage}
            size="icon"
            className="bg-zinc-900 hover:bg-zinc-800 text-white shrink-0 shadow-md shadow-zinc-100"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};
