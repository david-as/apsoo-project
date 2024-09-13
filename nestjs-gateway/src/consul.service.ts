import { Injectable } from '@nestjs/common';
import Consul from 'consul';

interface ConsulServiceInfo {
  ID: string;
  Service: string;
  Address: string;
  Port: number;
}

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
      name: process.env.SERVICE_NAME || 'nestjs-gateway',
      address: process.env.SERVICE_HOST || 'localhost',
      port: parseInt(process.env.SERVICE_PORT || '8080', 10),
      check: {
        http: `http://${process.env.SERVICE_HOST || 'localhost'}:${process.env.SERVICE_PORT || '8080'}/health`,
        interval: '10s',
      },
    });
  }

  async getService(
    serviceName: string,
  ): Promise<ConsulServiceInfo | undefined> {
    const services = await this.consul.agent.service.list();
    return Object.values(services as Record<string, ConsulServiceInfo>).find(
      (service) => service.Service === serviceName,
    );
  }
}
