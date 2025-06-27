import { Test, TestingModule } from '@nestjs/testing';
import { ColisResolver } from './colis.resolver';

describe('ColisResolver', () => {
  let resolver: ColisResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ColisResolver],
    }).compile();

    resolver = module.get<ColisResolver>(ColisResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
