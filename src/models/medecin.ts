
export interface Medecin {
  id: number;
  nom: string;
  prenom: string;
  adresse: string;
  tel: string;
  specialitecomplementaire: string | null;
  departement: number;
}