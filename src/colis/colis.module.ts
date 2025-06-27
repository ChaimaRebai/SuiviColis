import { Module } from '@nestjs/common';
import { ColisResolver } from './colis.resolver';
import { ColisService } from './colis.service';

@Module({
  providers: [ColisResolver, ColisService]
})
export class ColisModule {}
