import { InputType, Field, Float } from '@nestjs/graphql';

@InputType()
export class CreateColisInput {
  @Field()
  destinataire: string;

  @Field()
  adresse: string;

  @Field()
  statut: string;

  @Field()
  expediteur: string;

  @Field()
  dateExpedition: string;

  @Field()
  numeroSuivi: string;

  @Field(() => Float)
  poids: number;

  @Field({ nullable: true })
  dateEstimeeLivraison?: string;

  @Field({ nullable: true })
  commentaire?: string;

  @Field()
  type: string;

  @Field(() => Float)
  valeurDeclaree: number;
}