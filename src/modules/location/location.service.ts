import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { Building, Location } from '../../../database/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(Building)
    private readonly buidingRepository: Repository<Building>,
    @InjectRepository(Location)
    private readonly locationRepository: Repository<Location>,
  ) {}

  async createLocation(
    createLocationDto: CreateLocationDto,
  ): Promise<Location> {
    const building = await this.buidingRepository.findOne({
      where: { id: createLocationDto.building_id },
    });

    if (!building) {
      throw new HttpException(
        `Building ${createLocationDto.building_id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    if (createLocationDto.parent_location) {
      const parentLocation = await this.locationRepository.findOne({
        where: { id: createLocationDto.parent_location },
      });

      if (!parentLocation) {
        throw new HttpException(
          `Location ${createLocationDto.parent_location} not found`,
          HttpStatus.NOT_FOUND,
        );
      }
    }

    const location = new Location();
    location.locationName = createLocationDto.location_name;
    location.locationNumber = createLocationDto.location_number;
    location.area = createLocationDto.area;
    location.buildingId = createLocationDto.building_id;
    location.parentLocation = createLocationDto.parent_location;
    try {
      const newLocation = this.locationRepository.create(location);
      return await this.locationRepository.save(newLocation);
    } catch (error) {
      throw new HttpException(
        (error as Error).message,
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }
  }

  async updateLocation(
    id: string,
    updateLocationDto: UpdateLocationDto,
  ): Promise<Location> {
    const location = await this.locationRepository.findOne({
      where: { id },
    });
    if (!location) {
      throw new HttpException(`Location ${id} not found`, HttpStatus.NOT_FOUND);
    }

    const parentLocation = await this.locationRepository.findOne({
      where: { id: updateLocationDto.parent_location },
    });
    if (!parentLocation) {
      throw new HttpException(
        `Parent location ${updateLocationDto.parent_location} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    try {
      const updatedLocation = Object.assign(location, updateLocationDto);
      updatedLocation.updatedAt = new Date();
      return await this.locationRepository.save(updatedLocation);
    } catch (error) {
      throw new HttpException(
        (error as Error).message,
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }
  }

  async deleteLocation(id: string): Promise<void> {
    const location = await this.locationRepository.findOne({
      where: { id },
    });
    if (!location) {
      throw new HttpException('Location not found', HttpStatus.NOT_FOUND);
    }

    const isParent = await this.locationRepository.findOne({
      where: { parentLocation: id },
    });

    if (isParent) {
      throw new HttpException(
        `Location ${id} cannot be deleted`,
        HttpStatus.CONFLICT,
      );
    }
    try {
      await this.locationRepository.remove(location);
    } catch (error) {
      throw new HttpException(
        (error as Error).message,
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }
  }
}
