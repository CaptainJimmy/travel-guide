import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LandmarkEntity } from '../webhook/entities/landmark.entity';

@Injectable()
export class LandmarksService {
  constructor(
    @InjectRepository(LandmarkEntity)
    private readonly landmarkRepository: Repository<LandmarkEntity>,
  ) {}

  async getLandmarks(lat: number, lon: number) {
    return await this.landmarkRepository.find({
      where: { lat, lon },
    });
  }
}
