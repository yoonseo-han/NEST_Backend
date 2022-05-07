import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './space/configs/typeorm.config';
import { SpaceModule } from './space/space.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeORMConfig),
    SpaceModule],
})
export class AppModule {}
