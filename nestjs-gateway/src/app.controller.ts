import { HttpService } from '@nestjs/axios';
import { All, Controller, Param, Req } from '@nestjs/common';
import { Request } from 'express';
import { lastValueFrom } from 'rxjs';
import { ConsulService } from './consul.service';

@Controller()
export class AppController {
  constructor(
    private readonly consulService: ConsulService,
    private readonly httpService: HttpService,
  ) {}

  @All(':serviceName/*')
  async routeRequest(
    @Param('serviceName') serviceName: string,
    @Req() req: Request,
  ): Promise<any> {
    const service = await this.consulService.getService(serviceName);

    if (!service) {
      throw new Error(`Service ${serviceName} not found`);
    }

    const url = `http://${service.Address}:${service.Port}${req.url}`;
    const response = await lastValueFrom(
      this.httpService.request({
        method: req.method as any,
        url,
        headers: req.headers as any,
        data: req.body,
      }),
    );

    return response.data;
  }
}
