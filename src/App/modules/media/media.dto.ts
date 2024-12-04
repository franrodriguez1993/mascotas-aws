import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UploadFileRequestDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Filename' })
  readonly fileName: string;

  @IsNotEmpty()
  @ApiProperty({ description: 'File buffer' })
  readonly file: Buffer;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'File Mimetype' })
  readonly fileMimeType: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: 'File size' })
  readonly fileSize: number;
}
