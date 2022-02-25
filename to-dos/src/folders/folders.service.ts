import { Injectable } from '@nestjs/common';
import { CreateFolderDto } from './dto/create-folder.dto';
import { UpdateFolderDto } from './dto/update-folder.dto';
import { PrismaService } from './../prisma/prisma.service';

@Injectable()
export class FoldersService {
  constructor(private prisma: PrismaService) {}

  create(createFolderDto: CreateFolderDto) {
    return this.prisma.folder.create({ data: createFolderDto, include: {todos: true} });
  }

  findAll() {
    return this.prisma.folder.findMany({select: {id: true, name: true,todos: true}});
  }

  findOne(id: string) {
    return this.prisma.folder.findUnique({
      where: { id: parseInt(id) },
    });
  }

  update(id: string, updateFolderDto: UpdateFolderDto) {
    return this.prisma.folder.update({
      where: { id: parseInt(id) },
      data: updateFolderDto,
    });
  }

  remove(id: string) {
    return this.prisma.folder.delete({
      where: { id: parseInt(id) },
    });
  }
}
