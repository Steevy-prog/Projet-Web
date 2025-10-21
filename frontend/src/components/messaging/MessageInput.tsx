import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { motion } from 'motion/react';
import { Button } from '../ui/button';

/**
 * Props du composant MessageInput
 */
interface MessageInputProps {
  onSendMessage: (content: string) => void;
  disabled?: boolean;
}

/**
 * Composant MessageInput - Zone de saisie et d'envoi de messages
 * Permet à l'utilisateur de taper et envoyer des messages
 */
export function MessageInput({ onSendMessage, disabled = false }: MessageInputProps) {
  const [message, setMessage] = useState('');

  /**
   * Gère l'envoi du message
   */
  const handleSend = () => {
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  /**
   * Gère l'appui sur la touche Entrée
   */
  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="border-t border-border bg-card p-4">
      <div className="flex gap-3 items-end">
        {/* Zone de texte pour le message */}
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Tapez votre message..."
          disabled={disabled}
          className="flex-1 resize-none rounded-2xl border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px] max-h-[120px]"
          rows={1}
        />

        {/* Bouton d'envoi */}
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            onClick={handleSend}
            disabled={!message.trim() || disabled}
            className="rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground size-11 p-0 flex items-center justify-center"
          >
            <Send className="size-5" />
          </Button>
        </motion.div>
      </div>

      {/* Indication pour l'utilisateur */}
      <p className="text-xs text-muted-foreground mt-2">
        Appuyez sur Entrée pour envoyer, Shift+Entrée pour une nouvelle ligne
      </p>
    </div>
  );
}
