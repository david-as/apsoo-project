import { Injectable } from '@nestjs/common';
import * as Consul from 'consul';

@Injectable()
export class ConsulService {
  private readonly consul: Consul.Consul;

  constructor() {
    this.consul = new Consul({
      host: process.env.CONSUL_HOST,
      port: process.env.CONSUL_PORT || '8500',
    });
  }

  async registerService() {
    return this.consul.agent.service.register({
      name: process.env.SERVICE_NAME || 'nestjs-rurafood-users',
      address: process.env.SERVICE_HOST || 'nestjs-rurafood-users',
      port: parseInt(process.env.SERVICE_PORT || '3000', 10),
      check: {
        http: `http://${process.env.SERVICE_HOST || 'nestjs-rurafood-users'}:${process.env.SERVICE_PORT || '3000'}/health`,
        interval: '10s',
      },
    });
  }
}
