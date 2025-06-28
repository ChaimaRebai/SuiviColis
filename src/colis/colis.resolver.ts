import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ColisService } from './colis.service';
import { Colis } from './entities/colis.entity';
import { CreateColisInput } from './dto/create-colis.input';
import { UpdateColisInput } from './dto/update-colis.input';

@Resolver(() => Colis)
export class ColisResolver {
  constructor(private readonly colisService: ColisService) {}

  @Query(() => [Colis])
  async getAllColis() {
    return this.colisService.findAll();
  }

  @Query(() => Colis)
  async getColisById(@Args('id') id: string) {
    return this.colisService.findOne(id);
  }

  @Mutation(() => Colis)
  async createColis(@Args('createColisInput') createColisInput: CreateColisInput) {
    return this.colisService.create(createColisInput);
  }

  @Mutation(() => Colis)
  async updateColis(@Args('updateColisInput') updateColisInput: UpdateColisInput) {
    return this.colisService.update(updateColisInput.id, updateColisInput);
  }

  @Mutation(() => Boolean)
  async removeColis(@Args('id') id: string) {
    await this.colisService.remove(id);
    return true;
  }
}