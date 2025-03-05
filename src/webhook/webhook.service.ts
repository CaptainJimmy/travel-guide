import { Injectable } from '@nestjs/common';
import { CreateWebhookDto } from './dto/create-webhook.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import axios from 'axios';
import { Landmark } from '../landmarks/entities/landmark.entity';

export interface OverpassElement {
  id: number;
  type: 'node' | 'way' | 'relation';
  lat?: number;
  lon?: number;
  tags?: Record<string, string>;
}

export interface OverpassResponse {
  elements: OverpassElement[];
}

export interface LandmarkData {
  osmId: string;
  type: 'node' | 'way' | 'relation';
  lat: number | null;
  long: number | null;
  name: string | null;
  tags: Record<string, string>;
}

@Injectable()
export class WebhookService {
  constructor(
    @InjectRepository(Landmark)
    private readonly landmarkRepository: Repository<Landmark>,
  ) {}

  async fetchAndCreateLandmarks(params: CreateWebhookDto) {
    try {
      const query = `
        [out:json];
        (
          node(around:1000, ${params.lat}, ${params.long})["tourism"];
          way(around:1000, ${params.lat}, ${params.long})["highway"];
        );
        out body;
      `;

      const response = await axios.get<OverpassResponse>(
        'https://overpass-api.de/api/interpreter',
        {
          params: { data: query },
        },
      );

      const elements: OverpassElement[] = response.data.elements;

      const landmarks: LandmarkData[] = elements.map((el) => ({
        osmId: el.id.toString(),
        type: el.type,
        lat: el.lat ? parseFloat(el.lat.toFixed(3)) : null,
        long: el.lon ? parseFloat(el.lon.toFixed(3)) : null,
        name: el.tags?.name ?? null,
        tags: el.tags ?? {},
      }));

      await this.landmarkRepository.save(landmarks);

      return `Stored ${landmarks.length} landmarks successfully!`;
    } catch (error) {
      throw new Error(`Failed to fetch or store landmarks`);
    }
  }
}
