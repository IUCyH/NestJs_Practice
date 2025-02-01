import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number = 0;

    @Column("varchar", { length: 10 })
    name: string = "";

    @Column("int")
    age: number = 0;

    @Column("varchar", { length: 128 })
    email: string = "";
}