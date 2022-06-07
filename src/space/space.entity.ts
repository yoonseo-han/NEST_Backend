import { User } from "src/auth/user.entity";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { SpaceStatus } from "./space-status.enum";

//Create entity that transforms to table of db
@Entity()
export class Space extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    status: SpaceStatus;

    @ManyToOne(type => User, user=> user.spaces, {eager: false})
    user: User;
}