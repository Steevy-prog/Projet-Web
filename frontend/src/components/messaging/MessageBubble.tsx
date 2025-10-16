import React from 'react';
import { motion } from 'motion/react';
import { User, UserCircle } from 'lucide-react';

/**
 * Interface définissant les propriétés d'un message
 */
interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderType: 'user' | 'employee';
  content: string;
  timestamp: string;
  read: boolean;
}

/**
 * Props du composant MessageBubble
 */
interface MessageBubbleProps {
  message: Message;
  isCurrentUser: boolean;
}

/**
 * Composant MessageBubble - Affiche une bulle de message individuelle
 * Les messages de l'utilisateur courant sont alignés à droite
 * Les messages de l'autre partie sont alignés à gauche
 */
export function MessageBubble({ message, isCurrentUser }: MessageBubbleProps) {
  // Formatage de la date et heure
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex gap-3 mb-4 ${isCurrentUser ? 'flex-row-reverse' : 'flex-row'}`}
    >
      {/* Avatar de l'expéditeur */}
      <div
        className={`size-8 rounded-full flex items-center justify-center flex-shrink-0 ${
          isCurrentUser ? 'bg-primary/20' : 'bg-secondary'
        }`}
      >
        {message.senderType === 'user' ? (
          <User className="size-4 text-primary" />
        ) : (
          <UserCircle className="size-4 text-primary" />
        )}
      </div>

      {/* Contenu du message */}
      <div className={`flex flex-col ${isCurrentUser ? 'items-end' : 'items-start'} max-w-[70%]`}>
        {/* Nom de l'expéditeur */}
        <span className="text-xs text-muted-foreground mb-1">{message.senderName}</span>

        {/* Bulle de message */}
        <div
          className={`px-4 py-2 rounded-2xl ${
            isCurrentUser
              ? 'bg-primary text-primary-foreground rounded-tr-sm'
              : 'bg-secondary text-foreground rounded-tl-sm'
          }`}
        >
          <p className="text-sm break-words">{message.content}</p>
        </div>

        {/* Heure d'envoi */}
        <span className="text-xs text-muted-foreground mt-1">{formatTime(message.timestamp)}</span>
      </div>
    </motion.div>
  );
}
