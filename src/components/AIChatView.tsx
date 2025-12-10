'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2 } from 'lucide-react';
import { chatWithPortfolio } from '../services/apiService';

interface Message {
    id: string;
    role: 'user' | 'model';
    text: string;
}

const AIChatView: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([
        { id: '1', role: 'model', text: 'Greetings. I am the AI construct representing this portfolio. Query me regarding skills, project architecture, or experience protocols.' }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMsg: Message = { id: Date.now().toString(), role: 'user', text: input };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsLoading(true);

        // Format history for Gemini
        const history = messages.map(m => ({
            role: m.role,
            parts: [{ text: m.text }]
        }));

        const responseText = await chatWithPortfolio(userMsg.text, history);

        const aiMsg: Message = { id: (Date.now() + 1).toString(), role: 'model', text: responseText };
        setMessages(prev => [...prev, aiMsg]);
        setIsLoading(false);
    };

    return (
        <div className="h-full flex flex-col p-4 md:p-8 max-w-4xl mx-auto">
            <div className="bg-theme-card border border-theme-border rounded-xl flex-1 flex flex-col overflow-hidden shadow-xl">
                {/* Chat Header */}
                <div className="p-4 border-b border-theme-border bg-theme-item flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-purple-500/20 flex items-center justify-center">
                        <Bot size={18} className="text-purple-500" />
                    </div>
                    <div>
                        <h2 className="text-sm font-bold text-theme-text-main">Portfolio AI Interface</h2>
                        <p className="text-xs text-theme-text-muted">Gemini 2.5 Flash • Online</p>
                    </div>
                </div>

                {/* Messages */}
                <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar">
                    {messages.map((msg) => (
                        <div key={msg.id} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-gray-600' : 'bg-purple-900/50'}`}>
                                {msg.role === 'user' ? <User size={14} className="text-white" /> : <Bot size={14} className="text-purple-300" />}
                            </div>
                            <div className={`max-w-[80%] p-3 rounded-lg text-sm leading-relaxed ${msg.role === 'user'
                                    ? 'bg-theme-hover text-theme-text-main border border-theme-border'
                                    : 'bg-transparent text-theme-text-main'
                                }`}>
                                {msg.text}
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex gap-4">
                            <div className="w-8 h-8 rounded-full bg-purple-900/50 flex items-center justify-center shrink-0">
                                <Bot size={14} className="text-purple-300" />
                            </div>
                            <div className="flex items-center gap-1 h-8">
                                <span className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-bounce"></span>
                                <span className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-bounce delay-100"></span>
                                <span className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-bounce delay-200"></span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Input Area */}
                <div className="p-4 bg-theme-item border-t border-theme-border">
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                            placeholder="Query protocol..."
                            className="flex-1 bg-theme-input border border-theme-border rounded-lg px-4 py-2.5 text-sm text-theme-text-main focus:outline-none focus:border-theme-accent transition-colors"
                        />
                        <button
                            onClick={handleSend}
                            disabled={isLoading}
                            className="bg-purple-600 hover:bg-purple-700 text-white px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AIChatView;
