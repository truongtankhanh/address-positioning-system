import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base-entity';

@Entity('level', { schema: 'building_db' })
export class Level extends BaseEntity {
  @Column('varchar', { length: 255 })
  name: string;

  @Column('varchar', { length: 255 })
  code: string;
}
