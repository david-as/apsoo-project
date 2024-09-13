import { Injectable, OnApplicationShutdown } from '@nestjs/common';
import { Eureka } from 'eureka-js-client';

@Injectable()
export class EurekaClientService implements OnApplicationShutdown {
  private client: Eureka;

  constructor() {
    this.client = new Eureka({
      instance: {
        app: 'nestjs-rurafood-users',
        hostName: 'nestjs-rurafood-users',
        ipAddr: 'nestjs-rurafood-users',
        port: {
          $: 3000,
          '@enabled': true,
        },
        vipAddress: 'nestjs-rurafood-users',
        dataCenterInfo: {
          '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
          name: 'MyOwn',
        },
      },
      eureka: {
        host: 'discovery',
        port: 8761,
        servicePath: '/eureka/apps/',
        maxRetries: 10,
        requestRetryDelay: 2000,
      },
    });
  }

  start() {
    this.client.start((error) => {
      console.log(error || 'Eureka registration complete');
    });
  }

  stop() {
    this.client.stop();
  }

  onApplicationShutdown(signal?: string) {
    this.stop();
  }
}

// Make sure this line is at the end of the file
export default EurekaClientService;
