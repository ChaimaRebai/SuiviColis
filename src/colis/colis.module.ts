import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Colis } from './entities/colis.entity';
import { ColisResolver } from './colis.resolver';
import { ColisService } from './colis.service';

@Module({
  imports: [TypeOrmModule.forFeature([Colis])],
  providers: [ColisResolver, ColisService],
  exports: [ColisService]
})
export class ColisModule {}
