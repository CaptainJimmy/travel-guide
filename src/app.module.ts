import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LandmarksModule } from './landmarks/landmarks.module';
import { WebhookModule } from './webhook/webhook.module';
import { Landmark } from './landmarks/entities/landmark.entity';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'landmarks.db', // SQLite database file
      entities: [Landmark],
      synchronize: true, // Auto-create tables (disable in production)
    }),
    LandmarksModule,
    WebhookModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
