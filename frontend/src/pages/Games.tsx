import React, { useState , useEffect} from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Coins } from 'lucide-react';
import { games } from '../lib/data';
import { GameCard } from '../components/GameCard';
import { Game } from '../lib/types';
import { Button } from '../components/ui/button';
import { useApp } from '../lib/context';
import { toast } from 'sonner';
import { Award, ChefHat, Sparkles, RotateCw, Grid3x3 } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL;

type GameType = 'home' | 'wheel' | 'quiz' | 'scratch' | 'memory';

interface Prize {
  name: string;
  icon: string;
}

interface QuizQuestion {
  question: string;
  options: string[];
  correct: number;
  fact: string;
}

export function Games() {
  const { user, setUser } = useApp();
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
    const [currentGame, setCurrentGame] = useState<GameType>('home');
    const [pendingUpdate, setPendingUpdate] = useState<{ points?: number; gamesPlayed?: number } | null>(null);

    const prizes: Prize[] = [
    { name: '🍰 Gâteau', icon: '🍰' },
    { name: '🍕 Pizza', icon: '🍕' },
    { name: '🍦 Glace', icon: '🍦' },
    { name: '🍪 Cookie', icon: '🍪' },
    { name: '🥐 Croissant', icon: '🥐' },
    { name: '🍩 Donut', icon: '🍩' },
    { name: '🧁 Cupcake', icon: '🧁' },
    { name: '🍫 Chocolat', icon: '🍫' },
  ];

    const quizQuestions: QuizQuestion[] = [
    {
      question: "Quel est l'ingrédient principal de la crème anglaise ?",
      options: ['Farine', 'Jaunes d\'œufs', 'Beurre', 'Crème'],
      correct: 1,
      fact: 'La crème anglaise est préparée avec des jaunes d\'œufs, du lait et du sucre.'
    },
    {
      question: "D'où vient la pizza Margherita ?",
      options: ['France', 'Italie', 'Grèce', 'Espagne'],
      correct: 1,
      fact: 'La pizza Margherita a été créée à Naples en l\'honneur de la reine Margherita.'
    },
    {
      question: "Quel fruit est utilisé dans le guacamole ?",
      options: ['Mangue', 'Avocat', 'Papaye', 'Kiwi'],
      correct: 1,
      fact: 'L\'avocat est la base du guacamole, un plat mexicain traditionnel.'
    },
    {
      question: "Combien de temps faut-il cuire un œuf dur ?",
      options: ['3 minutes', '6 minutes', '10 minutes', '15 minutes'],
      correct: 2,
      fact: 'Un œuf dur nécessite environ 10 minutes de cuisson dans l\'eau bouillante.'
    },
    {
      question: "Quel est le principal ingrédient du hummus ?",
      options: ['Lentilles', 'Pois chiches', 'Haricots', 'Fèves'],
      correct: 1,
      fact: 'Le hummus est fait principalement de pois chiches mixés avec du tahini.'
    }
  ];
  const handlePlayGame = (game: Game) => {
    setSelectedGame(game);
  };
  useEffect(() => {
  if (!pendingUpdate) return;
  if (!user) return;

  const syncBackend = async () => {
    try {
      await fetch(`${API_URL}/profile/${user.id_utilisateur}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          points_fidelite: pendingUpdate.points,
          gamesPlayed: pendingUpdate.gamesPlayed,
        }),
      });
      // After successful sync, clear pending update
      setPendingUpdate(null);
    } catch (err) {
      console.error('Failed to sync points', err);
      // Optionally: retry later or ignore
    }
  };

  syncBackend();
}, [pendingUpdate]);
  
const WheelGame = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [winner, setWinner] = useState<Prize | null>(null);

  const spin = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setWinner(null);

    const spins = 5 + Math.random() * 5;
    const extraDegrees = Math.random() * 360;
    const totalRotation = rotation + spins * 360 + extraDegrees;
    setRotation(totalRotation);

    setTimeout(() => {
      const normalizedRotation = totalRotation % 360;
      const segmentAngle = 360 / prizes.length;
      const winnerIndex = Math.floor((360 - normalizedRotation) / segmentAngle) % prizes.length;
      setWinner(prizes[winnerIndex]);
      setIsSpinning(false);
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-amber-50 p-8 flex flex-col items-center">
      <button
        onClick={() => setCurrentGame('home')}
        className="mb-6 px-6 py-2 bg-black text-amber-50 rounded-md hover:bg-neutral-800"
      >
        ← Retour
      </button>

      <h2 className="text-4xl font-extrabold text-black mb-8">Roue de la Fortune</h2>

      <div className="relative w-80 h-80 mb-8">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 z-10">
          <div className="w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-t-[30px] border-t-black"></div>
        </div>

        <div
          className="w-full h-full rounded-full border-4 border-black relative overflow-hidden"
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: isSpinning ? 'transform 4s cubic-bezier(0.17, 0.67, 0.12, 0.99)' : 'none',
          }}
        >
          {prizes.map((prize, index) => {
            const angle = (360 / prizes.length) * index;
            const bgColor = index % 2 === 0 ? 'bg-black' : 'bg-amber-100';
            const textColor = index % 2 === 0 ? 'text-amber-50' : 'text-black';

            return (
              <div
                key={index}
                className={`absolute w-full h-full ${bgColor} ${textColor}`}
                style={{
                  clipPath: `polygon(50% 50%, ${50 + 50 * Math.cos((angle - 90) * Math.PI / 180)}% ${50 + 50 * Math.sin((angle - 90) * Math.PI / 180)}%, ${50 + 50 * Math.cos((angle + 360 / prizes.length - 90) * Math.PI / 180)}% ${50 + 50 * Math.sin((angle + 360 / prizes.length - 90) * Math.PI / 180)}%)`,
                }}
              >
                <div
                  className="absolute font-bold text-2xl"
                  style={{
                    top: '30%',
                    left: '50%',
                    transform: `rotate(${angle + 360 / (prizes.length * 2)}deg) translateX(70px)`,
                  }}
                >
                  {prize.icon}
                </div>
              </div>
            );
          })}
        </div>

        <button
          onClick={spin}
          disabled={isSpinning}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-amber-600 text-white rounded-full font-bold text-lg hover:bg-amber-700 disabled:opacity-50 shadow-lg"
        >
          SPIN
        </button>
      </div>

      {winner && (
        <div className="bg-black text-amber-50 p-6 rounded-xl text-center animate-bounce">
          <Award className="w-12 h-12 mx-auto mb-2" />
          <h3 className="text-2xl font-bold mb-1">Félicitations!</h3>
          <p className="text-lg">Vous avez gagné: {winner.name}</p>
        </div>
      )}
    </div>
  );
};

const QuizGame = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const handleAnswer = (i: number) => {
    if (selected !== null) return;
    setSelected(i);
    setShowResult(true);
    if (i === quizQuestions[currentQuestion].correct) setScore(score + 1);

    setTimeout(() => {
      if (currentQuestion < quizQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelected(null);
        setShowResult(false);
      } else {
        setGameOver(true);
      }
    }, 2500);
  };

  const reset = () => {
    setCurrentQuestion(0);
    setScore(0);
    setSelected(null);
    setShowResult(false);
    setGameOver(false);
  };

  if (gameOver)
    return (
      <div className="min-h-screen bg-amber-50 p-8 flex items-center justify-center">
        <div className="bg-black text-amber-50 p-8 rounded-xl text-center max-w-md">
          <Award className="w-16 h-16 mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-2">Quiz Terminé!</h2>
          <p className="text-2xl mb-4">Score: {score}/{quizQuestions.length}</p>
          <div className="flex flex-col gap-3">
            <button onClick={reset} className="px-4 py-2 bg-amber-600 rounded-md hover:bg-amber-700 font-bold text-white">
              Rejouer
            </button>
            <button onClick={() => setCurrentGame('home')} className="px-4 py-2 bg-amber-100 rounded-md hover:bg-amber-200 font-bold text-black">
              Retour au menu
            </button>
          </div>
        </div>
      </div>
    );

  const question = quizQuestions[currentQuestion];

  return (
    <div className="min-h-screen bg-amber-50 p-8 flex flex-col items-center">
      <button onClick={() => setCurrentGame('home')} className="mb-6 px-4 py-2 bg-black text-amber-50 rounded-md hover:bg-neutral-800">
        ← Retour
      </button>

      <h2 className="text-3xl font-bold text-black mb-4">Quiz Culinaire</h2>
      <p className="text-lg text-black mb-6">
        Score: {score}/{quizQuestions.length}
      </p>

      <div className="bg-black text-amber-50 p-6 rounded-xl mb-6 w-full max-w-2xl">
        <h3 className="text-xl font-semibold mb-2">Question {currentQuestion + 1}/{quizQuestions.length}</h3>
        <p className="text-lg">{question.question}</p>
      </div>

      <div className="grid grid-cols-1 gap-4 w-full max-w-2xl mb-4">
        {question.options.map((option, i) => {
          let bgColor = 'bg-amber-100 hover:bg-amber-200';
          if (selected !== null) {
            if (i === question.correct) bgColor = 'bg-green-500 text-white';
            else if (i === selected) bgColor = 'bg-red-500 text-white';
          }
          return (
            <button
              key={i}
              onClick={() => handleAnswer(i)}
              disabled={selected !== null}
              className={`p-4 rounded-xl font-bold text-lg transition-transform transform hover:scale-105 ${bgColor}`}
            >
              {option}
            </button>
          );
        })}
      </div>

      {showResult && <div className="bg-black text-amber-50 p-4 rounded-xl w-full max-w-2xl">{question.fact}</div>}
    </div>
  );
};

const ScratchGame = () => {
  const [cards, setCards] = useState<{ id: number; prize: Prize; isScratched: boolean }[]>([]);
  const [scratchedCount, setScratchedCount] = useState(0);

  useEffect(() => { initGame(); }, []);

  const initGame = () => {
    const gameCards = Array.from({ length: 9 }, (_, i) => ({
      id: i,
      prize: prizes[Math.floor(Math.random() * prizes.length)],
      isScratched: false,
    }));
    setCards(gameCards);
    setScratchedCount(0);
  };

  const scratchCard = (id: number) => {
    if (cards[id].isScratched) return;
    const newCards = [...cards];
    newCards[id].isScratched = true;
    setCards(newCards);
    setScratchedCount(scratchedCount + 1);
  };

  return (
    <div className="min-h-screen bg-amber-50 p-8 flex flex-col items-center">
      <button onClick={() => setCurrentGame('home')} className="mb-6 px-4 py-2 bg-black text-amber-50 rounded-md hover:bg-neutral-800">
        ← Retour
      </button>

      <h2 className="text-3xl font-bold text-black mb-6">Cartes à Gratter</h2>
      <p className="text-lg text-black mb-6">Grattées: {scratchedCount}/9</p>

      <div className="grid grid-cols-3 gap-4 w-full max-w-xl mb-6">
        {cards.map((card) => (
          <button
            key={card.id}
            onClick={() => scratchCard(card.id)}
            className={`aspect-square rounded-xl flex items-center justify-center text-5xl font-bold transition-transform transform hover:scale-105 relative overflow-hidden ${
              card.isScratched ? 'bg-amber-100 text-black' : 'bg-black text-amber-50'
            }`}
          >
            {card.isScratched ? (
              <div className="text-center">
                <div>{card.prize.icon}</div>
                <div className="text-sm">{card.prize.name.split(' ')[1]}</div>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <Sparkles className="w-12 h-12 mb-1" />
                <span className="text-sm">GRATTEZ</span>
              </div>
            )}
          </button>
        ))}
      </div>

      {scratchedCount === 9 && (
        <div className="bg-black text-amber-50 p-6 rounded-xl text-center">
          <Award className="w-12 h-12 mx-auto mb-2" />
          <h3 className="text-2xl font-bold mb-2">Toutes les cartes grattées!</h3>
          <p className="text-lg mb-4">Découvrez vos gains ci-dessus</p>
          <button onClick={initGame} className="px-6 py-2 bg-amber-600 rounded-md hover:bg-amber-700 font-bold text-white">
            Nouvelle partie
          </button>
        </div>
      )}
    </div>
  );
};

const MemoryGame = () => {
  const [cards, setCards] = useState<{ id: number; icon: string; isFlipped: boolean; isMatched: boolean }[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matches, setMatches] = useState(0);
  const [moves, setMoves] = useState(0);
  const [gameWon, setGameWon] = useState(false);

  useEffect(() => { initGame(); }, []);

  const initGame = () => {
    const icons = ['🍰','🍕','🍦','🍪','🥐','🍩','🧁','🍫'];
    const gameCards = [...icons, ...icons].sort(() => Math.random() - 0.5).map((icon, index) => ({
      id: index,
      icon,
      isFlipped: false,
      isMatched: false,
    }));
    setCards(gameCards);
    setFlippedCards([]);
    setMatches(0);
    setMoves(0);
    setGameWon(false);
  };

  const flipCard = (id: number) => {
    if (flippedCards.length >= 2 || cards[id].isFlipped || cards[id].isMatched) return;
    const newCards = [...cards];
    newCards[id].isFlipped = true;
    setCards(newCards);
    const newFlipped = [...flippedCards, id];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(moves + 1);
      const [first, second] = newFlipped;
      if (cards[first].icon === cards[second].icon) {
        setTimeout(() => {
          const matchedCards = [...cards];
          matchedCards[first].isMatched = true;
          matchedCards[second].isMatched = true;
          setCards(matchedCards);
          setFlippedCards([]);
          const newMatches = matches + 1;
          setMatches(newMatches);
          if (newMatches === 8) setGameWon(true);
        }, 500);
      } else {
        setTimeout(() => {
          const resetCards = [...cards];
          resetCards[first].isFlipped = false;
          resetCards[second].isFlipped = false;
          setCards(resetCards);
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  return (
    <div className="min-h-screen bg-amber-50 p-8 flex flex-col items-center">
      <button onClick={() => setCurrentGame('home')} className="mb-6 px-4 py-2 bg-black text-amber-50 rounded-md hover:bg-neutral-800">
        ← Retour
      </button>

      <h2 className="text-3xl font-bold text-black mb-4">Memory Gourmand</h2>
      <div className="flex gap-4 mb-6 text-black font-semibold text-lg">
        <div>Paires: {matches}/8</div>
        <div>Coups: {moves}</div>
      </div>

      <div className="grid grid-cols-4 gap-4 w-full max-w-xl mb-6">
        {cards.map((card) => (
          <button
            key={card.id}
            onClick={() => flipCard(card.id)}
            disabled={card.isMatched}
            className={`aspect-square rounded-xl text-5xl flex items-center justify-center font-bold transition-transform transform hover:scale-105 ${
              card.isMatched
                ? 'bg-green-500 text-white'
                : card.isFlipped
                ? 'bg-amber-100 text-black'
                : 'bg-black text-amber-50'
            }`}
          >
            {card.isFlipped || card.isMatched ? card.icon : '?'}
          </button>
        ))}
      </div>

      {gameWon && (
        <div className="bg-black text-amber-50 p-6 rounded-xl text-center">
          <Award className="w-12 h-12 mx-auto mb-2" />
          <h3 className="text-2xl font-bold mb-2">Félicitations!</h3>
          <p className="text-lg mb-2">Vous avez trouvé toutes les paires!</p>
          <p className="text-base mb-4">Terminé en {moves} coups</p>
          <button onClick={initGame} className="px-6 py-2 bg-amber-600 rounded-md hover:bg-amber-700 font-bold text-white">
            Rejouer
          </button>
        </div>
      )}
    </div>
  );
};
const handleCompleteGame = () => {
  if (!selectedGame) return;

  let newGameType: GameType = 'home';
  switch (selectedGame.id) {
    case 'g1': newGameType = 'quiz'; break;
    case 'g2': newGameType = 'wheel'; break;
    case 'g3': newGameType = 'scratch'; break;
    case 'g4': newGameType = 'memory'; break;
  }

  handleGameWin(); // <-- call your simplified function

  setCurrentGame(newGameType);
  setSelectedGame(null);
};

const handleGameWin = () => {
  if (!user) return;

  const newPoints = (user.loyaltyPoints ?? 0) + 10;
  const newGamesPlayed = (user.gamesPlayed ?? 0) + 1;

  // Optimistic UI update
  setUser({
    ...user,
    loyaltyPoints: newPoints,
    gamesPlayed: newGamesPlayed,
  });

  localStorage.setItem(
    'user',
    JSON.stringify({
      ...user,
      loyaltyPoints: newPoints,
      gamesPlayed: newGamesPlayed,
    })
  );

  toast.success(`+10 points gagnés 🎉`);

  // Set pending update to trigger useEffect
  setPendingUpdate({ points: newPoints, gamesPlayed: newGamesPlayed });
};
  return (
    <div className="min-h-screen py-12 px-4">
      {/* Full Screen Games */}
      {currentGame === 'wheel' && <WheelGame />}
      {currentGame === 'quiz' && <QuizGame />}
      {currentGame === 'scratch' && <ScratchGame />}
      {currentGame === 'memory' && <MemoryGame />}
      
      {/* Home View */}
      {currentGame === 'home' && (
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl mb-4 text-foreground">
              Jeux & <span className="text-primary">Événements</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Jouez à nos mini-jeux interactifs et gagnez des points de fidélité
            </p>
          </motion.div>

          {/* User Points */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="max-w-md mx-auto mb-12 bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30 rounded-2xl p-6 text-center"
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              <Coins className="size-6 text-primary" />
              <span className="text-3xl text-primary">{user?.loyaltyPoints || 0}</span>
            </div>
            <p className="text-sm text-muted-foreground">Points de fidélité</p>
          </motion.div>

          {/* Games Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {games.map((game, index) => (
              <motion.div
                key={game.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
              >
                <GameCard game={game} onPlay={handlePlayGame} />
              </motion.div>
            ))}
          </div>

          {/* Events Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-16"
          >
            <h2 className="text-2xl mb-6 text-foreground text-center">
              Événements <span className="text-primary">Spéciaux</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: 'Double Points Weekend',
                  description: 'Gagnez 2x plus de points sur tous les jeux ce weekend',
                  date: '25-27 Oct 2025',
                  status: 'Bientôt',
                },
                {
                  title: 'Tournoi Mensuel',
                  description: 'Affrontez les meilleurs mangeur et remportez des prix exclusifs',
                  date: '20 Oct 2025',
                  status: 'Inscription ouverte',
                },
              ].map((event, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  className="bg-card border border-border rounded-2xl p-6"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-foreground">{event.title}</h3>
                    <span className="px-3 py-1 rounded-full text-xs bg-primary/20 text-primary">
                      {event.status}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{event.description}</p>
                  <p className="text-sm text-primary">{event.date}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>
        </div>
      )}

      {/* Game Modal */}
      <AnimatePresence>
        {selectedGame && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedGame(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-card border border-border rounded-2xl p-8 max-w-md w-full"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-foreground">{selectedGame.title}</h3>
                <button
                  onClick={() => setSelectedGame(null)}
                  className="p-2 rounded-full hover:bg-secondary transition-colors"
                >
                  <X className="size-5" />
                </button>
              </div>

              <div className="text-center py-12 space-y-4">
                <div className="text-6xl mb-4">🎮</div>
                <p className="text-muted-foreground">
                  Le jeu "{selectedGame.title}" sera bientôt disponible !
                </p>
                <p className="text-sm text-primary">
                  Récompense : {selectedGame.pointsReward} points
                </p>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={handleCompleteGame}
                  className="flex-1 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  Simuler victoire
                </Button>
                <Button
                  onClick={() => setSelectedGame(null)}
                  variant="outline"
                  className="flex-1 rounded-2xl border-border"
                >
                  Fermer
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
