import { Test, TestingModule } from '@nestjs/testing';
import { WebhookService } from './webhook.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LandmarkEntity } from './entities/landmark.entity';

const mockWebhookRepository = {
  save: jest.fn(),
  findOne: jest.fn(),
  find: jest.fn(),
};

describe('WebhookService', () => {
  let service: WebhookService;
  let repository: Repository<LandmarkEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WebhookService,
        {
          provide: getRepositoryToken(LandmarkEntity),
          useValue: mockWebhookRepository,
        },
      ],
    }).compile();

    service = module.get<WebhookService>(WebhookService);
    repository = module.get<Repository<LandmarkEntity>>(
      getRepositoryToken(LandmarkEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
