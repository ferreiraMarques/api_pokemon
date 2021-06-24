import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { TrainerDto } from './dto/trainer.dto';
import { TrainerService } from './trainer.service';

@Controller('trainer')
export class TrainerController {

    constructor(private trainerService: TrainerService) { }

    @Get(':name')
    public async getTrainer(@Param('name') name: string) {
        return await this.trainerService.getTrainer(name);
    }

    @Post()
    public async capturePokemon(@Body() trainerDto: TrainerDto) {       
        return await this.trainerService.saveWithPokemon(trainerDto);
    }

    @Put(':id')
    public async liberatePokemon(@Param('id') id: number, @Body() trainerDto: TrainerDto) {
        return await this.trainerService.liberatePokemon(id, trainerDto);
    }
}
