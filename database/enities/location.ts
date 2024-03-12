import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { Level } from './level';
import { Building } from './building';
import { BaseEntity } from './base-entity';

@Entity('location', { schema: 'building_db' })
export class Location extends BaseEntity {
  @Column('varchar', { name: 'location_name', length: 255 })
  locationName: string;

  @Column('varchar', { length: 255 })
  code: string;

  @Column('varchar', { name: 'location_number', length: 255 })
  locationNumber: string;

  @Column('double precision')
  area: number;

  @Column('uuid', { name: 'parent_location', nullable: true })
  parentLocation: string;

  @Column('uuid', { name: 'level_id', nullable: true })
  levelId: string;

  @OneToOne(() => Level)
  @JoinColumn([{ name: 'levelId', referencedColumnName: 'id' }])
  level: Level;

  @ManyToOne(() => Building, (building) => building.locations)
  building: Building;
}
