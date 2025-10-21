import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Share2, Users, Gift, Copy, CheckCircle, Star, UserPlus, Save, Edit, X } from 'lucide-react';
import { useApp } from '../lib/context';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { toast } from 'sonner';

export function Referral() {
  const { user, createReferralCode } = useApp();
  const [copied, setCopied] = useState(false);
  const [customCode, setCustomCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasCode, setHasCode] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [tempCode, setTempCode] = useState('');

  // Vérifier si l'utilisateur a déjà un code
  useEffect(() => {
    if (user?.referralCode) {
      setCustomCode(user.referralCode);
      setHasCode(true);
    }
  }, [user]);

  const referralLink = hasCode ? `${window.location.origin}/home?ref=${customCode}` : '';
  
  const referralBonus = 100;
  
  // Statistiques
  const getReferralStats = () => {
    if (!user) return { referredCount: 0, earnedPoints: 0 };
    
    return {
      referredCount: user.referralCount || 0,
      earnedPoints: (user.referralCount || 0) * 100
    };
  };

  const stats = getReferralStats();

  const handleCopyLink = async () => {
    if (!hasCode) {
      toast.error('Veuillez d\'abord créer votre code de parrainage');
      return;
    }

    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      toast.success('Lien copié dans le presse-papier !');
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error('Erreur lors de la copie du lien');
    }
  };

  const shareLink = async () => {
    if (!hasCode) {
      toast.error('Veuillez d\'abord créer votre code de parrainage');
      return;
    }

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Rejoins moi sur Restaurant Zeduc Space',
          text: `Utilise mon code ${customCode} pour obtenir ${referralBonus} points de bonus !`,
          url: referralLink,
        });
      } catch (err) {
        handleCopyLink();
      }
    } else {
      handleCopyLink();
    }
  };

  const handleCreateCode = async () => {
    if (!customCode.trim()) {
      toast.error('Veuillez entrer un code');
      return;
    }

    if (customCode.length < 4) {
      toast.error('Le code doit contenir au moins 4 caractères');
      return;
    }

    // Vérifier que le code ne contient que des lettres et chiffres
    const codeRegex = /^[A-Z0-9]+$/;
    if (!codeRegex.test(customCode)) {
      toast.error('Le code ne doit contenir que des lettres majuscules et des chiffres');
      return;
    }

    setIsLoading(true);
    
    // CRÉER le code de parrainage
    const success = createReferralCode(customCode);
    
    if (success) {
      setHasCode(true);
      setIsEditing(false);
    }
    
    setIsLoading(false);
  };

  const handleEditCode = () => {
    setTempCode(customCode);
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setTempCode('');
  };

  const handleSaveEdit = async () => {
    if (!tempCode.trim()) {
      toast.error('Veuillez entrer un code');
      return;
    }

    if (tempCode.length < 4) {
      toast.error('Le code doit contenir au moins 4 caractères');
      return;
    }

    const codeRegex = /^[A-Z0-9]+$/;
    if (!codeRegex.test(tempCode)) {
      toast.error('Le code ne doit contenir que des lettres majuscules et des chiffres');
      return;
    }

    setIsLoading(true);
    
    // MODIFIER le code de parrainage
    const success = createReferralCode(tempCode);
    
    if (success) {
      setCustomCode(tempCode);
      setIsEditing(false);
      setTempCode('');
      toast.success('Code de parrainage modifié avec succès !');
    }
    
    setIsLoading(false);
  };

  const referralStats = [
    {
      icon: Users,
      label: 'Filleuls parrainés',
      value: stats.referredCount || 0,
      color: 'text-blue-500'
    },
    {
      icon: Gift,
      label: 'Points gagnés',
      value: stats.earnedPoints,
      color: 'text-green-500'
    },
    {
      icon: Star,
      label: 'Statut',
      value: hasCode ? 'Actif' : 'À créer',
      color: 'text-yellow-500'
    }
  ];

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl mb-4 text-foreground">Programme de Parrainage</h1>
          <p className="text-muted-foreground text-lg">
            Crée ton code de parrainage et gagne des points de fidélité !
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30 rounded-2xl p-8 mb-8"
        >
          <div className="text-center">
            <div className="inline-flex p-4 rounded-2xl bg-primary/20 mb-4">
              <Gift className="size-8 text-primary" />
            </div>
            <h2 className="text-2xl mb-2 text-foreground">
              {hasCode ? 'Ton code de parrainage est actif !' : 'Crée ton premier code de parrainage'}
            </h2>
            <p className="text-muted-foreground mb-6">
              {hasCode 
                ? 'Partage ton code et gagne 100 points pour chaque filleul !'
                : 'Personnalise ton code unique pour commencer à parrainer'
              }
            </p>

            {/* Section Création/Modification du Code de Parrainage */}
            <div className="bg-card border border-border rounded-2xl p-6 mb-6">
              <div className="mb-4">
                <p className="text-sm text-muted-foreground">
                  {hasCode ? 'Ton code de parrainage' : 'Crée ton code de parrainage'}
                </p>
              </div>

              {!hasCode ? (
                // MODE CRÉATION
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      value={customCode}
                      onChange={(e) => setCustomCode(e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, ''))}
                      placeholder="TONCODE123"
                      className="flex-1 text-lg uppercase font-mono text-center"
                      maxLength={10}
                      minLength={4}
                    />
                  </div>
                  
                  <Button
                    onClick={handleCreateCode}
                    disabled={isLoading || customCode.length < 4}
                    className="w-full rounded-lg bg-primary hover:bg-primary/90"
                    size="lg"
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="size-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                        Création...
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-2">
                        <Save className="size-4" />
                        Créer mon code de parrainage
                      </div>
                    )}
                  </Button>
                  
                  <div className="text-xs text-muted-foreground text-center space-y-1">
                    <p>{customCode.length < 4 
                      ? `Encore ${4 - customCode.length} caractères requis`
                      : '✓ Code valide'
                    }</p>
                    <p>Lettres majuscules et chiffres uniquement (4-10 caractères)</p>
                  </div>
                </div>
              ) : isEditing ? (
                // MODE MODIFICATION
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      value={tempCode}
                      onChange={(e) => setTempCode(e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, ''))}
                      placeholder="TONCODE123"
                      className="flex-1 text-lg uppercase font-mono text-center"
                      maxLength={10}
                      minLength={4}
                    />
                  </div>
                  
                  <div className="flex gap-2">
                    <Button
                      onClick={handleSaveEdit}
                      disabled={isLoading || tempCode.length < 4}
                      className="flex-1 rounded-lg bg-primary hover:bg-primary/90"
                    >
                      {isLoading ? (
                        <div className="flex items-center justify-center gap-2">
                          <div className="size-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                          Sauvegarde...
                        </div>
                      ) : (
                        <div className="flex items-center justify-center gap-2">
                          <Save className="size-4" />
                          Sauvegarder
                        </div>
                      )}
                    </Button>
                    <Button
                      onClick={handleCancelEdit}
                      variant="outline"
                      className="rounded-lg"
                    >
                      <X className="size-4 mr-2" />
                      Annuler
                    </Button>
                  </div>
                  
                  <div className="text-xs text-muted-foreground text-center space-y-1">
                    <p>{tempCode.length < 4 
                      ? `Encore ${4 - tempCode.length} caractères requis`
                      : '✓ Code valide'
                    }</p>
                    <p>Lettres majuscules et chiffres uniquement (4-10 caractères)</p>
                  </div>
                </div>
              ) : (
                // MODE AFFICHAGE
                <div className="space-y-4">
                  <div className="flex items-center justify-between bg-background rounded-2xl px-4 py-3">
                    <code className="text-2xl font-bold text-primary">{customCode}</code>
                    <div className="flex gap-2">
                      <Button
                        onClick={handleEditCode}
                        variant="outline"
                        size="sm"
                        className="rounded-full"
                      >
                        <Edit className="size-4" />
                        Modifier
                      </Button>
                      <Button
                        onClick={handleCopyLink}
                        variant="outline"
                        size="sm"
                        className="rounded-full"
                      >
                        {copied ? <CheckCircle className="size-4" /> : <Copy className="size-4" />}
                        {copied ? 'Copié !' : 'Copier'}
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button
                      onClick={shareLink}
                      className="flex-1 rounded-lg bg-primary hover:bg-primary/90"
                    >
                      <Share2 className="size-4 mr-2" />
                      Partager le lien
                    </Button>
                    <Button
                      onClick={handleCopyLink}
                      variant="outline"
                      className="flex-1 rounded-lg border-primary text-primary hover:bg-primary/10"
                    >
                      <Copy className="size-4 mr-2" />
                      Copier le lien
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          {referralStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-card border border-border rounded-2xl p-6 text-center">
                <div className={`inline-flex p-3 rounded-2xl bg-primary/10 mb-3 ${stat.color}`}>
                  <Icon className="size-6" />
                </div>
                <div className="text-2xl font-bold text-foreground mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-card border border-border rounded-2xl p-6"
        >
          <h3 className="text-xl mb-4 text-foreground">Comment ça marche ?</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-sm font-bold text-primary">1</span>
              </div>
              <div>
                <h4 className="font-semibold text-foreground">Crée ton code</h4>
                <p className="text-muted-foreground">Personnalise ton code de parrainage unique (minimum 4 caractères)</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-sm font-bold text-primary">2</span>
              </div>
              <div>
                <h4 className="font-semibold text-foreground">Partage ton code</h4>
                <p className="text-muted-foreground">Envoie ton code de parrainage à tes amis</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-sm font-bold text-primary">3</span>
              </div>
              <div>
                <h4 className="font-semibold text-foreground">Ils s'inscrivent</h4>
                <p className="text-muted-foreground">Tes amis utilisent ton code lors de leur inscription</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-sm font-bold text-primary">4</span>
              </div>
              <div>
                <h4 className="font-semibold text-foreground">Tu gagnes des points</h4>
                <p className="text-muted-foreground">Tu reçois 100 points de fidélité après leur première commande</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Section d'information pour les nouveaux utilisateurs */}
        {!hasCode && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mt-8"
          >
            <h4 className="font-semibold text-blue-800 mb-2">🎯 Important</h4>
            <p className="text-sm text-blue-700">
              <strong>Tu dois créer ton code de parrainage pour pouvoir parrainer tes amis.</strong><br/>
              Une fois créé, tu peux toujours le modifier si besoin !
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}