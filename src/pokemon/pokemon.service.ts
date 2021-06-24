import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { HttpService } from "@nestjs/common/http";
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { PokemonDto } from './dto/pokemon.dto';
import { Pokemon, PokemonDocument } from './schemas/pokemon';

@Injectable()
export class PokemonService {

    constructor(
        private httpService: HttpService,
        @InjectModel(Pokemon.name) private pokemonModel: Model<PokemonDocument>,
    ) { }

    public async getPokemonByIdOrName(idOrName: string): Promise<CreatePokemonDto> {
        try {           
            const response = await this.httpService.get<CreatePokemonDto>(`${process.env.API_URL}/pokemon/${idOrName}/`).toPromise();
            let data = response.data;

            const exists = await this.pokemonModel.findOne({ name: data.name }).exec();
            if (exists != null) {
                return exists;
            }

            let newPokemon: CreatePokemonDto = {
                identify: parseInt(data.id),
                base_experience: data.base_experience,
                height: data.height,
                is_default: data.is_default,
                name: data.name,
                order: data.order,
                weight: data.weight,
                id: ''
            };
            return await new this.pokemonModel({ ...newPokemon, createdAt: new Date() }).save();
        } catch (error) {           
            throw new HttpException('Not found', HttpStatus.NOT_FOUND);
        }
    }
}
