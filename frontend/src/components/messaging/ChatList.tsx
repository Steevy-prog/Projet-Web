import React from 'react';
import { motion } from 'motion/react';
import { User, Clock, MessageCircle } from 'lucide-react';

interface Conversation {
  id: string;
  userId: string;
  userName: string;
  employeeId: string;
  employeeName: string;
  lastMessage?: string;
  lastMessageTime?: string;
  unreadCount: number;
  updatedAt: string;
}

interface ChatListProps {
  conversations: Conversation[];
  selectedConversationId: string | null;
  onSelectConversation: (conversationId: string) => void;
  currentUserId: string;
  userType: 'user' | 'employee';
}

export function ChatList({
  conversations,
  selectedConversationId,
  onSelectConversation,
  currentUserId,
  userType,
}: ChatListProps) {
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
    } else if (diffInHours < 48) {
      return 'Hier';
    } else {
      return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
    }
  };

  const getDisplayName = (conversation: Conversation) => {
    if (userType === 'employee') {
      return conversation.userName;
    } else {
      return conversation.employeeName;
    }
  };

  const getRoleText = (conversation: Conversation) => {
    if (userType === 'employee') {
      return 'Étudiant';
    } else {
      return 'Employé';
    }
  };

  return (
    <div className="w-full md:w-80 border-r border-border h-full flex flex-col bg-card">
      {/* En-tête de la liste */}
      <div className="p-6 border-b border-border bg-gradient-to-r from-card to-card/80">
        <div className="flex items-center gap-3 mb-2">
          <MessageCircle className="size-6 text-primary" />
          <h2 className="font-bold text-xl">Conversations</h2>
        </div>
        <p className="text-sm text-muted-foreground">
          {conversations.length} conversation(s)
        </p>
      </div>

      {/* Liste des conversations */}
      <div className="flex-1 overflow-y-auto">
        {conversations.map((conversation) => (
          <motion.div
            key={conversation.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`border-b border-border cursor-pointer transition-all duration-200 ${
              selectedConversationId === conversation.id 
                ? 'bg-primary/10 border-l-4 border-l-primary' 
                : 'hover:bg-accent/50'
            }`}
            onClick={() => onSelectConversation(conversation.id)}
          >
            <div className="p-4">
              <div className="flex items-start gap-3">
                {/* Avatar */}
                <div className={`size-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                  selectedConversationId === conversation.id
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-secondary-foreground'
                }`}>
                  <User className="size-5" />
                </div>

                {/* Contenu */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className={`font-semibold truncate ${
                      selectedConversationId === conversation.id ? 'text-primary' : 'text-foreground'
                    }`}>
                      {getDisplayName(conversation)}
                    </h3>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="size-3" />
                      <span>{formatTime(conversation.updatedAt)}</span>
                    </div>
                  </div>

                  <p className="text-xs text-muted-foreground mb-1">
                    {getRoleText(conversation)}
                  </p>

                  <p className="text-sm text-muted-foreground truncate mb-2">
                    {conversation.lastMessage || 'Aucun message'}
                  </p>

                  {/* Badge des messages non lus */}
                  {conversation.unreadCount > 0 && (
                    <div className="flex justify-end">
                      <span className="inline-flex items-center justify-center size-6 text-xs font-medium bg-primary text-primary-foreground rounded-full">
                        {conversation.unreadCount}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Message si aucune conversation */}
      {conversations.length === 0 && (
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="text-center">
            <MessageCircle className="size-16 mx-auto mb-4 text-muted-foreground opacity-50" />
            <p className="text-muted-foreground text-lg">Aucune conversation</p>
            <p className="text-sm text-muted-foreground mt-2">
              Commencez une nouvelle conversation
            </p>
          </div>
        </div>
      )}
    </div>
  );
}