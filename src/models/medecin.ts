export interface Medecin {
  id: number;
  nom: string;
  prenom: string;
  adresse: string;
  tel: string | null;
  specialitecomplementaire: string | null;
  departement: number;
}

// pour la création (POST)
export interface CreateMedecinDTO {
  nom: string;
  prenom: string;
  adresse: string;
  tel?: string | null;
  specialitecomplementaire?: string | null;
  departement: number;
  // ID auto incrémenté
}

// pour la modification (PUT/PATCH)
export interface UpdateMedecinDTO {
  nom?: string;
  prenom?: string;
  adresse?: string;
  tel?: string | null;
  specialitecomplementaire?: string | null;
  departement?: number;
  //ID non modifiable
}