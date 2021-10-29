import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Regnessem stands for messenger but backwards :)';
  }
}
