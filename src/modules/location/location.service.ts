import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AppDataSource } from '../../../database/config';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { Building, Location } from '../../../database/entities';

@Injectable()
export class LocationService {
  async createLocation(
    createLocationDto: CreateLocationDto,
  ): Promise<Location> {
    const buidingRepository = AppDataSource.getRepository(Building);
    const locationRepository = AppDataSource.getRepository(Location);

    const building = await buidingRepository.findOne({
      where: { id: createLocationDto.building_id },
    });

    if (!building) {
      throw new HttpException(
        `Building ${createLocationDto.building_id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    const parentLocation = await locationRepository.findOne({
      where: { id: createLocationDto.parent_location },
    });

    if (!parentLocation) {
      throw new HttpException(
        `Location ${createLocationDto.parent_location} not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    const location = new Location();
    location.locationName = createLocationDto.location_name;
    location.locationNumber = createLocationDto.location_number;
    location.area = createLocationDto.area;
    location.buildingId = createLocationDto.building_id;
    location.parentLocation = createLocationDto.parent_location;
    try {
      const newLocation = locationRepository.create(location);
      return await locationRepository.save(newLocation);
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
    const locationRepository = AppDataSource.getRepository(Location);

    const location = await locationRepository.findOne({
      where: { id },
    });
    if (!location) {
      throw new HttpException(`Location ${id} not found`, HttpStatus.NOT_FOUND);
    }

    const parentLocation = await locationRepository.findOne({
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
      return await locationRepository.save(updatedLocation);
    } catch (error) {
      throw new HttpException(
        (error as Error).message,
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }
  }

  async deleteLocation(id: string): Promise<void> {
    const repository = AppDataSource.getRepository(Location);

    const location = await repository.findOne({
      where: { id },
    });
    if (!location) {
      throw new HttpException('Location not found', HttpStatus.NOT_FOUND);
    }

    const isParent = await repository.findOne({
      where: { parentLocation: id },
    });

    if (isParent) {
      throw new HttpException(
        `Location ${id} cannot be deleted`,
        HttpStatus.CONFLICT,
      );
    }
    try {
      await repository.remove(location);
    } catch (error) {
      throw new HttpException(
        (error as Error).message,
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }
  }
}
