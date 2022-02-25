import { ApiProperty } from '@nestjs/swagger';
import { Todo } from '@prisma/client';
import { IsNotEmpty } from 'class-validator';

export class CreateFolderDto {
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @ApiProperty({ type: [String], required: false, default: [] })
  todos: Todo[];
}
