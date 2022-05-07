import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
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
}