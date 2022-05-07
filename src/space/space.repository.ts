//Repository : Deals with function related to database

//Import space entity defined
import { Space } from "./space.entity";
import { EntityRepository, Repository } from "typeorm";

//Define following custom repository to deal with data related to space entity
@EntityRepository(Space)
export class SpaceRepository extends Repository<Space> {

}