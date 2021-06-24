import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pokemon, PokemonDocument } from 'src/pokemon/schemas/pokemon';
import { TrainerDto } from './dto/trainer.dto';
import { Trainer, TrainerDocument } from './schema/trainer';

@Injectable()
export class TrainerService {

    constructor(
        @InjectModel(Trainer.name) private trainerModel: Model<TrainerDocument>,
        @InjectModel(Pokemon.name) private pokemonModel: Model<PokemonDocument>,
    ) { }

    public async getTrainer(name: string) {
        const data = await this.trainerModel.findOne({ name }).populate('pokemons').exec();
        if (data != undefined) {
            return data;
        } else {
            throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
        }
    }

    public async saveWithPokemon(trainer: TrainerDto) {
        try {
            const exists = await this.trainerModel.findOne({ name: trainer.name }).exec();
            if (exists != null) {
                await this.trainerModel.findByIdAndUpdate(exists._id, trainer).exec();
            } else {
                await new this.trainerModel({ ...trainer, createdAt: new Date(), }).save();
            }
            return await this.trainerModel.findOne({ name: trainer.name }).populate('pokemons').exec();
        } catch (error) {
            throw new HttpException('Server error', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public async liberatePokemon(id: number, trainer: TrainerDto) {
        try {
            return await this.trainerModel.findByIdAndUpdate(id, trainer).populate('pokemons').exec();
        } catch (error) {
            throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
        }
    }

}
