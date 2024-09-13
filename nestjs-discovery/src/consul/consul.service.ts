import { Injectable } from '@nestjs/common';
import * as Consul from 'consul';

@Injectable()
export class ConsulService {
  private readonly consul: Consul.Consul;

  constructor() {
    this.consul = new Consul({
      host: process.env.CONSUL_HOST,
      port: parseInt(process.env.CONSUL_PORT || '8500', 10),
    });
  }

  async registerService() {
    return this.consul.agent.service.register({
      name: process.env.SERVICE_NAME,
      address: process.env.SERVICE_HOST,
      port: parseInt(process.env.SERVICE_PORT || '3000', 10),
      check: {
        http: `http://${process.env.SERVICE_HOST}:${process.env.SERVICE_PORT}/health`,
        interval: '10s',
      },
    });
  }
}
