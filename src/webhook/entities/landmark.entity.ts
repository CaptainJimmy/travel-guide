import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity()
export class LandmarkEntity {
  @PrimaryColumn()
  osmId: string; // OSM ID from Overpass API

  @Column({ type: 'decimal', precision: 8, scale: 5 })
  lat: number;

  @Column({ type: 'decimal', precision: 8, scale: 5 })
  lon: number;

  @Column({ type: 'text', nullable: true })
  name: string | undefined;

  @Column({ type: 'json', nullable: true })
  tags: object | null;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
