import React, { useEffect, useMemo, useState, useCallback } from 'react';
import { motion } from 'motion/react';
import { Trophy, Medal, Crown, TrendingUp } from 'lucide-react';
import { useApp } from '../lib/context';
import { echo } from '../lib/echo';
import { LeaderbordUtil } from '../lib/types';

export function Leaderboard() {
  const { user, users } = useApp();
  const [localUsers, setLocalUsers] = useState<LeaderbordUtil[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize with context users
  useEffect(() => {
    if (users && users.length > 0) {
      // Ensure numeric fields are normalized on init
      const sanitized = users.map(u => ({
        ...u,
        loyaltyPoints: typeof u.loyaltyPoints === 'number' && !isNaN(u.loyaltyPoints)
          ? u.loyaltyPoints
          : Number(u.loyaltyPoints ?? 0) || 0,
        gamesPlayed: typeof u.gamesPlayed === 'number' && !isNaN(u.gamesPlayed)
          ? u.gamesPlayed
          : Number(u.gamesPlayed ?? 0) || 0,
      }));
      setLocalUsers(sanitized);
      setIsLoading(false);
    }
  }, [users]);

  /**
   * handleUserUpdate - smart update logic
   * - Accepts absolute values (loyaltyPoints or gamesPlayed)
   * - Accepts deltas (pointsDelta / gamesDelta) and applies them to existing user
   * - If no existing user, a delta is applied against 0
   */
const handleUserUpdate = useCallback((incoming: any) => {
  if (!incoming || !incoming.id_utilisateur) {
    console.warn('[Leaderboard] Invalid update payload:', incoming);
    return;
  }

  console.log('[Leaderboard] Incoming update:', incoming);

  setLocalUsers(prevUsers => {
    // Find existing user
    const existingIndex = prevUsers.findIndex(
      u => u.id_utilisateur === incoming.id_utilisateur
    );

    const existingUser = existingIndex >= 0 ? prevUsers[existingIndex] : null;

    // --- Loyalty Points ---
    let newLoyaltyPoints = existingUser?.loyaltyPoints ?? 0;

    if (incoming.loyaltyPoints !== undefined) {
      // Absolute value case
      const value = Number(incoming.loyaltyPoints);
      if (!isNaN(value)) {
        newLoyaltyPoints = value;
      } else {
        console.warn('[Leaderboard] Invalid loyaltyPoints:', incoming.loyaltyPoints);
      }
    } else if (incoming.pointsDelta !== undefined) {
      // Delta value case
      const delta = Number(incoming.pointsDelta);
      if (!isNaN(delta)) {
        newLoyaltyPoints += delta;
      } else {
        console.warn('[Leaderboard] Invalid pointsDelta:', incoming.pointsDelta);
      }
    }

    // --- Games Played ---
    let newGamesPlayed = existingUser?.gamesPlayed ?? 0;

    if (incoming.gamesPlayed !== undefined) {
      const value = Number(incoming.gamesPlayed);
      if (!isNaN(value)) {
        newGamesPlayed = value;
      } else {
        console.warn('[Leaderboard] Invalid gamesPlayed:', incoming.gamesPlayed);
      }
    } else if (incoming.gamesDelta !== undefined) {
      const delta = Number(incoming.gamesDelta);
      if (!isNaN(delta)) {
        newGamesPlayed += delta;
      } else {
        console.warn('[Leaderboard] Invalid gamesDelta:', incoming.gamesDelta);
      }
    }

    // --- Construct Updated User ---
    const updatedUser: LeaderbordUtil = {
      ...existingUser,
      ...incoming,
      id_utilisateur: incoming.id_utilisateur,
      nom: incoming.nom ?? existingUser?.nom ?? '',
      prenom: incoming.prenom ?? existingUser?.prenom ?? '',
      loyaltyPoints: newLoyaltyPoints,
      gamesPlayed: newGamesPlayed,
    };

    // --- Return New Array ---
    if (existingIndex >= 0) {
      const updated = [...prevUsers];
      updated[existingIndex] = updatedUser;
      console.log('[Leaderboard] Updated user:', updatedUser);
      return updated;
    } else {
      console.log('[Leaderboard] Added new user:', updatedUser);
      return [...prevUsers, updatedUser];
    }
  });
}, []);
  // Real-time updates with Echo
  useEffect(() => {
    const channel = echo.channel('leaderboard');

    const listener = (event: any) => {
      console.log('📡 Received leaderboard update event:', event);
      // support both event.user and event (sometimes server sends payload directly)
      const payloadUser = event?.user ?? event;
      if (payloadUser && payloadUser.id_utilisateur) {
        handleUserUpdate(payloadUser);
      } else {
        console.warn('[Leaderboard] received update with no id_utilisateur:', event);
      }
    };

    channel.listen('.user.points.updated', listener);

    return () => {
      channel.stopListening('.user.points.updated', listener);
      echo.leaveChannel('leaderboard');
    };
  }, [handleUserUpdate]);

  // Ranked & validated users
  const rankedUsers = useMemo(() => {
    if (!localUsers || localUsers.length === 0) return [];

    // Filter users with numeric loyaltyPoints (keep zeroes too)
    const validUsers = localUsers.filter(u => typeof u.loyaltyPoints === 'number' && !isNaN(u.loyaltyPoints));

    const sorted = [...validUsers].sort((a, b) => {
      if (b.loyaltyPoints !== a.loyaltyPoints) {
        return b.loyaltyPoints - a.loyaltyPoints;
      }
      return (b.gamesPlayed ?? 0) - (a.gamesPlayed ?? 0);
    });

    return sorted.map((u, i) => ({ ...u, rank: i + 1 }));
  }, [localUsers]);

  // Current user position
  const userPosition = useMemo(
    () => rankedUsers.find(u => u.id_utilisateur === user?.id_utilisateur),
    [rankedUsers, user]
  );

  const getPositionIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="size-6 text-yellow-400" />;
      case 2:
        return <Medal className="size-6 text-gray-300" />;
      case 3:
        return <Medal className="size-6 text-amber-600" />;
      default:
        return <span className="text-muted-foreground font-semibold">#{rank}</span>;
    }
  };

  const getPositionColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-gradient-to-br from-yellow-500/20 to-yellow-500/5 border-yellow-500/30';
      case 2:
        return 'bg-gradient-to-br from-gray-300/20 to-gray-300/5 border-gray-300/30';
      case 3:
        return 'bg-gradient-to-br from-amber-600/20 to-amber-600/5 border-amber-600/30';
      default:
        return 'bg-card border-border';
    }
  };

  // Global stats (safe)
  const stats = useMemo(() => ({
    totalPlayers: rankedUsers.length,
    totalPoints: rankedUsers.reduce((sum, u) => sum + (u.loyaltyPoints ?? 0), 0),
    totalGames: rankedUsers.reduce((sum, u) => sum + (u.gamesPlayed ?? 0), 0),
  }), [rankedUsers]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Trophy className="size-12 text-primary mx-auto mb-4 animate-pulse" />
          <p className="text-muted-foreground">Chargement du classement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.1 }}
            className="inline-flex p-4 rounded-2xl bg-primary/10 mb-4"
          >
            <Trophy className="size-8 text-primary" />
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            <span className="text-primary">Classement</span> Global
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">Découvrez les meilleurs joueurs et leur progression</p>
        </motion.div>

        {/* Current User Card */}
        {user && userPosition && (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className="mb-8 bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30 rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="size-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-xl font-bold text-primary">{user.nom?.charAt(0).toUpperCase()}</span>
                </div>
                <div>
                  <p className="font-semibold text-foreground">Votre Position</p>
                  <p className="text-sm text-muted-foreground">{user.nom} {user.prenom}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-primary">#{userPosition.rank}</p>
                <p className="text-sm text-muted-foreground">{(userPosition.loyaltyPoints ?? 0).toLocaleString()} pts</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Top 3 Podium */}
        {rankedUsers.length >= 3 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="grid grid-cols-3 gap-4 mb-8">
            {[rankedUsers[1], rankedUsers[0], rankedUsers[2]].map((entry, i) => {
              const heightClasses = ['h-32', 'h-40', 'h-28'];
              return (
                <motion.div key={entry.id_utilisateur} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 + i * 0.1 }} className={`${getPositionColor(entry.rank)} border rounded-2xl p-4 flex flex-col items-center justify-end ${heightClasses[i]} shadow-md`}>
                  <div className="mb-2">{getPositionIcon(entry.rank)}</div>
                  <p className="text-sm text-center font-medium mb-1 text-foreground line-clamp-1">{entry.nom} {entry.prenom}</p>
                  <p className="text-xs font-semibold text-primary">{(entry.loyaltyPoints ?? 0).toLocaleString()} pts</p>
                </motion.div>
              );
            })}
          </motion.div>
        )}

        {/* Full Leaderboard */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="space-y-3">
          {rankedUsers.map((entry, index) => (
            <motion.div key={entry.id_utilisateur} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 + index * 0.02 }} className={`${getPositionColor(entry.rank)} border rounded-2xl p-5 flex items-center justify-between transition-all hover:shadow-md ${user?.id_utilisateur === entry.id_utilisateur ? 'ring-2 ring-primary shadow-lg' : ''}`}>
              <div className="flex items-center gap-4">
                <div className="w-12 flex items-center justify-center">{getPositionIcon(entry.rank)}</div>
                <div className="size-10 rounded-full bg-primary/20 flex items-center justify-center"><span className="font-bold text-primary">{entry.nom?.charAt(0).toUpperCase()}</span></div>
                <div>
                  <p className="font-medium text-foreground">{entry.nom} {entry.prenom}</p>
                  <p className="text-sm text-muted-foreground">{(entry.gamesPlayed ?? 0)} {(entry.gamesPlayed ?? 0) === 1 ? 'jeu joué' : 'jeux joués'}</p>
                </div>
              </div>
              <div className="text-right flex items-center gap-4">
                <div>
                  <p className="text-xl font-bold text-primary">{(entry.loyaltyPoints ?? 0).toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">points</p>
                </div>
                {entry.rank <= 10 && <TrendingUp className="size-5 text-green-400" />}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Summary */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-card border border-border rounded-2xl p-6 text-center shadow-sm">
            <p className="text-3xl font-bold text-primary mb-1">{stats.totalPlayers}</p>
            <p className="text-sm text-muted-foreground">Total Joueurs</p>
          </div>
          <div className="bg-card border border-border rounded-2xl p-6 text-center shadow-sm">
            <p className="text-3xl font-bold text-primary mb-1">{stats.totalPoints.toLocaleString()}</p>
            <p className="text-sm text-muted-foreground">Points Distribués</p>
          </div>
          <div className="bg-card border border-border rounded-2xl p-6 text-center shadow-sm">
            <p className="text-3xl font-bold text-primary mb-1">{stats.totalGames.toLocaleString()}</p>
            <p className="text-sm text-muted-foreground">Jeux Complétés</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}