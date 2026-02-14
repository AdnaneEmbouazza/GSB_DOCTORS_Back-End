
export interface Visiteur {
  id: string;
  nom: string;
  prenom: string;
  login: string;
  mdp: string;
  adresse: string;
  cp: string;
  ville: string;
  dateEmbauche: string;
}

// Pour la création (POST)
export interface CreateVisiteurDTO {
  nom: string;
  prenom: string;
  login: string;
  mdp: string;
  adresse: string;
  cp: string;
  ville: string;
  dateEmbauche: string;
  // ID auto incrémenté
}

// Pour la modification (PUT/PATCH)
export interface UpdateVisiteurDTO {
  nom?: string;
  prenom?: string;
  login?: string;
  mdp?: string;
  adresse?: string;
  cp?: string;
  ville?: string;
  dateEmbauche?: string;
  // ID non modifiable
}