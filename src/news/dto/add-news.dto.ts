import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length } from "class-validator";

export class AddNews {
  @ApiProperty({ example: 'Она создала свой бренд в 20' })
  @IsString()
  @Length(5, 50)
  title: string;

  @ApiProperty({ example: 'Описание' })
  @IsString()
  @Length(20, 255)
  description: string;
  image?: string[];
}
