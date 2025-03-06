import { Module } from '@nestjs/common';
import { WebhookService } from './webhook.service';
import { WebhookController } from './webhook.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LandmarkEntity } from './entities/landmark.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LandmarkEntity])],
  controllers: [WebhookController],
  providers: [WebhookService],
})
export class WebhookModule {}
