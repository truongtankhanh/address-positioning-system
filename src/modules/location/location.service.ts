import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AppDataSource } from '../../../database/config';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { Building, Level, Location } from '../../../database/enities';

@Injectable()
export class LocationService {
  private readonly locationRepository = AppDataSource.getRepository(Location);

  async getLocationById(id: string): Promise<Location> {
    try {
      return await this.locationRepository.findOneOrFail({ where: { id } });
    } catch (error) {
      throw new HttpException(
        (error as Error).message,
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }
  }

  async createLocation(
    buildId: string,
    createLocationDto: CreateLocationDto,
  ): Promise<Location> {
    try {
      return await AppDataSource.transaction(async (t) => {
        const locationRepository = t.getRepository(Location);
        const buidingRepository = t.getRepository(Building);
        const levelRepository = t.getRepository(Level);

        const location = new Location();
        location.locationName = createLocationDto.location_name;
        location.area = createLocationDto.area;

        const building = await buidingRepository.findOne({
          where: { id: buildId },
        });

        if (!building) {
          throw new HttpException(
            `Building ${buildId} not found`,
            HttpStatus.NOT_FOUND,
          );
        }

        const levelId = !createLocationDto.level_id
          ? building.levelId
          : createLocationDto.level_id;

        const level = await levelRepository.findOne({ where: { id: levelId } });

        if (!level) {
          location.locationNumber = `${building.code}-${createLocationDto.location_name.trim()}`;
        }

        if (!createLocationDto.parent_location) {
          location.locationNumber = `${building.code}-${level.code}`;
        }

        const parentLocation = await this.locationRepository.findOne({
          where: { id: createLocationDto.parent_location },
        });

        if (!parentLocation) {
          throw new HttpException(
            `Location ${createLocationDto.parent_location} not found`,
            HttpStatus.NOT_FOUND,
          );
        }

        location.locationNumber = `${parentLocation.locationNumber}-${createLocationDto.code}`;

        const newLocation = locationRepository.create(location);
        return await locationRepository.save(newLocation);
      });
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
    try {
      return await AppDataSource.transaction(async (t) => {
        const locationRepository = t.getRepository(Location);
        const levelRepository = t.getRepository(Level);

        const location = await this.getLocationById(id);
        if (!location) {
          throw new HttpException(
            `Location ${id} not found`,
            HttpStatus.NOT_FOUND,
          );
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

        const level = await levelRepository.findOne({
          where: { id: updateLocationDto.level_id },
        });
        if (!level) {
          throw new HttpException(
            `Level ${updateLocationDto.level_id} not found`,
            HttpStatus.NOT_FOUND,
          );
        }

        const updatedLocation = Object.assign(location, updateLocationDto);
        return await locationRepository.save(updatedLocation);
      });
    } catch (error) {
      throw new HttpException(
        (error as Error).message,
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }
  }

  async deleteLocation(id: string): Promise<void> {
    try {
      await AppDataSource.transaction(async (t) => {
        const repository = t.getRepository(Location);

        const location = await this.getLocationById(id);
        if (!location) {
          throw new HttpException('Location not found', HttpStatus.NOT_FOUND);
        }

        await repository.remove(location);
      });
    } catch (error) {
      throw new HttpException(
        (error as Error).message,
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }
  }
}
