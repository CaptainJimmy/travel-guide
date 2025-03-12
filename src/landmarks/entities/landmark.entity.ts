import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Landmark {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  osmId: string;

  @Column()
  type: string;

  @Column({ type: 'decimal', precision: 8, scale: 5, nullable: true })
  lat: number;

  @Column({ type: 'decimal', precision: 8, scale: 5, nullable: true })
  lon: number;

  @Column({ type: 'text', nullable: true })
  name: string;

  @Column({ type: 'json', nullable: true })
  tags: object;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
