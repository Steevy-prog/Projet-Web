import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MessageCircle } from 'lucide-react';
import { useEmployee } from '../lib/employeeContext';
import { ChatList } from '../components/messaging/ChatList';
import { ChatWindow } from '../components/messaging/ChatWindow';
import { useMessaging } from '../lib/useMessaging'; 

/**
 * Page EmployeeMessaging - Interface de messagerie pour les employés
 * Permet aux employés de communiquer avec les clients du restaurant
 */
export function EmployeeMessaging() {
  const { employee } = useEmployee();
  const {
    getConversationsByEmployeeId,
    getMessagesByConversationId,
    getConversationById,
    sendMessage,
    markConversationAsRead,
  } = useMessaging();

  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);
  const [showChatList, setShowChatList] = useState(true);

  // Récupère les conversations de l'employé
  const employeeConversations = employee ? getConversationsByEmployeeId(employee.id) : [];
  const selectedConversation = selectedConversationId
    ? getConversationById(selectedConversationId)
    : null;
  const conversationMessages = selectedConversationId
    ? getMessagesByConversationId(selectedConversationId)
    : [];

  /**
   * Gère la sélection d'une conversation
   */
  const handleSelectConversation = (conversationId: string) => {
    setSelectedConversationId(conversationId);
    setShowChatList(false);

    // Marque la conversation comme lue
    if (employee) {
      markConversationAsRead(conversationId, employee.id);
    }
  };

  /**
   * Gère l'envoi d'un message
   */
  const handleSendMessage = (content: string) => {
    if (employee && selectedConversationId) {
      sendMessage(selectedConversationId, employee.id, employee.name, 'employee', content);
    }
  };

  /**
   * Gère le retour à la liste des conversations (mobile)
   */
  const handleBack = () => {
    setShowChatList(true);
    setSelectedConversationId(null);
  };

  // Si l'employé n'est pas connecté
  if (!employee) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center">
          <MessageCircle className="size-16 mx-auto mb-4 text-muted-foreground" />
          <h2 className="text-2xl font-bold mb-2">Messagerie Employé</h2>
          <p className="text-muted-foreground">Vous devez être connecté pour accéder à la messagerie</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-4">
        {/* En-tête de la page */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h1 className="text-3xl font-bold mb-2">Messagerie</h1>
          <p className="text-muted-foreground">
            Gérez vos conversations avec les clients
          </p>
        </motion.div>

        {/* Interface de messagerie */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-3xl border border-border overflow-hidden"
          style={{ height: 'calc(100vh - 250px)', minHeight: '500px' }}
        >
          <div className="flex h-full">
            {/* Liste des conversations (visible sur desktop ou si showChatList est true sur mobile) */}
            <div className={`${showChatList ? 'block' : 'hidden'} md:block`}>
              <ChatList
                conversations={employeeConversations}
                selectedConversationId={selectedConversationId}
                onSelectConversation={handleSelectConversation}
                currentUserId={employee.id}
                userType="employee"
              />
            </div>

            {/* Fenêtre de discussion (visible sur desktop ou si showChatList est false sur mobile) */}
            <div className={`flex-1 ${showChatList ? 'hidden' : 'block'} md:block`}>
              <ChatWindow
                conversation={selectedConversation || null}
                messages={conversationMessages}
                currentUserId={employee.id}
                userType="employee"
                onSendMessage={handleSendMessage}
                onBack={handleBack}
              />
            </div>
          </div>
        </motion.div>

        {/* Message d'information si aucune conversation */}
        {employeeConversations.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mt-8 p-8 bg-secondary rounded-3xl"
          >
            <MessageCircle className="size-12 mx-auto mb-4 text-primary" />
            <h3 className="text-xl font-semibold mb-2">Aucune conversation</h3>
            <p className="text-muted-foreground">
              Vous n'avez pas encore de conversations avec les clients.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
