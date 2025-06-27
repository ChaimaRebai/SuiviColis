import { Injectable, NotFoundException } from '@nestjs/common';
import { Colis } from './entities/colis.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ColisService {
  private colis: Colis[] = [
    {
      id: '1',
      destinataire: 'Ali',
      adresse: 'Tunis',
      statut: 'En cours de livraison',
    },
  ];

  findAll(): Colis[] {
    return this.colis;
  }

  findOne(id: string): Colis {
    const colis = this.colis.find((c) => c.id === id);
    if (!colis) {
      throw new NotFoundException(`Colis avec l'id ${id} introuvable`);
    }
    return colis;
  }

  create(destinataire: string, adresse: string): Colis {
    const newColis = {
      id: uuidv4(),
      destinataire,
      adresse,
      statut: 'En préparation',
    };
    this.colis.push(newColis);
    return newColis;
  }

  updateStatut(id: string, statut: string): Colis {
    const colis = this.colis.find((c) => c.id === id);
    if (!colis) {
      throw new NotFoundException(`Impossible de mettre à jour : colis ${id} introuvable`);
    }
    colis.statut = statut;
    return colis;
  }
}
