
export interface LoginDTO {
  login: string;
  mdp: string;
}

export interface CreateVisiteurDTO {
  nom?: string | null;
  prenom?: string | null;
  login: string;
  mdp: string;
  adresse?: string | null;
  cp?: string | null;
  ville?: string | null;
  dateembauche?: Date | null;
}

export interface UpdateVisiteurDTO {
  nom?: string | null;
  prenom?: string | null;
  login?: string;
  mdp?: string;
  adresse?: string | null;
  cp?: string | null;
  ville?: string | null;
  dateembauche?: Date | null;
}