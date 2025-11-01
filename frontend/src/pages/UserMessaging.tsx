// File: src/pages/UserMessaging.tsx
import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'motion/react';
import { MessageCircle, Plus } from 'lucide-react';
import { useMessaging } from '../lib/messagingContext';
import { useApp } from '../lib/context';
import { ChatList } from '../components/messaging/ChatList';
import { ChatWindow } from '../components/messaging/ChatWindow';
import { Button } from '../components/ui/button';
import {echo} from '../lib/echo'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../components/ui/dialog';
import { toast } from 'sonner';

export function UserMessaging() {
  const { user, employees } = useApp();
  const {
    conversations,
    isLoading,
    fetchMessages,
    sendMessage,
  } = useMessaging();

  const [selectedContactId, setSelectedContactId] = useState<number | null>(null);
  const [conversationMessages, setConversationMessages] = useState<any[]>([]);
  const [showChatList, setShowChatList] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Determine the currently selected conversation
  const selectedConversation = useMemo(() => {
    if (!user || selectedContactId === null) return null;

    return conversations.find(
      (conv) =>
        (conv.userId === user.id_utilisateur && conv.employeeId === selectedContactId) ||
        (conv.employeeId === user.id_utilisateur && conv.userId === selectedContactId)
    );
  }, [conversations, user, selectedContactId]);

useEffect(() => {
  if (!user) return;

  // Subscribe to a channel specific to the user
  const channel = echo.channel(`chat.user.${user.id_utilisateur}`);

  const listener = (event: any) => {
    // Only update messages if it belongs to the currently selected conversation
    if (event.conversationId === selectedContactId) {
      setConversationMessages(prev => [...prev, event.message]);
    }
  };

  channel.listen('.MessageSent', listener);

  // Clean up on unmount or when selectedContactId changes
  return () => {
    channel.stopListening('.MessageSent', listener);
    echo.leaveChannel(`chat.user.${user.id_utilisateur}`);
  };
}, [selectedContactId, user]);

  // Load messages when a conversation is selected
  useEffect(() => {
    if (selectedContactId !== null && user) {
      fetchMessages(selectedContactId).then((msgs) => {
        setConversationMessages(msgs);
      });
    }
  }, [selectedContactId, fetchMessages, user]);

  /** Handle selecting a conversation (by contact ID) */
/** Handle selecting a conversation */
const handleSelectConversation = (conversationId: string) => {
  // Find the conversation by ID
  const conversation = conversations.find((c) => c.id === conversationId);

  if (!conversation || !user) return;

  // Determine the contact’s ID (the other party)
  const contactId =
    user.id_utilisateur === conversation.userId
      ? conversation.employeeId
      : conversation.userId;

  setSelectedContactId(contactId);
  setShowChatList(false);

  fetchMessages(contactId).then((msgs) => {
    setConversationMessages(msgs);
  });
};

  /** Handle sending a message */
  const handleSendMessage = (content: string) => {
    if (user && selectedContactId !== null) {
      sendMessage(selectedContactId, content, 'user');
    }
  };

  /** Return to conversation list (mobile) */
  const handleBack = () => {
    setShowChatList(true);
    setSelectedContactId(null);
    setConversationMessages([]);
  };

  /** Create or open a conversation */
  const handleCreateConversation = (employeeId: number, employeeName: string) => {
    if (!user) return;

    setSelectedContactId(employeeId);
    setShowChatList(false);
    setIsDialogOpen(false);

    fetchMessages(employeeId).then((msgs) => {
      setConversationMessages(msgs);
      toast.info(`Conversation avec ${employeeName} ouverte`);
    });
  };

  // Show loading state
  if (!user || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <MessageCircle className="size-16 mx-auto mb-4 text-primary animate-pulse" />
          <p className="text-muted-foreground">Chargement des conversations...</p>
        </div>
      </div>
    );
  }

  // Filter conversations belonging to current user
  const userConversations = conversations.filter(
    (conv) => conv.userId === user.id_utilisateur
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 flex items-center justify-between"
        >
          <div>
            <h1 className="text-3xl font-bold mb-2">Messagerie</h1>
            <p className="text-muted-foreground">
              Communiquez directement avec notre équipe
            </p>
          </div>

          {/* New Conversation Button */}
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="rounded-2xl">
                <Plus className="size-4 mr-2" />
                Nouvelle conversation
              </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Contacter un employé</DialogTitle>
                <DialogDescription>
                  Sélectionnez un employé pour démarrer une conversation
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-2 py-4">
                {employees.map((employee) => (
                  <Button
                    key={employee.id_employe}
                    variant="outline"
                    className="justify-start rounded-2xl text-left"
                    onClick={() =>
                      handleCreateConversation(
                        employee.id_employe!,
                        `${employee.nom} ${employee.prenom}`
                      )
                    }
                  >
                    👤 {employee.nom} {employee.prenom}
                  </Button>
                ))}
              </div>
            </DialogContent>
          </Dialog>
        </motion.div>

        {/* Messaging Interface */}
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
                conversations={userConversations}
                selectedConversationId={selectedConversation?.id || null}
                onSelectConversation={handleSelectConversation}
                currentUserId={user.id_utilisateur}
                userType="user"
              />
            </div>

            {/* Chat Window */}
            <div className={`flex-1 ${showChatList ? 'hidden' : 'block'} md:block`}>
              {selectedConversation ? (
                <ChatWindow
                  conversation={selectedConversation}
                  messages={conversationMessages}
                  currentUserId={user.id_utilisateur}
                  userType="user"
                  onSendMessage={handleSendMessage}
                  onBack={handleBack}
                />
              ) : (
                <div className="flex items-center justify-center h-full text-center p-8">
                  <p className="text-muted-foreground">
                    Sélectionnez une conversation pour commencer à discuter.
                  </p>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Empty State */}
        {userConversations.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mt-8 p-8 bg-secondary rounded-3xl"
          >
            <p className="text-muted-foreground">
              Vous n'avez encore aucune conversation. Cliquez sur "Nouvelle
              conversation" pour démarrer une discussion avec un employé.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}