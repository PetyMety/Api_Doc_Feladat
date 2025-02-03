import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateSongDto {
    @IsNotEmpty()
    @IsString()
    cim: string;
    @IsNotEmpty()
    @IsString()
    szerzo: string;
    @IsNotEmpty()
    @IsNumber()
    hossz: number;
    @IsNotEmpty()
    @IsNumber()
    ar: number;
    
}
