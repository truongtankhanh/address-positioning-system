import { Column, Entity, OneToMany } from 'typeorm';
import { Location } from './location';
import { BaseEntity } from './base-entity';

@Entity('building', { schema: 'building_db' })
export class Building extends BaseEntity {
  @Column('varchar', { length: 255 })
  name: string;

  @Column('varchar', { length: 255 })
  code: string;

  @Column('uuid', { name: 'level_id', nullable: true })
  levelId: string;

  @OneToMany(() => Location, (location) => location.building)
  locations: Promise<Location[]>;
}
