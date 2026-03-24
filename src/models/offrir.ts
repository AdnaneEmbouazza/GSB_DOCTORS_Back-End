export interface Offrir {
  idrapport: number;
  idmedicament: string;
  quantite: number;
};

//pour la création (POST)
export interface CreateOffrirDTO {
  idrapport: number;
  idmedicament: string;
  quantite: number;
};

//pour la modification (PUT/PATCH)
export interface UpdateOffrirDTO {
  quantite?: number;
};