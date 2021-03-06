import { Body, Controller, Delete, Get, HttpCode, HttpStatus, NotFoundException, Param, Post, Put} from '@nestjs/common';
import { CourierCreateDto } from './dto/courier.create.dto';
import { CouriersService } from './service/couriers.service';
import { CourierUpdateDto } from './dto/courier.update.dto';
import { Courier } from './model/courier.model';

@Controller('couriers')
export class CouriersController {

    constructor(private couriersService: CouriersService) { }

    @Post()
    createCourier(@Body() courierCreateDto: CourierCreateDto): Promise<Courier> {
        return this.couriersService.create(courierCreateDto)
    }

    @Get('')
    getCouriers(): Promise<Courier[]> {
        return this.couriersService.getAll()
    }

    @Get('lookup/:capacity_required')
    getCourierByCapacity(@Param('capacity_required') capacity_required: number): Promise<Courier[]> {
        return this.couriersService.getAvailableCapacity(capacity_required)
    }

    @Get('/:id')
    getCourierById(@Param('id') id: number): Promise<Courier> {
        return this.couriersService.getById(id)
    }

    @Put('/:id')
    updateCourier(@Param('id') id: number, @Body() courierUpdateDto: CourierUpdateDto): Promise<Courier> {
        courierUpdateDto.id = id
        return this.couriersService.update(courierUpdateDto)
    }

    @Delete('/:id')
    @HttpCode(204)
    async deleteCourier(@Param('id') id: number) {
        let y = await this.couriersService.delete(id);
        if (!y) {
            throw new NotFoundException('Record not found to delete')
        }
    }
}

