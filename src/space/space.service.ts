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

    //Get all space
    async getAllSpace() : Promise<Space[]>{
        //Return all space stored in DB
        return this.spaceRepository.find();
    }

    //Create space for service
    createSpace(createSpaceDTO:CreateSpaceDTO) : Promise<Space>{
        //Use method from repository that deals with data from DB
        return this.spaceRepository.createSpace(createSpaceDTO);
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

    //Delete specific space based on input id
    async deleteSpaceByID(id: number) : Promise<void> {
        //Delete is prefered over remove as it does not check if input id does exist (just return null if no space exist)
        const result = await this.spaceRepository.delete(id);

        //No database with following id
        if(result.affected === 0 ) {
            throw new NotFoundException(`Cant find space with id ${id}`);
        }
    }

    // //Update specific space's status
    // updateSpaceStatus(id: string, status: SpaceStatus) : Space {
    //     const space = this.getSpaceByID(id);
    //     space.status = status;
    //     return space;
    // }

    //Update specific space's status
    async updateSpaceStatus(id: number, status: SpaceStatus) : Promise<Space> {
        const space = await this.getSpaceByID(id);

        space.status = status;
        await this.spaceRepository.save(space);

        return space;
    }
}
