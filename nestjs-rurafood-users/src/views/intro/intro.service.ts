import { Injectable } from '@nestjs/common';

@Injectable()
export class IntroService {
  getIntroHtml(): string {
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Rurafood API</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
          }
          h1 {
            color: #2c3e50;
          }
          .api-link {
            display: inline-block;
            background-color: #3498db;
            color: white;
            padding: 10px 20px;
            text-decoration: none;
            border-radius: 5px;
            margin-top: 20px;
          }
          .api-link:hover {
            background-color: #2980b9;
          }
        </style>
      </head>
      <body>
        <h1>Welcome to the Rurafood API!</h1>
        <p>
          This API provides endpoints for managing users (both individuals and restaurants) in the Rurafood system.
        </p>
        <p>
          Our API allows you to:
        </p>
        <ul>
          <li>Create and manage user accounts for individuals and restaurants</li>
          <li>Retrieve user information</li>
          <li>Update user details</li>
          <li>Delete user accounts</li>
        </ul>
        <p>
          For detailed API documentation, including available endpoints and request/response formats, please visit our Swagger UI:
        </p>
        <a href="/api/docs" class="api-link">View API Documentation</a>
      </body>
      </html>
    `;
  }
}
