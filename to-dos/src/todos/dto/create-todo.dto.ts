import { ApiProperty } from '@nestjs/swagger';
import { Folder } from '@prisma/client';
import { IsNotEmpty } from 'class-validator';

export class CreateTodoDto {
  @IsNotEmpty()
  @ApiProperty()
  text: string;

  @ApiProperty({ required: false, default: false })
  completed: boolean;

  @IsNotEmpty()
  @ApiProperty()
  folderId: number;

}
