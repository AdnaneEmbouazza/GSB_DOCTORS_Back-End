// DTOs pour les requêtes API
export interface CreateMedecinDTO {
  nom: string;
  prenom: string;
  adresse: string;
  tel?: string | null;
  specialitecomplementaire?: string | null;
  departement: number;
}

export interface UpdateMedecinDTO {
  nom?: string;
  prenom?: string;
  adresse?: string;
  tel?: string | null;
  specialitecomplementaire?: string | null;
  departement?: number;
}