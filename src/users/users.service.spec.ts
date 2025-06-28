import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { NotFoundException } from '@nestjs/common';
import { User } from './entities/user.entity';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const userDto = {
        email: 'test@example.com',
        nom: 'Test',
        prenom: 'User',
        telephone: '1234567890',
        adresse: 'Test Address',
        role: 'user',
        password: 'password123'
      };

      const result = await service.create(userDto);

      expect(result).toHaveProperty('id');
      expect(result.email).toBe(userDto.email);
      expect(result.dateInscription).toBeDefined();
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const result = await service.findAll();
      expect(Array.isArray(result)).toBe(true);
    });
  });

  describe('findOne', () => {
    it('should throw NotFoundException for non-existent user', async () => {
      await expect(service.findOne('999')).rejects.toThrow(NotFoundException);
    });

    it('should find a user by id', async () => {
      const userDto = {
        email: 'test@example.com',
        nom: 'Test',
        prenom: 'User',
        telephone: '1234567890',
        adresse: 'Test Address',
        role: 'user',
        password: 'password123'
      };
      const created = await service.create(userDto);
      const found = await service.findOne(created.id);
      expect(found).toBeDefined();
      expect(found.id).toBe(created.id);
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const userDto = {
        email: 'test@example.com',
        nom: 'Test',
        prenom: 'User',
        telephone: '1234567890',
        adresse: 'Test Address',
        role: 'user',
        password: 'password123'
      };
      const created = await service.create(userDto);
      const updateDto = { nom: 'Updated' };
      
      const result = await service.update(created.id, updateDto);
      expect(result.nom).toBe('Updated');
    });

    it('should throw NotFoundException for non-existent user', async () => {
      await expect(service.update('999', { nom: 'Updated' })).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove a user', async () => {
      const userDto = {
        email: 'test@example.com',
        nom: 'Test',
        prenom: 'User',
        telephone: '1234567890',
        adresse: 'Test Address',
        role: 'user',
        password: 'password123'
      };
      const created = await service.create(userDto);
      const result = await service.remove(created.id);
      expect(result).toBe(true);
      await expect(service.findOne(created.id)).rejects.toThrow(NotFoundException);
    });
  });
});