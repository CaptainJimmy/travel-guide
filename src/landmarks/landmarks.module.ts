import { Module } from '@nestjs/common';
import { LandmarksService } from './landmarks.service';
import { LandmarksController } from './landmarks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LandmarkEntity } from '../webhook/entities/landmark.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LandmarkEntity])],
  controllers: [LandmarksController],
  providers: [LandmarksService],
})
export class LandmarksModule {}
