import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { NotificationsService } from './notifications.service';
import { Notification } from './entities/notification.entity';
import { CreateNotificationInput } from './dto/create-notification.input';

@Resolver(() => Notification)
export class NotificationsResolver {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Query(() => [Notification])
  async notifications(): Promise<Notification[]> {
    return this.notificationsService.findAll();
  }

  @Query(() => [Notification])
  async userNotifications(@Args('userId') userId: string): Promise<Notification[]> {
    return this.notificationsService.findByUser(userId);
  }

  @Query(() => [Notification])
  async colisNotifications(@Args('colisId') colisId: string): Promise<Notification[]> {
    return this.notificationsService.findByColis(colisId);
  }

  @Mutation(() => Notification)
  async createNotification(
    @Args('createNotificationInput', { type: () => CreateNotificationInput }) createNotificationInput: CreateNotificationInput,
  ): Promise<Notification> {
    return this.notificationsService.create(createNotificationInput);
  }

  @Mutation(() => Notification)
  async markNotificationAsRead(@Args('id') id: string): Promise<Notification> {
    return this.notificationsService.markAsRead(id);
  }

  @Mutation(() => Boolean)
  async markAllNotificationsAsRead(@Args('userId') userId: string): Promise<boolean> {
    return this.notificationsService.markAllAsRead(userId);
  }

  @Mutation(() => Boolean)
  async removeNotification(@Args('id') id: string): Promise<boolean> {
    return this.notificationsService.remove(id);
  }
}