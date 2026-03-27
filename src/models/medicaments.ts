
export interface Medicament {
  id: string;
  nomcommercial: string;
  idfamille: string;
  composition: string;
  effets: string;
  contreindications: string;
};

//pour la création (POST)
export interface CreateMedicamentDTO {
  id: string;
  nomcommercial: string;
  idfamille: string;
  composition: string;
  effets: string;
  contreindications: string;
};

//pour la modification (PUT/PATCH)
export interface UpdateMedicamentDTO {
  nomcommercial?: string;
  idfamille?: string;
  composition?: string;
  effets?: string;
  contreindications?: string;
};