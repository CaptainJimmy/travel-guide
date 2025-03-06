import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Landmark } from './entities/landmark.entity';

@Injectable()
export class LandmarksService {
  constructor(
    @InjectRepository(Landmark)
    private readonly landmarkRepository: Repository<Landmark>,
  ) {}

  async getLandmarks(lat: number, lon: number) {
    return await this.landmarkRepository.find({
      where: { lat, lon },
    });
  }
}
