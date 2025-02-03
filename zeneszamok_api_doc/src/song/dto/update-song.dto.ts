import { PartialType } from '@nestjs/mapped-types';
import { CreateSongDto } from './create-song.dto';
import { IsNotEmpty, IsNumber, isNumber, Max, Min } from 'class-validator';

export class UpdateSongDto extends PartialType(CreateSongDto) {
    @IsNumber()
    @Min(1)
    @Max(5)
    ertekeles: number;
}
