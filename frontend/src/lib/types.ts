export interface Utilisateur {
  id_utilisateur: string;
  nom: string;
  prenom: string;
  email: string;
  mot_de_passe: string;
  telephone: string;
  localisation?: string;
  id_role: number;
  id_parrain?: number;
  date_creation: string;
  derniere_connexion: string;
  date_modification: string;
  loyaltyPoints: number;
  gamesPlayed: number;
  ordersCount: number;
  rank: number;
}

export interface MenuItem {
  id: string;                // id_article
  name: string;              // nom
  description: string;       // description
  price: number;             // prix
  category: string;          // id_categorie mapped to category name (join with categorie table)
  image: string;             // image_url
  popular?: boolean;         // est_promotion or a "popular" flag
  available?: boolean;       // disponible
  stock?: number;            // stock_disponible
}

export interface CartItem {
  menuItem: MenuItem;       // linked article
  quantity: number;         // quantite
  subtotal?: number;        // sous_total
  comment?: string;         // commentaire_article
}

export interface Order {
  id: string;               // id_commande
  userId: string;           // id_utilisateur
  userEmail: string;        // from utilisateur.email
  userName: string;         // from utilisateur.nom + prenom
  items: CartItem[];        // array of cart items
  total: number;            // montant_total
  status: 'en attente' | 'confirmee' | 'livree'; // statut
  createdAt: Date;          // date_commande
  typeService?: 'sur_place' | 'livraison'; // type_service
  arrivalTime?: Date;       // heure_arrivee
  orderNumber?: string;     // numero_commande
}

export interface Game {
  id: string;
  title: string;
  description: string;
  pointsReward: number;
  image: string;
  type: 'quiz' | 'spin' | 'scratch' | 'memory';
}

export interface Reward {
  id: string;
  title: string;
  description: string;
  pointsCost: number;
  image: string;
  available: boolean;
}

export interface Reclamation {
  id: string;
  userId?: string;
  name: string;
  email: string;
  type: 'service' | 'food' | 'delivery' | 'other';
  message: string;
  status: 'en attente' | 'revu' | 'resolu';
  createdAt: Date;
}

export interface LeaderboardEntry {
  userId: string;
  userName: string;
  points: number;
  rank: number;
  gamesPlayed: number;
}


export interface Employee extends Utilisateur{
  id_employe: number;
  poste: string;
  date_embauche: string;
  salaire: number;
  est_actif: boolean;
  date_creation: string;
}

export interface realemployee {

}


export interface OrderWithDetails extends Order {
  userName: string;
  userEmail: string;
}

export interface Promotion {
  id: string;
  title: string;
  description: string;
  discount: number;
  startDate: Date;
  endDate: Date;
  image: string;
  active: boolean;
  type: 'percentage' | 'fixed' | 'bogo';
}

export interface AppSettings {
  restaurantName: string;
  openingHours: {
    [key: string]: { open: string; close: string; closed: boolean };
  };
  policies: {
    refundPolicy: string;
    privacyPolicy: string;
    termsOfService: string;
  };
  contactInfo: {
    email: string;
    phone: string;
    address: string;
  };
}
