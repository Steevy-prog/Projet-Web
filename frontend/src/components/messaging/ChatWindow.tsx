import React, { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { UserCircle, User, ArrowLeft } from 'lucide-react';
import { Conversation, Message } from '../../lib/types';
import { MessageInput } from './MessageInput';
import { MessageBubble } from './MessageBubble';

interface ChatWindowProps {
  conversation: Conversation | null | undefined;
  messages: Message[];
  currentUserId?: number;
  userType: 'user' | 'employee';
  onSendMessage: (content: string) => void;
  onBack?: () => void;
}

export function ChatWindow({
  conversation,
  messages,
  currentUserId,
  userType,
  onSendMessage,
  onBack,
}: ChatWindowProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!conversation) {
    return (
      <div className="flex-1 flex items-center justify-center bg-background">
        <div className="text-center text-muted-foreground">
          <UserCircle className="size-16 mx-auto mb-4 opacity-50" />
          <p className="text-lg">Sélectionnez une conversation</p>
        </div>
      </div>
    );
  }

  const interlocutorName = userType === 'user' ? conversation.employeeName : conversation.userName;

  return (
    <div className="flex-1 flex flex-col bg-background">
      <div className="p-4 border-b border-border bg-card flex items-center gap-3">
        {onBack && (
          <button
            onClick={onBack}
            className="md:hidden p-2 rounded-2xl hover:bg-secondary transition-colors"
          >
            <ArrowLeft className="size-5" />
          </button>
        )}
        <div className="size-10 rounded-full bg-secondary flex items-center justify-center">
          {userType === 'user' ? <UserCircle className="size-5 text-primary" /> : <User className="size-5 text-primary" />}
        </div>
        <div>
          <h3 className="font-medium">{interlocutorName}</h3>
          <p className="text-xs text-muted-foreground">{userType === 'user' ? 'Employé' : 'Client'}</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {messages.length === 0 ? (
          <div className="text-center text-muted-foreground mt-8">
            <p>Aucun message pour le moment</p>
            <p className="text-sm mt-2">Envoyez un message pour démarrer la conversation</p>
          </div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {messages.map((message) => (
              <MessageBubble
                key={message.id}
                message={message}
                isCurrentUser={message.senderId === currentUserId}
              />
            ))}
            <div ref={messagesEndRef} />
          </motion.div>
        )}
      </div>

      <MessageInput onSendMessage={onSendMessage} />
    </div>
  );
}