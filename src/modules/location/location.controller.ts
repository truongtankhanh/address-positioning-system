import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Param, Post, Put, Delete } from '@nestjs/common';
import { LocationService } from './location.service';
import { Location } from '../../../database/enities';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';

@ApiTags('Locations')
@Controller(':build_id/location')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new location' })
  @ApiResponse({ status: 201, description: 'Creates a new location' })
  async createOrder(
    @Param('build_id') buildId: string,
    @Body() createLocationDto: CreateLocationDto,
  ): Promise<Location> {
    return this.locationService.createLocation(buildId, createLocationDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an location by ID' })
  @ApiResponse({ status: 200, description: 'Updates an location by ID' })
  async updateOrderById(
    @Param('id') id: string,
    @Body() updateLocationDto: UpdateLocationDto,
  ): Promise<Location> {
    return this.locationService.updateLocation(id, updateLocationDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an location by ID' })
  @ApiResponse({ status: 200, description: 'Deletes an location by ID' })
  async deleteOrderById(@Param('id') id: string): Promise<void> {
    return this.locationService.deleteLocation(id);
  }
}
