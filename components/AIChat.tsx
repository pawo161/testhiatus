/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useRef, useEffect } from 'react';
import { X, Terminal, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { sendMessageToGemini } from '../services/geminiService';
import { ChatMessage } from '../types';

const AIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'HIATUS_OS V6.0 INITIALIZED.\nAWAITING INPUT...' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const responseText = await sendMessageToGemini(input);
    
    setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-50 flex flex-col items-end pointer-events-auto font-mono">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.1 }}
            className="mb-4 w-[90vw] md:w-[450px] bg-black border border-white/50 shadow-none"
          >
            {/* Header */}
            <div className="bg-[#111] p-2 flex justify-between items-center border-b border-white/20 select-none">
              <div className="flex items-center gap-2 text-xs text-[#ccff00]">
                <Terminal className="w-4 h-4" />
                <span>TERMINAL_ACCESS</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white hover:bg-white hover:text-black p-1">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div 
              ref={chatContainerRef}
              className="h-64 overflow-y-auto p-4 space-y-2 bg-black text-xs md:text-sm"
            >
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div className={`text-[10px] mb-1 ${msg.role === 'user' ? 'text-gray-500' : 'text-[#ccff00]'}`}>
                    {msg.role === 'user' ? 'USER@GUEST:~$' : 'SYSTEM@HIATUS:~#Result'}
                  </div>
                  <div
                    className={`max-w-[90%] break-words ${
                      msg.role === 'user'
                        ? 'text-white'
                        : 'text-gray-300'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="text-[#ccff00] animate-pulse">
                   _PROCESSING...
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-3 border-t border-white/20 bg-black">
              <div className="flex gap-2 items-center">
                <ChevronRight className="w-4 h-4 text-[#ccff00]" />
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                  autoFocus
                  className="flex-1 bg-transparent text-white placeholder-gray-700 text-sm focus:outline-none font-mono uppercase"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 bg-black border border-white/50 flex items-center justify-center hover:bg-[#ccff00] hover:text-black hover:border-[#ccff00] transition-colors duration-0"
        data-hover="true"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Terminal className="w-6 h-6" />}
      </button>
    </div>
  );
};

export default AIChat;