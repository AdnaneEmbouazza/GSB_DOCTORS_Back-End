export interface Famille {
  id: string;
  libelle: string;
};

//pour la création (POST)
export interface CreateFamilleDTO {
  id: string; // ID fourni manuellement (ex: 'AA', 'AAA')
  libelle: string;
};

//pour la modification (PUT/PATCH)
export interface UpdateFamilleDTO {
  libelle?: string;
  // ID non modifiable
};