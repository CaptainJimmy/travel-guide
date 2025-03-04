import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LandmarksModule } from './landmarks/landmarks.module';
import { WebhookModule } from './webhook/webhook.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite', // SQLite database file
      entities: [__dirname + '/**/*.entity{.ts,.js}'], // Load all entities
      synchronize: true, // Auto-create tables (disable in production)
    }),
    LandmarksModule,
    WebhookModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
