import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as dotenv from 'dotenv';
import { AppModule } from './app.module';
import { ValidationExceptionFilter } from './common/filters/validation-exception.filter';
import { setupSwagger } from './setup-swagger';

async function bootstrap() {
  // Load environment variables
  dotenv.config();

  try {
    const app = await NestFactory.create(AppModule, {
      logger: ['error', 'warn', 'debug', 'log', 'verbose'],
    });

    app.useGlobalPipes(
      new ValidationPipe({ transform: true, whitelist: true }),
    );
    app.useGlobalFilters(new ValidationExceptionFilter());

    // Setup Swagger
    setupSwagger(app);

    // Add redirect from /api to /api/docs
    app.use('/api', (req, res, next) => {
      if (req.url === '/') {
        res.redirect('/api/docs');
      } else {
        next();
      }
    });

    await app.listen(process.env.PORT || 3000);
    console.log(`Application is running on: ${await app.getUrl()}`);
  } catch (error) {
    console.error('Error starting the application:', error);
  }
}

bootstrap();
