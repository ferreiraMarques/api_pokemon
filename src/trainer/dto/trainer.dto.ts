import { IsNotEmpty, IsString } from "class-validator";
import { PokemonDto } from "src/pokemon/dto/pokemon.dto";
import { Pokemon } from "src/pokemon/schemas/pokemon";

export class TrainerDto {
   
    @IsString()
    @IsNotEmpty()
    name: string

    @IsNotEmpty()
    pokemons: Pokemon[]

}
