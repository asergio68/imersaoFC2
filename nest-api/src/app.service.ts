import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Olá pessoal! Já iniciei o MongoDB! Uhhuuuuuuuu!';
  }
}
