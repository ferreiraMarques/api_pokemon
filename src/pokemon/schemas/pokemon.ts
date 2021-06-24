import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type PokemonDocument = Pokemon & Document;

@Schema()
export class Pokemon {

    @Prop({ _id: true, auto: true })
    id: string

    @Prop({ unique: true })
    identify: number

    @Prop({ unique: true })
    name: string

    @Prop({})
    base_experience: number

    @Prop({})
    height: number

    @Prop({})
    is_default: boolean

    @Prop({})
    order: number

    @Prop({})
    weight: number

}

export const PokemonSchema = SchemaFactory.createForClass(Pokemon);