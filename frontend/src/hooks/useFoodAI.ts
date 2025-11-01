import { useState, useEffect } from 'react';

type FoodKeywords = {
  [key: string]: {
    phrases: string[];
    relatedKeywords?: string[];
  };
};

const foodKeywords: FoodKeywords = {
  burger: {
    phrases: [
      "Un burger fondant et juteux qui fait saliver dès le premier regard.",
      "La viande parfaitement grillée et le fromage coulant sont à tomber !",
      "Un classique revisité qui réveille les papilles."
    ]
  },
  pizza: {
    phrases: [
      "La mozzarella fond à merveille sur cette pizza dorée et parfumée.",
      "Les tomates fraîches apportent une touche acidulée parfaite.",
      "Une croûte croustillante à l'extérieur, moelleuse à l'intérieur."
    ]
  },
  'poulet césar': {
    phrases: [
      "Un mélange frais et croquant avec le poulet grillé et la sauce César.",
      "Le parmesan râpé et les croûtons apportent la touche parfaite de croquant.",
      "Une salade équilibrée où chaque ingrédient se marie à la perfection."
    ]
  },
  'pâtes carbonara': {
    phrases: [
      "Des pâtes crémeuses à souhait, relevées par le parmesan et les lardons.",
      "Le jaune d'œuf apporte une onctuosité irrésistible à ce classique.",
      "Un plat réconfortant qui nous transporte directement en Italie."
    ]
  },
  tacos: {
    phrases: [
      "Trois tacos généreux, épicés juste comme il faut, une explosion de saveurs.",
      "Le poulet épicé se marie à merveille avec les légumes croquants.",
      "Le guacamole maison apporte une touche de fraîcheur parfaite."
    ]
  },
  sushi: {
    phrases: [
      "Un assortiment de makis délicatement roulés, un plaisir pour les yeux et le palais.",
      "La fraîcheur du poisson s'accorde parfaitement avec le riz vinaigré.",
      "Une présentation raffinée qui met en appétit."
    ]
  },
  'bol poke': {
    phrases: [
      "Un bol coloré où le saumon cru et l'avocat se marient parfaitement.",
      "Les edamames apportent une touche de croquant bienvenue.",
      "La sauce soja relève délicatement les saveurs sans les écraser."
    ]
  }
};

export const useFoodAI = (foodName: string) => {
  const [tooltipText, setTooltipText] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  // Fonction pour trouver la meilleure correspondance de mots-clés
  const findBestMatch = (name: string): string | null => {
    const lowerName = name.toLowerCase();
    
    // Vérifie d'abord les correspondances exactes
    for (const [keyword] of Object.entries(foodKeywords)) {
      // Vérifie si le mot-clé est présent dans le nom
      if (lowerName.includes(keyword.toLowerCase())) {
        console.log(`Correspondance exacte trouvée: ${keyword} dans ${name}`);
        return keyword;
      }
      
      // Vérifie également les mots individuels
      const words = lowerName.split(/\s+/);
      if (words.some(word => word === keyword.toLowerCase())) {
        console.log(`Mot-clé trouvé dans le nom: ${keyword} dans ${name}`);
        return keyword;
      }
    }
    
    // Vérifie les correspondances partielles
    for (const [keyword, data] of Object.entries(foodKeywords)) {
      const allKeywords = [keyword, ...(data.relatedKeywords || [])];
      if (allKeywords.some(kw => lowerName.includes(kw.toLowerCase()))) {
        console.log(`Correspondance partielle trouvée pour: ${keyword} dans ${name}`);
        return keyword;
      }
    }
    
    console.log(`Aucune correspondance trouvée pour: ${name}`);
    return null;
  };

  const getRandomPhrase = (keyword: string): string => {
    const phrases = foodKeywords[keyword]?.phrases;
    if (!phrases || phrases.length === 0) {
      return 'Un délicieux plat qui va vous surprendre !';
    }
    return phrases[Math.floor(Math.random() * phrases.length)];
  };

  const showTooltip = () => {
    console.log('showTooltip appelé pour:', foodName);
    
    // Annule tout timeout en cours
    if (timeoutId) {
      clearTimeout(timeoutId);
      setTimeoutId(null);
    }
    
    // Trouve la meilleure correspondance pour le nom du plat
    const matchedKeyword = findBestMatch(foodName);
    
    // Si on a une correspondance, on utilise cette phrase, sinon une phrase par défaut
    const newText = matchedKeyword 
      ? getRandomPhrase(matchedKeyword)
      : `Un délicieux ${foodName} qui ravira vos papilles !`;
    
    console.log('Nouveau texte du tooltip:', newText);
    setTooltipText(newText);
    
    // Affiche immédiatement le tooltip
    setIsVisible(true);
    
    // Cache le tooltip après 3 secondes
    const id = setTimeout(() => {
      setIsVisible(false);
      setTimeoutId(null);
    }, 3000);
    
    setTimeoutId(id);
  };

  const hideTooltip = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    setIsVisible(false);
  };

  // Nettoyage des timeouts lors du démontage du composant
  useEffect(() => {
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [timeoutId]);

  return {
    tooltipText,
    isVisible,
    showTooltip,
    hideTooltip,
  };
};
