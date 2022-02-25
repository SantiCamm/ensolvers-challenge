import { Todo, Prisma, Folder } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class TodoEntity implements Todo {
  @ApiProperty()
  id: number;

  @ApiProperty()
  text: string;

  @ApiProperty()
  folder: Folder;

  @ApiProperty({ default: false })
  completed: boolean;

  @ApiProperty()
  folderId: number;

  @ApiProperty()
  creatorId: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  constructor(partial: Partial<TodoEntity>) {
    Object.assign(this, partial);
  }
}
