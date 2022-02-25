import { Folder, Todo, Prisma } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class FolderEntity {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty({ default: [] })
  todos: Todo[];

  constructor(partial: Partial<FolderEntity>) {
    Object.assign(this, partial);
  }
}
