import { Controller, Inject } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { newPositionDto } from 'src/routes/dto/newPosition.dto';
import { RoutesGateway } from 'src/routes/routes.gateway';

@Controller()
export class PositionsController {
  constructor(
    @Inject(RoutesGateway)
    private routeGateway: RoutesGateway,
  ) {}

  @MessagePattern('route.new-position')
  consumePosition(@Payload() message) {
    const newPosition: newPositionDto = message.value;
    console.log(newPosition);
    this.routeGateway.server.sockets.connected[newPosition.clientId].emit(
      'new-position',
      newPosition,
    );
    console.log('enviado');
  }
}
