import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { SpaceService } from './space.service';
import { SpaceStatus } from './space-status.enum';
import { CreateSpaceDTO } from './dto/create-space.dto';
import { SpaceStatusValidationPipe } from './pipes/space-status-validation.pipe';
import {Space} from './space.entity';

//Route: space
@Controller('space')
export class SpaceController {
    //constructor used to define space service as property of class -> parameter must be defined in private to be able to use in class
    constructor(private spaceService : SpaceService) {}

    //Able to use member function in space service

    @Get('/')
    getAllSpace(): Promise<Space[]> {
        //Handler to receive all space from space service
        //Handler handles the request and sends to controller
        return this.spaceService.getAllSpace();
    }

    @Post('/')
    //Add handler level pipe: validation pipe for validation
    @UsePipes(ValidationPipe)
    //Use @Body to receive input from client
    //Return a space entity created
    createSpace(@Body() createSpaceDTO: CreateSpaceDTO ): Promise<Space> {
        return this.spaceService.createSpace(createSpaceDTO);
    }

    //Return specific space with id
    @Get('/:id')
    getSpaceById(@Param('id') id: number) : Promise<Space> {
        return this.spaceService.getSpaceByID(id);
    }

    // //Delete specific space with id
    // @Delete('/:id')
    // deleteSpaceById(@Param('id') id: string): void {
    //     this.spaceService.deleteSpaceByID(id);
    // }

    //Delete specific space with id
    //ParseIntPipe: Ensure that input is in integer datatype
    @Delete('/:id')
    deleteSpace(@Param('id', ParseIntPipe) id: number) : Promise<void> {
        return this.spaceService.deleteSpaceByID(id);
    }

    //Update status of space with xspecific id
    //custome pipe to check validation of space status
    @Patch('/:id/status')
    updateSpaceStatus(
        @Param('id', ParseIntPipe) id : number, 
        @Body('status', SpaceStatusValidationPipe) status : SpaceStatus
    ) {
        return this.spaceService.updateSpaceStatus(id, status);
    }
}
