'use client';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import axios from 'axios';
import { AlertCircleIcon, MessageCircle, X } from 'lucide-react';
import { useRef, useState } from 'react';
import ChatHeader from './ChatHeader';
import ChatInput, { type ChatFormData } from './ChatInput';
import ChatMessages, { type Message } from './ChatMessages';
import TypingIndicator from './TypingIndicator';

type ChatResponse = {
   message: string;
};

function ChatBot() {
   const [isOpen, setIsOpen] = useState(false);
   const [messages, setMessages] = useState<Message[]>([]);
   const [error, setError] = useState<string | null>(null);
   const [isTyping, setIsTyping] = useState(false);
   const conversationId = useRef(crypto.randomUUID());

   const onSubmit = async ({ prompt }: ChatFormData) => {
      try {
         setMessages((prev) => [...prev, { content: prompt, role: 'user' }]);
         setIsTyping(true);
         setError('');

         const { data } = await axios.post<ChatResponse>('/api/chat', {
            prompt,
            conversationId: conversationId.current,
         });
         setMessages((prev) => [
            ...prev,
            { content: data.message, role: 'bot' },
         ]);
      } catch (error) {
         console.error(error);
         setError('Something went wrong, try again!');
      } finally {
         setIsTyping(false);
      }
   };

   return (
      <>
         {isOpen && (
            <Card className="fixed bottom-20 right-4 w-96 h-[500px] shadow-2xl border border-primary/20 overflow-hidden z-50 animate-in slide-in-from-bottom-5 duration-300 py-0">
               <div className="h-full flex flex-col bg-background">
                  <ChatHeader setIsOpen={setIsOpen} />
                  <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-background">
                     <ChatMessages messages={messages} />
                     {isTyping && <TypingIndicator />}
                     {error && (
                        <Alert variant="destructive">
                           <AlertCircleIcon />
                           <AlertDescription>
                              <p>{error}</p>
                           </AlertDescription>
                        </Alert>
                     )}
                  </div>
                  <ChatInput onSubmit={onSubmit} />
               </div>
            </Card>
         )}

         {/* Floating Button */}
         <div className="fixed bottom-4 right-4 z-50">
            <Button
               onClick={() => setIsOpen(!isOpen)}
               className="h-14 w-14 rounded-full shadow-xl bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300 hover:scale-110 group cursor-pointer"
            >
               {isOpen ? (
                  <X className="h-6 w-6 transition-transform duration-300 group-hover:rotate-90" />
               ) : (
                  <div className="relative">
                     <MessageCircle className="h-10 w-10 transition-transform duration-300 group-hover:scale-110" />
                  </div>
               )}
            </Button>
            {!isOpen && (
               <div className="absolute bottom-16 right-0 bg-primary text-primary-foreground px-3 py-1 rounded-lg text-sm whitespace-nowrap animate-in slide-in-from-bottom-2 duration-300">
                  Need help? Chat with us!
                  <div className="absolute bottom-[-4px] right-6 w-2 h-2 bg-primary rotate-45"></div>
               </div>
            )}
         </div>
      </>
   );
}

export default ChatBot;
