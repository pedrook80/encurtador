import { IsNotEmpty, IsUrl } from 'class-validator';

export class CreateShortUrlDto {
  @IsNotEmpty({ message: 'A URL original é obrigatória.' })
  @IsUrl({}, { message: 'A URL original precisa ser uma URL válida.' })
  originalUrl: string;
}
export class UpdateShortUrlDto {
  @IsNotEmpty({ message: 'A URL original é obrigatória.' })
  @IsUrl({}, { message: 'A URL original precisa ser uma URL válida.' })
  originalUrl: string;
}