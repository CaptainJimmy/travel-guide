import { IsNumber, Matches, Max, Min } from 'class-validator';

export class CreateWebhookDto {
  @IsNumber()
  @Min(-90, { message: 'Latitude must be between -90 and 90' })
  @Max(90, { message: 'Latitude must be between -90 and 90' })
  @Matches(/^(-?\d{1,2}\.\d{5})$/, {
    message: 'Latitude must have exactly 5 decimal places',
  })
  lat: number;

  @IsNumber()
  @Min(-180, { message: 'Longitude must be between -180 and 180' })
  @Max(180, { message: 'Longitude must be between -180 and 180' })
  @Matches(/^(-?\d{1,3}\.\d{5})$/, {
    message: 'Longitude must have exactly 5 decimal places',
  })
  lon: number;
}
