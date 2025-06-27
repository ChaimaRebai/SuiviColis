import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ColisService } from './colis.service';

import { Colis } from './entities/colis.entity';


@Resolver(() => Colis)
export class ColisResolver { constructor(private readonly colisService: ColisService) {}

  @Query(() => [Colis])
  getAllColis() {
    return this.colisService.findAll();
  }

  @Query(() => Colis)
  getColisById(@Args('id') id: string) {
    return this.colisService.findOne(id);
  }

  @Mutation(() => Colis)
  createColis(
    @Args('destinataire') destinataire: string,
    @Args('adresse') adresse: string,
  ) {
    return this.colisService.create(destinataire, adresse);
  }

  @Mutation(() => Colis)
  updateStatut(@Args('id') id: string, @Args('statut') statut: string) {
    return this.colisService.updateStatut(id, statut);
  }}
