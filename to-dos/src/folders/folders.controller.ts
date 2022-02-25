import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FoldersService } from './folders.service';
import { CreateFolderDto } from './dto/create-folder.dto';
import { UpdateFolderDto } from './dto/update-folder.dto';
import { FolderEntity } from './entities/folder.entity';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

@Controller('folders')
@ApiTags('folders')
export class FoldersController {
  constructor(private readonly foldersService: FoldersService) {}

  @Post()
  @ApiCreatedResponse({ type: FolderEntity })
  async create(@Body() createFolderDto: CreateFolderDto) {
    return new FolderEntity(await this.foldersService.create(createFolderDto));
  }

  @Get()
  @ApiOkResponse({ type: [FolderEntity] })
  async findAll() {
    const folders = await this.foldersService.findAll();
    return folders.map((folder) => new FolderEntity(folder));
  }

  @Get(':id')
  @ApiOkResponse({ type: FolderEntity })
  async findOne(@Param('id') id: string) {
    return new FolderEntity(await this.foldersService.findOne(id));
  }

  @Patch(':id')
  @ApiCreatedResponse({ type: FolderEntity })
  async update(@Param('id') id: string, @Body() updateFolderDto: UpdateFolderDto) {
    return new FolderEntity(await this.foldersService.update(id, updateFolderDto));
  }

  @Delete(':id')
  @ApiOkResponse({ type: FolderEntity })
  async remove(@Param('id') id: string) {
    return new FolderEntity(await this.foldersService.remove(id));
  }
}
