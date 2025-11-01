import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Share2, Users, Gift, Copy, CheckCircle, Star, UserPlus, ArrowLeft } from 'lucide-react';
import { useApp } from '../lib/context';
import { useNavigation } from '../lib/navigationContext';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { toast } from 'sonner';
import { usePageLoading } from '../hooks/usePageLoading';
import Loading from './loading';

type ReferralStatus = 'pending' | 'registered' | 'completed';

interface ReferralUser {
  id: string;
  name: string;
  email: string;
  status: ReferralStatus;
  date: string;
  bonusEarned?: number;
}

export function Referral() {
  const { user } = useApp();
  const { navigate } = useNavigation();
  const [pageLoading] = usePageLoading(1000);
  const [copied, setCopied] = useState(false);
  const [referralUsers, setReferralUsers] = useState<ReferralUser[]>([]);
  
  // Générer un code de parrainage basé sur l'ID utilisateur
  const referralCode = user?.id_utilisateur ? `ZEDUC${String(user.id_utilisateur).slice(0, 5).toUpperCase()}` : '';
  const referralLink = `${window.location.origin}/register?ref=${referralCode}`;
  
  // Données factices pour les filleuls (à remplacer par un appel API réel)
  useEffect(() => {
    if (user) {
      // Simuler un chargement des données
      const mockReferrals: ReferralUser[] = [
        {
          id: '1',
          name: 'Jean Dupont',
          email: 'jean.dupont@example.com',
          status: 'completed',
          date: '2023-10-15',
          bonusEarned: 100
        },
        {
          id: '2',
          name: 'Marie Martin',
          email: 'marie.martin@example.com',
          status: 'registered',
          date: '2023-11-01',
          bonusEarned: 50
        },
        {
          id: '3',
          name: 'Pierre Bernard',
          email: 'pierre.bernard@example.com',
          status: 'pending',
          date: '2023-11-10'
        }
      ];
      
      setReferralUsers(mockReferrals);
    }
  }, [user]);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      toast.success('Lien copié dans le presse-papiers !');
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error('Erreur lors de la copie du lien');
    }
  };

  const shareLink = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Rejoins-moi sur Zeduc Space',
          text: `Utilise mon code ${referralCode} pour obtenir 100 points de bonus !`,
          url: referralLink,
        });
      } catch (err) {
        handleCopyLink();
      }
    } else {
      handleCopyLink();
    }
  };

  const getStatusBadge = (status: ReferralStatus) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Bonus activé</Badge>;
      case 'registered':
        return <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">Inscrit</Badge>;
      case 'pending':
      default:
        return <Badge variant="outline">En attente</Badge>;
    }
  };

  if (pageLoading) {
    return <Loading />;
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Veuillez vous connecter pour accéder à la page de parrainage.</p>
      </div>
    );
  }

  const completedReferrals = referralUsers.filter(u => u.status === 'completed').length;
  const totalBonus = referralUsers.reduce((sum, user) => sum + (user.bonusEarned || 0), 0);

  return (
    <div className="min-h-screen py-12 px-4 relative">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex items-center gap-4"
        >
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => navigate('dashboard')}
            className="rounded-full"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Programme de parrainage</h1>
            <p className="text-muted-foreground">Parrainez vos amis et gagnez des récompenses</p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Carte du code de parrainage */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Votre code de parrainage</CardTitle>
              <CardDescription>
                Partagez ce code avec vos amis pour obtenir des avantages exclusifs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col space-y-4">
                <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                  <code className="font-mono text-lg font-bold">{referralCode}</code>
                  <Button 
                    variant={copied ? "default" : "outline"} 
                    size="sm" 
                    onClick={handleCopyLink}
                    className="gap-2"
                  >
                    {copied ? (
                      <>
                        <CheckCircle className="h-4 w-4" />
                        Copié !
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4" />
                        Copier le lien
                      </>
                    )}
                  </Button>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <Button variant="outline" className="gap-2" onClick={shareLink}>
                    <Share2 className="h-4 w-4" />
                    Partager
                  </Button>
                  <Button variant="default" className="gap-2">
                    <UserPlus className="h-4 w-4" />
                    Inviter par email
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Carte des statistiques */}
          <Card>
            <CardHeader>
              <CardTitle>Vos statistiques</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Filleuls actifs</span>
                  <span className="font-bold">{completedReferrals}/{referralUsers.length}</span>
                </div>
                <Progress value={(completedReferrals / Math.max(referralUsers.length, 1)) * 100} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Points gagnés</span>
                  <span className="font-bold flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    {totalBonus} pts
                  </span>
                </div>
                <Progress value={(totalBonus / 500) * 100} className="h-2" />
                <p className="text-xs text-muted-foreground">
                  Plus que {500 - totalBonus} points pour débloquer une récompense spéciale
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Liste des filleuls */}
        <Card>
          <CardHeader>
            <CardTitle>Vos filleuls</CardTitle>
            <CardDescription>
              Suivez l'activité des personnes que vous avez parrainées
            </CardDescription>
          </CardHeader>
          <CardContent>
            {referralUsers.length > 0 ? (
              <div className="space-y-4">
                {referralUsers.map((refUser) => (
                  <div key={refUser.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <p className="font-medium">{refUser.name}</p>
                      <p className="text-sm text-muted-foreground">{refUser.email}</p>
                      <div className="flex items-center gap-2 mt-1">
                        {getStatusBadge(refUser.status)}
                        <span className="text-xs text-muted-foreground">Inscrit le {new Date(refUser.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                    {refUser.bonusEarned && (
                      <div className="flex items-center gap-1 text-yellow-600 dark:text-yellow-400 font-medium">
                        <Star className="h-4 w-4 fill-current" />
                        +{refUser.bonusEarned} pts
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">Aucun filleul pour le moment</h3>
                <p className="text-muted-foreground text-sm mt-1">
                  Partagez votre code de parrainage pour inviter vos amis
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Section d'information */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Comment ça marche ?</CardTitle>
          </CardHeader>
          <CardContent className="grid md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 font-medium">
                <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary/10 text-primary">1</div>
                <h3>Partagez votre code</h3>
              </div>
              <p className="text-sm text-muted-foreground pl-10">
                Partagez votre code de parrainage avec vos amis via les réseaux sociaux, email ou message.
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 font-medium">
                <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary/10 text-primary">2</div>
                <h3>Ils s'inscrivent</h3>
              </div>
              <p className="text-sm text-muted-foreground pl-10">
                Vos amis s'inscrivent en utilisant votre code et effectuent leur première commande.
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 font-medium">
                <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary/10 text-primary">3</div>
                <h3>Gagnez des récompenses</h3>
              </div>
              <p className="text-sm text-muted-foreground pl-10">
                Recevez des points de fidélité pour chaque filleul actif et débloquez des avantages exclusifs.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
