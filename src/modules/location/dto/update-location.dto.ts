import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class UpdateLocationDto {
  @ApiProperty()
  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  readonly location_name: string;

  @ApiProperty()
  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  readonly code: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  readonly area: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  readonly parent_location: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  readonly level_id: string;
}
