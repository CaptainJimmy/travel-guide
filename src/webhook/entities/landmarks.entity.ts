import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class LandmarkEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  osmId: string; // OSM ID from Overpass API

  @Column({ type: 'decimal', precision: 8, scale: 5, nullable: true })
  lat: number;

  @Column({ type: 'decimal', precision: 8, scale: 5, nullable: true })
  long: number;

  @Column({ type: 'text', nullable: true })
  name: string;

  @Column({ type: 'json', nullable: true })
  tags: object;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
