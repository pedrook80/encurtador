import { IsNotEmpty, IsOptional, IsUrl, IsUUID } from 'class-validator';

export class CreateShortUrlDto {
  @IsNotEmpty({ message: 'A URL original é obrigatória.' })
  @IsUrl({}, { message: 'A URL original precisa ser uma URL válida.' })
  originalUrl: string;

  @IsOptional()
  @IsUUID('4', { message: 'userId deve ser um UUID válido.' })
  userId?: string;
}
