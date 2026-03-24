export interface Rapport {
  id: number;
  date: Date | null;
  motif: string | null;
  bilan: string | null;
  idvisiteur: number;
  idmedecin: number;
};

//pour la création (POST)
export interface CreateRapportDTO {
  date?: Date | null;
  motif?: string | null;
  bilan?: string | null;
  idvisiteur: number;
  idmedecin: number;
};

//pour la modification (PUT/PATCH)
export interface UpdateRapportDTO {
  date?: Date | null;
  motif?: string | null;
  bilan?: string | null;
  idvisiteur?: number;
  idmedecin?: number;
};