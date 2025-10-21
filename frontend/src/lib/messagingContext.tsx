import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import messagesData from '../data/messages.json';

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
 * Interface du contexte de messagerie
 */
interface MessagingContextType {
  conversations: Conversation[];
  messages: Message[];
  getConversationById: (conversationId: string) => Conversation | undefined;
  getMessagesByConversationId: (conversationId: string) => Message[];
  getConversationsByUserId: (userId: string) => Conversation[];
  getConversationsByEmployeeId: (employeeId: string) => Conversation[];
  sendMessage: (
    conversationId: string,
    senderId: string,
    senderName: string,
    senderType: 'user' | 'employee',
    content: string
  ) => void;
  markConversationAsRead: (conversationId: string, userId: string) => void;
  createConversation: (
    userId: string,
    userName: string,
    employeeId: string,
    employeeName: string
  ) => string;
  getUnreadCount: (userId: string, userType: 'user' | 'employee') => number;
}

const MessagingContext = createContext<MessagingContextType | undefined>(undefined);

/**
 * Clés localStorage pour la persistance des données
 */
const STORAGE_KEYS = {
  CONVERSATIONS: 'messaging_conversations',
  MESSAGES: 'messaging_messages',
};

/**
 * Provider du contexte de messagerie
 * Gère l'état global des conversations et messages avec persistance dans localStorage
 */
export function MessagingProvider({ children }: { children: ReactNode }) {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);

  /**
   * Charge les données depuis localStorage ou utilise les données par défaut
   */
  useEffect(() => {
    const storedConversations = localStorage.getItem(STORAGE_KEYS.CONVERSATIONS);
    const storedMessages = localStorage.getItem(STORAGE_KEYS.MESSAGES);

    if (storedConversations && storedMessages) {
      setConversations(JSON.parse(storedConversations));
      setMessages(JSON.parse(storedMessages));
    } else {
      // Utilise les données par défaut du fichier JSON
      setConversations(messagesData.conversations);
      setMessages(messagesData.messages);
    }
  }, []);

  /**
   * Sauvegarde les conversations dans localStorage à chaque modification
   */
  useEffect(() => {
    if (conversations.length > 0) {
      localStorage.setItem(STORAGE_KEYS.CONVERSATIONS, JSON.stringify(conversations));
    }
  }, [conversations]);

  /**
   * Sauvegarde les messages dans localStorage à chaque modification
   */
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(messages));
    }
  }, [messages]);

  /**
   * Récupère une conversation par son ID
   */
  const getConversationById = (conversationId: string): Conversation | undefined => {
    return conversations.find((conv) => conv.id === conversationId);
  };

  /**
   * Récupère tous les messages d'une conversation
   */
  const getMessagesByConversationId = (conversationId: string): Message[] => {
    return messages.filter((msg) => msg.conversationId === conversationId);
  };

  /**
   * Récupère toutes les conversations d'un utilisateur
   */
  const getConversationsByUserId = (userId: string): Conversation[] => {
    return conversations.filter((conv) => conv.userId === userId);
  };

  /**
   * Récupère toutes les conversations d'un employé
   */
  const getConversationsByEmployeeId = (employeeId: string): Conversation[] => {
    return conversations.filter((conv) => conv.employeeId === employeeId);
  };

  /**
   * Envoie un nouveau message
   */
  const sendMessage = (
    conversationId: string,
    senderId: string,
    senderName: string,
    senderType: 'user' | 'employee',
    content: string
  ) => {
    const newMessage: Message = {
      id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      conversationId,
      senderId,
      senderName,
      senderType,
      content,
      timestamp: new Date().toISOString(),
      read: false,
    };

    // Ajoute le nouveau message
    setMessages((prev) => [...prev, newMessage]);

    // Met à jour la conversation
    setConversations((prev) =>
      prev.map((conv) =>
        conv.id === conversationId
          ? {
              ...conv,
              lastMessage: content,
              lastMessageTime: newMessage.timestamp,
              unreadCount: senderType === 'user' ? conv.unreadCount : conv.unreadCount + 1,
            }
          : conv
      )
    );
  };

  /**
   * Marque tous les messages d'une conversation comme lus
   */
  const markConversationAsRead = (conversationId: string, userId: string) => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.conversationId === conversationId && msg.senderId !== userId
          ? { ...msg, read: true }
          : msg
      )
    );

    setConversations((prev) =>
      prev.map((conv) => (conv.id === conversationId ? { ...conv, unreadCount: 0 } : conv))
    );
  };

  /**
   * Crée une nouvelle conversation
   */
  const createConversation = (
    userId: string,
    userName: string,
    employeeId: string,
    employeeName: string
  ): string => {
    const newConversation: Conversation = {
      id: `conv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      userId,
      userName,
      employeeId,
      employeeName,
      lastMessage: '',
      lastMessageTime: new Date().toISOString(),
      unreadCount: 0,
    };

    setConversations((prev) => [...prev, newConversation]);
    return newConversation.id;
  };

  /**
   * Obtient le nombre total de messages non lus pour un utilisateur
   */
  const getUnreadCount = (userId: string, userType: 'user' | 'employee'): number => {
    const userConversations =
      userType === 'user'
        ? getConversationsByUserId(userId)
        : getConversationsByEmployeeId(userId);

    return userConversations.reduce((total, conv) => total + conv.unreadCount, 0);
  };

  const value: MessagingContextType = {
    conversations,
    messages,
    getConversationById,
    getMessagesByConversationId,
    getConversationsByUserId,
    getConversationsByEmployeeId,
    sendMessage,
    markConversationAsRead,
    createConversation,
    getUnreadCount,
  };

  return <MessagingContext.Provider value={value}>{children}</MessagingContext.Provider>;
}

/**
 * Hook personnalisé pour utiliser le contexte de messagerie
 */
export function useMessaging() {
  const context = useContext(MessagingContext);
  if (context === undefined) {
    throw new Error('useMessaging must be used within a MessagingProvider');
  }
  return context;
}
