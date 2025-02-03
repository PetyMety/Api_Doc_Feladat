import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, HttpCode, Query } from '@nestjs/common';
import { SongService } from './song.service';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';

@Controller('song')
export class SongController {
  constructor(private readonly songService: SongService) {}

  @Post()
  create(@Body() createSongDto: CreateSongDto) {
    return this.songService.create(createSongDto);
  }

  @Get()
  findAll() {
    return this.songService.findAll();
  }
  @Get('top')
  topSong(@Query('count')limit: string= '10'){
    return this.songService.topSong(+limit);
  }
  @Get('popularArtist')
  popularArtist(){
    return this.songService.popularArtist();
    
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.songService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSongDto: UpdateSongDto) {
    return this.songService.update(+id, updateSongDto);
  }

  @HttpCode(201)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const eredmeny=  await this.songService.remove(+id);
    console.log(eredmeny);
    if(!eredmeny){
      throw new NotFoundException("Nincs ilyen");
    }
  }
  @Get('free')
  findFree(){
    return this.songService.findFree();
  }
  
}
