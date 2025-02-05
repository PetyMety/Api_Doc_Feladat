import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode } from '@nestjs/common';
import { PlaylistService } from './playlist.service';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { ApiBadRequestResponse, ApiParam, ApiResponse } from '@nestjs/swagger';


/**
 * Controller for playlists
 */
@Controller('playlist')
export class PlaylistController {
  constructor(private readonly playlistService: PlaylistService) {}

  /**
   * Create a new playlist
   * 
   * @param createPlaylistDto The data to create a new playlist
   * @returns New playlist add to database
   */
  @Post()
  @ApiResponse({
    status: 201,
    description: 'The playlist has been successfully created.',
    type: CreatePlaylistDto,
  })
  create(@Body() createPlaylistDto: CreatePlaylistDto) {
    return this.playlistService.create(createPlaylistDto);
  }


  /**
   * 
   * @returns JSON response with all playlists
   */
  @Get()
  @ApiResponse(
    {
      status: 200,
      description: 'All playlists',
    }
  )
  @ApiBadRequestResponse({
    description: 'The supplied data was invalid'
  })
  findAll() {
    return this.playlistService.findAll();
  }

  /**
   * 
   * @param id The id of the playlist to get
   * @returns The playlist with the specified id
   */

  @Get(':id')
  @ApiParam({
    name: 'id',
    description: 'The id of the playlist to get',
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: 'The playlist with the specified id.',
  })
  @ApiBadRequestResponse({
    description: 'The supplied data was invalid',
  })
  findOne(@Param('id') id: string) {
    return this.playlistService.findOne(+id);
  }

  /**
   * Modifies the specified playlist
   * 
   * @param id The id of the playlist to update
   * @param updatePlaylistDto The data to update the playlist with
   * @returns JSON response with the updated playlist
   */
  @Patch(':id')
  @ApiParam({
    name: 'id',
    description: 'The id of the playlist to update',
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: 'The playlist has been updated.',
  })
  @ApiBadRequestResponse({
    description: 'The supplied data was invalid',
  })
  update(@Param('id') id: string, @Body() updatePlaylistDto: UpdatePlaylistDto) {
    return this.playlistService.update(+id, updatePlaylistDto);
  }

  /**
   * 
   * @param id The id of the playlist to delete
   */
  @Delete(':id')
  @HttpCode(201)
  @ApiParam({
    name: 'id',
    description: 'The id of the playlist to delete',
    required: true,
  })
  @ApiResponse({
    status: 201,
    description: 'The playlist has been deleted.',
  })
  @ApiBadRequestResponse({
    description: 'The supplied data was invalid',
  })
  remove(@Param('id') id: string) {
    return this.playlistService.remove(+id);
  }
}
