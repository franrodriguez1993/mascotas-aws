import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import helmet from 'helmet';
import { ConfigModule } from '@nestjs/config';
import { MongoConfigModule } from './database/MongoConfig.module';
import { PetModule } from './App/modules/pet/pet.module';
import { UserModule } from './App/modules/user/user.module';
import { MediaModule } from './App/modules/media/media.module';
import { FoodModule } from './App/modules/food/food.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongoConfigModule,
    PetModule,
    UserModule,
    MediaModule,
    FoodModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(helmet()).forRoutes('*');
  }
}
