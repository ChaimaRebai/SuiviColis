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

}