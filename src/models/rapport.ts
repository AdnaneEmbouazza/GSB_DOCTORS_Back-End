export interface Rapport {
  id: number;
  date: string; // format: YYYY-MM-DD
  motif: string;
  bilan: string;
  idVisiteur: string;
  idMedecin: number;
}

//pour la création (POST)
export interface CreateRapportDTO {
  date: string; // format: YYYY-MM-DD
  motif: string;
  bilan: string;
  idVisiteur: string;
  idMedecin: number;
  // ID auto incrémenté
}

//pour la modification (PUT/PATCH)
export interface UpdateRapportDTO {
  date?: string;
  motif?: string;
  bilan?: string;
  idVisiteur?: string;
  idMedecin?: number;
  //ID non modifiable
}