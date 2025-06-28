import { InputType, Field, ID, Float } from '@nestjs/graphql';

@InputType()
export class UpdateColisInput {
  @Field(() => ID)
  id: string;

  @Field({ nullable: true })
  destinataire?: string;

  @Field({ nullable: true })
  adresse?: string;

  @Field({ nullable: true })
  statut?: string;

  @Field({ nullable: true })
  expediteur?: string;

  @Field({ nullable: true })
  dateExpedition?: string;

  @Field({ nullable: true })
  numeroSuivi?: string;

  @Field(() => Float, { nullable: true })
  poids?: number;

  @Field({ nullable: true })
  dateEstimeeLivraison?: string;

  @Field({ nullable: true })
  commentaire?: string;

  @Field({ nullable: true })
  type?: string;

  @Field(() => Float, { nullable: true })
  valeurDeclaree?: number;
}