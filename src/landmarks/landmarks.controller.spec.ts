import { Test, TestingModule } from '@nestjs/testing';
import { LandmarksController } from './landmarks.controller';
import { LandmarksService } from './landmarks.service';

const mockLandmarksService = {
  getLandmarks: jest.fn(), // Mock a method
};

describe('LandmarksController', () => {
  let controller: LandmarksController;
  let service: LandmarksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LandmarksController],
      providers: [
        {
          provide: LandmarksService, // Provide mock instead of real service
          useValue: mockLandmarksService,
        },
      ],
    }).compile();

    controller = module.get<LandmarksController>(LandmarksController);
    service = module.get<LandmarksService>(LandmarksService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return landmarks when `getAllLandmarks` is called', async () => {
    const mockLandmarks = [
      { osmId: '1', lat: 48.859, lon: 2.294, name: 'Eiffel Tower', tags: {} },
    ];
    mockLandmarksService.getLandmarks.mockResolvedValue(mockLandmarks);

    const result = await controller.getLandmarks({ lat: 48.859, lon: 2.294 });
    expect(result).toEqual(mockLandmarks);
    expect(mockLandmarksService.getLandmarks).toHaveBeenCalledTimes(1);
  });
});
