import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Colis } from './entities/colis.entity';
import { CreateColisInput } from './dto/create-colis.input';
import { UpdateColisInput } from './dto/update-colis.input';

@Injectable()
export class ColisService {
  constructor(
    @InjectRepository(Colis)
    private colisRepository: Repository<Colis>,
  ) {}

  async findAll(): Promise<Colis[]> {
    return this.colisRepository.find();
  }

  async findOne(id: string): Promise<Colis> {
    const colis = await this.colisRepository.findOne({ where: { id } });
    if (!colis) {
      throw new NotFoundException(`Colis with ID ${id} not found`);
    }
    return colis;
  }

  async create(createColisInput: CreateColisInput): Promise<Colis> {
    const colis = this.colisRepository.create({
      ...createColisInput,
      dateExpedition: new Date(createColisInput.dateExpedition),
      dateEstimeeLivraison: createColisInput.dateEstimeeLivraison 
        ? new Date(createColisInput.dateEstimeeLivraison) 
        : null,
    });
    return this.colisRepository.save(colis);
  }

  async update(id: string, updateColisInput: Partial<UpdateColisInput>): Promise<Colis> {
    const colis = await this.findOne(id);
    
    const updateData = { ...updateColisInput };
    if (updateColisInput.dateExpedition) {
      updateData.dateExpedition = updateColisInput.dateExpedition;
    }
    if (updateColisInput.dateEstimeeLivraison) {
      updateData.dateEstimeeLivraison = updateColisInput.dateEstimeeLivraison;
    }

    Object.assign(colis, updateData);
    return this.colisRepository.save(colis);
  }

  async remove(id: string): Promise<void> {
    const result = await this.colisRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Colis with ID ${id} not found`);
    }
  }
}