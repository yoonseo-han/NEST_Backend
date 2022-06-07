import { Validate } from "class-validator";
import { Space } from "src/space/space.entity";
import { BaseEntity, Column, Entity, OneToMany, PrimaryColumnCannotBeNullableError, PrimaryGeneratedColumn, Unique } from "typeorm";


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

    @OneToMany(type => Space, space => space.user, {eager: true})
    spaces: Space[];
}