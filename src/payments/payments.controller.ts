import { BadRequestException, Controller, Get } from '@nestjs/common';

@Controller('payments')
export class PaymentsController {
  @Get()
  get400() {
    return new BadRequestException();
  }
}
