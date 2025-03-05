import { Injectable } from '@nestjs/common';
import { CreateWebhookDto } from './dto/create-webhook.dto';
import { UpdateWebhookDto } from './dto/update-webhook.dto';

@Injectable()
export class WebhookService {
  fetchAndCreateLandmarks(params: CreateWebhookDto) {
    try {
      const query = `
        [out:json];
        (
          node(around:1000, ${params.lat}, ${params.long})["tourism"];
          way(around:1000, ${params.lat}, ${params.long})["highway"];
        );
        out body;
      `;

      const response = await axios.get('https://overpass-api.de/api/interpreter', {
        params: { data: query },
      });

      const elements = response.data.elements;

      const landmarks = elements.map((el) => ({
        osmId: el.id.toString(),
        type: el.type,
        latitude: el.lat ?? null,
        longitude: el.lon ?? null,
        name: el.tags?.name ?? null,
        tags: el.tags ?? {},
      }));

  }
}
