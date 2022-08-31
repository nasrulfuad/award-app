import { IsEmail, IsNotEmpty } from "class-validator";

export class LoginDto {
  constructor(email: string) {
    this.email = email;
  }

  @IsNotEmpty()
  @IsEmail()
  email: string;
}
