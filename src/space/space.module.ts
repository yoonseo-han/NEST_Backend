import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpaceController } from './space.controller';
import { SpaceRepository } from './space.repository';
import { SpaceService } from './space.service';
import { Space } from './space.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([SpaceRepository])
  ],
  controllers: [SpaceController],
  providers: [SpaceService]
})
export class SpaceModule {}
