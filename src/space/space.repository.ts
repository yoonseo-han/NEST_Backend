//Repository : Deals with function related to database

//Import space entity defined
import { Space } from "./space.entity";
import { EntityRepository, Repository } from "typeorm";
import { CreateSpaceDTO } from "./dto/create-space.dto";
import { SpaceStatus } from "./space-status.enum";

//Define following custom repository to deal with data related to space entity
@EntityRepository(Space)
export class SpaceRepository extends Repository<Space> {

    //Create space data
    async createSpace(createSpaceDTO: CreateSpaceDTO) : Promise<Space> {
        const {title, description} = createSpaceDTO;
        //ADd new space to database
        const space = this.create({
            title,
            description,
            status: SpaceStatus.PUBLIC
        })
        //Save the newly created space to db
        await this.save(space);
        //Return info related to created space
        return space;
    }
}