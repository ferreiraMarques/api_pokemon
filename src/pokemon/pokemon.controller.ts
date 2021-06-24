import { Controller, Get, Param } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { FindPokemonDto } from './dto/find-pokemon.dto';
import { PokemonService } from './pokemon.service';

@Controller('pokemon')
export class PokemonController {

    constructor(private pokemonService: PokemonService) { }

    @Get(':idOrname')
    public async getPokemon(@Param() findPokemonDto: FindPokemonDto): Promise<CreatePokemonDto> {
        return await this.pokemonService.getPokemonByIdOrName(findPokemonDto.idOrname);
    }
}
