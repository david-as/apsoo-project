import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as dotenv from 'dotenv';
import { AppModule } from './app.module';
import { ValidationExceptionFilter } from './common/filters/validation-exception.filter';
import { EurekaClientService } from './eureka-client.service';
import { setupSwagger } from './setup-swagger';

async function bootstrap() {
  // Load environment variables
  dotenv.config();

  try {
    const app = await NestFactory.create(AppModule);
    const eurekaClient = app.get(EurekaClientService);

    // Start Eureka client with retry logic
    const maxRetries = 5;
    let retries = 0;
    const startEurekaClient = async () => {
      try {
        eurekaClient.start();
        console.log('Eureka client started successfully');
      } catch (error) {
        console.error('Error starting Eureka client:', error);
        if (retries < maxRetries) {
          retries++;
          console.log(
            `Retrying in 5 seconds... (Attempt ${retries}/${maxRetries})`,
          );
          setTimeout(startEurekaClient, 5000);
        } else {
          console.error('Max retries reached. Unable to start Eureka client.');
        }
      }
    };
    await startEurekaClient();

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
