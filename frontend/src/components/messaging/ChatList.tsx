import React, { useState } from 'react';
import { motion } from 'motion/react';
import { User, UserCircle, Search } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Conversation } from '../../lib/types';

interface ChatListProps {
  conversations: Conversation[];
  selectedConversationId: string | null;
  onSelectConversation: (conversationId: string) => void;
  currentUserId?: number;
  userType: 'user' | 'employee';
}

export function ChatList({
  conversations,
  selectedConversationId,
  onSelectConversation,
  userType,
}: ChatListProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const getInterlocutorName = (conversation: Conversation) =>
    userType === 'user' ? conversation.employeeName : conversation.userName;

  const filteredConversations = conversations.filter((conv) =>
    getInterlocutorName(conv).toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full md:w-80 border-r border-border bg-card flex flex-col h-full">
      <div className="p-4 border-b border-border">
        <h2 className="text-xl font-semibold mb-4">Messagerie</h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 size-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Rechercher..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-2xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {filteredConversations.length === 0 ? (
          <div className="p-4 text-center text-muted-foreground">
            {searchQuery ? 'Aucune conversation trouvée' : 'Aucune conversation'}
          </div>
        ) : (
          filteredConversations.map((conv, index) => {
            const isSelected = conv.id === selectedConversationId;
            const name = getInterlocutorName(conv);

            return (
              <motion.button
                key={conv.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => onSelectConversation(conv.id)}
                className={`w-full p-4 border-b border-border text-left transition-colors ${
                  isSelected ? 'bg-primary/10' : 'hover:bg-secondary'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="size-10 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                    {userType === 'user' ? (
                      <UserCircle className="size-5 text-primary" />
                    ) : (
                      <User className="size-5 text-primary" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-medium text-sm truncate">{name}</h3>
                      <span className="text-xs text-muted-foreground flex-shrink-0 ml-2">
                        {new Date(conv.lastMessageTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-muted-foreground truncate">{conv.lastMessage}</p>
                      {conv.unreadCount > 0 && (
                        <Badge className="ml-2 bg-primary text-primary-foreground flex-shrink-0">
                          {conv.unreadCount}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </motion.button>
            );
          })
        )}
      </div>
    </div>
  );
}