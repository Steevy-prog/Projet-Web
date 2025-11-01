import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'motion/react';
import { MessageCircle } from 'lucide-react';
import { useMessaging } from '../lib/messagingContext';
import { useEmployee } from '../lib/employeeContext';
import { ChatList } from '../components/messaging/ChatList';
import { ChatWindow } from '../components/messaging/ChatWindow';
import {echo} from '../lib/echo'

export function EmployeeMessaging() {
  const { employee } = useEmployee();
  const { conversations, isLoading, fetchMessages, sendMessage } = useMessaging();

  const [selectedContactId, setSelectedContactId] = useState<number | null>(null);
  const [conversationMessages, setConversationMessages] = useState<any[]>([]);
  const [showChatList, setShowChatList] = useState(true);

  const selectedConversation = useMemo(() => {
    if (!employee || selectedContactId === null) return null;
    return conversations.find(
      (conv) =>
        (conv.userId === selectedContactId && conv.employeeId === employee.id_employe) ||
        (conv.employeeId === selectedContactId && conv.userId === employee.id_employe)
    );
  }, [conversations, employee, selectedContactId]);

useEffect(() => {
  if (!employee) return;

  const channel = echo.channel(`chat.employee.${employee.id_employe}`);

  const listener = (event: any) => {
    if (event.conversationId === selectedContactId) {
      setConversationMessages(prev => [...prev, event.message]);
    }
  };

  channel.listen('.MessageSent', listener);

  return () => {
    channel.stopListening('.MessageSent', listener);
    echo.leaveChannel(`chat.employee.${employee.id_employe}`);
  };
}, [selectedContactId, employee]);

  useEffect(() => {
    if (selectedContactId !== null && employee) {
      fetchMessages(selectedContactId).then((msgs) => setConversationMessages(msgs));
    }
  }, [selectedContactId, fetchMessages, employee]);

  const handleSelectConversation = (conversationId: string) => {
    const contactId = Number(conversationId.split('_')[1]);
    setSelectedContactId(contactId);
    setShowChatList(false);
  };

  const handleSendMessage = (content: string) => {
    if (employee && selectedContactId !== null) {
      sendMessage(selectedContactId, content, 'employee');
    }
  };

  const handleBack = () => {
    setShowChatList(true);
    setSelectedContactId(null);
    setConversationMessages([]);
  };

  if (!employee || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <MessageCircle className="size-16 mx-auto mb-4 text-primary animate-pulse" />
          <p className="text-muted-foreground">Chargement des conversations...</p>
        </div>
      </div>
    );
  }

  const employeeConversations = conversations.filter(
    (conv) => conv.employeeId === employee.id_employe
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-4">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Messagerie</h1>
          <p className="text-muted-foreground">Gérez vos conversations avec les clients</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-3xl border border-border overflow-hidden"
          style={{ height: 'calc(100vh - 250px)', minHeight: '500px' }}
        >
          <div className="flex h-full">
            {/* Chat List */}
            <div className={`${showChatList ? 'block' : 'hidden'} md:block`}>
              <ChatList
                conversations={employeeConversations}
                selectedConversationId={selectedConversation?.id || null}
                onSelectConversation={handleSelectConversation}
                currentUserId={employee.id_employe}
                userType="employee"
              />
            </div>

            {/* Chat Window */}
            <div className={`flex-1 ${showChatList ? 'hidden' : 'block'} md:block`}>
              {selectedContactId !== null ? (
                <ChatWindow
                  conversation={selectedConversation}
                  messages={conversationMessages}
                  currentUserId={employee.id_employe}
                  userType="employee"
                  onSendMessage={handleSendMessage}
                  onBack={handleBack}
                />
              ) : (
                <div className="flex items-center justify-center h-full text-center p-8">
                  <p className="text-muted-foreground">Sélectionnez une conversation pour commencer à discuter.</p>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Empty State */}
        {employeeConversations.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mt-8 p-8 bg-secondary rounded-3xl"
          >
            <MessageCircle className="size-12 mx-auto mb-4 text-primary" />
            <h3 className="text-xl font-semibold mb-2">Aucune conversation</h3>
            <p className="text-muted-foreground">Vous n'avez pas encore de conversations avec les clients.</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}