import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class UppercasePipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {

    if(!value.name || typeof value.name !== "string"){
      throw new BadRequestException("Invalid name");
    };
    value.name = value.name.toUpperCase();
    return value;
  }
}
