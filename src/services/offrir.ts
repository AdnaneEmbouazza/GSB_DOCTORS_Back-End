import { Offrir } from '../client/generated/prisma';
import { CreateOffrirDTO , UpdateOffrirDTO} from '../models/offrir';

export function getAllOffre(): Promise<Offrir[]> {

}

export function getOffreByID (id: number): Promise<Offrir> {

}

export function createOffre (data: CreateOffrirDTO): Promise<Offrir> {

}

export function updateOffreById (id: number, data: UpdateOffrirDTO): Promise<Offrir> {

}

export function deleteOffreByID (id: number ): Promise<Offrir> {

}
