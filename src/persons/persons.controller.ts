import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PersonsService } from './persons.service.js';
import { CreatePersonDto } from './dto/create-person.dto.js';
import { UpdatePersonDto } from './dto/update-person.dto.js';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Persons')
@Controller('persons')
export class PersonsController {
  constructor(private readonly personsService: PersonsService) {}

  @Post()
  @ApiOperation({
    summary: 'Create person',
    description: 'Creates a new person record.',
  })
  create(@Body() createPersonDto: CreatePersonDto) {
    return this.personsService.create(createPersonDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all persons',
    description: 'Retrieves all person records.',
  })
  findAll() {
    return this.personsService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get person by ID',
    description: 'Retrieves a person record by ID.',
  })
  findOne(@Param('id') id: string) {
    return this.personsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update person',
    description: 'Updates a person record by ID.',
  })
  update(@Param('id') id: string, @Body() updatePersonDto: UpdatePersonDto) {
    return this.personsService.update(+id, updatePersonDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete person',
    description: 'Deletes a person record by ID.',
  })
  remove(@Param('id') id: string) {
    return this.personsService.remove(+id);
  }
}
