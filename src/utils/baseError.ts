import { InternalServerErrorException } from '@nestjs/common';

export const baseServerError = (
  message = 'an error occured please try again',
) =>
  new InternalServerErrorException({
    message: message,
    success: false,
  });
