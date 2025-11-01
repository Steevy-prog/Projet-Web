import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import axios from 'axios';
import { Conversation, Message } from './types';
import { useApp } from './context';
import { echo } from './echo';

interface MessagingContextType {
  conversations: Conversation[];
  isLoading: boolean;
  fetchConversations: (authId: number) => Promise<void>;
  fetchMessages: (contactId: number) => Promise<Message[]>;
  sendMessage: (receiverId: number, content: string, senderType: 'user' | 'employee') => Promise<void>;
  markConversationAsRead: (contactId: number, authId: number) => Promise<void>;
  getUnreadCount: (authId: number) => number;
}

const MessagingContext = createContext<MessagingContextType | undefined>(undefined);

export function MessagingProvider({ children }: { children: ReactNode }) {
  const { user } = useApp();
  const authId = user?.id_utilisateur;

  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // 🧩 Utility: Normalize incoming messages from API or Echo
  const formatIncomingMessage = (msg: any): Message => {
    const isUser = !!msg.sender?.id_utilisateur;

    return {
      id: msg.id?.toString() ?? crypto.randomUUID(),
      conversationId: `conv_${msg.sender_id === authId ? msg.receiver_id : msg.sender_id}`,
      senderId: msg.sender_id,
      receiverId: msg.receiver_id,
      senderName: isUser
        ? `${msg.sender.prenom ?? ''} ${msg.sender.nom ?? ''}`
        : msg.sender?.name ?? 'Employé inconnu',
      senderType: isUser ? 'user' : 'employee',
      content: msg.message ?? '',
      timestamp: msg.created_at ?? new Date().toISOString(),
      read: !!msg.is_read,
    };
  };

  // 🧩 Fetch all conversations
  const fetchConversations = useCallback(async (currentAuthId: number) => {
    if (!currentAuthId) return;
    setIsLoading(true);

    try {
      const response = await axios.get('/api/messages/conversations');
      console.log('[Messaging] Conversations response:', response.data);

      const convData = Array.isArray(response.data)
        ? response.data
        : Array.isArray(response.data.conversations)
        ? response.data.conversations
        : [];

      setConversations(convData);
    } catch (error) {
      console.error('❌ Failed to fetch conversations:', error);
      setConversations([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // 🧩 Fetch messages from a conversation
  const fetchMessages = useCallback(async (contactId: number): Promise<Message[]> => {
    try {
      const response = await axios.get(`/api/messages/contact/${contactId}`);

      setConversations(prev => {
        const safePrev = Array.isArray(prev) ? prev : [];
        return safePrev.map(conv =>
          conv.id === `conv_${contactId}` ? { ...conv, unreadCount: 0 } : conv
        );
      });

      const messages = Array.isArray(response.data)
        ? response.data.map(formatIncomingMessage)
        : [];

      return messages;
    } catch (error) {
      console.error('❌ Failed to fetch messages:', error);
      return [];
    }
  }, []);

  // 🧩 Send a message
  const sendMessage = useCallback(async (receiverId: number, content: string, senderType: 'user' | 'employee') => {
    try {
      await axios.post('/api/messages', { receiver_id: receiverId, message: content });
      // Real-time listener will update the UI automatically
    } catch (error) {
      console.error('❌ Failed to send message:', error);
    }
  }, []);

  // 🧩 Mark a conversation as read
  const markConversationAsRead = useCallback(async (contactId: number, currentAuthId: number) => {
    await fetchMessages(contactId);
  }, [fetchMessages]);

  // 🧩 Real-time updates
  useEffect(() => {
    if (!authId) return;

    const channel = echo.private(`user.${authId}`);

    const handleNewMessage = (event: { message: any }) => {
      const newMessage = formatIncomingMessage(event.message);
      const contactId =
        newMessage.senderId === authId ? newMessage.receiverId : newMessage.senderId;
      const conversationId = `conv_${contactId}`;

      setConversations(prev => {
        const safePrev = Array.isArray(prev) ? prev : [];
        const existingIndex = safePrev.findIndex(c => c.id === conversationId);
        const updated = [...safePrev];
        const lastMessageContent = newMessage.content;
        const isFromContact = newMessage.senderId !== authId;

        if (existingIndex >= 0) {
          const existingConv = updated[existingIndex];
          updated[existingIndex] = {
            ...existingConv,
            lastMessage: lastMessageContent,
            lastMessageTime: newMessage.timestamp,
            unreadCount: isFromContact
              ? (existingConv.unreadCount ?? 0) + 1
              : existingConv.unreadCount ?? 0,
          };
        } else {
          // Create new conversation dynamically if missing
          updated.push({
            id: conversationId,
            userId: contactId,
            lastMessage: lastMessageContent,
            lastMessageTime: newMessage.timestamp,
            unreadCount: isFromContact ? 1 : 0,
          } as Conversation);
        }

        return updated;
      });

      // Optional: Notify user here (toast, sound, etc.)
      // if (newMessage.senderId !== authId) toast.info(`Nouveau message de ${newMessage.senderName}`);
    };

    channel.listen('.message.new', handleNewMessage);

    return () => {
      channel.stopListening('.message.new', handleNewMessage);
      echo.leave(`user.${authId}`);
    };
  }, [authId]);

  // 🧩 Load conversations when user logs in
  useEffect(() => {
    if (authId) fetchConversations(authId);
  }, [authId, fetchConversations]);

  // 🧩 Compute unread messages count safely
  const getUnreadCount = (currentAuthId: number): number => {
    const safeConversations = Array.isArray(conversations) ? conversations : [];
    return safeConversations.reduce((total, conv) => total + (conv.unreadCount ?? 0), 0);
  };

  // 🧩 Context value
  const value: MessagingContextType = {
    conversations: Array.isArray(conversations) ? conversations : [],
    isLoading,
    fetchConversations,
    fetchMessages,
    sendMessage,
    markConversationAsRead,
    getUnreadCount,
  };

  return <MessagingContext.Provider value={value}>{children}</MessagingContext.Provider>;
}

// --- Hook ---
export function useMessaging() {
  const context = useContext(MessagingContext);
  if (context === undefined) {
    throw new Error('useMessaging must be used within a MessagingProvider');
  }
  return context;
}