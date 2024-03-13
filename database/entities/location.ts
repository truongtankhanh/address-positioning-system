import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Building } from './building';
import { BaseEntity } from './base-entity';

@Entity('location', { schema: 'building_db' })
export class Location extends BaseEntity {
  @Column('varchar', { name: 'location_name', length: 255 })
  locationName: string;

  @Column('varchar', { name: 'location_number', length: 255 })
  locationNumber: string;

  @Column('double precision')
  area: number;

  @Column('uuid', { name: 'parent_location', nullable: true })
  parentLocation: string;

  @Column('uuid', { name: 'building_id' })
  buildingId: string;

  @ManyToOne(() => Building, (building) => building.locations)
  @JoinColumn([{ name: 'building_id', referencedColumnName: 'id' }])
  building: Building;
}
