import {
  Controller,
  Get,
  UsePipes,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { LandmarksService } from './landmarks.service';
import { GetLandmarksDto } from './dto/get-landmarks.dto';

@Controller('landmarks')
export class LandmarksController {
  constructor(private readonly landmarksService: LandmarksService) {}

  @Get()
  @UsePipes(new ValidationPipe({ transform: true }))
  getLandmarks(@Query() query: GetLandmarksDto) {
    const { lat, long } = query;
    return this.landmarksService.findAll(lat, long);
  }
}
