
export interface Medicament {
  id: string;
  nomCommercial: string;
  idFamille: string;
  composition: string;
  effets: string;
  contreIndications: string;
};

//pour la création (POST)
export interface CreateMedicamentDTO {
  id: string; // ID fourni manuellement (ex: 'AMOX45')
  nomCommercial: string;
  idFamille: string;
  composition: string;
  effets: string;
  contreIndications: string;
};

//pour la modification (PUT/PATCH)
export interface UpdateMedicamentDTO {
  nomCommercial?: string;
  idFamille?: string;
  composition?: string;
  effets?: string;
  contreIndications?: string;
  //ID non modifiable
};