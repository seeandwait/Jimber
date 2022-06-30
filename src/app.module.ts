import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AppGateway } from './app.gateway';
import { ServeStaticModule} from '@nestjs/serve-static';
import { join } from 'path'; 


@Module({
  imports: [
    ServeStaticModule.forRoot({ 
      rootPath: join(__dirname, '..', 'client/dist'), 
    }),
    AuthModule,
     UsersModule, ],
  controllers: [AppController],
  providers: [AppService, AppGateway],
})
export class AppModule {}
