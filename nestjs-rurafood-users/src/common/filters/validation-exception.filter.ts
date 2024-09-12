import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
} from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { Response } from 'express';
import { DuplicateEmailException } from '../exceptions/duplicate-email.exception';

@Catch(BadRequestException, DuplicateEmailException)
export class ValidationExceptionFilter implements ExceptionFilter {
  catch(
    exception: BadRequestException | DuplicateEmailException,
    host: ArgumentsHost,
  ) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    if (exception instanceof DuplicateEmailException) {
      response.status(status).json({
        statusCode: status,
        message: exception.message,
      });
    } else {
      const validationErrors = exception.getResponse() as
        | ValidationError[]
        | { message: string };

      if (Array.isArray(validationErrors)) {
        const errorMessages = this.flattenValidationErrors(validationErrors);
        response.status(status).json({
          statusCode: status,
          message: 'Validation failed',
          errors: errorMessages,
        });
      } else {
        response.status(status).json({
          statusCode: status,
          message: validationErrors.message,
        });
      }
    }
  }

  private flattenValidationErrors(
    validationErrors: ValidationError[],
  ): string[] {
    return validationErrors.reduce((acc, error) => {
      if (error.constraints) {
        acc.push(...Object.values(error.constraints));
      }
      if (error.children) {
        acc.push(...this.flattenValidationErrors(error.children));
      }
      return acc;
    }, []);
  }
}
