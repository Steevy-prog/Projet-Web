export interface Utilisateur {
  profile_picture?: string;
  id_utilisateur: number;
  nom: string;
  prenom: string;
  email: string;
  mot_de_passe?: string;
  telephone?: string;
  localisation?: string;
  id_role?: number;
  id_parrain?: number;
  date_creation?: string;
  derniere_connexion?: string;
  date_modification?: string;

  loyaltyPoints: number;
  gamesPlayed: number;
  ordersCount: number;
  rank: number;

  // Parrainage
  referralCode: string;
  referredBy?: string;
  referralCount: number;
}

export interface LeaderbordUtil{
  id_utilisateur: number;
  nom: string;
  prenom: string;
  loyaltyPoints: number;
  gamesPlayed: number;
  rank?: number;
}


export interface MenuItem {
  id_article: number;
  nom: string;
  description: string;
  prix: number;
  category: string;
  image?: string;      // image_url
  popular?: boolean;   // est_promotion
  available?: boolean; // disponible
  stock?: number;      // stock_disponible
}

export interface CartItem {
  menuItem: MenuItem;       // linked article
  quantity: number;         // quantite
  subtotal?: number;        // sous_total
  comment?: string;         // commentaire_article
}

export interface Order {
  id: string;               // id_commande
  userId: number;           // id_utilisateur
  userEmail: string;        // from utilisateur.email
  userName: string;         // from utilisateur.nom + prenom
  items: CartItem[];        // array of cart items
  total: number;            // montant_total
  status: 'en_attente' | 'confirmee' | 'en_preparation' | 'livree' | 'pret'; // statut
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
  userId?: number;
  name: string;
  email: string;
  type: 'service' | 'food' | 'delivery' | 'other';
  message: string;
  status: 'en_attente' | 'revu' | 'resolu';
  createdAt: Date;
}

export interface LeaderboardEntry {
  userId: number;
  userName: string;
  points: number;
  rank: number;
  gamesPlayed: number;
}


export interface Employee extends Utilisateur{
  id_employe?: number;
  poste: string;
  date_embauche: string;
  salaire: number;
  est_actif: boolean;
  date_creation: string;
}

export interface EmployeeCustommer{
  id_employe?: number;
  nom: string;
  prenom: string
  id_role:number;
  id_utilisateur:number;
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
  image?: string;
  active: boolean;
  type?: 'percentage' | 'fixed' | 'bogo';
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

export interface Referral {
  id: string;
  referrerId: string;
  referredUserId: string;
  referralCode: string;
  date: Date;
  rewardClaimed: boolean;
}

export interface ReferralStats {
  referralCount: number;
  earnedPoints: number;
  pendingRewards: number;
}
// File: src/lib/types.ts (or wherever your types are defined)

// Standardized Message structure
export interface Message {
  id: string; // The message ID from the DB
  conversationId: string; // Virtual ID (conv_123)
  senderId: number;
  receiverId: number;
  senderName: string;
  senderType: 'user' | 'employee';
  content: string; // The message text
  timestamp: string; // ISO date string
  read: boolean; // Corresponds to is_read
}

// Virtual Conversation structure managed by the frontend context
export interface Conversation {
  id: string; // Virtual ID (conv_123)
  userId: number; // The user (client) in the pair
  userName: string;
  employeeId: number; // The other party (employee/contact) in the pair
  employeeName: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
}