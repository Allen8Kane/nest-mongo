import {
    IsInt,
    IsString,
    Min,
    Max
  } from 'class-validator';
export class UserDto {
  @IsString()
  name: string
  @IsInt()
  salary: number
}
