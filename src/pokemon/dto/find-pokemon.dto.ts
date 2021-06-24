import { IsNotEmpty, IsString } from "class-validator";

export class FindPokemonDto {

    @IsString()
    @IsNotEmpty()
    idOrname: string
}