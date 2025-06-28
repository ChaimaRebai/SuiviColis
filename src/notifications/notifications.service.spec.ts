import { Test, TestingModule } from '@nestjs/testing';
import { NotificationsService } from './notifications.service';
import { NotFoundException } from '@nestjs/common';
import { Notification } from './entities/notification.entity';

describe('NotificationsService', () => {
  let service: NotificationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NotificationsService],
    }).compile();

    service = module.get<NotificationsService>(NotificationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new notification', async () => {
      const notificationDto = {
        userId: '1',
        colisId: '1',
        type: 'status_update',
        message: 'Your package has been shipped'
      };

      const result = await service.create(notificationDto);

      expect(result).toHaveProperty('id');
      expect(result.userId).toBe(notificationDto.userId);
      expect(result.dateCreation).toBeDefined();
      expect(result.lu).toBe(false);
    });
  });

  describe('findAll', () => {
    it('should return an array of notifications', async () => {
      const result = await service.findAll();
      expect(Array.isArray(result)).toBe(true);
    });
  });

  describe('findByUser', () => {
    it('should return notifications for a specific user', async () => {
      const notificationDto = {
        userId: '1',
        colisId: '1',
        type: 'status_update',
        message: 'Your package has been shipped'
      };
      await service.create(notificationDto);

      const result = await service.findByUser('1');
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
      expect(result[0].userId).toBe('1');
    });
  });

  describe('findByColis', () => {
    it('should return notifications for a specific colis', async () => {
      const notificationDto = {
        userId: '1',
        colisId: '1',
        type: 'status_update',
        message: 'Your package has been shipped'
      };
      await service.create(notificationDto);

      const result = await service.findByColis('1');
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
      expect(result[0].colisId).toBe('1');
    });
  });

  describe('markAsRead', () => {
    it('should mark a notification as read', async () => {
      const notificationDto = {
        userId: '1',
        colisId: '1',
        type: 'status_update',
        message: 'Your package has been shipped'
      };
      const created = await service.create(notificationDto);
      const result = await service.markAsRead(created.id);

      expect(result.lu).toBe(true);
      expect(result.dateLecture).toBeDefined();
    });

    it('should throw NotFoundException for non-existent notification', async () => {
      await expect(service.markAsRead('999')).rejects.toThrow(NotFoundException);
    });
  });

  describe('markAllAsRead', () => {
    it('should mark all notifications as read for a user', async () => {
      const notificationDto = {
        userId: '1',
        colisId: '1',
        type: 'status_update',
        message: 'Your package has been shipped'
      };
      await service.create(notificationDto);
      await service.create({
        ...notificationDto,
        message: 'Another notification'
      });

      const result = await service.markAllAsRead('1');
      expect(result).toBe(true);

      const userNotifications = await service.findByUser('1');
      expect(userNotifications.every(notif => notif.lu)).toBe(true);
    });
  });

  describe('remove', () => {
    it('should remove a notification', async () => {
      const notificationDto = {
        userId: '1',
        colisId: '1',
        type: 'status_update',
        message: 'Your package has been shipped'
      };
      const created = await service.create(notificationDto);
      const result = await service.remove(created.id);
      expect(result).toBe(true);
    });
  });
});