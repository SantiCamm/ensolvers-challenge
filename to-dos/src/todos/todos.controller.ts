import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { TodoEntity } from './entities/todo.entity';

@Controller('todos')
@ApiTags('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  @ApiCreatedResponse({ type: TodoEntity })
  async create(@Body() createTodoDto: CreateTodoDto) {
    return new TodoEntity(await this.todosService.create(createTodoDto));
  }

  @Get()
  // @UseGuards(AuthGuard("jwt"))
  @ApiOkResponse({ type: [TodoEntity] })
  async findAll() {
    const todos = await this.todosService.findAll();
    return todos.map((todo) => new TodoEntity(todo));
  }

  @Get(':id')
  @ApiOkResponse({ type: TodoEntity })
  async findOne(@Param('id') id: string) {
    return new TodoEntity(await this.todosService.findOne(id));
  }

  @Patch(':id')
  @ApiCreatedResponse({ type: TodoEntity })
  async update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return new TodoEntity(await this.todosService.update(id, updateTodoDto));
  }

  @Delete(':id')
  @ApiOkResponse({ type: TodoEntity })
  async remove(@Param('id') id: string) {
    return new TodoEntity(await this.todosService.remove(id));
  }
}
