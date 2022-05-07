import { Injectable, NotFoundException } from '@nestjs/common';
import { SpaceStatus} from './space-status.enum';
import {v1 as uuid} from 'uuid';
import { CreateSpaceDTO } from './dto/create-space.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SpaceRepository } from './space.repository';
import { Space } from './space.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SpaceService {
    //Inject repository to service for service to use repository
    constructor(
        //Require @InjectRepository for declaration of space repository to be used
        @InjectRepository(SpaceRepository)
        private spaceRepository: SpaceRepository,
    ) {}

    // getAllSpace(): Space[] {
    //     return this.spaces; //Retun all info stored in space
    // }

    //Create space for service
    async createSpace(createSpaceDTO:CreateSpaceDTO) : Promise<Space>{
        const {title, description} = createSpaceDTO;
        //ADd new space to database
        const space = this.spaceRepository.create({
            title,
            description,
            status: SpaceStatus.PUBLIC
        })
        //Save the newly created space to db
        await this.spaceRepository.save(space);
        //Return info related to created space
        return space;
    }


    //Return specific space based on id
    async getSpaceByID(id: number) : Promise<Space>{
        //USe typeorm method: findOne() to receive entity based on input id
        const spaceFound = await this.spaceRepository.findOne(id);
        //Execption handling when did not find space with following ID
        if(!spaceFound) {
            //NotFoundException(): Default Instance from nest js
            throw new NotFoundException(`Cant find Space with id : ${id}`);
        }
        //If input id is equal to id of one of the spaces stored in local database, return the following space
        return spaceFound;
    }

    // //Delete specific space based on input id
    // //No return type
    // deleteSpaceByID(id: string) : void {
    //     //Exception handling for deleting: return space based on id
    //     //If no space with id, automatically throw exception based on method
    //     const found = this.getSpaceByID(id);
    //     //Use filter to filter out the ones that match the condition
    //     this.spaces = this.spaces.filter((space) => space.id!==found.id);
    // }

    // //Update specific space's status
    // updateSpaceStatus(id: string, status: SpaceStatus) : Space {
    //     const space = this.getSpaceByID(id);
    //     space.status = status;
    //     return space;
    // }
}
