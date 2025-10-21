import React, { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { User, UserCircle, ArrowLeft } from 'lucide-react';
import { MessageBubble } from './MessageBubble';
import { MessageInput } from './MessageInput';

/**
 * Interface définissant un message
 */
interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  senderType: 'user' | 'employee';
  content: string;
  timestamp: string;
  read: boolean;
}

/**
 * Interface définissant une conversation
 */
interface Conversation {
  id: string;
  userId: string;
  userName: string;
  employeeId: string;
  employeeName: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
}

/**
 * Props du composant ChatWindow
 */
interface ChatWindowProps {
  conversation: Conversation | null;
  messages: Message[];
  currentUserId: string;
  userType: 'user' | 'employee';
  onSendMessage: (content: string) => void;
  onBack?: () => void;
}

/**
 * Composant ChatWindow - Fenêtre principale de discussion
 * Affiche les messages d'une conversation et permet d'envoyer de nouveaux messages
 */
export function ChatWindow({
  conversation,
  messages,
  currentUserId,
  userType,
  onSendMessage,
  onBack,
}: ChatWindowProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  /**
   * Fait défiler automatiquement vers le bas lors de nouveaux messages
   */
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Si aucune conversation n'est sélectionnée
  if (!conversation) {
    return (
      <div className="flex-1 flex items-center justify-center bg-background">
        <div className="text-center text-muted-foreground">
          <UserCircle className="size-16 mx-auto mb-4 opacity-50" />
          <p className="text-lg">Sélectionnez une conversation</p>
          <p className="text-sm mt-2">Choisissez une conversation dans la liste pour commencer</p>
        </div>
      </div>
    );
  }

  /**
   * Obtient le nom de l'interlocuteur
   */
  const interlocutorName = userType === 'user' ? conversation.employeeName : conversation.userName;

  return (
    <div className="flex-1 flex flex-col bg-background">
      {/* En-tête de la conversation */}
      <div className="p-4 border-b border-border bg-card flex items-center gap-3">
        {/* Bouton retour (mobile) */}
        {onBack && (
          <button
            onClick={onBack}
            className="md:hidden p-2 rounded-2xl hover:bg-secondary transition-colors"
          >
            <ArrowLeft className="size-5" />
          </button>
        )}

        {/* Avatar de l'interlocuteur */}
        <div className="size-10 rounded-full bg-secondary flex items-center justify-center">
          {userType === 'user' ? (
            <UserCircle className="size-5 text-primary" />
          ) : (
            <User className="size-5 text-primary" />
          )}
        </div>

        {/* Nom de l'interlocuteur */}
        <div>
          <h3 className="font-medium">{interlocutorName}</h3>
          <p className="text-xs text-muted-foreground">
            {userType === 'user' ? 'Employé' : 'Client'}
          </p>
        </div>
      </div>

      {/* Zone des messages */}
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

      {/* Zone de saisie */}
      <MessageInput onSendMessage={onSendMessage} />
    </div>
  );
}
