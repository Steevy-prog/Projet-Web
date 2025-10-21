import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Send, User, Clock } from 'lucide-react';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';

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

interface Conversation {
  id: string;
  userId: string;
  userName: string;
  employeeId: string;
  employeeName: string;
  unreadCount: number;
}

interface ChatWindowProps {
  conversation: Conversation | null;
  messages: Message[];
  currentUserId: string;
  userType: 'user' | 'employee';
  onSendMessage: (content: string) => void;
  onBack: () => void;
}

export function ChatWindow({
  conversation,
  messages,
  currentUserId,
  userType,
  onSendMessage,
  onBack,
}: ChatWindowProps) {
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim() && conversation) {
      onSendMessage(newMessage.trim());
      setNewMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!conversation) {
    return (
      <div className="h-full flex items-center justify-center bg-gradient-to-br from-card to-card/50">
        <div className="text-center p-8">
          <User className="size-20 mx-auto mb-4 text-muted-foreground opacity-30" />
          <h3 className="text-xl font-semibold mb-3 text-foreground">Aucune conversation sélectionnée</h3>
          <p className="text-muted-foreground max-w-sm">
            Sélectionnez une conversation dans la liste ou démarrez une nouvelle discussion avec notre équipe
          </p>
        </div>
      </div>
    );
  }

  const getDisplayName = () => {
    if (userType === 'employee') {
      return conversation.userName;
    } else {
      return conversation.employeeName;
    }
  };

  const getRoleText = () => {
    if (userType === 'employee') {
      return 'Étudiant';
    } else {
      return 'Employé';
    }
  };

  const formatMessageTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatMessageDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  // Grouper les messages par date
  const groupedMessages = messages.reduce((groups, message) => {
    const date = new Date(message.timestamp).toDateString();
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(message);
    return groups;
  }, {} as Record<string, Message[]>);

  return (
    <div className="h-full flex flex-col bg-background">
      {/* En-tête de la conversation */}
      <div className="p-4 border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          {/* Bouton retour (mobile) */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden rounded-2xl hover:bg-accent"
            onClick={onBack}
          >
            <ArrowLeft className="size-4" />
          </Button>

          {/* Informations du contact */}
          <div className="flex items-center gap-3 flex-1">
            <div className="size-12 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center">
              <User className="size-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-lg truncate">{getDisplayName()}</h3>
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <Clock className="size-3" />
                {getRoleText()}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Zone des messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-gradient-to-b from-background to-muted/20">
        {Object.entries(groupedMessages).map(([date, dateMessages]) => (
          <div key={date}>
            {/* Séparateur de date */}
            <div className="flex items-center justify-center my-6">
              <div className="bg-muted/50 px-3 py-1 rounded-full">
                <span className="text-xs text-muted-foreground font-medium">
                  {formatMessageDate(dateMessages[0].timestamp)}
                </span>
              </div>
            </div>

            {/* Messages de la date */}
            <div className="space-y-4">
              {dateMessages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${
                    message.senderId === currentUserId ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-[75%] rounded-3xl p-4 shadow-sm ${
                      message.senderId === currentUserId
                        ? 'bg-primary text-primary-foreground rounded-br-md'
                        : 'bg-card border border-border rounded-bl-md'
                    }`}
                  >
                    {message.senderId !== currentUserId && (
                      <p className="text-xs font-medium text-muted-foreground mb-1">
                        {message.senderName}
                      </p>
                    )}
                    <p className="text-sm whitespace-pre-wrap leading-relaxed">
                      {message.content}
                    </p>
                    <p
                      className={`text-xs mt-2 ${
                        message.senderId === currentUserId
                          ? 'text-primary-foreground/70'
                          : 'text-muted-foreground'
                      }`}
                    >
                      {formatMessageTime(message.timestamp)}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Zone de saisie */}
      <div className="p-4 border-t border-border bg-card/50 backdrop-blur-sm">
        <div className="flex gap-3">
          <Textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Tapez votre message..."
            className="min-h-[60px] resize-none rounded-2xl border-border bg-background flex-1"
            rows={1}
          />
          <Button
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
            className="rounded-2xl self-end bg-primary hover:bg-primary/90"
            size="icon"
          >
            <Send className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}