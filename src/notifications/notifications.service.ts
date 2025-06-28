import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from './entities/notification.entity';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification)
    private readonly notificationRepository: Repository<Notification>,
  ) {}

  async create(createNotificationInput: Partial<Notification>): Promise<Notification> {
    const notification = this.notificationRepository.create({
      lu: false,
      ...createNotificationInput
    });
    return this.notificationRepository.save(notification);
  }

  async findAll(): Promise<Notification[]> {
    return this.notificationRepository.find();
  }

  async findByUser(userId: string): Promise<Notification[]> {
    return this.notificationRepository.find({ where: { userId } });
  }

  async findByColis(colisId: string): Promise<Notification[]> {
    return this.notificationRepository.find({ where: { colisId } });
  }

  async markAsRead(id: string): Promise<Notification> {
    const notification = await this.notificationRepository.findOne({ where: { id } });
    if (!notification) {
      throw new NotFoundException(`Notification with ID ${id} not found`);
    }
    
    notification.lu = true;
    notification.dateLecture = new Date();
    return this.notificationRepository.save(notification);
  }

  async markAllAsRead(userId: string): Promise<boolean> {
    const result = await this.notificationRepository.update(
      { userId, lu: false },
      { lu: true, dateLecture: new Date() }
    );
    return (result.affected ?? 0) > 0;
  }

  async remove(id: string): Promise<boolean> {
    const result = await this.notificationRepository.delete(id);
    return (result.affected ?? 0) > 0;
  }
}