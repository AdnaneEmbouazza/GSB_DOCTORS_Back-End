
export interface Medicament {
  id: string;
  nomCommercial: string;
  idfamille: string;
  composition: string;
  effets: string;
  contreindications: string;
};

//pour la création (POST)
export interface CreateMedicamentDTO {
  id: string;
  nomCommercial: string;
  idfamille: string;
  composition: string;
  effets: string;
  contreindications: string;
};

//pour la modification (PUT/PATCH)
export interface UpdateMedicamentDTO {
  nomCommercial?: string;
  idfamille?: string;
  composition?: string;
  effets?: string;
  contreindications?: string;
};