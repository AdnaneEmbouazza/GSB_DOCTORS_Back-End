
export interface Rapport {
  id: number;
  date: string; // format: YYYY-MM-DD
  motif: string;
  bilan: string;
  idVisiteur: string;
  idMedecin: number;
}