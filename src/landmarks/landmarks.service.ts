import { Injectable } from '@nestjs/common';

@Injectable()
export class LandmarksService {
  findAll(lat: number, long: number) {
    return `This action returns all landmarks`;
  }
}
