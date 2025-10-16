import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { MessageCircle, Plus } from 'lucide-react';
import { useMessaging } from '../lib/messagingContext';
import { useApp } from '../lib/context';
import { useEmployee } from '../lib/employeeContext';
import { ChatList } from '../components/messaging/ChatList';
import { ChatWindow } from '../components/messaging/ChatWindow';
import { Button } from '../components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../components/ui/dialog';
import { toast } from 'sonner';

/**
 * Page UserMessaging - Interface de messagerie pour les utilisateurs
 * Permet aux utilisateurs de communiquer avec les employés du restaurant
 */
export function UserMessaging() {
  const { user } = useApp();
  const { employees } = useEmployee();
  const {
    getConversationsByUserId,
    getMessagesByConversationId,
    getConversationById,
    sendMessage,
    markConversationAsRead,
    createConversation,
  } = useMessaging();

  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);
  const [showChatList, setShowChatList] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Récupère les conversations de l'utilisateur
  const userConversations = user ? getConversationsByUserId(user.id) : [];
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
    if (user) {
      markConversationAsRead(conversationId, user.id);
    }
  };

  /**
   * Gère l'envoi d'un message
   */
  const handleSendMessage = (content: string) => {
    if (user && selectedConversationId) {
      sendMessage(selectedConversationId, user.id, user.name, 'user', content);
    }
  };

  /**
   * Gère le retour à la liste des conversations (mobile)
   */
  const handleBack = () => {
    setShowChatList(true);
    setSelectedConversationId(null);
  };

  /**
   * Crée une nouvelle conversation avec un employé
   */
  const handleCreateConversation = (employeeId: string, employeeName: string) => {
    if (!user) return;

    // Vérifie si une conversation existe déjà avec cet employé
    const existingConversation = userConversations.find(
      (conv) => conv.employeeId === employeeId
    );

    if (existingConversation) {
      setSelectedConversationId(existingConversation.id);
      setShowChatList(false);
      setIsDialogOpen(false);
      toast.info('Conversation existante ouverte');
      return;
    }

    // Crée une nouvelle conversation
    const newConversationId = createConversation(
      user.id,
      user.name,
      employeeId,
      employeeName
    );

    setSelectedConversationId(newConversationId);
    setShowChatList(false);
    setIsDialogOpen(false);
    toast.success(`Conversation avec ${employeeName} créée`);
  };

  // Si l'utilisateur n'est pas connecté
  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center">
          <MessageCircle className="size-16 mx-auto mb-4 text-muted-foreground" />
          <h2 className="text-2xl font-bold mb-2">Messagerie</h2>
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
          className="mb-6 flex items-center justify-between"
        >
          <div>
            <h1 className="text-3xl font-bold mb-2">Messagerie</h1>
            <p className="text-muted-foreground">
              Communiquez directement avec notre équipe
            </p>
          </div>

          {/* Bouton pour créer une nouvelle conversation */}
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
                    key={employee.id}
                    variant="outline"
                    className="justify-start rounded-2xl"
                    onClick={() => handleCreateConversation(employee.id, employee.name)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-sm text-primary">{employee.name.charAt(0)}</span>
                      </div>
                      <div className="text-left">
                        <p className="font-medium">{employee.name}</p>
                        <p className="text-xs text-muted-foreground capitalize">{employee.role}</p>
                      </div>
                    </div>
                  </Button>
                ))}
              </div>
            </DialogContent>
          </Dialog>
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
                conversations={userConversations}
                selectedConversationId={selectedConversationId}
                onSelectConversation={handleSelectConversation}
                currentUserId={user.id}
                userType="user"
              />
            </div>

            {/* Fenêtre de discussion (visible sur desktop ou si showChatList est false sur mobile) */}
            <div className={`flex-1 ${showChatList ? 'hidden' : 'block'} md:block`}>
              <ChatWindow
                conversation={selectedConversation || null}
                messages={conversationMessages}
                currentUserId={user.id}
                userType="user"
                onSendMessage={handleSendMessage}
                onBack={handleBack}
              />
            </div>
          </div>
        </motion.div>

        {/* Message d'information si aucune conversation */}
        {userConversations.length === 0 && !selectedConversationId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mt-8 p-8 bg-secondary rounded-3xl"
          >
            <MessageCircle className="size-12 mx-auto mb-4 text-primary" />
            <h3 className="text-xl font-semibold mb-2">Aucune conversation</h3>
            <p className="text-muted-foreground mb-4">
              Vous n'avez pas encore de conversations. Cliquez sur "Nouvelle conversation" pour commencer !
            </p>
            <Button onClick={() => setIsDialogOpen(true)} className="rounded-2xl">
              <Plus className="size-4 mr-2" />
              Démarrer une conversation
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
