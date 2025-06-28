import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field()
  email: string;

  @Field()
  nom: string;

  @Field()
  prenom: string;

  @Field()
  telephone: string;

  @Field()
  adresse: string;

  @Field()
  role: string;

  @Field({ nullable: true })
  password?: string;
}