import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { CreateProxyDto } from './dto/create-proxy.dto';
import { UpdateProxyDto } from './dto/update-proxy.dto';
import { ProxyService } from './proxy.service';

@WebSocketGateway()
export class ProxyGateway {
  constructor(private readonly proxyService: ProxyService) {}

  @SubscribeMessage('createProxy')
  create(@MessageBody() createProxyDto: CreateProxyDto) {
    return this.proxyService.create(createProxyDto);
  }

  @SubscribeMessage('findAllProxy')
  findAll() {
    return this.proxyService.findAll();
  }

  @SubscribeMessage('findOneProxy')
  findOne(@MessageBody() id: number) {
    return this.proxyService.findOne(id);
  }

  @SubscribeMessage('updateProxy')
  update(@MessageBody() updateProxyDto: UpdateProxyDto) {
    return this.proxyService.update(updateProxyDto.id, updateProxyDto);
  }

  @SubscribeMessage('removeProxy')
  remove(@MessageBody() id: number) {
    return this.proxyService.remove(id);
  }
}
