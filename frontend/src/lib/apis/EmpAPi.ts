import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

interface employe {
  id_employe:number;
  id_utilisateur:number;
  email: string;
  mot_de_passe: string;
  mot_de_passe_confirmation: string;
  telephone: string;
  localisation?: string;
  id_role?: number;
  id_parrain?: number;
}