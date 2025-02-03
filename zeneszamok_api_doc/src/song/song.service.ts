import { Injectable } from '@nestjs/common';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class SongService {
  db: PrismaService
  constructor(db: PrismaService){
    this.db= db;
  }
  create(createSongDto: CreateSongDto) {
    return this.db.songs.create({data: {...createSongDto, ertekeles:undefined}});
  }

  findAll() {
    return this.db.songs.findMany();
  }

  findOne(id: number) {
    return this.db.songs.findUnique({where: {id}});
  }

  update(id: number, updateSongDto: UpdateSongDto) {
    return this.db.songs.update({where: {id}, data: updateSongDto});
  }
  findFree(){
    return this.db.songs.findMany({where: {ar:0} })
  }
  topSong(szam: number=10){
    return this.db.songs.findMany({orderBy: {ertekeles: 'desc'}, take: szam})
  }
  async popularArtist(){
    const darab= await this.db.songs.groupBy({by: ["szerzo"], _count:{szerzo: true}, orderBy: {_count: {szerzo: 'desc'}}})
    return darab.map(e=>({szerzo: e.szerzo, darab: e._count.szerzo}));
  }

  async remove(id: number) {
    try{
    return await this.db.songs.delete({where: {id}});
    }catch{
      return undefined;
    }
  }
}
