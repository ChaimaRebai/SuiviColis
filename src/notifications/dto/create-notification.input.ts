import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateNotificationInput {
  @Field()
  userId: string;

  @Field()
  colisId: string;

  @Field()
  type: string;

  @Field()
  message: string;

  @Field({ defaultValue: false })
  lu: boolean;

  @Field({ nullable: true })
  dateLecture?: Date;
}