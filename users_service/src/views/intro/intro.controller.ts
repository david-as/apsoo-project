import { Controller, Get, Header } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';
import { IntroService } from './intro.service';

@Controller()
@ApiExcludeController()
export class IntroController {
  constructor(private readonly introService: IntroService) {}

  @Get()
  @Header('Content-Type', 'text/html')
  getIntro(): string {
    return this.introService.getIntroHtml();
  }
}
