import { MenuItem, Game, Reward, LeaderboardEntry } from './types';

export const menuItems: MenuItem[] = [
  {
    id: '1',
    name: 'Burger Signature',
    description: 'Notre burger emblématique avec viande de bœuf premium, fromage affiné et sauce maison',
    price: 12.99,
    category: 'Burgers',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80',
    popular: true,
  },
  {
    id: '2',
    name: 'Pizza Margherita',
    description: 'Pizza classique avec mozzarella, tomates fraîches et basilic',
    price: 10.99,
    category: 'Pizzas',
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800&q=80',
    popular: true,
  },
  {
    id: '3',
    name: 'Salade César',
    description: 'Laitue romaine, poulet grillé, parmesan, croûtons et sauce César',
    price: 8.99,
    category: 'Salades',
    image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=800&q=80',
  },
  {
    id: '4',
    name: 'Pâtes Carbonara',
    description: 'Pâtes fraîches, lardons, crème, parmesan et jaune d\'œuf',
    price: 11.49,
    category: 'Pâtes',
    image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=800&q=80',
    popular: true,
  },
  {
    id: '5',
    name: 'Tacos Poulet',
    description: 'Trois tacos garnis de poulet épicé, légumes frais et guacamole',
    price: 9.99,
    category: 'Tacos',
    image: 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=800&q=80',
  },
  {
    id: '6',
    name: 'Sushi Mix',
    description: 'Assortiment de 12 pièces : maki, nigiri et california rolls',
    price: 15.99,
    category: 'Sushi',
    image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=800&q=80',
  },
  {
    id: '7',
    name: 'Steak Frites',
    description: 'Entrecôte de bœuf grillée, frites maison et sauce au poivre',
    price: 18.99,
    category: 'Viandes',
    image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=800&q=80',
  },
  {
    id: '8',
    name: 'Poké Bowl',
    description: 'Bol de riz, saumon cru, avocat, edamame et sauce soja',
    price: 13.49,
    category: 'Bowls',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80',
  },
];

export const games: Game[] = [
  {
    id: 'g1',
    title: 'Quiz Culinaire',
    description: 'Testez vos connaissances gastronomiques et gagnez des points',
    pointsReward: 50,
    image: 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?w=800&q=80',
    type: 'quiz',
  },
  {
    id: 'g2',
    title: 'Roue de la Fortune',
    description: 'Tournez la roue et tentez de remporter des points bonus',
    pointsReward: 100,
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&q=80',
    type: 'spin',
  },
  {
    id: 'g3',
    title: 'Carte à Gratter',
    description: 'Grattez pour découvrir votre récompense surprise',
    pointsReward: 75,
    image: 'https://images.unsplash.com/photo-1556910110-a5a63dfd393c?w=800&q=80',
    type: 'scratch',
  },
  {
    id: 'g4',
    title: 'Memory Gourmand',
    description: 'Retrouvez les paires de plats et gagnez des points',
    pointsReward: 60,
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80',
    type: 'memory',
  },
];

export const rewards: Reward[] = [
  {
    id: 'r1',
    title: 'Café Gratuit',
    description: 'Un café au choix offert',
    pointsCost: 50,
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&q=80',
    available: true,
  },
  {
    id: 'r2',
    title: 'Dessert Offert',
    description: 'Un dessert de votre choix',
    pointsCost: 100,
    image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=800&q=80',
    available: true,
  },
  {
    id: 'r3',
    title: 'Menu Entrée + Plat',
    description: 'Une entrée et un plat au choix',
    pointsCost: 250,
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80',
    available: true,
  },
  {
    id: 'r4',
    title: 'Réduction 20%',
    description: 'Réduction de 20% sur votre prochaine commande',
    pointsCost: 150,
    image: 'https://images.unsplash.com/photo-1607083206968-13611e3d76db?w=800&q=80',
    available: true,
  },
  {
    id: 'r5',
    title: 'Menu Complet',
    description: 'Entrée, plat et dessert offerts',
    pointsCost: 500,
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80',
    available: true,
  },
  {
    id: 'r6',
    title: 'Invitation VIP',
    description: 'Soirée dégustation exclusive',
    pointsCost: 1000,
    image: 'https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?w=800&q=80',
    available: false,
  },
];

export const leaderboard: LeaderboardEntry[] = [
  { userId: 'u1', userName: 'Sophie Martin', points: 2450, rank: 1, gamesPlayed: 45 },
  { userId: 'u2', userName: 'Thomas Dupont', points: 2180, rank: 2, gamesPlayed: 38 },
  { userId: 'u3', userName: 'Marie Laurent', points: 1920, rank: 3, gamesPlayed: 42 },
  { userId: 'u4', userName: 'Lucas Bernard', points: 1750, rank: 4, gamesPlayed: 35 },
  { userId: 'u5', userName: 'Emma Petit', points: 1580, rank: 5, gamesPlayed: 31 },
  { userId: 'u6', userName: 'Alexandre Dubois', points: 1420, rank: 6, gamesPlayed: 28 },
  { userId: 'u7', userName: 'Julie Moreau', points: 1290, rank: 7, gamesPlayed: 26 },
  { userId: 'u8', userName: 'Nicolas Robert', points: 1150, rank: 8, gamesPlayed: 24 },
  { userId: 'u9', userName: 'Camille Simon', points: 1020, rank: 9, gamesPlayed: 21 },
  { userId: 'u10', userName: 'Paul Michel', points: 890, rank: 10, gamesPlayed: 19 },
];

export const companyStory = {
  title: 'Notre Histoire',
  content: `Depuis 2015, notre restaurant s'est donné pour mission de révolutionner l'expérience culinaire en alliant tradition gastronomique et innovation technologique.

Fondée par une équipe passionnée de chefs et d'entrepreneurs, notre entreprise place la satisfaction client au cœur de ses préoccupations. Nous croyons fermement que chaque repas doit être une expérience mémorable, et c'est pourquoi nous avons développé un programme de fidélité unique qui récompense votre passion pour la bonne cuisine.

Nos valeurs sont simples : qualité irréprochable des ingrédients, service attentionné, et engagement envers notre communauté. Chaque jour, nos chefs sélectionnent les meilleurs produits locaux pour créer des plats qui ravissent vos papilles.`,
  mission: 'Créer des moments de partage authentiques autour de la gastronomie',
  values: ['Excellence culinaire', 'Innovation', 'Durabilité', 'Proximité client'],
};
