import { Test, TestingModule } from '@nestjs/testing';
import { LandmarksService } from './landmarks.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { LandmarkEntity } from '../webhook/entities/landmark.entity';

const mockLandmarkRepository = {
  find: jest.fn(),
  save: jest.fn(),
};

describe('LandmarkService', () => {
  let service: LandmarksService;
  let repository: Repository<LandmarkEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LandmarksService,
        {
          provide: getRepositoryToken(LandmarkEntity),
          useValue: mockLandmarkRepository,
        },
      ],
    }).compile();

    service = module.get<LandmarksService>(LandmarksService);
    repository = module.get<Repository<LandmarkEntity>>(
      getRepositoryToken(LandmarkEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  it('should return landmarks', async () => {
    const mockLandmarks = [
      {
        osmId: '1',
        lat: 48.859,
        lon: 2.294,
        name: 'Eiffel Tower',
        tags: { tourism: 'attraction' },
      },
    ];
    mockLandmarkRepository.find.mockResolvedValue(mockLandmarks);

    const result = await service.getLandmarks(48.859, 2.294);
    expect(result).toEqual(mockLandmarks);
    expect(mockLandmarkRepository.find).toHaveBeenCalledTimes(1);
  });
});
