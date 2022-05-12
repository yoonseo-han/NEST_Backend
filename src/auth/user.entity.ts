import { Validate } from "class-validator";
import { BaseEntity, Column, Entity, PrimaryColumnCannotBeNullableError, PrimaryGeneratedColumn, Unique } from "typeorm";


//Ensure username is unique for each input entity
@Entity()
@Unique(['username'])
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    username: string;

    @Column()
    password: string;
}