import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { MessageCircle, Plus, CheckCircle2 } from 'lucide-react';
import { useApp } from '../lib/context';
import { ChatList } from '../components/messaging/ChatList';
import { ChatWindow } from '../components/messaging/ChatWindow';
import { Button } from '../components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../components/ui/dialog';
import { toast } from 'sonner';
import { useMessaging } from '../lib/useMessaging';
import { useEmployee } from '../lib/employeeContext';

export function UserMessaging() {
  const { user } = useApp();
  const { employees: allEmployees } = useEmployee();
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

  // CORRECTION : Utiliser un filtre plus robuste
  const availableEmployees = allEmployees.filter(emp => {
    const roleNormalized = String(emp.role).toLowerCase().trim();
    return roleNormalized === 'employe' || roleNormalized === 'employee';
  });

  const userConversations = user ? getConversationsByUserId(user.id) : [];
  const selectedConversation = selectedConversationId
    ? getConversationById(selectedConversationId)
    : null;
  const conversationMessages = selectedConversationId
    ? getMessagesByConversationId(selectedConversationId)
    : [];

  const handleSelectConversation = (conversationId: string) => {
    setSelectedConversationId(conversationId);
    setShowChatList(false);

    if (user) {
      markConversationAsRead(conversationId, user.id);
    }
  };

  const handleSendMessage = (content: string) => {
    if (user && selectedConversationId) {
      sendMessage(selectedConversationId, user.id, user.name, 'user', content);
    }
  };

  const handleBack = () => {
    setShowChatList(true);
    setSelectedConversationId(null);
  };

  const handleCreateConversation = (employeeId: string, employeeName: string) => {
    if (!user) return;

    const existingConversation = userConversations.find(
      (conv) => conv.employeeId === employeeId
    );

    if (existingConversation) {
      setSelectedConversationId(existingConversation.id);
      setShowChatList(false);
      setIsDialogOpen(false);
      markConversationAsRead(existingConversation.id, user.id);
      toast.success(`Conversation avec ${employeeName} rouverte`);
      return;
    }

    const newConversationId = createConversation(
      user.id,
      user.name,
      employeeId,
      employeeName,
      `Bonjour ! Je suis ${employeeName}. Comment puis-je vous aider aujourd'hui ? 😊`
    );

    setSelectedConversationId(newConversationId);
    setShowChatList(false);
    setIsDialogOpen(false);
    toast.success(`Conversation avec ${employeeName} créée`);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center">
          <MessageCircle className="size-16 mx-auto mb-4 text-muted-foreground" />
          <h2 className="text-2xl font-bold mb-2">Messagerie Étudiant</h2>
          <p className="text-muted-foreground">Vous devez être connecté pour accéder à la messagerie</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 flex items-center justify-between"
        >
          <div>
            <h1 className="text-3xl font-bold mb-2">Messagerie Étudiant</h1>
            <p className="text-muted-foreground">
              Communiquez directement avec l'équipe du restaurant
            </p>
          </div>

          {/* SOLUTION : Bouton simple sans DialogTrigger complexe */}
          <Button 
            onClick={() => setIsDialogOpen(true)} 
            className="rounded-2xl bg-primary hover:bg-primary/90"
          >
            <Plus className="size-4 mr-2" />
            Nouvelle conversation
          </Button>
        </motion.div>

        {/* Dialog séparé */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Choisir un employé</DialogTitle>
              <DialogDescription>
                Sélectionnez un membre de notre équipe pour démarrer une conversation
              </DialogDescription>
            </DialogHeader>
            
            <div className="mt-4 space-y-2 max-h-80 overflow-y-auto">
              {availableEmployees.length > 0 ? (
                availableEmployees.map((employee) => {
                  const existingConversation = userConversations.find(
                    conv => conv.employeeId === employee.id
                  );
                  
                  return (
                    <div
                      key={employee.id}
                      className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                      onClick={() => handleCreateConversation(employee.id, employee.name)}
                    >
                      <div className="size-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-blue-600 dark:text-blue-400 font-bold text-sm">
                          {employee.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-foreground truncate">
                            {employee.name}
                          </h3>
                          {existingConversation && (
                            <CheckCircle2 className="size-4 text-green-500 flex-shrink-0" />
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">Employé</p>
                      </div>

                      {existingConversation && (
                        <div className="text-xs text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded-full">
                          Déjà parlé
                        </div>
                      )}
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <MessageCircle className="size-12 mx-auto mb-3 opacity-50" />
                  <p>Aucun employé disponible</p>
                  <p className="text-sm mt-2">
                    {allEmployees.length > 0 
                      ? `Il y a ${allEmployees.length} employés mais aucun avec le rôle "employe"`
                      : 'Aucun employé dans le système'
                    }
                  </p>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>

        {/* Interface principale de messagerie */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-3xl border border-border overflow-hidden"
          style={{ height: 'calc(100vh - 200px)', minHeight: '500px' }}
        >
          <div className="flex h-full">
            {/* Liste des conversations */}
            {showChatList && (
              <div className={`flex md:flex ${selectedConversationId ? 'md:w-80' : 'md:w-full'} flex-col w-full`}>
                <ChatList
                  conversations={userConversations}
                  selectedConversationId={selectedConversationId}
                  onSelectConversation={handleSelectConversation}
                  currentUserId={user.id}
                  userType="user"
                />
              </div>
            )}

            {/* Fenêtre de chat */}
            {!showChatList && selectedConversation && (
              <div className="flex flex-1 flex-col w-full">
                <ChatWindow
                  conversation={selectedConversation}
                  messages={conversationMessages}
                  currentUserId={user.id}
                  userType="user"
                  onSendMessage={handleSendMessage}
                  onBack={handleBack}
                />
              </div>
            )}

            {/* Aucune conversation sélectionnée */}
            {showChatList && !selectedConversationId && userConversations.length > 0 && (
              <div className="hidden md:flex flex-1 flex-col items-center justify-center">
                <div className="text-center">
                  <MessageCircle className="size-16 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-xl font-semibold mb-2">Aucune conversation sélectionnée</h3>
                  <p className="text-muted-foreground">
                    Sélectionnez une conversation dans la liste
                  </p>
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Message si aucune conversation n'existe */}
        {userConversations.length === 0 && !selectedConversationId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mt-8 p-8 bg-secondary rounded-3xl"
          >
            <MessageCircle className="size-12 mx-auto mb-4 text-primary" />
            <h3 className="text-xl font-semibold mb-2">Aucune conversation</h3>
            <p className="text-muted-foreground mb-4">
              Commencez une conversation avec notre équipe
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