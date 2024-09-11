import { Controller, Get, Header } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { IntroService } from './intro.service';

@Controller()
export class IntroController {
  constructor(private readonly introService: IntroService) {}

  @Get()
  @Header('Content-Type', 'text/html')
  @ApiOperation({ summary: 'Get project introduction' })
  @ApiResponse({
    status: 200,
    description: 'Project introduction and API info',
  })
  getIntro(): string {
    return this.introService.getIntroHtml();
  }
}
