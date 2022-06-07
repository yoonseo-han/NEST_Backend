import { Injectable, NotFoundException } from '@nestjs/common';
import { SpaceStatus} from './space-status.enum';
import {v1 as uuid} from 'uuid';
import { CreateSpaceDTO } from './dto/create-space.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SpaceRepository } from './space.repository';
import { Space } from './space.entity';
import { Repository } from 'typeorm';
import {User} from 'src/auth/user.entity'

@Injectable()
export class SpaceService {
    //Inject repository to service for service to use repository
    constructor(
        //Require @InjectRepository for declaration of space repository to be used
        @InjectRepository(SpaceRepository)
        private spaceRepository: SpaceRepository,
    ) {}

    //Get all space
    async getAllSpace(
        user: User
    ) : Promise<Space[]>{
        const query = this.spaceRepository.createQueryBuilder('space');

        //Based on query API, only find space that matches the user ID provided from param
        query.where('space.userId = :userId', {userId: user.id});

        const space = await query.getMany();

        //Return all space stored in DB
        return space;
    }

    //Create space for service
    createSpace(createSpaceDTO:CreateSpaceDTO, user:User) : Promise<Space>{
        //Use method from repository that deals with data from DB
        return this.spaceRepository.createSpace(createSpaceDTO, user);
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
    async deleteSpaceByID(id: number, user: User) : Promise<void> {
        //Delete is prefered over remove as it does not check if input id does exist (just return null if no space exist)
        //Able to delete only if it is the user who created the space
        const result = await this.spaceRepository.delete({id, user});

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
