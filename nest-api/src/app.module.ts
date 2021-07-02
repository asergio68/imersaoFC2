import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RoutesModule } from './routes/routes.module';
import { PositionsController } from './positions/positions.controller';

@Module({
  imports: [
    RoutesModule,
    MongooseModule.forRoot('mongodb://root:root@db/nest?authSource=admin', {
      useNewUrlParser: true,
    }),
  ],
  controllers: [AppController, PositionsController],
  providers: [AppService],
})
export class AppModule {}
