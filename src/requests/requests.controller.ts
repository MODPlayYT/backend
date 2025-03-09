import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { RequestsService } from './requests.service';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';

@Controller('requests') // Префикс маршрута /requests
export class RequestsController {
  constructor(private readonly requestsService: RequestsService) {}

  @Post() // POST /requests
  create(@Body() createRequestDto: CreateRequestDto) {
    return this.requestsService.create(createRequestDto);
  }

  @Get() // GET /requests
  findAll() {
    return this.requestsService.findAll();
  }

  @Get(':id') // GET /requests/:id
  findOne(@Param('id') id: string) {
    return this.requestsService.findOne(+id);
  }

  @Put(':id') // PUT /requests/:id
  update(@Param('id') id: string, @Body() updateRequestDto: UpdateRequestDto) {
    return this.requestsService.update(+id, updateRequestDto);
  }

  @Delete(':id') // DELETE /requests/:id
  remove(@Param('id') id: string) {
    return this.requestsService.remove(+id);
  }
}