import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType()
export class Colis {
  @Field(() => ID)
  id: string;

  @Field()
  destinataire: string;

  @Field()
  adresse: string;

  @Field()
  statut: string;
}
