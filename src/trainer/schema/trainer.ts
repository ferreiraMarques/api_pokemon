import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Pokemon } from "src/pokemon/schemas/pokemon";
import * as mongoose from 'mongoose';

export type TrainerDocument = Trainer & Document;

@Schema()
export class Trainer {

    @Prop({ _id: true, auto: true })
    id: string

    @Prop({ unique: true, required: true })
    name: string

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pokemon' }] })
    pokemons: Pokemon[];
}

export const TrainerSchema = SchemaFactory.createForClass(Trainer);