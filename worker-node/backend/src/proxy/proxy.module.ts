import { Module } from '@nestjs/common';
import { ProxyService } from './proxy.service';
import { ProxyGateway } from './proxy.gateway';

@Module({
  providers: [ProxyGateway, ProxyService],
})
export class ProxyModule {}
