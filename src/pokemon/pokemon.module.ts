import { HttpModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PokemonController } from './pokemon.controller';
import { PokemonService } from './pokemon.service';
import { Pokemon, PokemonSchema } from './schemas/pokemon';

@Module({
  controllers: [
    PokemonController
  ],
  providers: [
    PokemonService
  ],
  imports: [
    HttpModule,
    MongooseModule.forFeature([
      {
        name: Pokemon.name,
        schema: PokemonSchema
      }
    ])
  ],
  exports: [
    PokemonService,
    MongooseModule,
  ]
})
export class PokemonModule { }
