import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PokemonModule } from 'src/pokemon/pokemon.module';
import { Trainer, TrainerSchema } from './schema/trainer';
import { TrainerController } from './trainer.controller';
import { TrainerService } from './trainer.service';

@Module({
  imports: [
    PokemonModule,
    MongooseModule.forFeature([
      {
        name: Trainer.name,
        schema: TrainerSchema
      }
    ]),
  ],
  controllers: [
    TrainerController
  ],
  providers: [
    TrainerService,
  ],
})
export class TrainerModule {}
