import { CreateNotificationInput } from './create-notification.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateNotificationInput extends PartialType(CreateNotificationInput) {
  @Field()
  id: string;
}