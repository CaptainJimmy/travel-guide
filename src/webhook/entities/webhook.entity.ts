import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class WebhookEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  landmarkName: string;

  @Column()
  lat: number;

  @Column()
  long: number;
}
