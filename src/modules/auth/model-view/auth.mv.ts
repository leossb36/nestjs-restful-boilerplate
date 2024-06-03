import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class AuthModelView {
  // you can change this for any serialized type according with your db. e.g: Mongodb _id: ObjectId
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  firstname: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  lastname?: string;

  @ApiProperty()
  @IsString()
  @ApiHideProperty()
  password: string;
}
