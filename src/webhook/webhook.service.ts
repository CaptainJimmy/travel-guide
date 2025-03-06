import { Injectable } from '@nestjs/common';
import { CreateWebhookDto } from './dto/create-webhook.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import axios from 'axios';
import { Landmark } from '../landmarks/entities/landmark.entity';

export interface OverpassElement {
  id: number;
  type: 'node' | 'way' | 'relation';
  lat: number;
  lon: number;
  tags?: Record<string, string>;
}

export interface OverpassResponse {
  elements: OverpassElement[];
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
          node(around:1000, ${params.lat}, ${params.lon})["tourism"];
          way(around:1000, ${params.lat}, ${params.lon})["highway"];
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
      // Filter: saving only 'node' type & ensure lat/lon exist
      const validElements = elements.filter(
        (el) =>
          el.type === 'node' && el.lat !== undefined && el.lon !== undefined,
      );

      const landmarks = validElements.map((el) => ({
        osmId: el.id.toString(),
        lat: el.lat ? parseFloat(el.lat.toFixed(3)) : 0.0,
        lon: el.lon ? parseFloat(el.lon.toFixed(3)) : 0.0,
        name: el.tags?.name ?? undefined,
        tags: el.tags ?? {},
      }));

      await this.landmarkRepository.save(landmarks);

      return `Stored ${landmarks.length} landmarks successfully!`;
    } catch (error) {
      throw new Error(
        `Failed to fetch or store landmarks: ${error?.message ?? 'Unknown error'}`,
      );
    }
  }
}
