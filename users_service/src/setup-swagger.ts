import { Logger, type INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function setupSwagger(app: INestApplication): void {
  const documentBuilder = new DocumentBuilder()
    .setTitle('Authentication API')
    .setDescription('REST API for user authentication')
    .addBearerAuth()
    .setVersion('1.0');

  if (process.env.API_VERSION) {
    documentBuilder.setVersion(process.env.API_VERSION);
  }

  const document = SwaggerModule.createDocument(app, documentBuilder.build());
  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: {
      authActions: {
        login: {
          type: 'apiKey',
          name: 'Authorization',
          in: 'header',
          description: 'Enter your JWT token here',
          authorizationUrl: 'http://localhost:3000/auth/login',
          scopes: {
            'read:access_token': 'Read access token',
            'write:access_token': 'Write access token',
          },
        },
      },
    },
  });

  Logger.log(
    `Swagger documentation available at http://localhost:${process.env.PORT || 3000}/api/docs`,
    'Documentation',
  );
}
