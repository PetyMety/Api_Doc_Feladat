import { IsNotEmpty, IsString } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";

/**
 * The data required to creat a new playlist
 */
export class CreatePlaylistDto {

    /**
     * The playlist made out of songs
     */
    @IsNotEmpty()
    @IsString()
    @ApiProperty({example: 'Gaming Songs'})
    nev: string;
}
