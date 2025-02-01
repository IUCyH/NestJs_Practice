import { IsEmail, IsInt, IsNotEmpty, IsOptional } from "class-validator";

export class GetUserDto {
    @IsNotEmpty()
    name: string;

    @IsInt()
    age: number;

    @IsOptional()
    @IsEmail()
    email?: string;

    constructor(name: string, age: number, email?: string) {
        this.name = name;
        this.age = age;
        this.email = email;
    }
}