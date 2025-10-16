import React from 'react';
import { motion } from 'motion/react';
import { User, UserCircle, Search } from 'lucide-react';
import { Badge } from '../ui/badge';

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
 * Props du composant ChatList
 */
interface ChatListProps {
  conversations: Conversation[];
  selectedConversationId: string | null;
  onSelectConversation: (conversationId: string) => void;
  currentUserId: string;
  userType: 'user' | 'employee';
}

/**
 * Composant ChatList - Liste des conversations
 * Affiche toutes les conversations avec un aperçu du dernier message
 */
export function ChatList({
  conversations,
  selectedConversationId,
  onSelectConversation,
  currentUserId,
  userType,
}: ChatListProps) {
  const [searchQuery, setSearchQuery] = React.useState('');

  /**
   * Formatage de la date du dernier message
   */
  const formatLastMessageTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));

    if (diffInHours < 1) {
      return 'À l\'instant';
    } else if (diffInHours < 24) {
      return `Il y a ${diffInHours}h`;
    } else {
      return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
    }
  };

  /**
   * Obtient le nom de l'interlocuteur selon le type d'utilisateur
   */
  const getInterlocutorName = (conversation: Conversation) => {
    return userType === 'user' ? conversation.employeeName : conversation.userName;
  };

  /**
   * Filtre les conversations selon la recherche
   */
  const filteredConversations = conversations.filter((conv) => {
    const interlocutorName = getInterlocutorName(conv);
    return interlocutorName.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="w-full md:w-80 border-r border-border bg-card flex flex-col h-full">
      {/* En-tête de la liste */}
      <div className="p-4 border-b border-border">
        <h2 className="text-xl font-semibold mb-4">Messagerie</h2>

        {/* Barre de recherche */}
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

      {/* Liste des conversations */}
      <div className="flex-1 overflow-y-auto">
        {filteredConversations.length === 0 ? (
          <div className="p-4 text-center text-muted-foreground">
            {searchQuery ? 'Aucune conversation trouvée' : 'Aucune conversation'}
          </div>
        ) : (
          filteredConversations.map((conversation, index) => {
            const isSelected = conversation.id === selectedConversationId;
            const interlocutorName = getInterlocutorName(conversation);

            return (
              <motion.button
                key={conversation.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => onSelectConversation(conversation.id)}
                className={`w-full p-4 border-b border-border text-left transition-colors ${
                  isSelected ? 'bg-primary/10' : 'hover:bg-secondary'
                }`}
              >
                <div className="flex items-start gap-3">
                  {/* Avatar */}
                  <div className="size-10 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                    {userType === 'user' ? (
                      <UserCircle className="size-5 text-primary" />
                    ) : (
                      <User className="size-5 text-primary" />
                    )}
                  </div>

                  {/* Informations de la conversation */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-medium text-sm truncate">{interlocutorName}</h3>
                      <span className="text-xs text-muted-foreground flex-shrink-0 ml-2">
                        {formatLastMessageTime(conversation.lastMessageTime)}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <p className="text-sm text-muted-foreground truncate">
                        {conversation.lastMessage}
                      </p>
                      {conversation.unreadCount > 0 && (
                        <Badge className="ml-2 bg-primary text-primary-foreground flex-shrink-0">
                          {conversation.unreadCount}
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
