import { useState } from 'react';

export interface Conversation {
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

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  senderType: 'user' | 'employee';
  content: string;
  timestamp: string;
  read: boolean;
}

export function useMessaging() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [messages, setMessages] = useState<Record<string, Message[]>>({});

  const getConversationsByEmployeeId = (employeeId: string): Conversation[] => {
    return conversations.filter(conv => conv.employeeId === employeeId);
  };

  const getConversationsByUserId = (userId: string): Conversation[] => {
    return conversations.filter(conv => conv.userId === userId);
  };

  const getConversationById = (conversationId: string): Conversation | undefined => {
    return conversations.find(conv => conv.id === conversationId);
  };

  const getMessagesByConversationId = (conversationId: string): Message[] => {
    return messages[conversationId] || [];
  };

  const sendMessage = (
    conversationId: string,
    senderId: string,
    senderName: string,
    senderType: 'user' | 'employee',
    content: string
  ) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      conversationId,
      senderId,
      senderName,
      senderType,
      content,
      timestamp: new Date().toISOString(),
      read: false,
    };

    setMessages(prev => ({
      ...prev,
      [conversationId]: [...(prev[conversationId] || []), newMessage]
    }));
    
    setConversations(prev => 
      prev.map(conv => 
        conv.id === conversationId 
          ? { 
              ...conv, 
              lastMessage: content,
              lastMessageTime: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              unreadCount: senderType === 'user' ? conv.unreadCount + 1 : 0
            }
          : conv
      )
    );
  };

  const markConversationAsRead = (conversationId: string, userId: string) => {
    setConversations(prev =>
      prev.map(conv =>
        conv.id === conversationId
          ? { ...conv, unreadCount: 0 }
          : conv
      )
    );
  };

  const createConversation = (
    userId: string,
    userName: string,
    employeeId: string,
    employeeName: string,
    welcomeMessage?: string
  ): string => {
    const newConversation: Conversation = {
      id: Date.now().toString(),
      userId,
      userName,
      employeeId,
      employeeName,
      unreadCount: 0,
      updatedAt: new Date().toISOString(),
    };

    setConversations(prev => [...prev, newConversation]);
    
    const initialMessages: Message[] = [];
    
    if (welcomeMessage) {
      const welcomeMsg: Message = {
        id: (Date.now() + 1).toString(),
        conversationId: newConversation.id,
        senderId: employeeId,
        senderName: employeeName,
        senderType: 'employee',
        content: welcomeMessage,
        timestamp: new Date().toISOString(),
        read: false,
      };
      initialMessages.push(welcomeMsg);
      
      setMessages(prev => ({
        ...prev,
        [newConversation.id]: initialMessages
      }));
    }

    return newConversation.id;
  };

  return {
    getConversationsByEmployeeId,
    getConversationsByUserId,
    getConversationById,
    getMessagesByConversationId,
    sendMessage,
    markConversationAsRead,
    createConversation,
  };
}