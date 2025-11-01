import React, { useState, useEffect } from 'react';
import { Award, ChefHat, Sparkles, RotateCw, Grid3x3 } from 'lucide-react';

// Types
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

const App = () => {
  const [currentGame, setCurrentGame] = useState<GameType>('home');
  
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

  const HomeScreen = () => (
    <div className="min-h-screen bg-amber-50 flex flex-col items-center justify-center p-8">
      <div className="text-center mb-12">
        <ChefHat className="w-20 h-20 mx-auto mb-4 text-black" />
        <h1 className="text-5xl font-bold text-black mb-2">Jeux Gourmands</h1>
        <p className="text-lg text-neutral-600">Choisissez votre jeu préféré</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full">
        <button
          onClick={() => setCurrentGame('wheel')}
          className="bg-black text-amber-50 p-8 rounded-2xl hover:bg-neutral-800 transition-all transform hover:scale-105 shadow-xl"
        >
          <RotateCw className="w-12 h-12 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Roue de la Fortune</h2>
          <p className="text-amber-100">Tournez la roue et gagnez des délices</p>
        </button>
        
        <button
          onClick={() => setCurrentGame('quiz')}
          className="bg-black text-amber-50 p-8 rounded-2xl hover:bg-neutral-800 transition-all transform hover:scale-105 shadow-xl"
        >
          <ChefHat className="w-12 h-12 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Quiz Culinaire</h2>
          <p className="text-amber-100">Testez vos connaissances en cuisine</p>
        </button>
        
        <button
          onClick={() => setCurrentGame('scratch')}
          className="bg-black text-amber-50 p-8 rounded-2xl hover:bg-neutral-800 transition-all transform hover:scale-105 shadow-xl"
        >
          <Sparkles className="w-12 h-12 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Cartes à Gratter</h2>
          <p className="text-amber-100">Grattez les cartes et découvrez vos gains</p>
        </button>
        
        <button
          onClick={() => setCurrentGame('memory')}
          className="bg-black text-amber-50 p-8 rounded-2xl hover:bg-neutral-800 transition-all transform hover:scale-105 shadow-xl"
        >
          <Grid3x3 className="w-12 h-12 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Memory Gourmand</h2>
          <p className="text-amber-100">Trouvez les paires d'aliments</p>
        </button>
      </div>
    </div>
  );

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
      const totalRotation = rotation + (spins * 360) + extraDegrees;
      
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
      <div className="min-h-screen bg-amber-50 p-8">
        <button
          onClick={() => setCurrentGame('home')}
          className="mb-6 px-6 py-2 bg-black text-amber-50 rounded-lg hover:bg-neutral-800"
        >
          ← Retour
        </button>
        
        <div className="flex flex-col items-center">
          <h2 className="text-4xl font-bold text-black mb-8">Roue de la Fortune</h2>
          
          <div className="relative w-96 h-96 mb-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 z-10">
              <div className="w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-t-[30px] border-t-black"></div>
            </div>
            
            <div
              className="w-full h-full rounded-full border-8 border-black relative overflow-hidden"
              style={{
                transform: `rotate(${rotation}deg)`,
                transition: isSpinning ? 'transform 4s cubic-bezier(0.17, 0.67, 0.12, 0.99)' : 'none'
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
                      clipPath: `polygon(50% 50%, ${50 + 50 * Math.cos((angle - 90) * Math.PI / 180)}% ${50 + 50 * Math.sin((angle - 90) * Math.PI / 180)}%, ${50 + 50 * Math.cos((angle + 360/prizes.length - 90) * Math.PI / 180)}% ${50 + 50 * Math.sin((angle + 360/prizes.length - 90) * Math.PI / 180)}%)`
                    }}
                  >
                    <div
                      className="absolute font-bold text-2xl"
                      style={{
                        top: '30%',
                        left: '50%',
                        transform: `rotate(${angle + 360/(prizes.length*2)}deg) translateX(80px)`
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
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-amber-600 text-white rounded-full font-bold text-lg hover:bg-amber-700 disabled:opacity-50 shadow-lg z-20"
            >
              SPIN
            </button>
          </div>
          
          {winner && (
            <div className="bg-black text-amber-50 p-8 rounded-2xl text-center animate-bounce">
              <Award className="w-16 h-16 mx-auto mb-4" />
              <h3 className="text-3xl font-bold mb-2">Félicitations!</h3>
              <p className="text-xl">Vous avez gagné: {winner.name}</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  const QuizGame = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [selected, setSelected] = useState<number | null>(null);
    const [showResult, setShowResult] = useState(false);
    const [gameOver, setGameOver] = useState(false);

    const handleAnswer = (index: number) => {
      if (selected !== null) return;
      
      setSelected(index);
      setShowResult(true);
      
      if (index === quizQuestions[currentQuestion].correct) {
        setScore(score + 1);
      }
      
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

    if (gameOver) {
      return (
        <div className="min-h-screen bg-amber-50 p-8 flex items-center justify-center">
          <div className="bg-black text-amber-50 p-12 rounded-2xl text-center max-w-md">
            <Award className="w-20 h-20 mx-auto mb-6" />
            <h2 className="text-4xl font-bold mb-4">Quiz Terminé!</h2>
            <p className="text-3xl mb-6">Score: {score}/{quizQuestions.length}</p>
            <div className="space-y-4">
              <button
                onClick={reset}
                className="w-full px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 font-bold"
              >
                Rejouer
              </button>
              <button
                onClick={() => setCurrentGame('home')}
                className="w-full px-6 py-3 bg-amber-100 text-black rounded-lg hover:bg-amber-200 font-bold"
              >
                Retour au menu
              </button>
            </div>
          </div>
        </div>
      );
    }

    const question = quizQuestions[currentQuestion];

    return (
      <div className="min-h-screen bg-amber-50 p-8">
        <button
          onClick={() => setCurrentGame('home')}
          className="mb-6 px-6 py-2 bg-black text-amber-50 rounded-lg hover:bg-neutral-800"
        >
          ← Retour
        </button>
        
        <div className="max-w-2xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-black">Quiz Culinaire</h2>
            <div className="text-xl font-bold text-black">
              Score: {score}/{quizQuestions.length}
            </div>
          </div>
          
          <div className="bg-black text-amber-50 p-6 rounded-2xl mb-8">
            <div className="text-sm mb-4">Question {currentQuestion + 1}/{quizQuestions.length}</div>
            <h3 className="text-2xl font-bold">{question.question}</h3>
          </div>
          
          <div className="grid grid-cols-1 gap-4 mb-6">
            {question.options.map((option, index) => {
              let bgColor = 'bg-amber-100 hover:bg-amber-200';
              if (selected !== null) {
                if (index === question.correct) {
                  bgColor = 'bg-green-500 text-white';
                } else if (index === selected) {
                  bgColor = 'bg-red-500 text-white';
                }
              }
              
              return (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  disabled={selected !== null}
                  className={`p-6 ${bgColor} rounded-xl text-left font-bold text-lg transition-all transform hover:scale-105 disabled:cursor-not-allowed`}
                >
                  {option}
                </button>
              );
            })}
          </div>
          
          {showResult && (
            <div className="bg-black text-amber-50 p-6 rounded-xl">
              <p className="text-lg">{question.fact}</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  const ScratchGame = () => {
    const [cards, setCards] = useState<{ id: number; prize: Prize; isScratched: boolean }[]>([]);
    const [scratchedCount, setScratchedCount] = useState(0);

    useEffect(() => {
      initGame();
    }, []);

    const initGame = () => {
      const gameCards = Array.from({ length: 9 }, (_, i) => ({
        id: i,
        prize: prizes[Math.floor(Math.random() * prizes.length)],
        isScratched: false
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
      <div className="min-h-screen bg-amber-50 p-8">
        <button
          onClick={() => setCurrentGame('home')}
          className="mb-6 px-6 py-2 bg-black text-amber-50 rounded-lg hover:bg-neutral-800"
        >
          ← Retour
        </button>
        
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-black">Cartes à Gratter</h2>
            <div className="text-xl font-bold text-black">
              Grattées: {scratchedCount}/9
            </div>
          </div>
          
          <p className="text-center text-lg text-neutral-700 mb-8">
            Cliquez sur les cartes pour les gratter et découvrir vos gains!
          </p>
          
          <div className="grid grid-cols-3 gap-6 mb-8">
            {cards.map((card) => (
              <button
                key={card.id}
                onClick={() => scratchCard(card.id)}
                className={`aspect-square rounded-2xl text-6xl flex flex-col items-center justify-center font-bold transition-all transform hover:scale-105 relative overflow-hidden ${
                  card.isScratched
                    ? 'bg-amber-100 text-black'
                    : 'bg-black text-amber-50'
                }`}
              >
                {card.isScratched ? (
                  <div className="text-center">
                    <div className="mb-2">{card.prize.icon}</div>
                    <div className="text-sm">{card.prize.name.split(' ')[1]}</div>
                  </div>
                ) : (
                  <div className="relative">
                    <Sparkles className="w-16 h-16" />
                    <div className="text-sm mt-2">GRATTEZ</div>
                  </div>
                )}
              </button>
            ))}
          </div>
          
          {scratchedCount === 9 && (
            <div className="bg-black text-amber-50 p-8 rounded-2xl text-center">
              <Award className="w-16 h-16 mx-auto mb-4" />
              <h3 className="text-3xl font-bold mb-4">Toutes les cartes grattées!</h3>
              <p className="text-xl mb-6">Découvrez vos gains ci-dessus</p>
              <button
                onClick={initGame}
                className="px-8 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 font-bold"
              >
                Nouvelle partie
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  const MemoryGame = () => {
    const [cards, setCards] = useState<{ id: number; icon: string; isFlipped: boolean; isMatched: boolean }[]>([]);
    const [flippedCards, setFlippedCards] = useState<number[]>([]);
    const [matches, setMatches] = useState(0);
    const [moves, setMoves] = useState(0);
    const [gameWon, setGameWon] = useState(false);

    useEffect(() => {
      initGame();
    }, []);

    const initGame = () => {
      const icons = ['🍰', '🍕', '🍦', '🍪', '🥐', '🍩', '🧁', '🍫'];
      const gameCards = [...icons, ...icons]
        .sort(() => Math.random() - 0.5)
        .map((icon, index) => ({
          id: index,
          icon,
          isFlipped: false,
          isMatched: false
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
            
            if (newMatches === 8) {
              setGameWon(true);
            }
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
      <div className="min-h-screen bg-amber-50 p-8">
        <button
          onClick={() => setCurrentGame('home')}
          className="mb-6 px-6 py-2 bg-black text-amber-50 rounded-lg hover:bg-neutral-800"
        >
          ← Retour
        </button>
        
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-black">Memory Gourmand</h2>
            <div className="flex gap-6 text-xl font-bold text-black">
              <div>Paires: {matches}/8</div>
              <div>Coups: {moves}</div>
            </div>
          </div>
          
          <p className="text-center text-lg text-neutral-700 mb-8">
            Trouvez toutes les paires d'aliments identiques!
          </p>
          
          <div className="grid grid-cols-4 gap-4 mb-8">
            {cards.map((card) => (
              <button
                key={card.id}
                onClick={() => flipCard(card.id)}
                className={`aspect-square rounded-xl text-6xl flex items-center justify-center font-bold transition-all transform hover:scale-105 ${
                  card.isMatched
                    ? 'bg-green-500 text-white'
                    : card.isFlipped
                    ? 'bg-amber-100 text-black'
                    : 'bg-black text-amber-50'
                }`}
                disabled={card.isMatched}
              >
                {card.isFlipped || card.isMatched ? card.icon : '?'}
              </button>
            ))}
          </div>
          
          {gameWon && (
            <div className="bg-black text-amber-50 p-8 rounded-2xl text-center">
              <Award className="w-16 h-16 mx-auto mb-4" />
              <h3 className="text-3xl font-bold mb-4">Félicitations!</h3>
              <p className="text-xl mb-2">Vous avez trouvé toutes les paires!</p>
              <p className="text-lg mb-6">Terminé en {moves} coups</p>
              <button
                onClick={initGame}
                className="px-8 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 font-bold"
              >
                Rejouer
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      {currentGame === 'home' && <HomeScreen />}
      {currentGame === 'wheel' && <WheelGame />}
      {currentGame === 'quiz' && <QuizGame />}
      {currentGame === 'scratch' && <ScratchGame />}
      {currentGame === 'memory' && <MemoryGame />}
    </>
  );
};

export default App;