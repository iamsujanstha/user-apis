import { ArgumentMetadata, PipeTransform } from '@nestjs/common';

export class CustomPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata): any {
    console.log({ value });
    console.log({ metadata });
    return value;
  }
}
