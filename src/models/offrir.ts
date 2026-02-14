export interface Offrir {
  idRapport: number;
  idMedicament: string;
  quantite: number | null;
}

//pour la création (POST)
export interface CreateOffrirDTO {
  idRapport: number;
  idMedicament: string;
  quantite?: number | null;
}

//pour la modification (PUT/PATCH)
export interface UpdateOffrirDTO {
  quantite?: number | null;
  // IDs non modifiables (clé primaire composite)
}