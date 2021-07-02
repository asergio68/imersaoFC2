import { Inject } from '@nestjs/common';
import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayConnection,
  WebSocketServer,
} from '@nestjs/websockets';
import { RoutesService } from './routes.service';
import { ClientKafka } from '@nestjs/microservices';
import { Producer } from '@nestjs/microservices/external/kafka.interface';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class RoutesGateway implements OnGatewayConnection {
  private kProducer: Producer;

  @WebSocketServer()
  public server: Server;

  constructor(
    private readonly routesService: RoutesService,
    @Inject('KAFKA_SERVICE')
    private kafkaClient: ClientKafka,
  ) {
    console.log(kafkaClient);
  }

  async onModuleInit() {
    this.kProducer = await this.kafkaClient.connect();
  }

  handleConnection(client: any, ...args: any[]) {
    console.log('cliente conectado: [' + client.id + ']');
  }

  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): void {
    console.log(payload);
    client.emit('receive-message', payload);
  }

  @SubscribeMessage('new-direction')
  handleNewDirection(client: Socket, payload: { routeId: string }): void {
    console.log(payload);
    client.emit('receive-message', payload);
    this.kProducer.send({
      topic: 'route.new-direction',
      messages: [
        {
          value: JSON.stringify(
            this.routesService.startRouteFront(payload.routeId, client.id),
          ),
        },
      ],
    });
  }
}
