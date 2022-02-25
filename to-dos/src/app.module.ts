import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { TodosModule } from './todos/todos.module';
import { AuthModule } from './auth/auth.module';
import { FoldersModule } from './folders/folders.module';

@Module({
  imports: [PrismaModule, TodosModule, AuthModule, ConfigModule.forRoot(), FoldersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
